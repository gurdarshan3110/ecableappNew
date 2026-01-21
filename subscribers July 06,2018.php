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
        $this->xajax->registerFunction("updateStatus");
        $this->xajax->registerFunction("deleteRow");
        $this->xajax->registerFunction("editMode");
        $this->xajax->registerFunction("sorting");
        $this->xajax->registerFunction("subInfo");
        $this->xajax->registerFunction("viewSubscriber");
    }
}
$objMisc = new myCms();
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    //print_r($_POST);exit;
    if($id==''){
        if($_POST['payment_method']=='L'){
            $actual_amount = $_POST['actual_amount'];
            $amount        = $_POST['amount'];

        }else{
            $actual_amount = $_POST['pactual_amount'];
            $amount        = $_POST['final_amount'];
        }
        $rowArray = array(  'HEADOFFICE_ID'         => $_SESSION['HEADOFFICE'],
                            'NAME'              => $_POST['name'],
                            'CUSTOMER_ID'       => $_POST['customer_id'],
                            'MSO_ID'            => $_POST['mso_id'],
                            'OPENING_BALANCE'   => $_POST['opening_balance'],
                            'RELATION'          => $_POST['relation'],
                            'RELATIVE'          => $_POST['relative'],
                            'ADDRESS'           => $_POST['address'],
                            'PHONE_NO'          => $_POST['phone_no'],
                            'MOBILE_NO'         => $_POST['mobile_no'],
                            'EMAIL'             => $_POST['email'],
                            'EMPLOYEE_ID'       => $_POST['employee_id'],
                            'CONNECTION_DATE'   => date('Y-m-d'),
                            'UNIT_ID'           => $_POST['unit_id'],
                            'PAYMENT_METHOD'    => $_POST['payment_method'],
                            'PAYMENT_TYPE'      => $_POST['payment_type'],
                            'ID_TYPE'           => $_POST['id_type'],
                            'ID_NO'             => $_POST['id_no'],
                            'INSTALLED_BY'      => $_POST['installed_by'],
                            'IDENTITY_NAME'     => $_POST['identity_name'],
                            'ACTUAL_AMOUNT'     => $actual_amount,
                            'DISCOUNT'          => $_POST['discount'],
                            'AMOUNT'            => $amount,
                            'REMARKS'           => addslashes($_POST['remarks']),
                            'ADDED_BY'          => $_SESSION['USER_ID'],
                            'ADDED_TIME'        => date('Y-m-d H:i:s'));
        $cond       = "";
        $cond       = " NAME = '$_POST[name]'";
        $recdata    = $objMisc->GiveValue($cond,"UNIT_ID","subscribers"); 
        $val        = $objMisc->insert("subscribers",$rowArray);
        $lastId=mysqli_insert_id();
        if(!empty($lastId) && !empty($_POST['phone_no'])){
            $userArray=array('USERNAME'         => ((empty($_POST['phone_no']))?$_POST['customer_id']:$_POST['phone_no']),
                             'PASSWORD'         => rand(111111,999999),
                             'USER_TYPE'        =>'S',
                             'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                             'ID'               =>$lastId);
            $userInsert        = $objMisc->insert("users",$userArray);
        }
        if(!empty($lastId)){
            foreach ($_POST['subscription_id'] as $k => $rowRe) {
                    if(!empty($_POST['subscription_id'][$k])){
                        $subscription_id=$_POST['subscription_id'][$k];
                        $stbArray   = array(    'HEADOFFICE_ID'         => $_SESSION['HEADOFFICE'],
                                                'SUBSCRIBER_ID'          => $lastId,
                                                'SUBSCRIPTION_ID'        => $_POST['subscription_id'][$k],
                                                'PACKAGE_ID'             => $_POST['package_id'][$k],
                                                'ADDED_BY'               => $_SESSION['USER_ID'],
                                                'ADDED_TIME'             => date('Y-m-d H:i:s'));
                        //print_r($stbArray);exit;
                        $valstb     = $objMisc->insert("stb_box",$stbArray);
                        $updateBoxStatus=array('AVAILABILITY'       =>'B');
                        $updateBox=$objMisc->update('subscriptions',$updateBoxStatus,"SUBSCRIPTION_ID='$subscription_id'");
                    }
            }
        }               
        $_SESSION['msg'] = 1;
        header("location:subscribers.php");
        exit;
    }else{
        if($_POST['payment_method']=='L'){
            $actual_amount = $_POST['actual_amount'];
            $amount        = $_POST['amount'];

        }else{
            $actual_amount = $_POST['pactual_amount'];
            $amount        = $_POST['final_amount'];
        }
        $rowArray = array(  'NAME'              => $_POST['name'],
                            'CUSTOMER_ID'       => $_POST['customer_id'],
                            'MSO_ID'            => $_POST['mso_id'],
                            'OPENING_BALANCE'   => $_POST['opening_balance'],
                            'RELATION'          => $_POST['relation'],
                            'RELATIVE'          => $_POST['relative'],
                            'ADDRESS'           => $_POST['address'],
                            'PHONE_NO'          => $_POST['phone_no'],
                            'MOBILE_NO'         => $_POST['mobile_no'],
                            'EMAIL'             => $_POST['email'],
                            'ID_TYPE'           => $_POST['id_type'],
                            'ID_NO'             => $_POST['id_no'],
                            'INSTALLED_BY'      => $_POST['installed_by'],
                            'IDENTITY_NAME'     => $_POST['identity_name'],
                            'ACTUAL_AMOUNT'     => $actual_amount,
                            'DISCOUNT'          => $_POST['discount'],
                            'AMOUNT'            => $amount,
                            'REMARKS'           => addslashes($_POST['remarks']),
                            'ADDED_BY'          => $_SESSION['USER_ID'],
                            'ADDED_TIME'        => date('Y-m-d H:i:s'));
        $cond       = "";
        $cond       = " NAME = '$_POST[name]'";
        $recdata    = $objMisc->GiveValue($cond,"UNIT_ID","subscribers"); 
        $val        = $objMisc->update("subscribers",$rowArray,"SUBSCRIBER_ID='$id'");
        if(!empty($id)){
            $userId=$objMisc->GiveValue("USER_TYPE='S' AND ID='$id'",'USER_ID','users');
            if(empty($userId) && !empty($_POST['phone_no'])){
                $userArray=array('USERNAME'         => ((empty($_POST['phone_no']))?$_POST['customer_id']:$_POST['phone_no']),
                             'PASSWORD'         => rand(111111,999999),
                             'USER_TYPE'        =>'S',
                             'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                             'ID'               =>$id);
                $userInsert        = $objMisc->insert("users",$userArray);
            }
            foreach ($_POST['subscription_id'] as $k => $rowRe) {
                $subscription_id=$_POST['subscription_id'][$k];
                $stbId=$_POST['stb_id'][$k];
                if(empty($stbId)){
                    $stbArray   = array(    'HEADOFFICE_ID'         => $_SESSION['HEADOFFICE'],
                                            'SUBSCRIBER_ID'          => $id,
                                            'SUBSCRIPTION_ID'        => $_POST['subscription_id'][$k],
                                            'PACKAGE_ID'             => $_POST['package_id'][$k],
                                            'ADDED_BY'               => $_SESSION['USER_ID'],
                                            'ADDED_TIME'             => date('Y-m-d H:i:s'));
                    //print_r($stbArray);exit;
                    $valstb     = $objMisc->insert("stb_box",$stbArray);
                    $updateBoxStatus=array('AVAILABILITY'       =>'B');
                    $updateBox=$objMisc->update('subscriptions',$updateBoxStatus,"SUBSCRIPTION_ID='$subscription_id'");
                }else{
                    $stbArray   = array(    'HEADOFFICE_ID'          => $_SESSION['HEADOFFICE'],
                                            'SUBSCRIBER_ID'          => $id,
                                            'SUBSCRIPTION_ID'        => $_POST['subscription_id'][$k],
                                            'PACKAGE_ID'             => $_POST['package_id'][$k],
                                            'UPDATED_BY'             => $_SESSION['USER_ID'],
                                            'UPDATED_TIME'           => date('Y-m-d H:i:s'));
                    //print_r($stbArray);exit;
                    $valstb     = $objMisc->update("stb_box",$stbArray,"`STB_ID`='$stbId'");
                }
            }
        }
        $_SESSION['msg'] = 2;
        header("location:subscribers.php");
        exit;
    }                      
}
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['search'])){
    $name=$_POST['name'];
    $phone_no=$_POST['phone_no'];
    $unit_id=$_POST['unit_id'];
    $mso_id=$_POST['mso_id'];
    $customer_id=$_POST['customer_id'];
    $and='';
    if(!empty($name)){
        $and .=" AND S.NAME LIKE '%$name%'";
    }
    if(!empty($phone_no)){
        $and .=" AND S.PHONE_NO='$phone_no'";
    }
    if(!empty($unit_id)){
        $and .=" AND S.UNIT_ID='$unit_id'";
    }
    if(!empty($customer_id)){
        $and .=" AND S.CUSTOMER_ID LIKE '$customer_id%'";
    }
    if(!empty($mso_id)){
        $and .=" AND S.MSO_ID LIKE '$mso_id%'";
    }
    $searchArray=$_POST;
}
$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
    case 1:
        $msg = "Subscriber added successfully.";
    break;
    case 2:
        $msg = "Record updated successfully.";
    break;
    case 3:
        $msg = "Record has been deleted successfully.";
    break;    
    case 4:
        $errormsg = "Subscriber name already exists.";
        $msg = "";
    break;
     case 5:
        $errormsg = "Subscriber name already exists.";
        $msg = "";
    break;
}

