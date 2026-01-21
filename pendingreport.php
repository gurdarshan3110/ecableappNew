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
$objMisc->rec_pp = 5000;
$objMisc->dbFunc->ajax_pagin = true;
$and='';
$status='All';
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_REQUEST['submit']) || $_REQUEST['method']=='search'){
    if(!empty($_REQUEST['subscriber_status']) && $_REQUEST['subscriber_status']!=''){
        $andWhere.=" AND S.STATUS='$_REQUEST[subscriber_status]'";
        $paging_params.="&subscriber_status=".$_REQUEST['subscriber_status'];
    }
    if(!empty($_REQUEST['from_date']) && !empty($_REQUEST['to_date'])){
        $from =$objMisc->changeDateFormat($_REQUEST['from_date']);
        $to   =$objMisc->changeDateFormat($_REQUEST['to_date']);
        $and .=" AND MONTH_DATE BETWEEN '$from' AND '$to'";
        $andWhere.=" AND M.MONTH_DATE BETWEEN '$from' AND '$to'";
        $and1 .=" AND MC.`MONTH_DATE` BETWEEN '$from' AND '$to'";  
        $paging_params.="&from_date=".$_REQUEST['from_date'];
        $paging_params.="&to_date=".$_REQUEST['to_date'];
    }
    if(!empty($_REQUEST['employee_id'])){
        $employeePosted  =" AND ADDED_BY='$_REQUEST[employee_id]'";
        $paging_params.="&employee_id=".$_REQUEST['employee_id'];
    }
    $status=$_REQUEST['status'];
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
    $to   =$objMisc->changeDateFormat(date('d/m/Y'));
    $and .=" AND MONTH_DATE<='$to'";
    $andWhere .=" AND M.MONTH_DATE<='$to' AND M.`AMOUNT_TYPE`='D'";
    //$andWhere .=" AND MONTH(M.ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(M.ADDED_TIME)=YEAR(CURRENT_DATE()) AND M.`AMOUNT_TYPE`='D'";
    $wherethis = " 1=1 AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND M.STATUS='A' $andWhere GROUP BY M.SUBSCRIBER_ID ORDER BY S.`SERIAL_NO` ASC";

}else{
    $fromDate='01/'.date('m').'/'.date('Y');
    $from =$objMisc->changeDateFormat($fromDate);
    $to   =$objMisc->changeDateFormat(date('d/m/Y'));
    $and .=" AND MONTH_DATE <='$to'";
    $andWhere .=" AND M.MONTH_DATE<='$to' AND M.`AMOUNT_TYPE`='D'";
    $wherethis = " 1=1 AND M.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND S.`STATUS`='A' AND M.STATUS='A' $andWhere GROUP BY M.SUBSCRIBER_ID ORDER BY S.`SERIAL_NO` ASC";
}
//$totDebit=$objMisc->GiveValue("1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' AND AMOUNT_TYPE='D' $and",'SUM(AMOUNT)','monthly_charges');
//$totCredit=$objMisc->GiveValue("1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' AND AMOUNT_TYPE='C' $and",'SUM(AMOUNT)','monthly_charges');
//$totDiscount=$objMisc->GiveValue("1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' AND AMOUNT_TYPE='C' $and",'SUM(DISCOUNT)','monthly_charges');
//$totBal=$totDebit-$totCredit-$totDiscount;
//$totSubscribers=$objMisc->GiveValue("1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' $and",'COUNT(*)','monthly_charges');
//echo "SELECT S.SUBSCRIBER_ID,M.ADDED_TIME,M.RECEIPT_NO FROM monthly_charges M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID WHERE $wherethis";exit;
$classRecord = $objMisc->getAllRecordsPagingNew("SELECT S.SUBSCRIBER_ID,M.ADDED_TIME,M.RECEIPT_NO FROM monthly_charges M JOIN `subscribers` S ON S.SUBSCRIBER_ID=M.SUBSCRIBER_ID  WHERE $wherethis");
//print_r($classRecord);exit;
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
    //$totSubscribers=0;
    foreach ($classRecord[1] as $k => $rowRec){    
        $balance=0;
        $toLast=date('Y-m-d', strtotime('-30 days'));
        $debit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='D' AND MONTH_DATE<='$to'",'SUM(AMOUNT)','monthly_charges');

        $prevDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='D' AND MONTH_DATE<'$toLast'",'AMOUNT','monthly_charges');
        $prevCredit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH_DATE<'$toLast'",'AMOUNT','monthly_charges');
        $prevDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH_DATE<'$toLast'",'DISCOUNT','monthly_charges');
        
        $prevBal=$prevDebit-$prevCredit-$prevDiscount;
        $credit=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH_DATE<='$to'",'SUM(AMOUNT)','monthly_charges');
        
        //echo " SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH_DATE BETWEEN '$toLast' AND '$to'";
        $CreditInLast30Days=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH_DATE BETWEEN '$toLast' AND '$to'",'SUM(AMOUNT)','monthly_charges');
        //echo $rowArray['status'];
        $discount=$objMisc->GiveValue(" SUBSCRIBER_ID='$rowRec[subscriber_id]' AND STATUS='A' AND AMOUNT_TYPE='C' AND MONTH_DATE<='$to'",'SUM(DISCOUNT)','monthly_charges');
        $balance=$debit-$credit-$discount;
        
        //$prevBal=$debit-$debitThisMonth;
        $row=$objMisc->getRow("subscribers","SUBSCRIBER_ID='$rowRec[subscriber_id]' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A'");
        $allBoxes=$objMisc->getAllRecordsNew("SELECT S.STB_NO FROM subscriptions S JOIN stb_box B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]' AND B.STATUS='A'");
        
        //print_r($allBoxes);
        //$allBoxes = array_column($allBoxes, 'stb_no');
        //print_r($allBoxes);exit;
        $setTopBox='';
        foreach ($allBoxes as $key => $allBo) {
            $setTopBox=(($setTopBox=='')?$allBo['stb_no']:$setTopBox.','.$allBo['stb_no']);
        }
        //$setTopBox=implode(',', $allBoxes);
        //echo 'hi'.$setTopBox;exit;
        if($CreditInLast30Days>0 && $status=='PP'){
            if($balance>0){
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$row['mso_id'].'</td>';
                $pagin_recs .='<td>'.$row['customer_id'].'</td>';
                $pagin_recs .='<td>'.$row['name'].'</td>';
                $pagin_recs .='<td>'.$row['address'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.(($prevBal=='')?0:$prevBal).'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$balance.'</td>';
                $pagin_recs .='<td>'.$row['phone_no'].'</td>';
                $pagin_recs .='<td>'.$setTopBox.'</td>';
                $pagin_recs .= '</tr>';
                $totBal=$totBal+$balance;
                $totSubscribers=$totSubscribers+1;
                $totRecs++;
                $i++;
            }

        }else if($CreditInLast30Days==0 && $status=='UP'){
            if($balance>0){
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$row['mso_id'].'</td>';
                $pagin_recs .='<td>'.$row['customer_id'].'</td>';
                $pagin_recs .='<td>'.$row['name'].'</td>';
                $pagin_recs .='<td>'.$row['address'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.(($prevBal=='')?0:$prevBal).'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$balance.'</td>';
                $pagin_recs .='<td>'.$row['phone_no'].'</td>';
                $pagin_recs .='<td>'.$setTopBox.'</td>';
                $pagin_recs .= '</tr>';
                $totBal=$totBal+$balance;
                $totSubscribers=$totSubscribers+1;
                $totRecs++;
                $i++;
            }
        }else if($status=='All'){
            if($balance>0){
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.$i.'</td>';
                $pagin_recs .='<td>'.$row['mso_id'].'</td>';
                $pagin_recs .='<td>'.$row['customer_id'].'</td>';
                $pagin_recs .='<td>'.$row['name'].'</td>';
                $pagin_recs .='<td>'.$row['address'].'</td>';
                $pagin_recs .='<td style="text-align:right;">'.(($prevBal=='')?0:$prevBal).'</td>';
                $pagin_recs .='<td style="text-align:right;">'.$balance.'</td>';
                $pagin_recs .='<td>'.$row['phone_no'].'</td>';
                $pagin_recs .='<td>'.$setTopBox.'</td>';
                $pagin_recs .= '</tr>';
                $totBal=$totBal+$balance;
                $totSubscribers=$totSubscribers+1;
                $totRecs++;
                $i++;
            }
        }
        
    }
        $pagin_recs  .= '</tbody>';
} else {
    $pagin_recs .= '<tr class="odd gradeX"><td colspan="9" align="center">No Record Found</td></tr></tbody>';
}

// if($totRecs>0) {
//     $totBal=$objMisc->GiveValue("AMOUNT_TYPE='D' $employeePosted AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' AND MONTH(ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(ADDED_TIME)=YEAR(CURRENT_DATE())",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' $employeePosted AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' AND MONTH(ADDED_TIME)=MONTH(CURRENT_DATE()) AND YEAR(ADDED_TIME)=YEAR(CURRENT_DATE())",'SUM(AMOUNT)','monthly_charges');
//     $totSubscribers=$objMisc->GiveValue("AMOUNT_TYPE='D' $employeePosted AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'count(*)','monthly_charges');
// }
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
