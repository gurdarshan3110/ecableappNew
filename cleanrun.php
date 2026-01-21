<?php
/**
 * IMPROVED Malware Cleanup Script
 * Removes malicious script injections from PHP files
 * 
 * IMPORTANT: 
 * - BACKUP YOUR SITE FIRST!
 * - Run this from your website's root directory
 * - Set $dryRun = false to actually clean files
 */

// Configuration
$rootDir = __DIR__;
$logFile = $rootDir . '/cleanup_log.txt';
$dryRun = false; // Set to false to actually clean files
$removeBackups = true; // Set to true to remove all .backup.* files

// Initialize
$stats = [
    'php_scanned' => 0,
    'php_cleaned' => 0,
    'patterns_found' => 0,
    'htaccess_removed' => 0,
    'index_removed' => 0,
    'backups_removed' => 0,
    'errors' => 0
];

function writeLog($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
    echo $message . "\n";
    flush();
}

function cleanPhpFile($filePath) {
    global $dryRun, $stats;
    
    $content = file_get_contents($filePath);
    if ($content === false) {
        writeLog("✗ Error reading: $filePath");
        $stats['errors']++;
        return false;
    }
    
    $originalContent = $content;
    $changed = false;
    $patternsRemoved = 0;
    
    // Pattern 1: Exact match with escaped hex
    $pattern1 = '/<script>\s*window\.location\.href\s*=\s*"\\\\x68\\\\x74\\\\x74\\\\x70\\\\x73\\\\x3a\\\\x2f\\\\x2f\\\\x75\\\\x2d\\\\x73\\\\x68\\\\x6f\\\\x72\\\\x74\\\\x2e\\\\x6e\\\\x65\\\\x74\\\\x2f\\\\x55\\\\x56\\\\x46\\\\x30\\\\x72\\\\x39";\s*<\/script>/i';
    
    // Pattern 2: Without double backslashes (in case PHP interpreted them)
    $pattern2 = '/<script>\s*window\.location\.href\s*=\s*"\\x68\\x74\\x74\\x70\\x73\\x3a\\x2f\\x2f\\x75\\x2d\\x73\\x68\\x6f\\x72\\x74\\x2e\\x6e\\x65\\x74\\x2f\\x55\\x56\\x46\\x30\\x72\\x39";\s*<\/script>/i';
    
    // Pattern 3: Any script tag with window.location.href to u-short.net
    $pattern3 = '/<script[^>]*>\s*window\.location\.href\s*=\s*["\'][^"\']*u-short\.net[^"\']*["\'];\s*<\/script>/i';
    
    // Pattern 4: Catch any remaining malicious redirects
    $pattern4 = '/<script[^>]*>\s*window\.location(?:\.href)?\s*=\s*["\'][^"\']*["\'];\s*<\/script>/i';
    
    $patterns = [$pattern1, $pattern2, $pattern3];
    
    foreach ($patterns as $index => $pattern) {
        $newContent = preg_replace($pattern, '', $content);
        if ($newContent !== $content) {
            $matches = preg_match_all($pattern, $content, $matchesArray);
            $patternsRemoved += $matches;
            $content = $newContent;
            $changed = true;
            writeLog("  → Pattern " . ($index + 1) . " matched $matches time(s)");
        }
    }
    
    // Also check for the exact malicious code at the end of file
    $maliciousCode = '<script>window.location.href = "\\x68\\x74\\x74\\x70\\x73\\x3a\\x2f\\x2f\\x75\\x2d\\x73\\x68\\x6f\\x72\\x74\\x2e\\x6e\\x65\\x74\\x2f\\x55\\x56\\x46\\x30\\x72\\x39";</script>';
    
    // Count occurrences
    $count = substr_count($content, $maliciousCode);
    if ($count > 0) {
        $content = str_replace($maliciousCode, '', $content);
        $patternsRemoved += $count;
        $changed = true;
        writeLog("  → Found exact malicious code $count time(s) using str_replace");
    }
    
    // Try with single backslash version too
    $maliciousCode2 = '<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>';
    $count2 = substr_count($content, $maliciousCode2);
    if ($count2 > 0) {
        $content = str_replace($maliciousCode2, '', $content);
        $patternsRemoved += $count2;
        $changed = true;
        writeLog("  → Found single-backslash version $count2 time(s)");
    }
    
    // Clean up excessive newlines
    $content = preg_replace("/\n{3,}/", "\n\n", $content);
    
    // Trim trailing whitespace at end of file
    $content = rtrim($content) . "\n";
    
    if ($changed) {
        if (!$dryRun) {
            // Create backup
            $backupPath = $filePath . '.backup.' . time();
            if (!copy($filePath, $backupPath)) {
                writeLog("✗ Error creating backup: $filePath");
                $stats['errors']++;
                return false;
            }
            
            // Write cleaned content
            if (file_put_contents($filePath, $content) !== false) {
                writeLog("✓ CLEANED: $filePath (removed $patternsRemoved instances)");
                $stats['php_cleaned']++;
                $stats['patterns_found'] += $patternsRemoved;
                return true;
            } else {
                writeLog("✗ Error writing: $filePath");
                $stats['errors']++;
                return false;
            }
        } else {
            writeLog("[DRY RUN] Would clean: $filePath (would remove $patternsRemoved instances)");
            $stats['php_cleaned']++;
            $stats['patterns_found'] += $patternsRemoved;
            return true;
        }
    }
    
    return false;
}

