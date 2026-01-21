<?php
require_once("helper.php");
    $date               = $_REQUEST['collection_date'];
    $subscriber_id      = $_REQUEST['subscriber_id'];
    $franchise_id       = $_REQUEST['franchise_id'];
    $headoffice_id      = $_REQUEST['headoffice_id'];
    $remarks            = $_REQUEST['remarks'];
    $action             = $_REQUEST['action'];
    $emp_id             = $_REQUEST['employee_id'];
    $balSmsCount=$sms->pending_sms($headoffice_id);
    $balSms=((empty($balSmsCount))?0:$balSmsCount);
    $billRates=$objMisc->GiveValues("HEADOFFICE_ID='$headoffice_id'",'(`RATE`)as ratee,RATE_SMS,CREDIT_AMOUNT','admin_collections');
    $billsGeneratedRate=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND AMOUNT_TYPE='C' AND AMOUNT!='0' AND STATUS='A'",'SUM(BILL_RATE)','monthly_charges');
    $billsGenerated=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND AMOUNT_TYPE='C' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' AND AMOUNT!='0'",'COUNT(*)','monthly_charges');
    $smsSent=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'COUNT(*)','sms_log');
    $smsSentRate=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'SUM(RATE_SMS)','sms_log');
    $totAmount=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'SUM(AMOUNT)','headoffice_recharge');
    $walletBal=$totAmount-$billsGeneratedRate-$smsSentRate;
    $canBill=(($walletBal<0 && abs($walletBal)>$billRates['credit_amount'])?'N':'Y');
    //print_r($billRates);
    if($canBill=='N'){
        $json= array(
                    'type'=>"0",
                    'err_desc'=>'Please Top Up your Wallet to continue Collections.',
                    'msg'=>'Please Top Up your Wallet to continue Collections.'
                  );
        echo json_encode($json);
        exit;
    }
    switch ($action) {
        case 'Bill';
            $amount             = $_REQUEST['amount'];
            //$cgst               = $_REQUEST['cgst'];
            //$sgst               = $_REQUEST['sgst'];
            
            $cgst = ($amount*18)/118/2;
            $sgst = ($amount*18)/118/2;
            $baseFare=$amount-$cgst-$sgst;
            $discount           = $_REQUEST['discount'];
            $remarks            = $_REQUEST['remarks'];
            $manual             = $_REQUEST['manual_receipt_no'];
            $emp_id             = $_REQUEST['employee_id'];
            $employeeId=$objMisc->GiveValue("USER_ID='$emp_id'",'ID','users');
            //echo "EMPLOYEE_ID='$employeeId'";
            $empStatus=$objMisc->GiveValue("EMPLOYEE_ID='$employeeId'",'STATUS','employees');
            
            if($empStatus=='A'){
                $packageName=$objMisc->GiveValueNew("SELECT P.NAME FROM `package_master` P JOIN stb_box S ON P.PACKAGE_ID=S.PACKAGE_ID WHERE S.SUBSCRIBER_ID='$subscriber_id'");

                $receipt=$objMisc->GiveValues("1=1 AND HEADOFFICE_ID='$headoffice_id' ORDER BY ID DESC LIMIT 1",'SNO,MANUAL_RECEIPT_NO','monthly_charges');
                $dateRec=((empty($date))?date('Y-m-d'):$date);
                /*$sno=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND MONTH(MONTH_DATE)='".date('m')."' AND YEAR(MONTH_DATE)='".date('Y')."' AND AMOUNT_TYPE='C'",'MAX(SNO)','monthly_charges')+1;
                
                $HEADOFFICE_NAME=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'NAME','headoffice_master');
                $receipt_no=$objMisc->getShortName($HEADOFFICE_NAME).'/'.date('my').'/'.sprintf("%04d", $sno);
                */
                $franchiseName=$objMisc->GiveValue("FRANCHISE_ID='$franchise_id'",'NAME','franchise_master');
                
                $currentMonth=date('m');
                $currentDate = date('Y').'-04-01';
                if($currentDate==date('Y-m-d')){
                    $sno=$objMisc->GiveValue("FRANCHISE_ID='$franchise_id' AND AMOUNT_TYPE='C' AND DATE(MONTH_DATE)='$currentDate'",'MAX(SNO)','monthly_charges')+1;
                    $startDate=(date('Y')-1).'-04-01';
                    $year=date('Y');
                    $endDate=date('Y-m').'-31';
                    $session=(date('y')-1).'-'.date('y');
                }else{
                    $startDate=(date('Y')-1).'-04-01';
                    $endDate=date('Y').'-03-31';
                    $session=date('y').'-'.(date('y')+1);
                    $sno=$objMisc->GiveValue("FRANCHISE_ID='$franchise_id' AND AMOUNT_TYPE='C'",'MAX(SNO)','monthly_charges')+1;
                }
                $receipt_no=substr($objMisc->getShortName($franchiseName),0,3).'/'.$session.'/'.sprintf("%04d", $sno);

                $rowArray       = array('HEADOFFICE_ID'         =>$headoffice_id,
                                        'SUBSCRIBER_ID'         =>$subscriber_id,
                                        'AMOUNT_TYPE'           =>'C',
                                        'SNO'                   =>$sno,
                                        'RECEIPT_NO'            =>$receipt_no,
                                        'MANUAL_RECEIPT_NO'     =>$manual,
                                        'DISCOUNT'              =>(($discount=='')?0:$discount),
                                        'REMARKS'               =>$remarks,
                                        'MONTH_DATE'            =>$dateRec,
                                        'AMOUNT'                =>$amount,
                                        'BILL_RATE'             =>$billRates['ratee'],
                                        'SGST'                  =>round($sgst,2),
                                        'FRANCHISE_ID'          =>$franchise_id,
                                        'CGST'                  =>round($cgst,2),
                                        'CLIENT_IP'             =>$_SERVER['REMOTE_ADDR'],
                                        //'CLIENT_MAC'            =>exec('getmac'),
                                        'ADDED_BY'              =>$emp_id,
                                        'ADDED_BY_TYPE'         =>'E',
                                        'ADDED_TIME'            =>date('Y-m-d H:i:s'));
                    //print_r($rowArray);exit;
                    $val            = $objMisc->insert('monthly_charges',$rowArray);
                    $val1            = $objMisc->insert('monthly_charges_dup',$rowArray);
                    $lastId=mysqli_insert_id($_SESSION['CONN']);
            }
            if(!empty($lastId)){
                $subscriberDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='D'",'SUM(AMOUNT)','monthly_charges');
                $subscriberCollec=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(AMOUNT)','monthly_charges');
                $subscriberDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(DISCOUNT)','monthly_charges');
                $amtBal=$subscriberDebit-($subscriberCollec+$subscriberDiscount);
                $franchiseName=$objMisc->GiveValue("FRANCHISE_ID='$franchise_id'",'NAME','franchise_master');
                $msg="Thanks for ".$franchiseName." subscription Rs ".$amount." against Vr. No. ".$receipt_no." Dated  ".$dateRec." And your balance is ".$amtBal;
                // if($balSms>0){
                //     $smsGroupId=$sms->max_sms_groupid($headoffice_id);
                //     $headOfcArr=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id'",'NAME','headoffice_master');
                //     
                    
                //     $subs=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$subscriber_id'");
                //     $smsCount=$sms->count_sms_parts($msg);
                //     $status=$sms->send_sms($subs['phone_no'],$msg,"Collection Comments");
                //     $smsArray = array(
                //         'HEADOFFICE_ID'      =>$headoffice_id,
                //         'SMS_GROUP_ID'       =>$smsGroupId,
                //         'SMS_TO'             =>$subs['subscriber_id'],
                //         'SEND_TO_TYPE'       =>'S',
                //         'MOBILE_NO'          =>$subs['phone_no'],
                //         'REQUEST_ID'         =>$status,
                //         'SMS_TEXT'           =>$msg,
                //         'MODULE_NAME'        =>"Collection Comments",
                //         'SMS_COUNT'          =>$smsCount,
                //         'RATE_SMS'           =>$billRates['rate_sms'],
                //         'STATUS'             =>'1',
                //         'ADDED_TIME'         => date('Y-m-d H:i:s')
                //         );
                //     $objMisc->insert('sms_log',$smsArray);
                // }
                $vle=$objMisc->getRow("franchise_master","FRANCHISE_ID='$franchise_id'");
                $subscriberPhoneNo=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id'",'PHONE_NO','subscribers');
                $json= array(
                        'type'=>"1",
                        'reciept_no'=>$receipt_no,
                        'manual_receipt_no'=>$manual,
                        'amount_collected'=>$amount,
                        'FRANCHISE_ID'        =>$vle['franchise_id'],
                        'NAME'                =>$vle['name'],
                        'PHONE_NO'            =>$vle['phone_no'],
                        'MOBILE_NO'           =>$vle['mobile_no'],
                        'GSTIN'               =>$vle['gstin'],
                        'ADDRESS'             =>$vle['address'],
                        'base_fare'       =>round($baseFare,2),
                        'package_name'=>$packageName,
                        'sms'=>$msg,
                        'sms_from'=>$vle['phone_no'],
                        'sms_to'=>$subscriberPhoneNo,
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
                    $franchisePhone=$objMisc->GiveValue("FRANCHISE_ID='$franchise_id'",'PHONE_NO','franchise_master');
                    $vle=$objMisc->getRow("franchise_master","FRANCHISE_ID='$franchise_id'");
                    $subscriberPhoneNo=$objMisc->GiveValue("SUBSCRIBER_ID='$subscriber_id'",'PHONE_NO','subscribers');
                    $remarks="Collection Agent visited at customer premises and found ".$remarks.". To avoid disconnection please contact your cable operator, Mob.".$franchisePhone."";
                    // if($balSms>0){
                        
                    //     $smsGroupId=$sms->max_sms_groupid($headoffice_id);
                    //     $subs=$objMisc->getRow('subscribers',"SUBSCRIBER_ID='$subscriber_id'");
                    //     $status=$sms->send_sms($subs['phone_no'],$remarks,"Collection Comments");
                    //     $smsCount=$sms->count_sms_parts($remarks);
                    //     $smsArray = array(
                    //         'HEADOFFICE_ID'      =>$headoffice_id,
                    //         'SMS_GROUP_ID'       =>$smsGroupId,
                    //         'SMS_TO'             =>$subs['subscriber_id'],
                    //         'SEND_TO_TYPE'       =>'S',
                    //         'MOBILE_NO'          =>$subs['phone_no'],
                    //         'REQUEST_ID'         =>$status,
                    //         'SMS_TEXT'           =>$remarks,
                    //         'MODULE_NAME'        =>"Collection Comments",
                    //         'SMS_COUNT'          =>$smsCount,
                    //         'RATE_SMS'           =>$billRates['rate_sms'],
                    //         'STATUS'             =>'1',
                    //         'ADDED_TIME'         => date('Y-m-d H:i:s')
                    //         );
                    //     $objMisc->insert('sms_log',$smsArray);
                    // }
                    $json= array(
                            'type'=>"1",
                            'sms'=>$remarks,
                            'sms_from'=>$vle['phone_no'],
                            'sms_to'=>$subscriberPhoneNo,
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