if($id){
    $where = 'SUBSCRIBER_ID = '.$id;
    $rowArray = $objMisc->getRow("subscribers",$where);
}
$wherethis = " 1=1 AND S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' $and ORDER BY S.`SUBSCRIBER_ID` DESC";
//echo "SELECT S.NAME as subscriber,W.NAME as area,U.NAME as sub_area,S.* FROM subscribers S LEFT JOIN unit_master U ON U.UNIT_ID=S.UNIT_ID LEFT JOIN wing_master W ON W.`WING_ID`=U.`WING_ID` LEFT JOIN headoffice_master H ON H.HEADOFFICE_ID=W.HEADOFFICE_ID WHERE $wherethis";
$classRecord = $objMisc->getAllRecordsPagingNew("SELECT S.NAME as subscriber,W.NAME as area,U.NAME as sub_area,S.* FROM subscribers S LEFT JOIN unit_master U ON U.UNIT_ID=S.UNIT_ID LEFT JOIN wing_master W ON W.`WING_ID`=U.`WING_ID` LEFT JOIN headoffice_master H ON H.HEADOFFICE_ID=W.HEADOFFICE_ID WHERE $wherethis");
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="27%">Name/Phone No</th><th>Customer Id</th><th>Customer Code/MSO</th><th width="16%">Area/Sub Area</th><th width="12%">Stb Boxes</th><th>Action';

