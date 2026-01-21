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
        $this->xajax->registerFunction("sortTitle");
    }
}
$objMisc = new myCms();
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;
//echo "HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND MONTH(MONTH_DATE)='".date('m')."' AND YEAR(MONTH_DATE)='".date('Y')."'";
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    if($_POST['typo']=='B'){
        $date               = $objMisc->changeDateFormat($_POST['collection_date']);
        $subscriber_id      = $_POST['subscriber_id'];
        $amount             = $_POST['amount'];
        $cgst = ($amount*18)/118/2;
        $franchiseId=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id'",'FRANCHISE_ID','subscribers');
        $sno=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND MONTH(MONTH_DATE)='".date('m')."' AND YEAR(MONTH_DATE)='".date('Y')."'",'MAX(SNO)','monthly_charges')+1;
        $receipt_no=$objMisc->getShortName($_SESSION['HEADOFFICE_NAME']).'/'.date('my').'/'.sprintf("%04d", $sno);
        $rowArray       = array('HEADOFFICE_ID'         =>$_SESSION['HEADOFFICE'],
                                'FRANCHISE_ID'          =>$franchiseId,
                                'SUBSCRIBER_ID'         =>$subscriber_id,
                                'AMOUNT_TYPE'           =>'C',
                                'RECEIPT_NO'            =>$receipt_no,
                                'SNO'                   =>$sno,
                                'MANUAL_RECEIPT_NO'     =>$_POST['manual'],
                                'DISCOUNT'              =>$_POST['discount'],
                                'REMARKS'               =>$_POST['remarks'],
                                'SGST'                  =>$cgst,
                                'CGST'                  =>$cgst,
                                'MONTH_DATE'            =>$date,
                                'BILL_RATE'             =>$billRates['rate'],
                                'AMOUNT'                =>$amount,
                                'ADDED_BY'              =>$_SESSION['USER_ID'],
                                'ADDED_TIME'            =>date('Y-m-d H:i:s'));
        //print_r($rowArray);exit;
        $val            = $objMisc->insert('monthly_charges',$rowArray);
        $val1            = $objMisc->insert('monthly_charges_dup',$rowArray);
        $lastId=mysqli_insert_id($_SESSION['CONN']);
        if($balSms>0){           
             $subscriberDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
            $subscriberCollec=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
            $subscriberDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(DISCOUNT)','monthly_charges');
            $amtBal=$subscriberDebit-$subscriberCollec-$subscriberDiscount;
            $smsGroupId=$sms->max_sms_groupid($_SESSION['HEADOFFICE']);
            $franchiseName=$objMisc->GiveValue("FRANCHISE_ID='$franchiseId'",'NAME','franchise_master');
            $msg="Thanks for ".$franchiseName." subscription Rs ".$amount." against Vr. No. ".$receipt_no." Dated  ".$date." And your balance is ".$amtBal;
            $subs=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$subscriber_id'");
            $smsCount=$sms->count_sms_parts($msg);
            $status=$sms->send_sms($subs['phone_no'],$msg,"Collection Comments");
            $smsArray = array(
                'HEADOFFICE_ID'      =>$_SESSION['HEADOFFICE'],
                'SMS_GROUP_ID'       =>$smsGroupId,
                'SMS_TO'             =>$subs['subscriber_id'],
                'SEND_TO_TYPE'       =>'S',
                'MOBILE_NO'          =>$subs['phone_no'],
                'REQUEST_ID'         =>$status,
                'SMS_TEXT'           =>$msg,
                'MODULE_NAME'        =>"Collection Comments",
                'SMS_COUNT'          =>$smsCount,
                'RATE_SMS'           =>'0.00',
                'STATUS'             =>'1',
                'ADDED_TIME'         => date('Y-m-d H:i:s')
                );
            $objMisc->insert('sms_log',$smsArray);
        }
        $_SESSION['msg'] = 1;
    }else{
        $subscriber_id      = $_POST['subscriber_id'];
        $rowArray       = array('HEADOFFICE_ID'         =>$_SESSION['HEADOFFICE'],
                                'SUBSCRIBER_ID'         =>$subscriber_id,
                                'REMARKS'               =>$_POST['remarks'],
                                'ADDED_BY'              =>$_SESSION['USER_ID'],
                                'ADDED_TIME'            =>date('Y-m-d H:i:s'));
        //print_r($rowArray);exit;
        $val= $objMisc->insert('subscriber_history',$rowArray);
        
        if($balSms>0){
            $smsGroupId=$sms->max_sms_groupid($_SESSION['HEADOFFICE']);
            $subs=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$subscriber_id'");
            $status=$sms->send_sms($subs['phone_no'],$_POST['remarks'],"Collection Comments");
            $smsCount=$sms->count_sms_parts($_POST['remarks']);
            $smsArray = array(
                'HEADOFFICE_ID'      =>$_SESSION['HEADOFFICE'],
                'SMS_GROUP_ID'       =>$smsGroupId,
                'SMS_TO'             =>$subs['subscriber_id'],
                'SEND_TO_TYPE'       =>'S',
                'MOBILE_NO'          =>$subs['phone_no'],
                'REQUEST_ID'         =>$status,
                'SMS_TEXT'           =>$_POST['remarks'],
                'MODULE_NAME'        =>"Collection Comments",
                'SMS_COUNT'          =>$smsCount,
                'RATE_SMS'           =>$billRates['rate_sms'],
                'STATUS'             =>'1',
                'ADDED_TIME'         => date('Y-m-d H:i:s')
                );
            $objMisc->insert('sms_log',$smsArray);
        }
        $_SESSION['msg'] = 6;
    }
    header("location:monthly-collections.php");
    exit;
}

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
    case 1:
        $msg = "Collection made successfully.";
    break;
    case 6:
        $msg = "Comment added successfully.";
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

