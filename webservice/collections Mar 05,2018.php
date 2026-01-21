<?php
require_once("helper.php");
    $date               = $_REQUEST['collection_date'];
    $subscriber_id      = $_REQUEST['subscriber_id'];
    $headoffice_id      = $_REQUEST['headoffice_id'];
    $amount             = $_REQUEST['amount'];
    //$cgst               = $_REQUEST['cgst'];
    //$sgst               = $_REQUEST['sgst'];
    $cgst = ($amount*18)/118/2;
    $sgst = ($amount*18)/118/2;
    $discount           = $_REQUEST['discount'];
    $remarks            = $_REQUEST['remarks'];
    $manual             = $_REQUEST['manual_receipt_no'];
    $emp_id             = $_REQUEST['employee_id'];
    $packageName=$objMisc->GiveValueNew("SELECT P.NAME FROM `package_master` P JOIN stb_box S ON P.PACKAGE_ID=S.PACKAGE_ID WHERE S.SUBSCRIBER_ID='$subscriber_id'");
    $receipt_no = $objMisc->GiveValue(" HEADOFFICE_ID='$headoffice_id' ORDER BY ID DESC LIMIT 1",'RECEIPT_NO','monthly_charges');
    if(empty($receipt_no)){
        $receipt='000001';
    }else{
        $receipt=sprintf("%06d", $receipt_no+1);;
    }
    $rowArray       = array('HEADOFFICE_ID'         =>$headoffice_id,
                            'SUBSCRIBER_ID'         =>$subscriber_id,
                            'AMOUNT_TYPE'           =>'C',
                            'RECEIPT_NO'            =>$receipt,
                            'MANUAL_RECEIPT_NO'     =>$manual,
                            'DISCOUNT'              =>$discount,
                            'REMARKS'               =>$remarks,
                            'MONTH_DATE'            =>((empty($date))?date('Y-m-d'):$date),
                            'AMOUNT'                =>$amount,
                            'SGST'                  =>$sgst,
                            'CGST'                  =>$cgst,
                            'ADDED_BY'              =>$emp_id,
                            'ADDED_TIME'            =>date('Y-m-d H:i:s'));
        //print_r($rowArray);exit;
        $val            = $objMisc->insert('monthly_charges',$rowArray);
        if(!empty($val)){
            $subscriberDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
            $subscriberCollec=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
            $amtBal=$subscriberDebit-$subscriberCollec;
            $json= array(
                    'type'=>"1",
                    'reciept_no'=>$receipt,
                    'manual_receipt_no'=>$manual,
                    'amount_collected'=>$amount,
                    'package_name'=>$packageName,
                    'cgst_collected'=>round($cgst,2),
                    'sgst_collected'=>round($sgst,2),
                    'balance'=>round($amtBal,2),
                    'msg'=>'success');
            echo json_encode($json);
            exit;
        }else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'Problem during insertion',
                'msg'=>'Problem during insertion'
              );
            echo json_encode($json);
            exit;
        }
?>