if(is_array($classRecord[1])){ 
        //$pagin_recs .='&nbsp;&nbsp;<a href="javascript:;" title="Check All"  onclick="check_all(\'artCatCount\',\'artCatCheckbox\')"><input type="checkbox"></a>&nbsp;&nbsp;All';
        
        //$pagin_recs .= '&nbsp;&nbsp;<a href="javascript:;" title="Delete" onclick="return chkOptions_all(\'Delete\',frmListing,\'artCatCheckbox\',\'artCatCount\')" class="btn btn-danger">Delete</a>';
    
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
            
            $pagin_recs .='<td>'.$rowRec['subscriber'].'<br>'.$rowRec['phone_no'].'</td>';
            $pagin_recs .='<td>'.$rowRec['customer_id'].'</td>';
            $pagin_recs .='<td>'.$rowRec['mso_id'].'</td>';
            $pagin_recs .='<td>'.$rowRec['area'].'<br>'.$rowRec['sub_area'].'</td>';
            $pagin_recs .='<td>';
            $pagin_recs .='<table class="table table-bordered">';
                //echo "SELECT S.STB_NO,S.SUBSCRIPTION_ID,B.STATUS,B.`STB_ID`, FROM `stb_box` B JOIN `subscriptions` S ON S.`SUBSCRIPTION_ID`=B.`SUBSCRIPTION_ID` WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]'";
                $sql=$objMisc->getAllRecordsNew("SELECT S.STB_NO,S.SUBSCRIPTION_ID,B.STATUS,B.`STB_ID` FROM `stb_box` B JOIN `subscriptions` S ON S.`SUBSCRIPTION_ID`=B.`SUBSCRIPTION_ID` WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]'");
                foreach($sql as $f =>$res){
                    $pagin_recs .='<tr>';
                        $pagin_recs .='<td>'.$res['stb_no'].'</td>';
                        $pagin_recs .='<td id="status'.$res['stb_id'].'"><input type="hidden" name="enumStatus'.$res['stb_id'].'" id="enumStatus'.$res['stb_id'].'"  value="'.$res['status'].'">';
                        if($res['status']=='A'){
                           $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$res['stb_id'].'" id="imgStatus'.$res['stb_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return updateStatus('.$res['stb_id'].');">&nbsp;';
                        }else{
                           $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$res['stb_id'].'" id="imgStatus'.$res['stb_id'].'" alt="Activate" title="Activate" border="0" onclick="return updateStatus('.$res['stb_id'].');">';
                        }
                        $pagin_recs .='</td>';
                    $pagin_recs .='</tr>';
                    $f++;
                }
            $pagin_recs .='</table>';
            $pagin_recs .='</td>';
            $pagin_recs .='<td> &nbsp;';
           // echo $_SESSION['USER_ID'];
                    
                
                $pagin_recs .='<a href="subscribers.php?id='.base64_encode($rowRec['subscriber_id']).'&page='.$_GET['page'].'" ><img src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
                //$pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['subscriber_id'].'" id="artCatCheckbox_'.$i.'" style="margin: 0 5px;">&nbsp;';
                $pagin_recs .='<a href="comment-log.php?id='.$rowRec['subscriber_id'].'&name='.$rowRec['subscriber'].'" target="_blank"><img src="images/chat-log.png"></a>&nbsp;';
                $pagin_recs .='<a href="subscriber-ledger.php?id='.$rowRec['subscriber_id'].'&name='.$rowRec['subscriber'].'&phone_no='.$rowRec['phone_no'].'&customer_id='.$rowRec['customer_id'].'&mso_id='.$rowRec['mso_id'].'" target="_blank"  class="btn btn-primary btn-small" style="margin: 0px 0px 0px 12px;">View</a>&nbsp;';
                $pagin_recs .='<button class="btn btn-info btn-sm" onclick="xajax_subInfo('.$rowRec['subscriber_id'].');" data-toggle="modal" data-target="#myModal">Info</button>&nbsp;';
                
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
    $pageheading = "Edit Subscriber Information";
}else{
   $pageheading = "Add New Subscriber"; 
}
$wings             =   $objMisc->getAllRecordsNew("SELECT * FROM `wing_master` WHERE 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY WING_ID DESC"); 
foreach ($wings as $key => $resRow) {
    $unitArray .='<optgroup label="'.$resRow['name'].'">';
    $units =   $objMisc->getAllRecordsNew("SELECT * FROM `unit_master` WHERE 1=1 AND WING_ID='$resRow[wing_id]' ORDER BY UNIT_ID DESC"); 
    foreach ($units as $key => $resRew) {
        
       $unitArray .='<option '.(($rowArray['unit_id']==$resRew['unit_id'])?'selected="selected"':'').' value="'.$resRew['unit_id'].'">'.$resRew['name'].'</option>'; 
    }
    $unitArray .='</optgroup>';
}
$whereEmp          =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and STATUS = 'A' and UNIT_ID='$rowArray[unit_id]' order by EMPLOYEE_ID";
$empArray          =   $objMisc->myFunc->fnWriteOptionList($rowArray['employee_id'],'NAME,EMPLOYEE_ID','employees',$whereEmp,0,0,0); 
$wherePackage      =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and STATUS = 'A' order by PACKAGE_ID DESC";
$packageArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['package_id'],'NAME,PACKAGE_ID','package_master',$wherePackage,0,0,0);  
$whereStbBox       =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and STATUS = 'A' AND AVAILABILITY='AV' order by SUBSCRIPTION_ID DESC";
$stbArray          =   $objMisc->myFunc->fnWriteOptionList($rowArray['subscription_id'],'STB_NO,SUBSCRIPTION_ID','subscriptions',$whereStbBox,0,0,0);  

