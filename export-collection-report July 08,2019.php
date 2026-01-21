<?php
require_once("helper.php");
class myCms extends Cms
{
	function registerAjaxFunctions()
	{
	$this->xajax->registerFunction("get_Listing");
	$this->xajax->registerFunction("update_status");
	$this->xajax->registerFunction("deleteRow");
	$this->xajax->registerFunction("editMode");
	$this->xajax->registerFunction("sorting");
	$this->xajax->registerFunction("sortTitle");
	}
}
$objMisc = new myCms();
header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename=exported-data.csv');
if(!empty($_REQUEST['from_date']) && !empty($_REQUEST['to_date'])){
    $from =$objMisc->changeDateFormat($_REQUEST['from_date']);
    $to   =$objMisc->changeDateFormat($_REQUEST['to_date']);
    $and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'";
    $and1 .=" AND MC.`MONTH_DATE` BETWEEN '$from' AND '$to'";  
}
if(!empty($_REQUEST['employee_id'])){
    $employee_id   =$_REQUEST['employee_id'];
    $and .=" AND `ADDED_BY`='$employee_id' AND `ADDED_BY_TYPE`='E'";
}
$and .=" AND `AMOUNT_TYPE`='C'";

$wherethis = " 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' $and ORDER BY `ID` DESC";
$classRecord = $objMisc->getAllRecords("SUBSCRIBER_ID,MONTH_DATE,RECEIPT_NO,AMOUNT,DISCOUNT,ID,SPECIAL_REMARKS,REMARKS,STATUS",'monthly_charges',$wherethis);
$totCol=$objMisc->GiveValue($wherethis,'SUM(AMOUNT)','monthly_charges');
$totSubscribers=$objMisc->GiveValue($wherethis,'count(*)','monthly_charges');
$rowArray = array('0'=>'Receipt No','1'=>'Receipt Date','2'=>'Customer Id','3'=>'Customer Code','4'=>'Name','5'=>'Address','6'=>'Receipt Amount','7'=>'Discount','8'=>'Balance','9'=>'Phone No','10'=>'Set Top Boxes','11'=>'Remarks');
if ($rowArray){
getcsv(array_values($rowArray));
}
if(is_array($classRecord) && !empty($classRecord)){ 
	$i=1;
    $currentMonth=date('m');
    $currentYear=date('Y');
    //$totBal=0;
    $setTopBox=='';
        foreach ($classRecord as $k => $rowRec){    
        $balance=0;
        $debit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
        $prevBal=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D' AND MONTH(MONTH_DATE)<'$currentMonth' AND YEAR(MONTH_DATE)='$currentYear'",'AMOUNT','monthly_charges');
        $credit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
        $discount=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C'",'SUM(DISCOUNT)','monthly_charges');
        $balance=$debit-$credit-$discount;
        $row=$objMisc->getRow("subscribers","SUBSCRIBER_ID='$rowRec[subscriber_id]'");
        $allBoxes=$objMisc->getAllRecordsNew("SELECT S.STB_NO FROM subscriptions S JOIN stb_box B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]' AND B.STATUS='A'");
        //$allBoxes = array_column($allBoxes, 'stb_no');
        $allStbBoxes='';
        foreach ($allBoxes as $key => $value) {
            $allStbBoxes[]=$value['stb_no'];
        }
        $setTopBox=implode(' / ', $allStbBoxes);
        $dataArray['receiptNo']=$rowRec['receipt_no'];
        $dataArray['colDate']=date('d-m-Y',strtotime($rowRec['month_date']));
        $dataArray['custId']=$row['customer_id'];
        $dataArray['custCode']=$row['mso_id'];
        $dataArray['name']=$row['name'];
        $dataArray['address']=$row['address'];
        $dataArray['receipt_amt']=((!empty($rowRec['amount']))?$rowRec['amount']:0);
        $dataArray['discount']=((!empty($rowRec['discount']))?$rowRec['discount']:0);
        $dataArray['balance']=$balance;
        $dataArray['phone_no']=$row['phone_no'];
        $dataArray['stb']=$setTopBox;
        $dataArray['remarks']=$rowRec['remarks'];

        $i++;

        getcsv($dataArray);
    }
}
exit;	
      

// get total number of fields present in the database
function getcsv($no_of_field_names)
{
$separate = '';
// do the action for all field names as field name
foreach ($no_of_field_names as $field_name)
{
if (preg_match('/\\r|\\n|,|"/', $field_name))
{
$field_name = '' . str_replace('', $field_name) . '';
}
echo $separate . $field_name;

//sepearte with the comma
$separate = ',';
}

//make new row and line
echo "\r\n";
}
     
?>
