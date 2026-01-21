<?php
require_once("helper.php");
    $subscriber_id             = $_REQUEST['subscriber_id'];
    //echo "SELECT * FROM `monthly_charges` WHERE SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' ORDER BY `ID` ASC";exit;
    $collection=$objMisc->getAllRecordsNew("SELECT * FROM `monthly_charges` WHERE SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' ORDER BY `ID` ASC");
    //print_r($collection);exit;
    foreach($collection as $k =>$res){
    	if($res['amount_type']=='D'){
    	    $debit=$debit+$res['amount'];
    	}else{
    	    $credit=$credit+$res['amount'];
    	}
    	$balance=$debit-$credit;
        $data[]=array('Month'=>date('M',strtotime($res['month_date'])),
                      'Year'=>date('Y',strtotime($res['month_date'])), 
                      'month_date'=>date('d M,Y',strtotime($res['month_date'])),
                      'amount_type'=>$res['amount_type'],
                      'amount'=>$res['amount'],
                      'balance'=>$balance,
                      'cgst'=>$res['cgst'],
                      'sgst'=>$res['sgst'],
                      'receipt_no'=>$res['receipt_no']);
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
