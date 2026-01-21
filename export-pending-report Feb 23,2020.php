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
if(!empty($_REQUEST['subscriber_status']) && $_REQUEST['subscriber_status']!=''){
        $andWhere.=" AND S.STATUS='$_REQUEST[subscriber_status]'";
        $paging_params.="&subscriber_status=".$_REQUEST['subscriber_status'];
    }
if(!empty($_REQUEST['employee_id'])){
    $employeePosted  =" AND ADDED_BY='$_REQUEST[employee_id]'";
    $paging_params.="&employee_id=".$_REQUEST['employee_id'];
}
$status=((empty($_REQUEST['status']))?'All':$_REQUEST['status']);
    if($status=='All'){
        $having=' HAVING totdebit-(totcredit+totdiscount)>0';
    }
    if($status=='PP'){
        $having=' HAVING totcredit1+totdiscount1>0 AND totdebit-(totcredit+totdiscount)>0';
    }
    if($status=='UP'){
        $having='HAVING totcredit1+totdiscount1=0 AND totdebit1>0';
    }
$permissions=$objMisc->GiveValue("USER_ID='$_REQUEST[employee_id]'",'PERMISSIONS','users');
$permissions=json_decode($permissions);
//$permissions = $objMisc->array_column($permissions, 'id');
$permission=array();
$k=0;
foreach ($permissions as $value) {
    //print_r($permissions);
    $permission[] = $permissions[$k]->id;
    $k++;
}
$permission=implode(",", $permission);
if(!empty($permission)){
    $and .=" AND UNIT_ID IN ($permission)";
    $andWhere .=" AND M.UNIT_ID IN ($permission)";
}
$rowArray=$_REQUEST;

$wherethis = " 1=1 AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND M.STATUS='A' AND M.AMOUNT_TYPE='D' $andWhere GROUP BY M.SUBSCRIBER_ID $having ORDER BY (S.`SERIAL_NO`*1) ASC";
//echo "SELECT (SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=S.SUBSCRIBER_ID AND AMOUNT_TYPE='D')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID)as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID)as totcredit,S.* FROM monthly_charges M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE $wherethis";
$monthCurrent=date('m');
$classRecord = $objMisc->getAllRecordsNew("SELECT (SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=S.SUBSCRIBER_ID AND AMOUNT_TYPE='D' AND STATUS='A')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID AND STATUS='A')as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID AND STATUS='A')as totcredit,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=S.SUBSCRIBER_ID AND AMOUNT_TYPE='D' AND STATUS='A' AND MONTH(MONTH_DATE)='$monthCurrent')as totdebit1,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID AND STATUS='A' AND MONTH(MONTH_DATE)='$monthCurrent')as totdiscount1,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID AND STATUS='A' AND MONTH(MONTH_DATE)='$monthCurrent' AND RECEIPT_NO!='Opening Balance')as totcredit1,S.* FROM monthly_charges M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE $wherethis");
$rowArray = array('0A'=>'Serial No','0'=>'Customer Code','1'=>'Customer Id','2'=>'Name','3'=>'Address','4'=>'Previous Balance','5'=>'Balance','6'=>'Phone No','7'=>'Set Top Boxes','8'=>'Remarks');
if ($rowArray){
	getcsv($rowArray);
}
if(!empty($classRecord)){ 
	$i=1;
    $lastMonDate=date('Y-m-d', strtotime('last month'));
    $lastMonth=date('m',strtotime($lastMonDate));
    $lastYear=date('Y',strtotime($lastMonDate));
    $lastDate=date('Y-m').'-'.'01';
    //$totBal=0;
    foreach ($classRecord as $k => $rowRec){    
        $prevDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='D' AND DATE(MONTH_DATE)<'$lastDate'",'SUM(AMOUNT)','monthly_charges');
        $prevCredit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND DATE(MONTH_DATE)<'$lastDate'",'SUM(AMOUNT)','monthly_charges');
        $prevDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND DATE(MONTH_DATE)<'$lastDate'",'SUM(DISCOUNT)','monthly_charges');
        
        $prevBal=$prevDebit-$prevCredit-$prevDiscount;
        $allBoxes=$objMisc->getAllRecordsNew("SELECT S.STB_NO FROM subscriptions S LEFT JOIN stb_box B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]' AND B.STATUS='A'");
        $setTopBox='';
        foreach ($allBoxes as $key => $allBo) {
            $setTopBox=(($setTopBox=='')?$allBo['stb_no']:$setTopBox.'/'.$allBo['stb_no']);
        }
        $bal=$rowRec['totdebit']-$rowRec['totcredit']-$rowRec['totdiscount'];
        $dataArray['serialno']=$rowRec['serial_no'];
        $dataArray['custcode']=$rowRec['mso_id'];
        $dataArray['custId']=$rowRec['customer_id'];
        $dataArray['name']=$rowRec['name'];
        $dataArray['address']=str_replace(',', " ", $rowRec['address']);
        $dataArray['prevBal']=$prevBal;
        $dataArray['balance']=$bal;
        $dataArray['phone_no']=$rowRec['phone_no'];
        $dataArray['stb']="'".$setTopBox;
        $dataArray['remarks']=$rowRec['remarks'];
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
