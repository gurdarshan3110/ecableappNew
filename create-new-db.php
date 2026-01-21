<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");

$msg    =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id     = base64_decode($_GET['id']);
class myCms extends Cms 
{
    function registerAjaxFunctions()
    {
        $this->xajax->registerFunction("get_Listing");
        $this->xajax->registerFunction("update_status");
        $this->xajax->registerFunction("deleteRow");
        $this->xajax->registerFunction("editMode");
        $this->xajax->registerFunction("sorting");
        $this->xajax->registerFunction("sortTitle");
    }
}
$objMisc = new myCms();
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;
$id=$_SESSION['HEADOFFICE'];
$sql="CREATE TABLE IF NOT EXISTS `complaint_master$id` (
					  `COMPLAINT_ID` int(11) NOT NULL,
					  `SUBJECT` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					  `MESSAGE` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					  `COMPLAINT_TYPE` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					  `STATUS` enum('O','P','C') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'O',
					  `COMPLAINT_DATE` date NOT NULL,
					  `SUBSCRIBER_ID` int(11) NOT NULL,
					  `UNIT_ID` int(11) NOT NULL,
					  `ADDED_TIME` datetime DEFAULT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_BY_TYPE` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL
					) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
$res=mysql_query($sql);
echo 'Complaint Master Created<br>';
$sql1="CREATE TABLE IF NOT EXISTS `employees$id` (
					  `EMPLOYEE_ID` int(11) NOT NULL,
					  `USER_ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `NAME` varchar(250) NOT NULL,
					  `USERNAME` varchar(255) NOT NULL,
					  `PASSWORD` varchar(255) NOT NULL,
					  `ADDRESS` varchar(500) NOT NULL,
					  `PHONE_NO` varchar(25) NOT NULL,
					  `MOBILE_NO` varchar(15) NOT NULL,
					  `BASIC_SALARY` varchar(100) NOT NULL,
					  `JOINING_DATE` date NOT NULL,
					  `EMPLOYEE_TYPE` enum('E','A') NOT NULL,
					  `REMARKS` varchar(500) NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_BY_TYPE` varchar(55) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_BY_TYPE` varchar(55) NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql1);
echo 'Employees Created<br>';
$sql2="CREATE TABLE IF NOT EXISTS `headoffice_master$id` (
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `USER_ID` int(11) NOT NULL,
					  `NAME` varchar(500) NOT NULL,
					  `ADDRESS` varchar(255) NOT NULL,
					  `GSTIN` varchar(255) NOT NULL,
					  `MOBILE_NO` varchar(100) NOT NULL,
					  `COLLECTION_AGENTS` int(11) NOT NULL,
					  `DESCRIPTION` varchar(500) NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_BY_TYPE` varchar(50) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_BY_TYPE` varchar(50) NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql2);
