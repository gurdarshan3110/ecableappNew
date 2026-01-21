<?php
require_once("helper.php");
    $employee_id             = $_REQUEST['employee_id'];
    $unit_id                 = explode(',',$_REQUEST['unit_id']);
    $and='';
    $i=1;
    foreach ($unit_id as $k => $val) {
        if($i==1){
            $and.="UNIT_ID='".$unit_id[$k]."'";
        }else{
            $and.=" OR UNIT_ID='".$unit_id[$k]."'";
        } 
        $i++;
    }
    $collection=$objMisc->getAllRecordsNew("SELECT * FROM `complaint_master` WHERE 1=1 AND ($and) ORDER BY `COMPLAINT_ID` DESC");
    foreach($collection as $k =>$res){
        $data[]=array('complaint_date'=>date('d M,Y',strtotime($res['complaint_date'])),
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
