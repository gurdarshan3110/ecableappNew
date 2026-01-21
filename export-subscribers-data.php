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

$wherethis = " 1=1 AND S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY (S.`SERIAL_NO`*1) ASC";
//echo                                    "SELECT S.*,B.PACKAGE_ID,B.`LA_CARTE_NAME`,B.`LA_CARTE_AMOUNT`,B.STATUS as BOX_STATUS,D.STB_NO,P.NAME AS PACKAGE_NAME,P.PARENT_CHARGES FROM `subscribers` S LEFT JOIN `stb_box` B ON B.SUBSCRIBER_ID=S.SUBSCRIBER_ID LEFT JOIN `subscriptions` D ON D.SUBSCRIPTION_ID=B.SUBSCRIBER_ID LEFT JOIN `package_master` P ON P.PACKAGE_ID=B.PACKAGE_ID WHERE $wherethis";
$classRecord = $objMisc->getAllRecordsNew("SELECT S.SUBSCRIBER_ID,S.FRANCHISE_ID,S.UNIT_ID,S.`SERIAL_NO`,S.`CUSTOMER_ID`,S.`MSO_ID`,S.`NAME`,S.`EMAIL`,S.`MOBILE_NO`,S.`PHONE_NO`,S.`ADDRESS`,S.`ID_TYPE`,S.`ID_NO`,S.`IDENTITY_NAME`,S.`STATUS`,S.`INSTALLED_BY`,S.`RELATION`,S.`RELATIVE`,S.`CONNECTION_DATE`,B.`REMARKS`,B.PACKAGE_ID,B.`LA_CARTE_NAME`,B.`LA_CARTE_AMOUNT`,B.STATUS as BOX_STATUS,D.STB_NO,P.`NAME` AS PACKAGE_NAME,P.PARENT_CHARGES FROM `subscribers` S LEFT JOIN `stb_box` B ON B.SUBSCRIBER_ID=S.SUBSCRIBER_ID LEFT JOIN `subscriptions` D ON D.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID LEFT JOIN `package_master` P ON P.PACKAGE_ID=B.PACKAGE_ID WHERE $wherethis");
$rowArray = array('0'=>'Serial No.'   ,'0A'=>'Franchise'   ,'1'=>'AREA'    ,'2'=>'SUB AREA'    ,'3'=>'Name'    ,'4'=>'Address' ,'5'=>'Customer Code'   ,'6'=>'Customer ID' ,'7'=>'Mobile 1'    ,'8'=>'Mobile 2'    ,'9'=>'Email'   ,'10'=>'Id Type' ,'11'=>'Id No'   ,'12'=>'Identity Name'   ,'13'=>'Installed By'    ,'14'=>'Relation'   ,'15'=>'Relative Name'   ,'16'=>'joinDt'  ,'17'=>'Package' ,'18'=>'Package Amount' ,'19'=>'La Carte Package','20'=>'La Carte Amount','21'=>'Balance','22'=>'STB NO','23'=>'Remarks','24'=>'Customer Status','25'=>'Box Status');
if ($rowArray){
	getcsv($rowArray);
}
if(!empty($classRecord)){ 
	$i=1;
    $lastMonDate=date('Y-m-d', strtotime('last month'));
    $lastMonth=date('m',strtotime($lastMonDate));
    $lastYear=date('Y',strtotime($lastMonDate));
    //$totBal=0;
    foreach ($classRecord as $k => $rowRec){    
        /*$allBoxes=$objMisc->getAllRecordsNew("SELECT S.STB_NO FROM subscriptions S LEFT JOIN stb_box B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]' AND B.STATUS='A'");
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
        $dataArray['remarks']=$rowRec['remarks'];*/
        $dataArray['Serial No.']=$rowRec['serial_no'];
        $dataArray['Frenchise Id']=$objMisc->GiveValue("FRANCHISE_ID='$rowRec[franchise_id]'",'NAME','franchise_master');
        $dataArray['AREA']=$objMisc->GiveValueNew("SELECT W.NAME FROM `unit_master` U JOIN `wing_master` W ON W.`WING_ID`=U.`WING_ID` WHERE U.`UNIT_ID`='$rowRec[unit_id]'");
        $dataArray['SUB AREA']=$objMisc->GiveValue("UNIT_ID='$rowRec[unit_id]'",'NAME','unit_master');
        $dataArray['Name']=$rowRec['name'];
        $dataArray['Address']=trim($rowRec['address']);
        $dataArray['Customer Code']=$rowRec['mso_id'];
        $dataArray['Customer ID']="'".$rowRec['customer_id'];
        $dataArray['Mobile 1']=$rowRec['phone_no'];
        $dataArray['Mobile 2']=$rowRec['mobile_no'];
        $dataArray['Email']=$rowRec['email'];
        $dataArray['Id Type']=$rowRec['id_type'];
        $dataArray['Id No']=$rowRec['id_no'];
        $dataArray['Identity Name']=$rowRec['identity_name'];
        $dataArray['Installed By']=$rowRec['installed_by'];
        $dataArray['Relation']=$rowRec['relation'];
        $dataArray['Relative Name']=$rowRec['relative'];
        $dataArray['joinDt']=$rowRec['connection_date'];
        $dataArray['Package']=$rowRec['package_name'];
        $dataArray['Package Amount']=$rowRec['parent_charges'];
        $dataArray['La Carte Package']=$rowRec['la_carte_name'];
        $dataArray['La Carte Amount']=$rowRec['la_carte_amount'];
        $dataArray['Balance']=$objMisc->GiveValue("SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(DISCOUNT)','monthly_charges');
        $dataArray['STB NO']=$rowRec['stb_no'];
        $dataArray['Remarks']=$rowRec['remarks'];
        $dataArray['Customer Status']=$rowRec['status'];
        $dataArray['Box Status']=$rowRec['box_status'];
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
