<?php
define('DIR_NAME','Webservice');
header('Access-Control-Allow-Origin: *');
require_once("../include/classes/class.Admin.php");
require_once("../include/classes/class.Misc.php");
require_once("../include/classes/GCM.php");
require_once("../include/classes/SMS.php");
$objAdmin = new Admin();
$objMisc  = new Cms();
$gcm   = new GCM();
$sms      = new Sms();
?>
