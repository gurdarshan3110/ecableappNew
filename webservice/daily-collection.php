<?php
require_once("helper.php");
    $from_date               =$_REQUEST['from_date'];
    $to_date               = $_REQUEST['to_date'];
    $emp_id             = $_REQUEST['employee_id'];
    //echo "SELECT SUM(AMOUNT)as AMT,SUM(SGST)as SGST,SUM(CGST)as CGST FROM `monthly_charges` WHERE AMOUNT_TYPE='C' AND STATUS='A' AND ADDED_BY='$emp_id' AND ADDED_BY_TYPE='E' AND `MONTH_DATE` BETWEEN '$from_date' AND '$to_date'";exit;
    $collection=$objMisc->getRowNew("SELECT SUM(AMOUNT)as AMT,SUM(SGST)as SGST,SUM(CGST)as CGST FROM `monthly_charges` WHERE AMOUNT_TYPE='C' AND STATUS='A' AND ADDED_BY='$emp_id' AND ADDED_BY_TYPE='E' AND `MONTH_DATE` BETWEEN '$from_date' AND '$to_date'");
    $total=array('amount_collected'=>round($collection['amt'],2),
                 'sgst'=>round($collection['sgst'],2),
                 'cgst'=>round($collection['cgst'],2));
    //echo "SELECT C.AMOUNT,C.SGST,C.CGST,C.MONTH_DATE,C.RECEIPT_NO,C.MANUAL_RECEIPT_NO,S.NAME,S.ADDRESS FROM `monthly_charges` C JOIN `subscribers` S ON S.SUBSCRIBER_ID=C.SUBSCRIBER_ID WHERE C.AMOUNT_TYPE='C' AND C.ADDED_BY='$emp_id' AND C.`MONTH_DATE` BETWEEN '$from_date' AND '$to_date'";
    $collectionData=$objMisc->getAllRecordsNew("SELECT C.AMOUNT,C.DISCOUNT,C.SGST,C.CGST,C.MONTH_DATE,C.RECEIPT_NO,C.MANUAL_RECEIPT_NO,S.NAME,S.ADDRESS,S.`CUSTOMER_ID`,S.`MSO_ID`,S.SUBSCRIBER_ID,S.FRANCHISE_ID FROM `monthly_charges` C JOIN `subscribers` S ON S.SUBSCRIBER_ID=C.SUBSCRIBER_ID WHERE C.AMOUNT_TYPE='C' AND C.STATUS='A' AND C.ADDED_BY='$emp_id' AND C.ADDED_BY_TYPE='E' AND C.`MONTH_DATE` BETWEEN '$from_date' AND '$to_date' ORDER BY C.`ID` DESC");             
    foreach($collectionData as $k =>$res){
        $data[]=array('Receipt_no' =>$res['receipt_no'],
                      'Manual_receipt_no' =>$res['manual_receipt_no'],
                      'customer_id' =>$res['customer_id'],
                      'mso_id' =>$res['mso_id'],
                      'receipt_date' =>$res['month_date'],
                      'subscriber_id' =>$res['subscriber_id'],
                      'franchise_id' =>$res['franchise_id'],
                      'subscriber' =>$res['name'],
                      'address' =>$res['address'],
                      'amount' =>round($res['amount'],2),
                      'discount' =>round($res['discount'],2),
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
            'msg'=>'No records found.'
          );
        echo json_encode($json);
        exit;
    }
?>