echo 'Headoffice Master Created<br>';
$sql3="CREATE TABLE IF NOT EXISTS `monthly_charges$id` (
					  `ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `SUBSCRIBER_ID` int(11) NOT NULL,
					  `AMOUNT_TYPE` enum('D','C') NOT NULL,
					  `AMOUNT` varchar(55) NOT NULL,
					  `SERVICE_TAX_NO` varchar(255) NOT NULL,
					  `PAN` varchar(255) NOT NULL,
					  `CIN` varchar(255) NOT NULL,
					  `BILLING_CYCLE` varchar(255) NOT NULL,
					  `CGST` varchar(10) NOT NULL,
					  `SGST` varchar(10) NOT NULL,
					  `KRISHI_CESS` varchar(10) NOT NULL,
					  `SPECIAL_REMARKS` varchar(255) NOT NULL,
					  `RECEIPT_NO` varchar(255) NOT NULL,
					  `MANUAL_RECEIPT_NO` varchar(255) NOT NULL,
					  `DISCOUNT` varchar(255) NOT NULL,
					  `REMARKS` varchar(255) NOT NULL,
					  `MONTH_DATE` date NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY_TYPE` varchar(55) NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_BY_TYPE` varchar(55) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql3);
echo 'Monthly Charges Created<br>';
$sql4="CREATE TABLE IF NOT EXISTS `package_master$id` (
					  `PACKAGE_ID` int(11) NOT NULL,
					  `USER_ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `NAME` varchar(500) NOT NULL,
					  `PARENT_CHARGES` varchar(50) NOT NULL,
					  `CHILD_CHARGES` varchar(50) NOT NULL,
					  `REMARKS` varchar(500) NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY_TYPE` varchar(50) NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL,
					  `UPDATED_BY_TYPE` varchar(50) NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql4);
echo 'Package Master Created<br>';
$sql5="CREATE TABLE IF NOT EXISTS `stb_box$id` (
					  `STB_ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `SUBSCRIBER_ID` int(11) NOT NULL,
					  `SUBSCRIPTION_ID` int(11) NOT NULL,
					  `PACKAGE_ID` int(11) NOT NULL,
					  `PACKAGE_TYPE` enum('P','C') NOT NULL,
					  `SECURITY` varchar(255) NOT NULL,
					  `INSTALLATION` varchar(255) NOT NULL,
					  `TYPE_ID` varchar(255) NOT NULL,
					  `ID_NO` varchar(255) NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `REMARKS` varchar(255) NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql5);
echo 'Stb Box Created<br>';
$sql6="CREATE TABLE IF NOT EXISTS `subscribers$id` (
					  `SUBSCRIBER_ID` int(11) NOT NULL,
					  `CUSTOMER_ID` varchar(255) NOT NULL,
					  `MSO_ID` varchar(255) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `UNIT_ID` int(11) NOT NULL,
					  `PACKAGE_ID` int(11) NOT NULL,
					  `EMPLOYEE_ID` int(11) NOT NULL,
					  `NAME` varchar(500) NOT NULL,
					  `ADDRESS` varchar(500) NOT NULL,
					  `USERNAME` varchar(55) NOT NULL,
					  `PASSWORD` varchar(255) NOT NULL,
					  `PHONE_NO` varchar(25) NOT NULL,
					  `MOBILE_NO` varchar(25) NOT NULL,
					  `CONNECTION_DATE` date NOT NULL,
					  `REMARKS` varchar(255) NOT NULL,
					  `PAYMENT_TYPE` enum('M','Q','H','Y') NOT NULL,
					  `PAYMENT_METHOD` enum('L','P') NOT NULL,
					  `ACTUAL_AMOUNT` varchar(55) NOT NULL,
					  `DISCOUNT` varchar(55) NOT NULL,
					  `AMOUNT` varchar(55) NOT NULL,
					  `OPENING_BALANCE` varchar(55) NOT NULL,
					  `RELATION` enum('S/O','D/O','W/O') NOT NULL,
					  `RELATIVE` varchar(255) NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql6);
echo 'Subscribers Created<br>';
$sql7="CREATE TABLE IF NOT EXISTS `subscriptions$id` (
					  `SUBSCRIPTION_ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `CARTON_NO` varchar(55) NOT NULL,
					  `STB_NO` varchar(100) NOT NULL,
					  `VC_NO` varchar(100) NOT NULL,
					  `SAF_NO` varchar(100) NOT NULL,
					  `MAC_NO` varchar(100) NOT NULL,
					  `MODEL` varchar(100) NOT NULL,
					  `AVAILABILITY` enum('AV','B') NOT NULL DEFAULT 'B',
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY_TYPE` varchar(50) NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql7);
echo 'Subscription Created<br>';
$sql8="CREATE TABLE IF NOT EXISTS `unit_master$id` (
					  `UNIT_ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `WING_ID` int(11) NOT NULL,
					  `NAME` varchar(500) NOT NULL,
					  `DESCRIPTION` varchar(500) NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_BY_TYPE` varchar(50) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_BY_TYPE` varchar(50) NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql8);
echo 'Unit Master Created<br>';
$sql9="CREATE TABLE IF NOT EXISTS `users$id` (
					  `USER_ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `USERNAME` varchar(255) NOT NULL,
					  `PASSWORD` varchar(55) NOT NULL,
					  `USER_TYPE` enum('A','E','S','SP') NOT NULL DEFAULT 'S',
					  `ID` int(11) NOT NULL,
					  `IMEI` varchar(255) NOT NULL,
					  `PERMISSIONS` text NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY_TYPE` varchar(55) NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_BY_TYPE` varchar(55) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql9);
