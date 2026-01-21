<?php 
require_once('helper.php');
$id=$_GET['id'];
$sqlWhere=" ID='$id'";
$sql=$objMisc->getRow('monthly_charges',$sqlWhere);
$client=$objMisc->getRow('subscribers'," SUBSCRIBER_ID='$sql[subscriber_id]'");
$packageId=$objMisc->GiveValue(" SUBSCRIBER_ID='$sql[subscriber_id]'",'PACKAGE_ID','stb_box');
$package=$objMisc->GiveValue(" PACKAGE_ID='$packageId'",'NAME','package_master');
$headOfc=$objMisc->getRow('headoffice_master',"HEADOFFICE_ID='$_SESSION[HEADOFFICE]'");
?>
<page orientation="portrait" backtop="4mm" backbottom="10mm" backleft="7mm" backright="10mm">
	<table border="0" cellspacing="0" cellpadding="0" style="width:710px;margin-bottom:10px;">
		<tr>
			<td><img src="images/logo.png" style="width:120px;"></td>
		</tr>
		<tr>
			<td style="text-align:center;width:710px;font-size:18px;font-weight:bold;">Receipt<br><br></td>
		</tr>
	</table>
	<table border="0.175" cellspacing="0" cellpadding="0" style="width:710px;">
		<tr>
			<td rowspan="3" style="width:321px;padding:5px 5px;">
				<b><?php echo $headOfc['name']?></b><br>
				<?php echo $headOfc['address']?><br>
				Email <?php echo $headOfc['email']?><br>
				Ph. No. <?php echo $headOfc['mobile_no']?><br>
			</td>
			<td style="width:155px;padding:5px 5px;">Receipt No<br><?php echo (($sql['manual_receipt_no']=='')?$sql['receipt_no']:$sql['manual_receipt_no']);?></td>
			<td style="width:155px;padding:5px 5px;">Receipt Date<br><?php echo $objMisc->dateFormat($sql['month_date']);?></td>
		</tr>
		<tr>
			<td style="padding:5px 5px;">GST No.</td>
			<td style="padding:5px 5px;"><?php echo $headOfc['gstin'];?></td>
		</tr>
		<tr>
			<td colspan="2" style="width:321px;padding:5px 5px;">
				<b>Client’s Detail:</b><br>
				<?php echo $client['name'];?><br>
				<?php echo $client['address'];?> 
			</td>
		</tr>
		<tr>
			<td colspan="3" style="padding:5px 5px;"><?php echo $sql['remarks'];?></td>
		</tr>
	</table>
	<table border="0.175" cellspacing="0" cellpadding="0" style="width:710px;">
		<tr>
			<td style="width:65px;font-weight:bold;text-align:center;">S.No.</td>
			<td style="width:385px;font-weight:bold;text-align:center;">Details</td>
			<td style="width:112px;font-weight:bold;text-align:center;">Debit (INR)</td>
			<td style="width:112px;font-weight:bold;text-align:center;">Credit (INR)</td>
		</tr>
		<?php
		$boxes=$objMisc->getAllRecordsNew("SELECT P.NAME,S.STB_NO,C.AMOUNT FROM `monthly_charges` C JOIN `stb_box` B ON B.`STB_ID`=C.STB_ID JOIN `package_master` P ON P.PACKAGE_ID=B.PACKAGE_ID JOIN `subscriptions` S ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE C.SUBSCRIBER_ID='$sql[subscriber_id]' AND C.AMOUNT_TYPE='D' AND MONTH(C.MONTH_DATE)=MONTH('$sql[month_date]') AND YEAR(C.MONTH_DATE)=YEAR('$sql[month_date]')");
		$i=1;
		foreach ($boxes as $e => $res) {
			?>
			<tr>
				<td style="padding:5px;"><?php echo $i;?></td>
				<td style="padding:5px;"><?php echo ucwords($res['name']).' For STB No ('.strtoupper($res['stb_no']).')';?></td>
				<td style="text-align:right;padding:5px;"><?php echo round($res['amount'],2);?></td>
				<td style="text-align:right;padding:5px;">&nbsp;</td>
			</tr>
			<?php
			$totAmt=$totAmt+$res['amount'];
			$i++;
		}
		?>
		<?php 
			$previousMonthDebit=$objMisc->GiveValue("SUBSCRIBER_ID='$sql[subscriber_id]' AND AMOUNT_TYPE='D' AND STATUS='A' AND `ID`<='$id'",'SUM(AMOUNT)','monthly_charges');
			$previousMonthCredit=$objMisc->GiveValue("SUBSCRIBER_ID='$sql[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A' AND `ID`<='$id'",'SUM(AMOUNT)','monthly_charges');
			$previousMonthDiscount=$objMisc->GiveValue("SUBSCRIBER_ID='$sql[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A' AND `ID`<='$id'",'SUM(DISCOUNT)','monthly_charges');
			$previousBalance=$previousMonthDebit-($previousMonthCredit-$sql['amount']-$previousMonthDiscount);
			if($previousBalance!=0){
		?>
		<!-- <tr>
			<td style="padding:5px;"><?php echo $i;?></td>
			<td style="padding:5px;">Previous Balance</td>
			<td style="text-align:right;padding:5px;">&nbsp;</td>
			<td style="text-align:right;padding:5px;"><?php echo round($previousBalance,2);?></td>
		</tr> -->
		<?php
			}
		?>
		<tr>
			<td style="padding:5px;"></td>
			<td style="padding:5px;">Receipt Amount</td>
			<td style="text-align:right;padding:5px;">&nbsp;</td>
			<td style="text-align:right;padding:5px;"><?php echo round($sql['amount'],2);?></td>
		</tr>
		<tr>
			<td style="padding:5px;"></td>
			<td style="padding:5px;">Discount</td>
			<td style="text-align:right;padding:5px;">&nbsp;</td>
			<td style="text-align:right;padding:5px;"><?php echo round($sql['discount'],2);?></td>
		</tr>
		<tr>
			<td style="padding:5px;"></td>
			<td style="padding:5px;">Balance</td>
			<td style="text-align:right;padding:5px;"><?php echo round($totAmt);?></td>
			<td style="text-align:right;padding:5px;"><?php echo round($previousMonthDebit-$previousMonthCredit-$sql['discount'],2);?></td>
		</tr>
		
	</table>
</page>
