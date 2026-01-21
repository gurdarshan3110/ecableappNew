<?php
require_once("helper.php");
    $subscriber_id             = $_REQUEST['subscriber_id'];
    $headoffice_id             = $_REQUEST['headoffice_id'];
    $subData=$objMisc->getAllRecordsNew("SELECT * FROM subscriber_history WHERE SUBSCRIBER_ID='$subscriber_id' AND HEADOFFICE_ID='$headoffice_id' ORDER BY HISTORY_ID DESC");            
    foreach($subData as $k =>$res){
        $data[]=array('history_id' =>$res['history_id'],
                      'remarks' =>$res['remarks'],
                      'added_time' =>$res['added_time'],
                      'added_time_formated' =>date('d M,Y H:iA',strtotime($rowRec['added_time']))
                    );
        $k++;
    }
    if(!empty($data)){
        
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
