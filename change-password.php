<?php
require_once('helper.php');
$msg        =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id = base64_decode($_GET['id']);

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
		$this->xajax->registerFunction("sel_Area");
	}
}
$objMisc = new myCms();
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;
$paging_params="&par=".$_GET['par'];
$objMisc->paging_params=$paging_params;
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['update'])){
	$old_password       = $_POST['old_password'];
    $new_password        = $_POST['password'];
    $confirm_password        = $_POST['confirm_password'];
	if($new_password!=$old_password){
        $correctPass=$objMisc->GiveValue("USER_ID='$_SESSION[USER_ID]' AND USER_TYPE='$_SESSION[USER_TYPE]'",'PASSWORD','users');
        if($old_password==$correctPass){
            $rowArray=array('PASSWORD'  =>$new_password);
        	$update=$objMisc->update("users",$rowArray,"USER_ID='$_SESSION[USER_ID]'");
            $_SESSION['msg']=1;
            header("LOCATION:change-password.php");
            exit;
        }else{
            $_SESSION['msg']=2;
            header("LOCATION:change-password.php");
            exit;
        }
    }else{
        $_SESSION['msg']=3;
        header("LOCATION:change-password.php");
        exit;
    }
}

$wherecon=" 1=1 AND USER_ID='$_SESSION[USER_ID]'";
$rowArray=$objMisc->getRow("users",$wherecon);
$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
	case 1:
		$msg = "Password changed successfully.";
    break;
    case 2:
		$msg = "";
        $errormsg = "Please enter correct Old Password.";
    break;
    case 3:
    	$msg = "";
		$errormsg = "New Password And Confirm password should be same.";
    break;
}
$smartyVars['group']        =   $id;
$smartyVars['errormsg']     =   $errormsg;
$smartyVars['add']          =   $add;
$smartyVars['resRow']       =   $rowArray;
$smartyVars['pageheading']  =   $pageheading;
$smartyVars['classData']    =   $pagin_recs;
$smartyVars['msg']          =   $msg;
$smartyVars['page']         =   $_REQUEST['page'];
$objMisc->displayPage("header,change-password,footer",$smartyVars);   

?>
