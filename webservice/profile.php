<?php
require_once("helper.php");
    $subscriber_id      = $_REQUEST['subscriber_id'];
    $headoffice_id      = $_REQUEST['headoffice_id'];
    $email              = $_REQUEST['email'];
    $phone_no           = $_REQUEST['phone_no'];
    $bool      = false;
    /*$file_name = 'ecableapp'.date("Gis",time()).basename($_FILES['file']['name']);
    if (move_uploaded_file($_FILES['file']['tmp_name'], './uploads/'.$file_name)) { 
        $bool  = true; 
    }*/
    if(!empty($subscriber_id)){
        $where="SUBSCRIBER_ID='$subscriber_id' AND HEADOFFICE_ID='$headoffice_id'";
        $rowarray=array('EMAIL'             =>$email,
                        'PHONE_NO'          =>$phone_no);
        $update=$objMisc->update('subscribers',$rowarray,$where);
        if($update){
            $json = array(
                'type'  => "1",
                'msg'   => 'record updated successfully.'
            );
            echo json_encode($json);
            exit;
        }else{
            $json = array(
                'type'  => "0",
                'msg'   => 'failed.'
            );
            echo json_encode($json);
            exit;
        }
    }else{
        $json = array(
                'type'  => "0",
                'msg'   => 'Failed.'
            );
        echo json_encode($json);
        exit;
    }   
?>