function scanDirectory($dir) {
    global $rootDir, $stats, $dryRun, $removeBackups;
    
    if (!is_readable($dir)) {
        writeLog("✗ Cannot read directory: $dir");
        return;
    }
    
    $items = @scandir($dir);
    if ($items === false) {
        writeLog("✗ Error scanning: $dir");
        return;
    }
    
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        
        $path = $dir . '/' . $item;
        
        // Skip common directories
        $skipDirs = ['node_modules', 'vendor', '.git', '.svn', 'cache', 'tmp'];
        if (is_dir($path)) {
            $basename = basename($path);
            if (in_array($basename, $skipDirs)) {
                continue;
            }
            scanDirectory($path);
            continue;
        }
        
        // Remove backup files if requested
        if ($removeBackups && preg_match('/\.backup\.\d+$/', $item)) {
            if (!$dryRun) {
                if (unlink($path)) {
                    writeLog("✓ Removed backup: $path");
                    $stats['backups_removed']++;
                } else {
                    writeLog("✗ Error removing backup: $path");
                    $stats['errors']++;
                }
            } else {
                writeLog("[DRY RUN] Would remove backup: $path");
                $stats['backups_removed']++;
            }
            continue;
        }
        
        // Process PHP files
        if (pathinfo($path, PATHINFO_EXTENSION) === 'php') {
            $stats['php_scanned']++;
            writeLog("\nScanning: $path");
            cleanPhpFile($path);
        }
        
        // Remove .htaccess files (except in root)
        if ($item === '.htaccess' && $dir !== $rootDir) {
            if (!$dryRun) {
                $backupPath = $path . '.backup.' . time();
                copy($path, $backupPath);
                
                if (unlink($path)) {
                    writeLog("✓ Removed .htaccess: $path");
                    $stats['htaccess_removed']++;
                } else {
                    writeLog("✗ Error removing .htaccess: $path");
                    $stats['errors']++;
                }
            } else {
                writeLog("[DRY RUN] Would remove .htaccess: $path");
                $stats['htaccess_removed']++;
            }
        }
        
        // Remove index.php files (except in root)
        if ($item === 'index.php' && $dir !== $rootDir) {
            if (!$dryRun) {
                $backupPath = $path . '.backup.' . time();
                copy($path, $backupPath);
                
                if (unlink($path)) {
                    writeLog("✓ Removed index.php: $path");
                    $stats['index_removed']++;
                } else {
                    writeLog("✗ Error removing index.php: $path");
                    $stats['errors']++;
                }
            } else {
                writeLog("[DRY RUN] Would remove index.php: $path");
                $stats['index_removed']++;
            }
        }
    }
}

// Main execution
writeLog("========================================");
writeLog("IMPROVED Malware Cleanup Script Started");
writeLog("========================================");
writeLog("Root Directory: $rootDir");
writeLog("Mode: " . ($dryRun ? "DRY RUN (no changes)" : "LIVE - MAKING CHANGES"));
writeLog("Remove Backups: " . ($removeBackups ? "YES" : "NO"));
writeLog("Time: " . date('Y-m-d H:i:s'));
writeLog("========================================\n");

if ($dryRun) {
    writeLog("*** DRY RUN MODE - NO FILES WILL BE MODIFIED ***");
    writeLog("*** Review the output, then set \$dryRun = false ***\n");
}

if ($removeBackups) {
    writeLog("*** BACKUP REMOVAL ENABLED ***");
    writeLog("*** All .backup.* files will be removed ***\n");
}

// Start scanning
$startTime = microtime(true);
scanDirectory($rootDir);
$endTime = microtime(true);
$duration = round($endTime - $startTime, 2);

// Print summary
writeLog("\n========================================");
writeLog("Cleanup Summary:");
writeLog("========================================");
writeLog("PHP files scanned: " . $stats['php_scanned']);
writeLog("PHP files cleaned: " . $stats['php_cleaned']);
writeLog("Malicious patterns removed: " . $stats['patterns_found']);
writeLog(".htaccess files removed: " . $stats['htaccess_removed']);
writeLog("index.php files removed: " . $stats['index_removed']);
writeLog("Backup files removed: " . $stats['backups_removed']);
writeLog("Errors encountered: " . $stats['errors']);
writeLog("Time taken: {$duration} seconds");
writeLog("========================================\n");

if ($dryRun) {
    writeLog("*** THIS WAS A DRY RUN ***");
    writeLog("*** To actually clean files, edit this script and set: ***");
    writeLog("*** \$dryRun = false; ***");
    writeLog("*** Then run it again. ***");
} else {
    writeLog("Cleanup completed!");
    if (!$removeBackups) {
        writeLog("Backup files saved with .backup.[timestamp] extension");
    }
    writeLog("Check the files to make sure everything looks correct.");
}

writeLog("\n========================================");
writeLog("Script Finished: " . date('Y-m-d H:i:s'));
writeLog("========================================\n");

?>