if($id){
    $where = 'UNIT_ID = '.$id;
    $rowArray = $objMisc->getRow("unit_master",$where);
}
$wherethis = " 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C' ORDER BY `ID` DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","monthly_charges",$wherethis);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="10%">Receipt No</th><th width="10%">Manual Receipt No</th><th width="35%">Subscriber</th><th width="10%">Phone No</th><th width="15%">Collection</th><th width="15%">Date</th><th>Action';
/*
if(is_array($classRecord[1])){ 
        $pagin_recs .='&nbsp;&nbsp;<a href="javascript:;" title="Check All"  onclick="check_all(\'artCatCount\',\'artCatCheckbox\')"><input type="checkbox"></a>&nbsp;&nbsp;All';
        
        $pagin_recs .= '&nbsp;&nbsp;<a href="javascript:;" title="Delete" onclick="return chkOptions_all(\'Delete\',frmListing,\'artCatCheckbox\',\'artCatCount\')" class="btn btn-danger">Delete</a>';
    
}*/
$pagin_recs .= '</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
       foreach ($classRecord[1] as $k => $rowRec)
        {       
            if($k%2==0) 
            $pagin_recs .= '<tr class="odd gradeX">';
            else
            $pagin_recs .= '<tr class="even gradeX">';
            $pagin_recs .='<td align="right">'.$rowRec['receipt_no'].'</td>';
            $pagin_recs .='<td align="right">'.$rowRec['manual_receipt_no'].'</td>';
            $pagin_recs .='<td>'.$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]'",'NAME','subscribers').'<br>'.$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]'",'ADDRESS','subscribers').'</td>';
            $headoffice_id =$objMisc->GiveValue(" _ID='$rowRec[wing_id]'",'HEADOFFICE_ID','wing_master');
            $pagin_recs .='<td>'.$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]'",'PHONE_NO','subscribers').'</td>';
            $pagin_recs .='<td align="right">'.$rowRec['amount'].'</td>';
            $pagin_recs .='<td>'.$objMisc->dateFormat($rowRec['month_date']).' '.date('H:i A',strtotime($rowRec['added_time'])).'</td>';
            //$pagin_recs .='<!--<td><a class="btn btn-info" target="_blank" href="receipt-pdf-.php?id='.$rowRec['id'].'">Print</a>-->';
            $pagin_recs .='<td><a class="btn btn-info" target="_blank" href="receipt-pdf.php?id='.$rowRec['id'].'">Print</a><input type="hidden" name="enumStatus'.$rowRec['id'].'" id="enumStatus'.$rowRec['id'].'"  value="'.$rowRec['status'].'">&nbsp;<b style="color:red;" id="action'.$rowRec['id'].'">';
           // echo $_SESSION['USER_ID'];
                if($rowRec['status']=='A'){
                    $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['id'].'" id="imgStatus'.$rowRec['id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return updateStatus('.$rowRec['id'].');">&nbsp;';
                }else{
                    $pagin_recs .= 'Canceled :'.$rowRec['special_remarks'];
                }
                /* 
                $pagin_recs .='<a href="headoffice.php?id='.base64_encode($rowRec['unit_id']).'&page='.$_GET['page'].'"><img class="edit-btn" src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
                $pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['unit_id'].'" id="artCatCheckbox_'.$i.'">&nbsp;';
                */
                $pagin_recs .= '</b></td></tr>';
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
    
  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Sub Area Information";
}else{
   $pageheading = "Run Monthly Utility"; 
}

