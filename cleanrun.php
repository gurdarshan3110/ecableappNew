<?php
/**
 * Malware Cleanup Script
 * This script removes malicious script injections from PHP files
 * and deletes unauthorized .htaccess and index.php files (except root level)
 * 
 * IMPORTANT: 
 * - Run this from your website's root directory
 * - Make a complete backup before running
 * - Test on a staging environment first if possible
 */

// Configuration
$rootDir = __DIR__; // Current directory where script is executed
$logFile = $rootDir . '/cleanup_log.txt';
$dryRun = true; // Set to true to see what would be changed without making changes

// Malicious patterns to remove (the script tags with encoded URLs)
$maliciousPatterns = [
    '/<script>\s*window\.location\.href\s*=\s*"\\x68\\x74\\x74\\x70\\x73\\x3a\\x2f\\x2f\\x75\\x2d\\x73\\x68\\x6f\\x72\\x74\\x2e\\x6e\\x65\\x74\\x2f\\x55\\x56\\x46\\x30\\x72\\x39";\s*<\/script>/i',
    // Add more patterns if you find variations
];

// Initialize counters
$stats = [
    'php_scanned' => 0,
    'php_cleaned' => 0,
    'htaccess_removed' => 0,
    'index_removed' => 0,
    'errors' => 0
];

/**
 * Write to log file
 */
function writeLog($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
    echo $message . "\n";
}

/**
 * Clean PHP files from malicious code
 */
function cleanPhpFile($filePath) {
    global $maliciousPatterns, $dryRun, $stats;
    
    $content = file_get_contents($filePath);
    $originalContent = $content;
    $changed = false;
    
    // Remove each malicious pattern
    foreach ($maliciousPatterns as $pattern) {
        $newContent = preg_replace($pattern, '', $content);
        if ($newContent !== $content) {
            $content = $newContent;
            $changed = true;
        }
    }
    
    // Also remove multiple consecutive newlines left behind
    $content = preg_replace("/\n{3,}/", "\n\n", $content);
    
    if ($changed) {
        if (!$dryRun) {
            // Create backup
            $backupPath = $filePath . '.backup.' . time();
            copy($filePath, $backupPath);
            
            // Write cleaned content
            if (file_put_contents($filePath, $content) !== false) {
                writeLog("✓ Cleaned: $filePath");
                $stats['php_cleaned']++;
                return true;
            } else {
                writeLog("✗ Error writing: $filePath");
                $stats['errors']++;
                return false;
            }
        } else {
            writeLog("[DRY RUN] Would clean: $filePath");
            $stats['php_cleaned']++;
            return true;
        }
    }
    
    return false;
}

/**
 * Recursively scan directory
 */
function scanDirectory($dir) {
    global $rootDir, $stats, $dryRun;
    
    $items = scandir($dir);
    
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        
        $path = $dir . '/' . $item;
        
        // Skip common directories that shouldn't be scanned
        $skipDirs = ['node_modules', 'vendor', '.git', '.svn'];
        if (is_dir($path)) {
            $basename = basename($path);
            if (in_array($basename, $skipDirs)) {
                continue;
            }
            scanDirectory($path);
            continue;
        }
        
        // Process PHP files
        if (pathinfo($path, PATHINFO_EXTENSION) === 'php') {
            $stats['php_scanned']++;
            cleanPhpFile($path);
        }
        
        // Remove .htaccess files (except in root)
        if ($item === '.htaccess' && $dir !== $rootDir) {
            if (!$dryRun) {
                // Create backup
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
                // Create backup
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
writeLog("Malware Cleanup Script Started");
writeLog("Root Directory: $rootDir");
writeLog("Mode: " . ($dryRun ? "DRY RUN (no changes will be made)" : "LIVE"));
writeLog("========================================");

// Scan and clean
scanDirectory($rootDir);

// Print summary
writeLog("\n========================================");
writeLog("Cleanup Summary:");
writeLog("PHP files scanned: " . $stats['php_scanned']);
writeLog("PHP files cleaned: " . $stats['php_cleaned']);
writeLog(".htaccess files removed: " . $stats['htaccess_removed']);
writeLog("index.php files removed: " . $stats['index_removed']);
writeLog("Errors encountered: " . $stats['errors']);
writeLog("========================================");

if ($dryRun) {
    writeLog("\nThis was a DRY RUN. Set \$dryRun = false to apply changes.");
} else {
    writeLog("\nBackup files created with .backup.[timestamp] extension");
    writeLog("Check cleanup_log.txt for details");
}

writeLog("Cleanup Script Completed");
writeLog("========================================\n");
?>