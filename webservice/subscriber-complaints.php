<?php
require_once("helper.php");
    $subscriber_id             = $_REQUEST['subscriber_id'];
    //echo "SELECT * FROM `monthly_charges` WHERE SUBSCRIBER_ID='$subscriber_id' ORDER BY `ID` ASC";
    $collection=$objMisc->getAllRecordsNew("SELECT * FROM `complaint_master` WHERE SUBSCRIBER_ID='$subscriber_id' ORDER BY `COMPLAINT_ID` DESC");
    foreach($collection as $k =>$res){
        $data[]=array('complaint_date'=>$res['complaint_date'],
                      'status'=>$res['status'],
                      'subject'=>$res['subject'],
                      'message'=>$res['message'],
                      'complaint_id'=>$res['complaint_id']);
        $k++;
    }
    if($data){
        $json= array(
                'type'=>"1",
                'data'=>$data,
                'msg'=>'success');
        echo json_encode($json);
        exit;
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Problem occured',
            'msg'=>'Problem during data retrieval'
          );
        echo json_encode($json);
        exit;
    }
?>