$where           =   " 1 = 1 and STATUS = 'A' order by HEADOFFICE_ID";
$headofficeArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['headoffice_id'],'NAME,HEADOFFICE_ID','headoffice_master',$where,0,0,0);  
$whereWing           =   " 1 = 1 and STATUS = 'A' and HEADOFFICE_ID='$rowArray[headoffice_id]' order by WING_ID";
$wingArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['wing_id'],'NAME,WING_ID','wing_master',$whereWing,0,0,0);  
$receipt=$objMisc->GiveValues("1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY ID DESC LIMIT 1",'SNO,MANUAL_RECEIPT_NO','monthly_charges');
$sno=$receipt['sno']+1;
$receipt_no=$objMisc->getShortName($_SESSION['HEADOFFICE_NAME']).'/'.date('my').'/'.sprintf("%04d", $sno+1);
$manual_receipt_no=((!empty($receipt['manual_receipt_no']))?$receipt['manual_receipt_no']+1:'1');

$smartyVars['sno']                  =   $sno;
$smartyVars['receipt_no']           =   $receipt_no;
$smartyVars['manual_receipt_no']    =   $manual_receipt_no;
$smartyVars['wingArray']            =   $wingArray;
$smartyVars['headofficeArray']      =   $headofficeArray;
$smartyVars['errormsg']             =   $errormsg;
$smartyVars['add']                  =   $add;
$smartyVars['group']                =   $id;
$smartyVars['rowRec']               =   $rowArray;
$smartyVars['pageheading']          =   $pageheading;
$smartyVars['collectionListing']    =   $pagin_recs;
$smartyVars['msg']                  =   $msg;
$smartyVars['page']                 =   $_REQUEST['page'];

$objMisc->displayPage("header,monthly-collections,footer",$smartyVars);
function updateStatus($id,$status,$reason){
    global $objMisc;
    global $sms;
    $objResponse = new XajaxResponse();
    $row = array('STATUS' => 'D',
                 'SPECIAL_REMARKS'=>$reason);
    $where = "ID =".$id;
    $objMisc->update("monthly_charges",$row,$where);
    $balSmsCount=$sms->pending_sms($_SESSION['HEADOFFICE']);
    $balSms=((empty($balSmsCount))?0:$balSmsCount);
    $billRates=$objMisc->GiveValues("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'RATE,RATE_SMS','admin_collections');
    //$objResponse->addAlert($balSms);
    if($balSms>0){
        $canRec=$objMisc->getRow('monthly_charges',$where);
        $subscriberDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$canRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
        $subscriberCollec=$objMisc->GiveValue(" SUBSCRIBER_ID='$canRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
        $subscriberDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$canRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(DISCOUNT)','monthly_charges');
        $amtBal=$subscriberDebit-$subscriberCollec-$subscriberDiscount;
        $smsGroupId=$sms->max_sms_groupid($_SESSION['HEADOFFICE']);
        
        $franchiseName=$objMisc->GiveValue("FRANCHISE_ID='$canRec[franchise_id]'",'NAME','franchise_master');
        $msg="Vr. No. ".$canRec['receipt_no']." is cancelled from ".$franchiseName." subscription of Rs ".$canRec['amount']." And your new updated balance is ".$amtBal;
        $subs=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$canRec[subscriber_id]'");
        $smsCount=$sms->count_sms_parts($msg);
        $status=$sms->send_sms($subs['phone_no'],$msg,"Collection Comments");
        $smsArray = array(
            'HEADOFFICE_ID'      =>$_SESSION['HEADOFFICE'],
            'SMS_GROUP_ID'       =>$smsGroupId,
            'SMS_TO'             =>$subs['subscriber_id'],
            'SEND_TO_TYPE'       =>'S',
            'MOBILE_NO'          =>$subs['phone_no'],
            'REQUEST_ID'         =>$status,
            'SMS_TEXT'           =>$msg,
            'MODULE_NAME'        =>"Reciept Cancelled",
            'SMS_COUNT'          =>$smsCount,
            'RATE_SMS'           =>'0.00',
            'STATUS'             =>'1',
            'ADDED_TIME'         => date('Y-m-d H:i:s')
            );
        $objMisc->insert('sms_log',$smsArray);
    }
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Record has been deactivated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Sub area record has been deactivated successfully.';
    } 
    $objResponse->addScript("document.getElementById('msg').style.display='inline';");
    $objResponse->addAssign('action'.$id,'innerHTML','Canceled :'.$reason);
    $objResponse->addAssign('msg','innerHTML','&nbsp;');
    $objResponse->addAssign('msg','innerHTML','<div class="notify notify-success"><a class="close" href="javascript:;"><img src="images/close.png" /></a><h3>'.$msg.'</h3></div>'); 
    $objResponse->addScript("setTimeout(\"document.getElementById('msg').style.display='none'\",3000);");
    return $objResponse;
}
?>
