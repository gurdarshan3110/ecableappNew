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

                    $subscription=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STB_NO='$data[1]'",'SUBSCRIPTION_ID','subscriptions');
                    if($subscription=='' && ($data[1]!='' || $data[1]!=0)){
                        $subscriptionArray = array( 'HEADOFFICE_ID'          =>$_SESSION['HEADOFFICE'],
                                                    'STB_NO'        =>addslashes($data[1]),
                                                    'CARTON_NO'     =>addslashes($data[0]),
                                                    'VC_NO'         =>addslashes($data[2]),
                                                    'SAF_NO'        =>addslashes($data[3]),
                                                    'MAC_NO'        =>addslashes($data[4]),
                                                    'MODEL'         =>addslashes($data[5]),
                                                    'AVAILABILITY'  =>'B',
                                                    'ADDED_BY'      =>$_SESSION['USER_ID'],
                                                    'ADDED_TIME'    =>date('Y-m-d H:i:s'),
                                                    );
                        $insertSubscription=$objMisc->insert('subscriptions',$subscriptionArray);
                        $subscription=mysqli_insert_id($_SESSION['CONN']);
                    }
                    $package_id=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND PACKAGE_TYPE='P' AND NAME='$data[16]'",'PACKAGE_ID','package_master');
                    if($package_id=='' && ($data[15]!='' || $data[15]!=0)){
                        $packageArray = array( 'HEADOFFICE_ID'  =>$_SESSION['HEADOFFICE'],
                                            'NAME'              =>addslashes($data[16]),
                                            'PARENT_CHARGES'    =>$data[15],
                                            'PACKAGE_TYPE'      =>'P',
                                            'ADDED_BY'          =>$_SESSION['USER_ID'],
                                            'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                            );
                        $insertPackage=$objMisc->insert('package_master',$packageArray);
                        $package_id=mysqli_insert_id($_SESSION['CONN']);
                    }
                    if ($data[6]!='') {
                        $subscriberId=$objMisc->GiveValue("MSO_ID='$data[6]' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUBSCRIBER_ID','subscribers');
                        /*$laCarteId=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND PACKAGE_TYPE='L' AND NAME='$data[18]'",'PACKAGE_ID','package_master');
                        if($laCarteId=='' && ($data[18]!='' || $data[18]!=0)){
                            $packageArray = array( 'HEADOFFICE_ID'  =>$_SESSION['HEADOFFICE'],
                                                'NAME'              =>addslashes($data[18]),
                                                'PARENT_CHARGES'    =>$data[17],
                                                'PACKAGE_TYPE'      =>'L',
                                                'ADDED_BY'          =>$_SESSION['USER_ID'],
                                                'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                );
                            $insertPackage=$objMisc->insert('package_master',$packageArray);
                            $laCarteId=mysqli_insert_id($_SESSION['CONN']);
                        }*/
                        $setupBoxArray = array(     'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                    'SUBSCRIPTION_ID'  =>$subscription,
                                                    'SUBSCRIBER_ID'    =>$subscriberId,
                                                    'PACKAGE_ID'       =>$package_id,
                                                    'LA_CARTE_NAME'    =>$data[18],
                                                    'LA_CARTE_AMOUNT'  =>$data[17],
                                                    'ID_NO'            =>$data[8],
                                                    'IDENTITY_NAME'    =>$data[9],
                                                    'RELATION'         =>$data[10],
                                                    'RELATIVE'         =>$data[11],
                                                    'INSTALLED_BY'     =>$data[12],
                                                    'INSTALLATION_FEES'=>$data[13],
                                                    'JOINING_DATE'     =>$data[14],
                                                    'TYPE_ID'          =>$data[7],
                                                    'ADDED_BY'         =>'1',
                                                    'STATUS'           =>(($data[19]=='D')?'D':'A'),
                                                    'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                    );
                        $insertSetupBox=$objMisc->insert('stb_box',$setupBoxArray);
                        $SetupBox=mysqli_insert_id($_SESSION['CONN']);
                    }
                       
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
