<?php
define("ZW_IN", 'SETUP');
require_once("include/classes/class.Admin.php");
require_once("include/classes/class.Misc.php");
//require $_SERVER['DOCUMENT_ROOT'] . '/min/utils.php';
ini_set('display_errors',0);
$objAdmin = new Admin();
$objMisc  = new Cms();
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';

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
    
    $user       = trim(addslashes($_POST['username']));
    $password   = trim(addslashes($_POST['password']));
    if(!empty($user) && !empty($password)){
        $userId       = trim(addslashes($user));
        $password   = trim(addslashes($password));
        $where = "USERNAME = '$userId' and PASSWORD = '$password' ";
        $record = $objMisc->getRow('users',$where);
        $office = $objMisc->getRow('headoffice_master',"HEADOFFICE_ID='$record[headoffice_id]'");
        if($record && $record['user_type']=='A'){
            $_SESSION['USER_ID']        = $record['user_id'];
            $_SESSION['USER_TYPE']      = $record['user_type'];
            $_SESSION['NAME']           = $record['name'];
            $_SESSION['ADDRESS']        = $record['address'];
            $_SESSION['HEADOFFICE']     = $office['headoffice_id'];
            $_SESSION['HEADOFFICE_NAME']= $office['name'];
            header("location:/index.php");
            exit;
        } else{
            $msg = "Wrong Username Password";
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