$customer_id = $objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'CUSTOMER_ID','subscribers');
$mso_id      = $objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'MSO_ID','subscribers');
if(empty($customer_id)){
    $customerId='000001';
}elseif(!empty($rowArray)){
    $customerId=$rowArray['customer_id'];
}else{
    $customerId=sprintf("%06d", $customer_id+1);
}
if(empty($mso_id)){
    $msoId='000001';
}elseif(!empty($rowArray)){
    $msoId=$rowArray['mso_id'];
}else{
    $msoId=sprintf("%06d", $mso_id+1);
}
if($id){
    $subscriberBoxRecs=$objMisc->getAllRecordsNew("SELECT B.*,S.`STB_NO` FROM `stb_box` B JOIN `subscriptions` S ON S.`SUBSCRIPTION_ID`=B.`SUBSCRIPTION_ID` WHERE B.SUBSCRIBER_ID='$id'");
    $i=1;
    foreach ($subscriberBoxRecs as $key => $recs) {
        $packageArr =   $objMisc->myFunc->fnWriteOptionList($recs['package_id'],'NAME,PACKAGE_ID','package_master',$wherePackage,0,0,0);  
        if($recs['status']=='A'){
            $subscriberBoxes .='<div class="col-lg-12">
                                    <div class="col-sm-4">
                                        <label>Stb NO</label>
                                        <input required type="text" readonly value="'.$recs['stb_no'].'" name="subscription[]" id="subscription_id1'.$i.'" autocomplete="off" class="form-control"/>
                                        <input required type="hidden" value="'.$recs['subscription_id'].'" name="subscription_id[]" id="subscription1'.$i.'" autocomplete="off" class="form-control"/>
                                        <input required type="hidden" value="'.$recs['stb_id'].'" name="stb_id[]" id="stb_id'.$i.'" autocomplete="off" class="form-control"/>
                                        <div id="display1'.$i.'" class="display"></div>
                                    </div>
                                    <div class="col-sm-4">
                                        <label>Package</label>
                                        <select id="package_id'.$i.'"  name="package_id[]" onchange="TotAmt('.$i.')" class="form-control">
                                            <option value="">-Please Select-</option>
                                            '.$packageArr.'
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <label>Amount</label>';
                                            $subscriberBoxes .='<input type="text" name="amount1[]" id="amount'.$i.'" class="form-control" value="'.$objMisc->GiveValue("PACKAGE_ID='$recs[package_id]'",'PARENT_CHARGES','package_master').'">';
                                    $subscriberBoxes .='</div>
                                    '.(($i==1)?'<div class="col-sm-1">
                                        <label>&nbsp;</label>
                                        <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                    </div>':'').'
                                </div>';                  
        }else{
            $subscriberBoxes .='<div class="col-lg-12">
                                    <div class="col-sm-4">
                                        <label>Stb NO</label>
                                        <input required type="text" readonly value="'.$recs['stb_no'].'" name="subscription[]" class="form-control"/>
                                        <div id="display1'.$i.'" class="display"></div>
                                    </div>
                                    <div class="col-sm-4">
                                        <label>Package</label>
                                        <select id="package_id'.$i.'" disabled class="form-control">
                                            <option value="">-Please Select-</option>
                                            '.$packageArr.'
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <label>Amount</label>';
                                            $subscriberBoxes .='<input type="text" id="amount'.$i.'" class="form-control" readonly value="'.$objMisc->GiveValue("PACKAGE_ID='$recs[package_id]'",'PARENT_CHARGES','package_master').'">';
                                    $subscriberBoxes .='</div>
                                    '.(($i==1)?'<div class="col-sm-1">
                                        <label>&nbsp;</label>
                                        <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                    </div>':'').'
                                </div>';
        }
        $i++;
    }
    $totSubBoxes=$i-1;
}

