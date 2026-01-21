<?php
require_once("helper.php");
    $complaint_id        = $_REQUEST['complaint_id'];
    $status              = $_REQUEST['status'];
    $employee_id         = $_REQUEST['employee_id'];
    $employee_type       = $_REQUEST['employee_type'];
    $where="COMPLAINT_ID='$complaint_id'";
    $rowArray=array('STATUS'   =>$status,
                    'UPDATED_BY'   =>$employee_id,
                    'UPDATED_BY_TYPE'   =>$employee_type,
                    'UPDATED_TIME'   =>date('Y-m-d H:i:s'));
    $insert=$objMisc->update('complaint_master',$rowArray,$where);
    //$lastId=mysqli_insert_id($_SESSION['CONN']);
    if(!empty($insert)){
        
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
