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
                    $subscriberId=$objMisc->GiveValues("MSO_ID='$data[0]' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUBSCRIBER_ID,FRANCHISE_ID','subscribers');
                    $rowArray=array('SUBSCRIBER_ID' =>$subscriberId,
                                    'AMOUNT'        =>$data[2],
                                );
                    $sno=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND MONTH(MONTH_DATE)='".date('m')."' AND YEAR(MONTH_DATE)='".date('Y')."'",'MAX(SNO)','monthly_charges')+1;
                    $receipt_no=$objMisc->getShortName($_SESSION['HEADOFFICE_NAME']).'/'.date('my').'/'.sprintf("%04d", $sno);
                    //$date=$objMisc->changeDateFormat($data[1]);
                    $date=date('Y-m-d');
                    $amount=$data[2];
                    $rowArray= array('HEADOFFICE_ID'         =>$_SESSION['HEADOFFICE'],
                                'FRANCHISE_ID'          =>$subscriberId['franchise_id'],
                                'SUBSCRIBER_ID'         =>$subscriberId['subscriber_id'],
                                'AMOUNT_TYPE'           =>'C',
                                'RECEIPT_NO'            =>$receipt_no,
                                'MANUAL_RECEIPT_NO'     =>$data[3],
                                'SNO'                   =>$sno,
                                'MONTH_DATE'            =>$date,
                                'AMOUNT'                =>$amount,
                                'REMARKS'               =>'Collection Date '.$data[5].' Mode of Payment '.$data[4].'Remarks '.$data[7],
                                'ADDED_BY'              =>$_SESSION['USER_ID'],
                                'ADDED_TIME'            =>date('Y-m-d H:i:s'));
                        $insertSetupBox=$objMisc->insert('monthly_charges',$rowArray);
                        
                       
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
