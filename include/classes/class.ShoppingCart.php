<?php

class ShoppingCart extends BaseClass
{
	function ShoppingCart()
	{
		parent::__construct(); 
	}
	
	function addProduct($productId)
	{
		//$arrProduct = $productId;
		$_SESSION['cart'][] = $productId;
		return $_SESSION;
		//echo "test<pre>"; print_R($_SESSION);  
		
	}
	
	// fetch listing of Products shopping cart
	function fetchCartProducts($customer_randID){
		
		if($customer_randID != ''){
			$where.=" AND dblRandNo ='".$customer_randID."'";
		}
		
		$query = "SELECT intCartID,dblRandNo,intQuantity,dblPrice,intUserId,intProductID FROM tbl_TempCart WHERE 1=1 $where ";
		
		return $this->dbFunc->dbFetchAll($query);  
	}
	function sendHtmlmail($to,$from,$subject,$body,$bcc="", $attachments = '')
	{    	
		
	    $filename = $_SERVER['DOCUMENT_ROOT']."/admin/mail.htm"; 
		$fd = fopen ($filename, "r") or die("Couldn't open file");
		$message = fread ($fd, filesize ($filename));
		$message=str_replace("#HOST#",SECURE_SITE_URL,$message);
		$message=str_replace("#MSG#",$body,$message);   
		$message=str_replace("#CR#",date("Y"),$message);
		$message=addslashes($message);
		eval ("\$message = \"$message\";");
		$message=stripslashes($message);
		/* To send HTML mail, you can set the Content-type header. */
		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$headers .="From:".$from."< ".$from." >\n"; 
		$headers .= "BCC: ".$bcc."\r\n";
	    //print $message;
		mail($to, $subject, $message, $headers);		
		
	}
	
	//////////////// Cart Functions ///////////
	function check_Tempcart($productid,$tempcustomerid)
	{
		$sql = "SELECT * from tbl_TempCart WHERE intProductID=$productid and dblRandNo='".$tempcustomerid."'";
		return $this->dbFunc->dbFetchRow($sql);
	}

	function get_all_Tempcart_items($tempcustomerid)
	{
		$sql = "SELECT * from tbl_TempCart WHERE dblRandNo='".$tempcustomerid."'";
		return $this->dbFunc->dbFetchAll($sql);
	}

	function get_total_Tempcart_quantity($tempcustomerid)
	{
		$sql = "SELECT sum(intQuantity) from tbl_TempCart WHERE dblRandNo='".$tempcustomerid."'";
		return $this->dbFunc->dbFetchOne($sql);
	}
	function get_Randno_Tempcart($userId)
	{
		$sql = "SELECT dblRandNo from tbl_TempCart WHERE intUserId='".$userId."'";
		return $this->dbFunc->dbFetchOne($sql);
	}
	
	function insert_Tempcart($row)
	{
		$lastInsertId=$this->dbFunc->dbInsert("tbl_TempCart", $row);
		return $lastInsertId;
	}

	function update_Tempcart($set,$id)
	{
		$where = $this->dbObj->quoteInto('intCartID = ?', $id);
		return $rows_affected = $this->dbFunc->dbUpdate("tbl_TempCart", $set, $where);
	}

	function delete_Tempcart_Item($id)
	{
			$where = $this->dbObj->quoteInto('intCartID = ?', $id);
			$rows_affected = $this->dbFunc->dbDelete("tbl_TempCart", $where); 
			return $rows_affected;
	}
	function delete_TempcartItems($id)
	{
			$where = "dblRandNo = '$id'";
			$rows_affected = $this->dbFunc->dbDelete("tbl_TempCart", $where); 
			return $rows_affected;
	}

