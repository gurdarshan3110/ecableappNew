<?php
require $_SERVER['DOCUMENT_ROOT'] . '/min/utils.php';
 
$jsUri = Minify_getUri(array(
     
    '//js/newjs.js',
    '//include/javascript/fadeinfadeout.js',
    '//include/javascript/popup.js',
    '//include/javascript/prototype.js',
    '//include/javascript/effects.js',
    '//include/javascript/formcheck.js',
    '//include/javascript/validation.js',
    '//include/javascript/paging_ajax.js',
    '//include/javascript/calendar/calendar.js',
    '//include/javascript/calendar/lang/calendar-en.js',
    '//include/javascript/calendar/calendar-setup.js',
    '//include/javascript/greybox/AJS.js',
    '//include/javascript/greybox/AJS_fx.js',
    '//include/javascript/greybox/gb_scripts.js',
    'js/bsn.AutoSuggest_2.1.3.js'
    
));
$jsUris = Minify_getUri(array(
     '//include/javascript/script.js',
     '//include/javascript/functions.js'
));

$cssUri = Minify_getUri(array(
     '//css/style.css',
     '//css/toggle.css',
     '//css/autosuggest_inquisitor.css',
     '//include/javascript/greybox/gb_styles.css',
     '//include/javascript/calendar/calendar-win2k-cold-1.css'
     
));


?>