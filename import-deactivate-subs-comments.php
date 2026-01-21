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
    if(!empty($_GET['attachment'])){
        $fileName="uploads/".$_GET['attachment'];
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

                        $subId=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND `MSO_ID`='$data[0]'",'SUBSCRIBER_ID','subscribers');
                        if($data[4]!='-' || $data[4]!=''){
                            $stbNo=$data[4];
                            $subscriptionId=$objMisc->GiveValue(" HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND `STB_NO`='$stbNo'",'SUBSCRIPTION_ID','subscriptions');
                            if(empty($subscriptionId)){
                                $stbArray=array('STB_NO'    =>$stbNo,
                                                'STATUS'    =>'A',
                                                'AVAILABILITY'  =>'B',
                                                'REMARKS'=>$data[3].(($data[2]!='')?' Deactivated on '.$data[2]:''),
                                                'HEADOFFICE_ID' => $_SESSION['HEADOFFICE'],
                                                'ADDED_TIME'    =>date('Y-m-d H:i:s'));
                                $val=$objMisc->insert('subscriptions',$stbArray);
                                $subscriptionId=mysqli_insert_id($_SESSION['CONN']);
                            }
                            $stbId=$objMisc->GiveValue("SUBSCRIBER_ID='$subId' AND SUBSCRIPTION_ID='$subscriptionId'",'STB_ID','stb_box');
                            if(empty($stbId)){
                                $stbIdArray=array('SUBSCRIBER_ID'    =>$subId,
                                                  'STATUS'           =>'D',
                                                  'HEADOFFICE_ID' => $_SESSION['HEADOFFICE'],
                                                  'SUBSCRIPTION_ID'  =>$subscriptionId,
                                                  'REMARKS'          =>$data[3].(($data[2]!='')?' Deactivated on '.$data[2]:''),
                                                  'ADDED_TIME'    =>date('Y-m-d H:i:s'));
                                $val=$objMisc->insert('stb_box',$stbIdArray);
                                $stbId=mysqli_insert_id($_SESSION['CONN']);
                            }
                            $rowArray = array(
                                                'SUBSCRIBER_ID' => $subId,
                                                'HEADOFFICE_ID' => $_SESSION['HEADOFFICE'],
                                                'SUBSCRIPTION_ID'=>$subscriptionId,
                                                'REMARKS'=>$data[3].(($data[2]!='')?' Deactivated on '.$data[2]:''),
                                                'ADDED_TIME'=>date('Y-m-d H:i:s')
                                            );
                            $objMisc->insert("subscriber_history",$rowArray);
                        }
                        echo '<br>';
                        /*if($area=='' && ($data[1]!='' || $data[1]!=0)){
                            $areaArray = array( 'HEADOFFICE_ID'           =>$_SESSION['HEADOFFICE'],
                                                'NAME'              =>addslashes($data[1]),
                                                'ADDED_BY'          =>'1',
                                                'ADDED_TIME'        =>date('Y-m-d H:i:s'),
                                                );
                            $insertLang=$objMisc->insert('wing_master',$areaArray);
                            $area=mysqli_insert_id($_SESSION['CONN']);
                        }*/

                    }
            }
            echo 'Done';
        } 
    }else{
        echo 'Failed';
    }

?>
