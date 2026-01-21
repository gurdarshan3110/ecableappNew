<?php
require_once("helper.php");
    $subject             = $_REQUEST['subject'];
    $message             = $_REQUEST['message'];
    $complaintDate       = $_REQUEST['complaint_date'];
    $subscriber_id       = $_REQUEST['subscriber_id'];
    $subArea=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id'",'UNIT_ID','subscribers');
    $rowArray=array('SUBJECT'   =>$subject,
                    'MESSAGE'   =>$message,
                    'UNIT_ID'   =>$subArea,
                    'COMPLAINT_DATE'   =>$complaintDate,
                    'SUBSCRIBER_ID'   =>$subscriber_id,
                    'ADDED_TIME'   =>date('Y-m-d H:i:s'));
    $insert=$objMisc->insert('complaint_master',$rowArray);
    $lastId=mysqli_insert_id($_SESSION['CONN']);
    if(!empty($lastId)){
        
        $json= array(
                'type'=>"1",
                'msg'=>'success');
        echo json_encode($json);
        exit;
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Problem occured',
            'msg'=>'failed'
          );
        echo json_encode($json);
        exit;
    }
?>