	function delete_Tempcart_MultiItems($ids)
	{
			$where = 'intCartID IN ('.$ids.')';
			$rows_affected = $this->dbFunc->dbDelete("tbl_TempCart", $where);
			return $rows_affected;
	}
	function getRow($table,$wherecondition)
	{
		$strSql = "SELECT * FROM $table WHERE $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	function get_Tempcart_row($cartid)
	{
		$str = "Select * from  tbl_TempCart where intCartID=$cartid";
		return $this->dbFunc->dbFetchRow($str);
	}
	function get_available_qty($productID)
	{
		$strSql = "SELECT intQuantity from tbl_Product where intProductID=$productID";
		$total_qty = $this->dbFunc->dbFetchOne($strSql);

		$strSql2 = "SELECT sum(intQuantity) from tbl_OrderDetail od, tbl_OrderMaster om where od.intProductID=$productID and od.intOrderID=om.intOrderID and om.enumComplete='P' ";
		$sold_qty = $this->dbFunc->dbFetchOne($strSql2);

		$balanced_qty = $total_qty-$sold_qty;
		return $balanced_qty;	
	}
	function getCalculatedPrice($customer_randID)
	{
		$arrCartInfo = $this->get_all_Tempcart_items($customer_randID);
		$arrcart = array();
		if(!empty($arrCartInfo))
		{		 
			$grantTotal = 0; $totalItems=0;
			foreach ($arrCartInfo as $key => $cartInfo)
			{ 
					$totalItems = $cartInfo['intquantity'] + $totalItems;
					$grantTotal = ($cartInfo['dblprice'] * $cartInfo['intquantity']) + $grantTotal;
			}
			$arrcart['totalItems'] = $totalItems; 
			$arrcart['totalPrize'] = $grantTotal;
		}
		return $arrcart;
		
	}
	
	function insert_CC_information($row)
	{
		$lastInsertId=$this->dbFunc->dbInsert("tbl_CCMaster", $row);
		return $lastInsertId;
	}
	function update_CC_information($set,$id)
	{
		$where = $this->dbObj->quoteInto('intOrderID = ?', $id);
		return $rows_affected = $this->dbFunc->dbUpdate("tbl_CCMaster", $set, $where);
	}
	function checkCCInfo($orderid)
	{
		$sql = "SELECT intCCID from tbl_CCMaster WHERE intOrderID='".$orderid."'";
		return $this->dbFunc->dbFetchOne($sql);
	}
	function insert_OrderDetails($row)
	{
		$lastInsertId=$this->dbFunc->dbInsert("tbl_OrderDetail", $row);
		return $lastInsertId;
	}
	
	function insert_OrderMaster($row)
	{
		$lastInsertId=$this->dbFunc->dbInsert("tbl_OrderMaster", $row);
		return $lastInsertId;
	}
	function insert_PaymentDetail($row)
	{
		$lastInsertId=$this->dbFunc->dbInsert("tbl_PaymentDetail", $row);
		return $lastInsertId;
	}
	function update_OrderUserDetail($set,$id)
	{
		$where = $this->dbObj->quoteInto('dblUserId = ?', $id);
		return $rows_affected = $this->dbFunc->dbUpdate("tbl_OrderUserDetail", $set, $where);
	}
	function update_PaymentDetail($set,$id)
	{
		$where = $this->dbObj->quoteInto('intOrderID = ?', $id);
		return $rows_affected = $this->dbFunc->dbUpdate("tbl_PaymentDetail", $set, $where);
	}
	function update_OrderMaster($set,$id)
	{
		$where = $this->dbObj->quoteInto('intOrderID = ?', $id);
		return $rows_affected = $this->dbFunc->dbUpdate("tbl_OrderMaster", $set, $where);
	}
	function insertOrderUser($arrUserInfo){
			$intUserId = $this->dbFunc->dbInsert("tbl_OrderUserDetail", $arrUserInfo);	
			return $intUserId;		
	}
	function fetcOrderUserInfo($intUserId){
			$query = "SELECT * FROM tbl_OrderUserDetail WHERE dblUserId='$intUserId' order by intOrderUserDetailID desc";
			$userInfo = $this->dbFunc->dbFetchRow($query);
			return $userInfo;
	}
	function fetcOrderDetail($orderid)
	{
		$sql = "SELECT * from tbl_OrderDetail WHERE intOrderID='".$orderid."'";
		return $this->dbFunc->dbFetchAll($sql);
	}
	function fetcOrderStatus($orderid)
	{
		$sql = "SELECT * from tbl_OrderMaster WHERE intOrderID='".$orderid."'";
		return $this->dbFunc->dbFetchRow($sql);
	}
	function getOrderUserInfo($orderid){
			$query = "SELECT * FROM tbl_OrderUserDetail WHERE intOrderID='$orderid' order by intOrderUserDetailID desc";
			$userInfo = $this->dbFunc->dbFetchRow($query);
			return $userInfo;
	}
	function deleteOrderUserDetail($date)
	{
			$where = "enumOrderStatus = 'N' and DATE(dtAdded) < '$date'";
			$rows_affected = $this->dbFunc->dbDelete("tbl_OrderUserDetail", $where);
			return $rows_affected;
	}
	function deleteOrderCurrentUserDetail($userId)
	{
			$where = "enumOrderStatus = 'N' and intUserId = '$userId'";
			$rows_affected = $this->dbFunc->dbDelete("tbl_OrderUserDetail", $where);
			return $rows_affected;
	}

	function getCategoryId($id)
	{
		$strSql = "SELECT intCategoryID FROM tbl_Product Where intProductID = '$id'";
		return $this->dbFunc->dbFetchOne($strSql);
	}

	function getCategoryFakeUrl($id)
	{
		$strSql = "SELECT vchFakeUrl FROM tbl_Category Where intCategoryID = '$id'";
		return $this->dbFunc->dbFetchOne($strSql);
	}
	
	function getEnumType($id){
		$sql = "select enumDeliveryOption from tbl_OrderUserDetail where dblUserId='$id'";
		return $this->dbFunc->dbFetchOne($sql);
	}
	
}	

?>