$smartyVars['subscriberBoxes']      =   $subscriberBoxes;
$smartyVars['totSubBoxes']          =   ((empty($totSubBoxes) || $totSubBoxes=='')?1:$totSubBoxes);
$smartyVars['employeeArray']        =   $empArray;
$smartyVars['stbArray']             =   $stbArray;
$smartyVars['customerId']           =   $customerId;
$smartyVars['msoId']                =   $msoId;
$smartyVars['packageArray']         =   $packageArray;
$smartyVars['wingArray']            =   $wingArray;
$smartyVars['unitArray']            =   $unitArray;
$smartyVars['headofficeArray']      =   $headofficeArray;
$smartyVars['errormsg']             =   $errormsg;
$smartyVars['add']                  =   $add;
$smartyVars['group']                =   $id;
$smartyVars['rowRec']               =   $rowArray;
$smartyVars['pageheading']          =   $pageheading;
$smartyVars['classData']            =   $pagin_recs;
$smartyVars['msg']                  =   $msg;
$smartyVars['searchArray']          =   $searchArray;
$smartyVars['page']                 =   $_REQUEST['page'];
$objMisc->displayPage("header,subscribers,footer",$smartyVars);
function updateStatus($id,$status,$reason)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    //$objResponse->addAlert($id);
    $changeTo = ($status=='A') ? 'D' : 'A';
    $where = "STB_ID =".$id;
    $subId=$objMisc->GiveValue($where,'SUBSCRIPTION_ID','stb_box');
    $stbNo=$objMisc->GiveValue("SUBSCRIPTION_ID='$subId'",'STB_NO','subscriptions');
    if($changeTo=='D'){
	    $row = array(
	                    'STATUS' => $changeTo,
	                    'REMARKS'=>"Stb No ".$stbNo." is deactivated : ".$reason,
	                    'UPDATED_BY'=>$_SESSION['USER_ID'],
	                    'UPDATED_TIME'=>date('Y-m-d H:i:s')
	                );
	    $row1 = array(
	                    'STATUS' => $changeTo,
	                    'AVAILABILITY'=>'Av',
	                    'REMARKS'=>$reason,
	                    'UPDATED_BY'=>$_SESSION['USER_ID'],
	                    'UPDATED_TIME'=>date('Y-m-d H:i:s')
	                );
	}else{
		$row = array(
	                    'STATUS' => $changeTo,
	                    'REMARKS'=>"Stb No ".$stbNo." is activated : ".$reason,
	                    'UPDATED_BY'=>$_SESSION['USER_ID'],
	                    'UPDATED_TIME'=>date('Y-m-d H:i:s')
	                );
	    $row1 = array(
	                    'STATUS' => $changeTo,
	                    'AVAILABILITY'=>'B',
	                    'REMARKS'=>$reason,
	                    'UPDATED_BY'=>$_SESSION['USER_ID'],
	                    'UPDATED_TIME'=>date('Y-m-d H:i:s')
	                );
	}
    
    //$packageId=$objMisc->GiveValue($where,'PACKAGE_ID','stb_box');
    //$packageAmt=$objMisc->GiveValue("PACKAGE_ID='$packageId'",'PARENT_CHARGES','package_master');
    $subscriberId=$objMisc->GiveValue($where,'SUBSCRIBER_ID','stb_box');
    //$amt=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriberId'",'AMOUNT','subscribers');
    //$newAmt=$amt-$packageAmt;
    $rowArray = array(
                    'SUBSCRIBER_ID' => $subscriberId,
                    'HEADOFFICE_ID' => $_SESSION['HEADOFFICE'],
                    'REMARKS'=>(($changeTo=='A')?"Stb No ".$stbNo." is activated : ".$reason:"Stb No ".$stbNo." is deactivated : ".$reason),
                    'ADDED_BY'=>$_SESSION['USER_ID'],
                    'ADDED_TIME'=>date('Y-m-d H:i:s')
                );
    //$row2 = array(`AMOUNT`      =>$newAmt);
    //$objResponse->addAlert($subscriberId);
    //$objResponse->addAlert($id);
    $objMisc->update("stb_box",$row,$where);
    $objMisc->update("subscriptions",$row1,"SUBSCRIPTION_ID='$subId'");
    //$objMisc->update("subscribers",$row2,"SUBSCRIBER_ID='$subscriberId'");
    $objMisc->insert("subscriber_history",$rowArray);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Subscriber record has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Subscriber record has been deactivated successfully.';
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
       $where = " SUBSCRIBER_ID =".$bid;
       $objMisc->delete("subscribers",$where); 
    }
    $_SESSION['msg'] = 3;
    $sscript .= "var a;";
    $sscript .= "a = window.location;";
    $sscript .= "window.location = a;";
    //$objResponse->addAlert($sscript);
    $objResponse->addScript($sscript);
    return $objResponse;
}
function subInfo($id){
    global $objMisc;
    $objResponse = new XajaxResponse();
    $objResponse->addAssign('modalData','innerHTML','<img src="images/loader.gif" style="text-align:center;">');
    $sub=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$id'");
    $subU=$objMisc->getRow('users',"ID='$id' AND USER_TYPE='S'");
    $table='';
    $table.='<table style="width:100%" class="table  table-bordered table-striped">';
        $table.='<tr>
                    <th width="13%">Customer Id</th><td>'.$sub['customer_id'].'</td>
                    <th width="13%">MSO Id</th><td>'.$sub['mso_id'].'</td>
                </tr>';
        $table.='<tr>
                    <th>Name</th><td>'.$sub['name'].'</td>
                    <th>'.$sub['relation'].'</th><td>'.$sub['relative'].'</td>
                </tr>';
        $table.='<tr>
                    <th>Phone No</th><td>'.$sub['phone_no'].'</td>
                    <th>Email</th><td>'.$sub['email'].'</td>
                </tr>';
            $unitDet=$objMisc->GiveValues("UNIT_ID='$sub[unit_id]'",'NAME,WING_ID','unit_master');
            $wing=$objMisc->GiveValue("WING_ID='$unitDet[wing_id]'",'NAME','wing_master');
        $table.='<tr>
                    <th colspan="4">'.$sub['address'].'<br>'.$unitDet['name'].'-'.$wing.'</th>
                </tr>';
        $table.='<tr>
                    <th>Installation Date</th><td>'.(($sub['connection_date']!='0000-00-00')?$objMisc->dateFormat($sub['connection_date']):'').'</td>
                    <th>Username<br>Password</th><td>'.$subU['username'].'<br>'.$subU['password'].'</td>
                </tr>';
        $table.='<tr>
                    <th colspan="4" style="text-align:center;">STB Detail</th>
                </tr>';
        $rec=$objMisc->getAllRecordsNew("SELECT B.STB_NO,P.NAME,P.PARENT_CHARGES,S.STATUS FROM `stb_box` S JOIN `subscriptions` B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID JOIN `package_master` P ON P.PACKAGE_ID=S.PACKAGE_ID WHERE SUBSCRIBER_ID='$id'");
        $q=1;
        $table.='<tr><th>S.No</th><th>Stb No</th><th>Package</th><th>Charges</th></tr>';
        $totCharges=0;
        foreach ($rec as $k => $value) {
            if($value['status']=='A'){
                $table.='<tr style="color:#005E00;"><td>'.$q.'</td><td>'.$value['stb_no'].'</td><td>'.$value['name'].'</td><td style="text-align:right;">'.$value['parent_charges'].'</td></tr>';
                $totCharges=$totCharges+$value['parent_charges'];
            }else{
                $table.='<tr style="color:#D20000;"><td>'.$q.'</td><td>'.$value['stb_no'].'</td><td>Package:'.$value['name'].'</td><td style="text-align:right;">'.$value['parent_charges'].'</td></tr>';
            }
            $q++;
        }
        $table.='<tr><th colspan="3" style="text-align:right;">Total</th><th style="text-align:right;">'.$totCharges.'</th></tr>';
    $table.='</table>';
    $objResponse->addAssign('modalData','innerHTML',$table);
    return $objResponse;
} 
?>
