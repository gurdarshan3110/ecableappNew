<?php
require_once("helper.php");
    $from_date               =$_REQUEST['from_date'];
    $to_date               = $_REQUEST['to_date'];
    $emp_id             = $_REQUEST['employee_id'];
    $collection=$objMisc->getRowNew("SELECT SUM(AMOUNT)as AMT,SUM(SGST)as SGST,SUM(CGST)as CGST FROM `monthly_charges` WHERE AMOUNT_TYPE='C' AND ADDED_BY='$emp_id' AND `MONTH_DATE` BETWEEN '$from_date' AND '$to_date'");
    $total=array('amount_collected'=>round($collection['amt'],2),
                 'sgst'=>round($collection['sgst'],2),
                 'cgst'=>round($collection['cgst'],2));
    //echo "SELECT C.AMOUNT,C.SGST,C.CGST,C.MONTH_DATE,C.RECEIPT_NO,C.MANUAL_RECEIPT_NO,S.NAME,S.ADDRESS FROM `monthly_charges` C JOIN `subscribers` S ON S.SUBSCRIBER_ID=C.SUBSCRIBER_ID WHERE C.AMOUNT_TYPE='C' AND C.ADDED_BY='$emp_id' AND C.`MONTH_DATE` BETWEEN '$from_date' AND '$to_date'";
    $collectionData=$objMisc->getAllRecordsNew("SELECT C.AMOUNT,C.SGST,C.CGST,C.MONTH_DATE,C.RECEIPT_NO,C.MANUAL_RECEIPT_NO,S.NAME,S.ADDRESS FROM `monthly_charges` C JOIN `subscribers` S ON S.SUBSCRIBER_ID=C.SUBSCRIBER_ID WHERE C.AMOUNT_TYPE='C' AND C.ADDED_BY='$emp_id' AND C.`MONTH_DATE` BETWEEN '$from_date' AND '$to_date'");             
    foreach($collectionData as $k =>$res){
        $data[]=array('Receipt_no' =>$res['receipt_no'],
                      'Manual_receipt_no' =>$res['manual_receipt_no'],
                      'receipt_date' =>$res['month_date'],
                      'subscriber' =>$res['name'],
                      'address' =>$res['address'],
                      'amount' =>round($res['amount'],2),
                      'sgst' =>round($res['sgst'],2),
                      'cgst' =>round($res['cgst'],2));
        $k++;
    }
    if(!empty($total) && !empty($data)){
        
        $json= array(
                'type'=>"1",
                'total'=>$total,
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
