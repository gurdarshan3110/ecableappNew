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
        $and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'"; 
        $paging_params.="&from_date=".$_REQUEST['from_date'];
        $paging_params.="&to_date=".$_REQUEST['to_date'];
    }
    if(!empty($_REQUEST['employee_id'])){
        $and .=" AND ADDED_BY='$_REQUEST[employee_id]'"; 
        $paging_params.="&employee_id=".$_REQUEST['employee_id'];
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
    $and .=" AND `AMOUNT_TYPE`='C'";

    $wherethis = " 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' $and ORDER BY `ID` DESC";
    $classRecord = $objMisc->getAllRecordsPaging("SUBSCRIBER_ID,ADDED_TIME,RECEIPT_NO,MANUAL_RECEIPT_NO,AMOUNT,DISCOUNT,ID,SPECIAL_REMARKS,STATUS",'monthly_charges',$wherethis);
    $totCol=$objMisc->GiveValue("1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' $and ORDER BY `ID` DESC",'SUM(AMOUNT)','monthly_charges');
    $totSubscribers=$objMisc->GiveValue("1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' $and ORDER BY `ID` DESC",'count(*)','monthly_charges');

    //print_r($classRecord);exit;
    $i  = 1;
    $pagin_recs = "";
    $pagin_recs .= '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="5%">S.No</th><th width="6%">Receipt No</th><th width="6%">Receipt Date</th><th width="6%">Customer ID/Customer Code</th><th width="12%">Subscriber Name</th><th width="12%">Address</th><th width="7%">Receipt Amount</th><th width="7%">Discount</th><th width="7%">Balance</th><th width="10%">Phone No</th><th width="12%">Action</th></tr></thead><tbody>';  
    $totRecs=0;           
        if(is_array($classRecord[1]) && !empty($classRecord[1]))
        { $i=1;
            //print_r($classRecord[1]);exit;
            $currentMonth=date('m');
            $currentYear=date('Y');
            //$totBal=0;
            foreach ($classRecord[1] as $k => $rowRec){    
                $balance=0;
                $debit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
                $prevBal=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D' AND MONTH(MONTH_DATE)<'$currentMonth' AND YEAR(MONTH_DATE)='$currentYear'",'AMOUNT','monthly_charges');
                $credit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
                $discount=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C'",'SUM(DISCOUNT)','monthly_charges');
                //$thisMonthCredit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]'  AND MONTH(ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(ADDED_TIME)=YEAR(CURRENT_DATE()) AND `AMOUNT_TYPE`='C'",'SUM(AMOUNT)','monthly_charges');
                $balance=$debit-$credit-$discount;
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
                $pagin_recs .='<td>'.((empty($rowRec['manual_receipt_no']))?$rowRec['receipt_no']:$rowRec['manual_receipt_no']).'</td>';
                $pagin_recs .='<td style="text-align:right;">'.date('d M,Y H:i A',strtotime($rowRec['added_time'])).'</td>';
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
                $pagin_recs  .= '<tr><td colspan="10">'.$classRecord[0].'</td></tr>';
              }
                $pagin_recs  .= '</tbody>';
        } else {
            $pagin_recs .= '<tr class="odd gradeX"><td colspan="10" align="center">No Record Found</td></tr></tbody>';
        }
}else {
            $pagin_recs .= '<tr class="odd gradeX"><td colspan="10" align="center">No Record Found</td></tr></tbody>';
        }
    

if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Collection Report of Current Month";
}else{
   $pageheading = "Collection Report of Current Month"; 
}
$whereEmp =   " 1 = 1 AND U.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and E.STATUS = 'A' order by E.NAME ASC";
$employeeArray          =   $objMisc->myFunc->fnWriteOptionListWithJoin($searchArray['employee_id'],"NAME,USER_ID,","SELECT U.`USER_ID`,E.`NAME` FROM `employees` E JOIN `users` U ON E.`EMPLOYEE_ID`=U.`ID` AND U.`USER_TYPE`='E' WHERE $whereEmp",0,0); 
$smartyVars['totSubscribers']       =   $totSubscribers;
$smartyVars['totCol']               =   $totCol;
$smartyVars['employeeArray']        =   $employeeArray;
$smartyVars['searchArray']          =   $searchArray;
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
    $objMisc->update("monthly_charges",$row,$where);
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