echo 'User Created<br>';
$sql10="CREATE TABLE IF NOT EXISTS `wing_master$id` (
					  `WING_ID` int(11) NOT NULL,
					  `USER_ID` int(11) NOT NULL,
					  `HEADOFFICE_ID` int(11) NOT NULL,
					  `NAME` varchar(500) NOT NULL,
					  `DESCRIPTION` varchar(500) NOT NULL,
					  `STATUS` enum('A','D') NOT NULL,
					  `ADDED_TIME` datetime NOT NULL,
					  `ADDED_BY` int(11) NOT NULL,
					  `ADDED_BY_TYPE` varchar(50) NOT NULL,
					  `UPDATED_TIME` datetime NOT NULL,
					  `UPDATED_BY` int(11) NOT NULL,
					  `UPDATED_BY_TYPE` varchar(50) NOT NULL
					) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$res=mysql_query($sql10);
echo 'Area Master Created<br>';
$sql11="ALTER TABLE `complaint_master$id`
  ADD PRIMARY KEY (`COMPLAINT_ID`);

ALTER TABLE `employees$id`
  ADD PRIMARY KEY (`EMPLOYEE_ID`);

ALTER TABLE `headoffice_master$id`
  ADD PRIMARY KEY (`HEADOFFICE_ID`);

ALTER TABLE `monthly_charges$id`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `package_master$id`
  ADD PRIMARY KEY (`PACKAGE_ID`);

ALTER TABLE `stb_box$id`
  ADD PRIMARY KEY (`STB_ID`);

ALTER TABLE `subscribers$id`
  ADD PRIMARY KEY (`SUBSCRIBER_ID`);

ALTER TABLE `subscriptions$id`
  ADD PRIMARY KEY (`SUBSCRIPTION_ID`);

ALTER TABLE `unit_master$id`
  ADD PRIMARY KEY (`UNIT_ID`),
  ADD KEY `WING_ID` (`WING_ID`);

ALTER TABLE `users$id`
  ADD PRIMARY KEY (`USER_ID`);

ALTER TABLE `wing_master$id`
  ADD PRIMARY KEY (`WING_ID`),
  ADD KEY `HEADOFFICE_ID` (`HEADOFFICE_ID`);

ALTER TABLE `complaint_master$id`
  MODIFY `COMPLAINT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `employees$id`
  MODIFY `EMPLOYEE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `headoffice_master$id`
  MODIFY `HEADOFFICE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `monthly_charges$id`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `package_master$id`
  MODIFY `PACKAGE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `stb_box$id`
  MODIFY `STB_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `subscribers$id`
  MODIFY `SUBSCRIBER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `subscriptions$id`
  MODIFY `SUBSCRIPTION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `unit_master$id`
  MODIFY `UNIT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `users$id`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `wing_master$id`
  MODIFY `WING_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `unit_master$id`
  ADD CONSTRAINT `unit_master$id_ibfk_1` FOREIGN KEY (`WING_ID`) REFERENCES `wing_master$id` (`WING_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `wing_master$id`
  ADD CONSTRAINT `wing_master$id_ibfk_1` FOREIGN KEY (`HEADOFFICE_ID`) REFERENCES `headoffice_master$id` (`HEADOFFICE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;";
  $res=mysql_query($sql11);
echo 'Databased created Successfully.';

?>
