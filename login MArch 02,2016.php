<?php
define("ZW_IN", 'SETUP');
require_once("include/classes/class.Admin.php");
require_once("include/classes/class.Misc.php");
//require $_SERVER['DOCUMENT_ROOT'] . '/min/utils.php';
ini_set('display_errors',0);
$objAdmin = new Admin();
$objMisc  = new Cms();
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';
if(isset($_SESSION['USER_ID'])){
    header("location:/index.php");
    exit;
}
$jsUri = Minify_getUri(array(
    '//javascripts/parsley.js'  
));
$cssUri = Minify_getUri(array(
     '//stylesheets/reset.css',
     '//stylesheets/text.css',
     '//stylesheets/buttons.css',
     '//stylesheets/theme-default.css',
     '//stylesheets/login.css',
     '//stylesheets/style.css',
     '//css/parsley.css'

));

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['login'])){    
    if(!empty($_POST['username']) && $_POST['password']){
        $userId       = trim(addslashes($_REQUEST['username']));
        $password   = trim(addslashes($_REQUEST['password']));
        $where = "USERNAME = '$userId' and PASSWORD = '$password' "; 
        $record = $objMisc->getRow('employees',$where);
        if($record){
            $_SESSION['USER_ID']        = $record['employee_id'];
            $_SESSION['USER_TYPE']      = 'A';
            $wing_id                    = $objMisc->GiveValue(" UNIT_ID='$record[unit_id]'",'WING_ID','unit_master'); 
            $headoffice_id              = $objMisc->GiveValue(" WING_ID='$wing_id'",'HEADOFFICE_ID','wing_master'); 
            $_SESSION['HEADOFFICE_ID']  = $headoffice_id;
            $_SESSION['WING_ID']        = $wing_id;
            $_SESSION['UNIT_ID']        = $record['unit_id'];
            $_SESSION['USERNAME']       = $record['username'];
            header("location:/index.php");
            exit;
            } else {
                
                $msg = "Wrong Username Password";
            }
     } else {
        $msg = "Please fill mandatory fields";
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
