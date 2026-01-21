<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");
$msg    =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id     = base64_decode($_GET['id']);
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
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    $date               = $objMisc->changeDateFormat($_POST['month_date']);
    $subscribers=" SELECT B.`SUBSCRIBER_ID`,S.`CONNECTION_DATE`,B.`PACKAGE_ID`,B.`LA_CARTE_AMOUNT`,P.`PARENT_CHARGES`,B.STB_ID,B.`REMARKS`,B.`STATUS`,(SELECT COUNT(*) FROM stb_box WHERE SUBSCRIBER_ID=S.SUBSCRIBER_ID AND STATUS='A')as subBoxCount FROM `stb_box` B JOIN `package_master` P ON P.`PACKAGE_ID`=B.`PACKAGE_ID` JOIN `subscribers` S ON S.SUBSCRIBER_ID=B.SUBSCRIBER_ID WHERE S.`STATUS`='A' AND B.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]'";
    $sql=$objMisc->getAllRecordsNew($subscribers);
    $subscriber_id=0;
    $subscriberCount=0;
        foreach ($sql as $k => $row) {

            $currentTimestamp=strtotime(date('Y-m-d'));
            $connectionTimeStamp=strtotime($row['connection_date']);
            if($currentTimestamp>=$connectionTimeStamp){
              
                $subscriber_id  = $row['subscriber_id'];
                $stb_id  = $row['stb_id'];
                $boxStatus=$row['status'];
                $boxRemark=(($row['remarks']=='Box is Faulty.')?'Y':'N');
                $month=date('m',strtotime($date));
                $year=date('Y',strtotime($date));
                $laCarteCharges=$row['la_carte_amount'];
                $amount         = $row['parent_charges']+$laCarteCharges;
                
                $unit_id=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'UNIT_ID','subscribers');
                //$checkExistanceForThisMonth=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id' AND MONTH(MONTH_DATE)='$month' AND YEAR(MONTH_DATE)='$year' AND STATUS='A' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'count(*)','monthly_charges');
                
                $checkExistance=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id' AND MONTH(MONTH_DATE)='$month' AND YEAR(MONTH_DATE)='$year' AND STB_ID='$stb_id' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'count(*)','monthly_charges');
                //echo $checkExistance.' <'.$row['subboxcount'].' && '.$boxStatus.'<br>';
                if ($boxStatus=='A' && empty($checkExistance)) {   
                    //echo $checkExistance.' <'.$row['subboxcount'].' && '.$boxStatus.'<br>';
                    $franchiseId=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id'",'FRANCHISE_ID','subscribers');
                    $subscriberCount=$subscriberCount+1;  
                    $sno=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND MONTH(MONTH_DATE)='".date('m')."' AND YEAR(MONTH_DATE)='".date('Y')."' AND AMOUNT_TYPE='D'",'MAX(SNO)','monthly_charges')+1;
                    $receipt_no='TI/'.date('my').'/'.sprintf("%04d", $sno);
                    $rowArray       = array('HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                                            'FRANCHISE_ID'      =>$franchiseId,
                                            'SUBSCRIBER_ID'     =>$subscriber_id,
                                            'UNIT_ID'           =>$unit_id,
                                            'STB_ID'            =>$stb_id,
                                            'AMOUNT_TYPE'       =>'D',
                                            'SNO'               =>$sno,
                                            'RECEIPT_NO'        =>$receipt_no,
                                            'MONTH_DATE'        =>$date,
                                            'AMOUNT'            =>$amount,
                                            'ADDED_BY'          =>$_SESSION['USER_ID'],
                                            'ADDED_TIME'        =>date('Y-m-d H:i:s'));
                    $val            = $objMisc->insert('monthly_charges',$rowArray);
                    $val1            = $objMisc->insert('monthly_charges_dup',$rowArray);
                    $amount=0;
                /*}else if($checkExistance<$row['subboxcount'] && $boxStatus=='A'){
                    //echo $checkExistance.' <'.$row['subboxcount'].' && '.$boxStatus.'<br>';
                    $subscriberCount=$subscriberCount+1;  
                    $rowArray       = array('HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                                            'SUBSCRIBER_ID'     =>$subscriber_id,
                                            'UNIT_ID'           =>$unit_id,
                                            'STB_ID'            =>$stb_id,
                                            'AMOUNT_TYPE'       =>'D',
                                            'MONTH_DATE'        =>$date,
                                            'AMOUNT'            =>$amount,
                                            'ADDED_BY'          =>$_SESSION['EMPLOYEE_ID'],
                                            'ADDED_TIME'        =>date('Y-m-d H:i:s'));
                    $val            = $objMisc->insert('monthly_charges',$rowArray);
                    $amount=0;*/
                }
            }
        }
        $_SESSION['subscriberCount']=$subscriberCount;
        $_SESSION['msg'] = (($subscriberCount>=0)?1:2);
        header("location:monthly-utility.php");
        exit;
    
}
$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
$subscriberCount = isset($_SESSION['subscriberCount']) ? $_SESSION['subscriberCount'] : $subscriberCount;
unset($_SESSION['msg']);
unset($_SESSION['subscriberCount']);
switch ($msg)
{
	case 1:
		$msg = "Utility ran successfully for ".$subscriberCount." subscribers.";
    break;
    case 2:
		$errormsg = "Utility for this month already run.";
        $msg = "";
    break;
    case 3:
		$msg = "Record has been deleted successfully.";
	break;    
    case 4:
        $errormsg = "Sub area name already exists.";
        $msg = "";
    break;
     case 5:
        $errormsg = "Sub area name already exists.";
        $msg = "";
    break;
}
$and='';
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['search']) || $_GET['method']=='search'){
    $and=" AND S.MSO_ID='$_REQUEST[customer_code]'";
    $paging_params.="&customer_code='$_REQUEST[customer_code]'";
    $paging_params.="&method=search";
    $searchArray=$_REQUEST;
    if(!empty($paging_params)){
        $objMisc->paging_params=$paging_params;
    }
}
$wherethis = " 1=1 $and AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY M.`ID` DESC";
$classRecord = $objMisc->getAllRecordsPagingNew("SELECT M.`ID`,M.`STATUS`,M.`RECEIPT_NO`,S.NAME,S.CUSTOMER_ID,S.MSO_ID,S.SERIAL_NO,M.MONTH_DATE,M.ADDED_TIME,M.AMOUNT FROM `monthly_charges` M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE M.AMOUNT_TYPE='D' AND $wherethis");
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="15%">Invoice No</th><th width="20%">Name</th><th width="10%">Customer Id</th><th width="10%">MSO Id</th><th width="10%">Serial No</th><th width="10%">Date</th><th width="8%">Run on</th><th width="8%">Amount</th><th>Action';

