<?php
require_once("helper.php");
    $date               = $_REQUEST['collection_date'];
    $subscriber_id      = $_REQUEST['subscriber_id'];
    $headoffice_id      = $_REQUEST['headoffice_id'];
    $remarks            = $_REQUEST['remarks'];
    $action             = $_REQUEST['action'];
    $emp_id             = $_REQUEST['employee_id'];
    $balSmsCount=$sms->pending_sms($headoffice_id);
    $balSms=((empty($balSmsCount))?0:$balSmsCount);
    switch ($action) {
        case 'Bill';
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
            $receipt=$objMisc->GiveValues("1=1 ORDER BY ID DESC LIMIT 1",'SNO,MANUAL_RECEIPT_NO','monthly_charges');
            $sno=$receipt['sno']+1;
            $HEADOFFICE_NAME=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'NAME','headoffice_master');
            $receipt_no=$objMisc->getShortName($HEADOFFICE_NAME).'/'.date('my').'/'.sprintf("%04d", $sno+1);
            $rowArray       = array('HEADOFFICE_ID'         =>$headoffice_id,
                                    'SUBSCRIBER_ID'         =>$subscriber_id,
                                    'AMOUNT_TYPE'           =>'C',
                                    'SNO'                   =>$sno,
                                    'RECEIPT_NO'            =>$receipt_no,
                                    'MANUAL_RECEIPT_NO'     =>$manual,
                                    'DISCOUNT'              =>$discount,
                                    'REMARKS'               =>$remarks,
                                    'MONTH_DATE'            =>((empty($date))?date('Y-m-d'):$date),
                                    'AMOUNT'                =>$amount,
                                    'SGST'                  =>$sgst,
                                    'CGST'                  =>$cgst,
                                    'ADDED_BY'              =>$emp_id,
                                    'ADDED_BY_TYPE'         =>'E',
                                    'ADDED_TIME'            =>date('Y-m-d H:i:s'));
                //print_r($rowArray);exit;
                $val            = $objMisc->insert('monthly_charges',$rowArray);
                $lastId=mysqli_insert_id($_SESSION['CONN']);
                if(!empty($lastId)){
                    if($balSms>0){
                        $smsGroupId=$sms->max_sms_groupid($headoffice_id);
                        $headOfcArr=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'NAME','headoffice_master');
                        $msg="Payment of Rs ".$amount." has been recieved for connection of ".$headOfcArr;
                        $subs=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$subscriber_id'");
                        $smsCount=$sms->count_sms_parts($msg);
                        $status=$sms->send_sms($subs['phone_no'],$msg,"Collection Comments");
                        $smsArray = array(
                            'HEADOFFICE_ID'      =>$headoffice_id,
                            'SMS_GROUP_ID'       =>$smsGroupId,
                            'SMS_TO'             =>$subs['subscriber_id'],
                            'SEND_TO_TYPE'       =>'S',
                            'MOBILE_NO'          =>$subs['phone_no'],
                            'REQUEST_ID'         =>$status,
                            'SMS_TEXT'           =>$msg,
                            'MODULE_NAME'        =>"Collection Comments",
                            'SMS_COUNT'          =>$smsCount,
                            'STATUS'             =>'1',
                            'ADDED_TIME'         => date('Y-m-d H:i:s')
                            );
                        $objMisc->insert('sms_log',$smsArray);
                    }
                    $subscriberDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
                    $subscriberCollec=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
                    $amtBal=$subscriberDebit-$subscriberCollec;
                    $json= array(
                            'type'=>"1",
                            'reciept_no'=>$receipt_no,
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
            break;
        case 'Comment';
            $rowArray       = array('HEADOFFICE_ID'         =>$headoffice_id,
                                    'SUBSCRIBER_ID'         =>$subscriber_id,
                                    'REMARKS'               =>$remarks,
                                    'ADDED_BY'              =>$emp_id,
                                    'ADDED_TIME'            =>date('Y-m-d H:i:s'));
                //print_r($rowArray);exit;
                $val            = $objMisc->insert('subscriber_history',$rowArray);
                $lastId=mysqli_insert_id($_SESSION['CONN']);
                if(!empty($lastId)){
                    if($balSms>0){
                        $smsGroupId=$sms->max_sms_groupid($headoffice_id);
                        $subs=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$subscriber_id'");
                        $status=$sms->send_sms($subs['phone_no'],$remarks,"Collection Comments");
                        $smsCount=$sms->count_sms_parts($remarks);
                        $smsArray = array(
                            'HEADOFFICE_ID'      =>$headoffice_id,
                            'SMS_GROUP_ID'       =>$smsGroupId,
                            'SMS_TO'             =>$subs['subscriber_id'],
                            'SEND_TO_TYPE'       =>'S',
                            'MOBILE_NO'          =>$subs['phone_no'],
                            'REQUEST_ID'         =>$status,
                            'SMS_TEXT'           =>$remarks,
                            'MODULE_NAME'        =>"Collection Comments",
                            'SMS_COUNT'          =>$smsCount,
                            'STATUS'             =>'1',
                            'ADDED_TIME'         => date('Y-m-d H:i:s')
                            );
                        $objMisc->insert('sms_log',$smsArray);
                    }
                    $json= array(
                            'type'=>"1",
                            'msg'=>'comment added successfully.');
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
            break;
    }
   
?>
