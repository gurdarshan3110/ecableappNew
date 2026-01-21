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
$and='';
$dataArray=array('');
if(!empty($_REQUEST['date'])){
        $collection_date=$objMisc->changeDateFormat($_REQUEST['date']);
        $and.=" AND DATE(H.ADDED_TIME)='$collection_date'";
    }
    if(!empty($_REQUEST['subscriber_id'])){
        $and.=" AND H.SUBSCRIBER_ID='$_REQUEST[subscriber_id]'";
    }
$wherethis = " 1=1 AND S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' $and ORDER BY H.HISTORY_ID DESC";
//echo  "SELECT S.`CUSTOMER_ID`,S.`MSO_ID`,S.`NAME`,S.`ADDRESS`,H.`REMARKS`,H.`ADDED_TIME` FROM `subscribers` S LEFT JOIN `subscriber_history` H ON H.SUBSCRIBER_ID=S.SUBSCRIBER_ID WHERE $wherethis";exit;
$classRecord = $objMisc->getAllRecordsNew("SELECT S.`CUSTOMER_ID`,S.`MSO_ID`,S.`NAME`,S.`ADDRESS`,H.`REMARKS`,H.`ADDED_TIME` FROM `subscribers` S LEFT JOIN `subscriber_history` H ON H.SUBSCRIBER_ID=S.SUBSCRIBER_ID WHERE $wherethis");
$rowArray = array('0'=>'CUSTOMER ID'    ,'1'=>'MSO ID'    ,'2'=>'Name'    ,'3'=>'Address' ,'4'=>'Remarks'   ,'5'=>'Date');
if ($rowArray){
	getcsv($rowArray);
}
if(!empty($classRecord)){ 
	$i=1;
    foreach ($classRecord as $k => $rowRec){    
        $dataArray[0]=$rowRec['mso_id'];
        $dataArray[1]=$rowRec['customer_id'];
        $dataArray[2]=$rowRec['name'];
        $dataArray[3]=str_replace(',', " ", $rowRec['address']);
        $dataArray[4]=str_replace(',', " ", $rowRec['remarks']);
        $dataArray[5]=$rowRec['added_time'];
        
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