$pagin_recs .= '</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
       foreach ($classRecord[1] as $k => $rowRec)
        {       
            if($k%2==0) 
            $pagin_recs .= '<tr class="odd gradeX">';
            else
            $pagin_recs .= '<tr class="even gradeX">';
            
            $pagin_recs .='<td id="'.$rowRec['id'].'"><b id="invoiceNo'.$rowRec['id'].'">'.$rowRec['receipt_no'].'</b><input type="text" id="invoice_no'.$rowRec['id'].'" hidden value="'.$rowRec['receipt_no'].'" >&nbsp;<a href="javascript:;" id="editInvoice'.$rowRec['id'].'" onclick="editInv('.$rowRec['id'].');"><img src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a><a href="javascript:;" id="saveInvoice'.$rowRec['id'].'" class="btn-success" hidden onclick="saveInv('.$rowRec['id'].');">OK</a></td>';
            $pagin_recs .='<td>'.$rowRec['name'].'</td>';
            $pagin_recs .='<td>'.$rowRec['customer_id'].'</td>';
            $pagin_recs .='<td>'.$rowRec['mso_id'].'</td>';
            $pagin_recs .='<td>'.$rowRec['serial_no'].'</td>';
            $pagin_recs .='<td>'.date('d M,Y',strtotime($rowRec['month_date'])).'</td>';
            $pagin_recs .='<td>'.date('d M,Y',strtotime($rowRec['added_time'])).'</td>';
            $pagin_recs .='<td align="right">'.$rowRec['amount'].'</td>';
            $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['id'].'" id="enumStatus'.$rowRec['id'].'"  value="'.$rowRec['status'].'">&nbsp;';
           // echo $_SESSION['USER_ID'];
                    if($rowRec['status']=='A')
                    {
                       $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['id'].'" id="imgStatus'.$rowRec['id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['id'].');">&nbsp;<a href="invoice-print.php?idd='.$rowRec['id'].'" target="_blank" class="btn btn-info btn-sm">Invoice</a>';
                    }
                    else
                    {
                       $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['id'].'" id="imgStatus'.$rowRec['id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['id'].');">&nbsp;';
                    }
                
                $pagin_recs .= '</td></tr>';
                $i++;
        }
          $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="8">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="8" align="center">No Record Found</td></tr></tbody>';
    }
    
  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Sub Area Information";
}else{
   $pageheading = "Run Monthly Utility"; 
}
$where           =   " 1 = 1 and STATUS = 'A' order by HEADOFFICE_ID";
//$headofficeArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['headoffice_id'],'NAME,HEADOFFICE_ID','headoffice_master',$where,0,0,0);  
$whereWing           =   " 1 = 1 and STATUS = 'A' and HEADOFFICE_ID='$_SESSION[HEADOFFICE]' order by WING_ID";
//$wingArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['wing_id'],'NAME,WING_ID','wing_master',$whereWing,0,0,0);  
$startMonth           =   $objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'DATE(ADDED_TIME)','headoffice_master');
$smartyVars['startMonth']           =   date('d/m/Y',strtotime($startMonth));

$smartyVars['searchArray']          =   $searchArray;
$smartyVars['wingArray']            =   $wingArray;
$smartyVars['headofficeArray']      =   $headofficeArray;
$smartyVars['errormsg']     		=   $errormsg;
$smartyVars['add']          		=   $add;
$smartyVars['group']       		 	=   $id;
$smartyVars['rowRec']       		=   $rowArray;
$smartyVars['pageheading']  		=   $pageheading;
$smartyVars['pagin_recs']    		=   $pagin_recs;
$smartyVars['msg']         		 	=   $msg;
$smartyVars['page']         		=   $_REQUEST['page'];
$objMisc->displayPage("header,monthly-utility,footer",$smartyVars);
function update_status($id,$status)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    $changeTo = ($status=='A') ? 'D' : 'A';
    $row = array(
                    'STATUS' => $changeTo
                );
    $where = "ID =".$id;
    $objMisc->update("monthly_charges",$row,$where);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Record has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Record has been deactivated successfully.';
    } 
    $objResponse->addAssign('imgStatus'.$id,'src',$imgName);
    $objResponse->addAssign('imgStatus'.$id,'alt',$title);
    $objResponse->addAssign('imgStatus'.$id,'title',$title);
    $objResponse->addAssign('enumStatus'.$id,'value',$changeTo);
    $objResponse->addScript("document.getElementById('msg').style.display='inline';");
    $objResponse->addAssign('msg','innerHTML','&nbsp;');
    $objResponse->addAssign('msg','innerHTML','<div class="notify notify-success"><a class="close" href="javascript:;"><img src="images/close.png" /></a><h3>'.$msg.'</h3></div>'); 
    $objResponse->addScript("setTimeout(\"document.getElementById('msg').style.display='none'\",3000);");
    return $objResponse;
} 
?>
