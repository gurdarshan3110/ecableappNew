<?php
$addl_path ="";
if(DIR_NAME=='ajax' || DIR_NAME=='Webservice')
$addl_path ="../";

ini_set("display_errors",0);
require_once $addl_path ."include/common.php";  
class Cms extends BaseClass
{
	/* Constructor for the class */
	function Cms()
	{
		parent::__construct();
	}

	/*function for auto generate password*/
	function rand_string($length) 
	{
		$chars = "0123456789";
		return substr(str_shuffle($chars),0,$length);
	}
	
	
	function pageImgContent($content)
	{
		$content = preg_replace('/<img(.*?)src=(\'|")(.*?)(\'|")(.*?)>/ims', "<img rel='prettyPhoto[mg]' class='fckimg' style='cursor:pointer' href='thumbcms.php?img=$3&h=520&w=650' $1 src=\"thumbcms.php?img=$3&h=200&w=200\"$4$5>", $content);

		return $content;	
	}
    
	
    /* Find a String between two strings */
    function get_string_between($string, $start, $end){
		$string = " ".$string;
		$ini = strpos($string,$start);
		if ($ini == 0) return "";
		$ini += strlen($start);
		$len = strpos($string,$end,$ini) - $ini;
		return substr($string,$ini,$len);
	}

	function save_image($imageName,$fname,$dir,$watermarker=""){		
		if(isset($_FILES[$fname]["error"]))
		{
			if ($_FILES[$fname]["error"] == UPLOAD_ERR_OK)
			{
				$str=$_FILES[$fname]['name'];
	
				$the_file = $_FILES[$fname]["tmp_name"];
	            
				$to_file = ROOT_PATH."$dir/$imageName";
                $to_file_thumb = ROOT_PATH."$dir/thumb/$imageName";
				$thumbto_file = ROOT_PATH.$dir."/thumb_".$imageName;
				 
				move_uploaded_file($the_file, $to_file) or die('unable to upload');
				$this->make_thumb($to_file, $to_file_thumb,"92","60");	


				if (!empty($watermarker))
				{
					/** Water marking */
					$logo_file = "http://".$_SERVER['HTTP_HOST']."/images/logo.png";
					$image_file = $to_file;
					$targetfile = $to_file;
					$photo = imagecreatefromjpeg($image_file);
					$fotoW = imagesx($photo);
					$fotoH = imagesy($photo);
					
					$logoImage = imagecreatefrompng($logo_file);
					$logoW = imagesx($logoImage);
					$logoH = imagesy($logoImage);
					$photoFrame = imagecreatetruecolor($fotoW,$fotoH);
					$dest_x = $fotoW - ($logoW + 10);
					$dest_y = $fotoH - ($logoH + 10);
					
					imagecopyresampled($photoFrame, $photo, 0, 0, 0, 0, $fotoW, $fotoH, $fotoW, $fotoH);
					imagecopy($photoFrame, $logoImage, $dest_x, $dest_y, 0, 0, $logoW, $logoH);
					imagejpeg($photoFrame, $targetfile);
				}

				chmod($to_file, 0777);
			}
		}
	}
    function array_column(array $input, $columnKey, $indexKey = null) {
        $array = array();
        foreach ($input as $value) {
            $array[] = $value[$columnKey];
        }
        return $array;
    }
    
	function save_image1($imageName,$fname,$dir,$watermarker="")
	{		
		if(isset($_FILES[$fname]["error"]))
		{
			if ($_FILES[$fname]["error"] == UPLOAD_ERR_OK)
			{
				$str=$_FILES[$fname]['name'];
	
				$the_file = $_FILES[$fname]["tmp_name"];
	            
				$to_file = ROOT_PATH."$dir/$imageName";
                $to_file_thumb = ROOT_PATH.$dir."/thumb/".$imageName;
				$thumbto_file = ROOT_PATH.$dir."/thumb_".$imageName;
				$the_file."--".$to_file; 
				move_uploaded_file($the_file, $to_file) or die('unable to upload');
				$this->make_thumb($to_file, $to_file_thumb,"80","80");	


				if (!empty($watermarker))
				{
					/** Water marking */
					$logo_file = "http://".$_SERVER['HTTP_HOST']."/images/logo.png";
					$image_file = $to_file;
					$targetfile = $to_file;
					$photo = imagecreatefromjpeg($image_file);
					$fotoW = imagesx($photo);
					$fotoH = imagesy($photo);
					
					$logoImage = imagecreatefrompng($logo_file);
					$logoW = imagesx($logoImage);
					$logoH = imagesy($logoImage);
					$photoFrame = imagecreatetruecolor($fotoW,$fotoH);
					$dest_x = $fotoW - ($logoW + 10);
					$dest_y = $fotoH - ($logoH + 10);
					
					imagecopyresampled($photoFrame, $photo, 0, 0, 0, 0, $fotoW, $fotoH, $fotoW, $fotoH);
					imagecopy($photoFrame, $logoImage, $dest_x, $dest_y, 0, 0, $logoW, $logoH);
					imagejpeg($photoFrame, $targetfile);
				}

				chmod($to_file, 0777);
			}
		}
	}
	
	
	//function make_thumb($source,$destination,$width,$height)
	function make_thumb($source,$destination,$height,$width)
	{
		 $sim=$this->create_image_from($source);
		 //$sim = $source;
		 $srcW=imagesx($sim);
		 $srcH=imagesy($sim);
		 
			$ratio=$srcW/$srcH;
			if($srcW >= $srcH){
				 $width=($srcW > $width)?$width:$srcW;
				 $height=(($width/$ratio)>$height)?$height:($width/$ratio);
				 $width=$height*$ratio;
			} else{
				 $height=($srcH > $height)?$height:$srcH;
				 $width=(($height*$ratio)>$width)?$width:($height*$ratio);
				 $height=$width/$ratio;
			}

			$dim = imagecreatetruecolor($width, $height);
			imagecopyresized($dim,$sim,0,0,0,0,$width,$height,$srcW,$srcH);
			$this->output_image_to($dim,$destination,$source);
	}

	function create_image_from($source)
	{
		$source1=str_replace ("gif","png", $source);
		$size=getimagesize($source);
		
		switch ($size[2]){
			case 1: $im=ImageCreateFromGIF($source); break;
			case 2: $im=ImageCreateFromJPEG($source); break;
			case 3: $im=ImageCreateFromPNG($source); break;
			case 6: $im=ImageCreateFromWBMP($source); break;
			default:$im=ImageCreateFromJPEG($source); break;
		}
		return $im;
	}

	function output_image_to($dim,$destination,$source)
	{
		$size=getimagesize($source);
		
		switch ($size[2]){
			case 1: imagejpeg($dim,$destination); break;
			case 2: imagejpeg($dim,$destination); break;
			case 3: imagepng($dim,$destination); break;
			case 6: imagewbmp($dim,$destination); break;
			default:imagejpeg($dim,$destination); break;
		}	 
	}

	
	
	/* --------Common Functions-------- */  
	
	function GiveValue($wherecondition,$fields,$tablename){
	    $strSql = " select $fields from $tablename where $wherecondition"; 
		return $this->dbFunc->dbFetchOne($strSql);	
	}
	
    function GiveValues($wherecondition,$fields,$tablename){
	    $strSql = " select $fields from $tablename where $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	
	function GiveValuesDev($wherecondition,$fields,$tablename){
	    $strSql = " select $fields from $tablename where $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	
    function GiveValueNew($strSql){
        //$strSql = " select $fields from $tablename where $wherecondition";
        return $this->dbFunc->dbFetchOne($strSql);
    } 
	
	function getRow($table,$wherecondition){
		$strSql = "SELECT * FROM $table WHERE $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	
    function getRowNew($strSql){
		//$strSql = "SELECT * FROM $table WHERE $wherecondition";
		
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	
	function getRowQuery($strSql){
		$strSql = "SELECT * FROM $table WHERE $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	
	function insert($table,$set){
		return $this->dbFunc->dbInsert($table,$set);
	}
	
	
    /* ----Only for development to echo query---- */
    function insertDev($table,$set){
		return $this->dbFunc->dbInsertDev($table,$set);
	}
	
	function update($table,$set,$where){
		 $this->dbFunc->dbUpdate($table, $set, $where);
		 return 1;
	}
	function updateDev($table,$set,$where){
		 $this->dbFunc->dbUpdateDev($table, $set, $where);
		 return 1;
	}
	
	function delete($table,$where) {
		$rows_affected = $this->dbFunc->dbDelete($table, $where);
		return $rows_affected;
	}
	
	function getAllRecords($fields,$table,$where){
	    $strSql = "SELECT $fields FROM $table WHERE $where";
		return $this->dbFunc->dbFetchAll($strSql);
	}
	
    function getAllRecordsNew($strSql) {
	    //$strSql = "SELECT $fields FROM $table WHERE $where";
		return $this->dbFunc->dbFetchAll($strSql);
	}
	
	function getAllRecordsPaging($fields,$table,$where) {
		$strSql = "SELECT $fields FROM $table WHERE $where ";
		return $this->dbFunc->dbFetchAll_page($strSql,$this->rec_pp,$this->paging_params);
	}
	
    function getAllRecordsPagingNew($strSql) {
		//$strSql = "SELECT $fields FROM $table WHERE $where ";
		return $this->dbFunc->dbFetchAll_page($strSql,$this->rec_pp,$this->paging_params);
	}
	
	function getUserName($userid) {
		$strSql = $this->getRowNew("SELECT `ID`,`USER_TYPE` FROM `users` WHERE `USER_ID` = $userid");
		if($strSql['user_type']=='A'){
			return 'Admin';
		}else{
			return $this->GiveValue("EMPLOYEE_ID='$strSql[id]'",'NAME','employees');
		}
	}
	
	function trunc($phrase, $max_words){
		$phrase_array = explode(' ',$phrase);
		if(count($phrase_array) > $max_words && $max_words > 0)
		$phrase = implode(' ',array_slice($phrase_array, 0, $max_words)).'...';  
		return $phrase;
	}
	
	function addSlashTrim($value){
		$finalValue = trim(addslahes($value));
		return $finalValue;
	}
	
	function professional__web_urls($urls){
        $url_address = stripslashes(trim($urls));
        $http_type = preg_match("'^https://'is",$url_address);
        if ($http_type == 1){
            $http_typo = 'https://';
            $web_url = preg_replace("'^https://'is", "", $url_address);
        } else {
            $http_typo = 'http://';
            $web_url = preg_replace("'^http://'is", "", $url_address);
        }
        $website_address = $http_typo.$web_url;
        return $website_address;
    }
	
	
	/* ----To Make Date Format---- */
    function changeDateFormat ($date){  
	    if(!empty($date)){   
			$userDate = str_replace('/','-',$date);
			$newdate = date("Y-m-d", strtotime($userDate) );
			return $newdate;
        } 
	}
	
    function changeNullZero ($input){  
	    if(!empty($input)){   
    	   return $input;
        } else {
            return '0';
        }
	}
	
    function changeNullString ($input){  
	    if(!empty($input)){   
    	   return $input;
        } else {
            return '';
        }
	}
	
    function dateFormat ($date){
	    if(!empty($date)){
    		$newdate=date("d M, Y", strtotime($date) );
        	return $newdate;
        } else {
            return '';
        }
	}
	
	function dayNamedateFormat ($date){
		$newdate=date("l M d", strtotime($date) );
    	return $newdate;
	}
	
	function dayNamedateFormat_year ($date){
		$newdate=date("l M d, Y", strtotime($date) );
    	return $newdate;
	}
	
	
	/* ----To Make Time Format---- */
	function updateTime($time){
		
		$ext = end((explode(":", $time)));
		$ap = substr($ext,2);
		$th = substr($time,0);
		$tm = substr($time,2);
		
		if($ap=='pm'){
			$th+=12;

			if($th==24){
				$th = 12;
			}
		}
		if($ap=='am'){
			if($th==12){
				$th = '00';
			}
		}
		$newtime = $th.":".$tm;
		return $newtime;
	}
	
	
	/* ----To Make Currency Format---- */
	function amt_Format ($amt){
		setlocale(LC_MONETARY, 'en_IN');
		$amount = money_format('%!i', $amt);

    	return $amount;
	}
	
	
	/* ----Function for calculate Days Difference---- */
	function daysDifference($endDate, $beginDate){
   		//explode the date by "-" and storing to array
   		$date_parts1=explode("-", $beginDate);
   		$date_parts2=explode("-", $endDate);
   		//gregoriantojd() Converts a Gregorian date to Julian Day Count
   		$start_date=gregoriantojd($date_parts1[1], $date_parts1[2], $date_parts1[0]);
   		$end_date=gregoriantojd($date_parts2[1], $date_parts2[2], $date_parts2[0]);
   		return $end_date - $start_date;
	}
	function calAdvamount($headofficeId){
		//$having='HAVING totdebit-(totcredit+totdiscount)<0';
		$wherethis = " 1=1 AND HEADOFFICE_ID='$headofficeId' AND STATUS='A' GROUP BY SUBSCRIBER_ID ORDER BY `SERIAL_NO` ASC";
		//echo "SELECT SUBSCRIBER_ID,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=SUBSCRIBER_ID AND AMOUNT_TYPE='D' AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totcredit FROM `subscribers` WHERE $wherethis";exit;
		$classRecord = $this->getAllRecordsNew("SELECT SUBSCRIBER_ID,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=`subscribers`.SUBSCRIBER_ID AND AMOUNT_TYPE='D' AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=`subscribers`.SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=`subscribers`.SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totcredit FROM `subscribers` WHERE $wherethis");
		$amount=0;

		foreach ($classRecord as $e => $val) {
			$bal=$val['totdebit']-($val['totcredit']+$val['totdiscount']);
			$amount=(($bal<0)?$amount+abs($bal):$amount);
		}
		return $amount;
	}
	function calSubsPngAmount($headofficeId,$subscriber_id){
		$totDue=$this->GiveValue("SUBSCRIBER_ID='$subscriber_id' AND HEADOFFICE_ID='$headofficeId' AND AMOUNT_TYPE='D' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');
		$totCollections=$this->GiveValue("SUBSCRIBER_ID='$subscriber_id' AND HEADOFFICE_ID='$headofficeId' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');
		$totDiscount=$this->GiveValue("SUBSCRIBER_ID='$subscriber_id' AND HEADOFFICE_ID='$headofficeId' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(DISCOUNT)','monthly_charges');
		return $totDue-$totCollections-$totDiscount;
	}
	function calSubsAdvamount($headofficeId,$subscriber_id){
		//$having='HAVING totdebit-(totcredit+totdiscount)<0';
		$wherethis = " 1=1 AND HEADOFFICE_ID='$headofficeId' AND SUBSCRIBER_ID='$subscriber_id' AND STATUS='A' GROUP BY SUBSCRIBER_ID ORDER BY `SERIAL_NO` ASC";
		//echo "SELECT SUBSCRIBER_ID,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=SUBSCRIBER_ID AND AMOUNT_TYPE='D' AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totcredit FROM `subscribers` WHERE $wherethis";exit;
		$classRecord = $this->getAllRecordsNew("SELECT SUBSCRIBER_ID,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE SUBSCRIBER_ID=`subscribers`.SUBSCRIBER_ID AND AMOUNT_TYPE='D' AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdebit,(SELECT IFNULL(SUM(DISCOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=`subscribers`.SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totdiscount,(SELECT IFNULL(SUM(AMOUNT),0) FROM monthly_charges WHERE AMOUNT_TYPE='C' AND SUBSCRIBER_ID=`subscribers`.SUBSCRIBER_ID AND STATUS='A' AND HEADOFFICE_ID='$headofficeId')as totcredit FROM `subscribers` WHERE $wherethis");
		$amount=0;

		foreach ($classRecord as $e => $val) {
			$bal=$val['totdebit']-($val['totcredit']+$val['totdiscount']);
			$amount=(($bal<0)?$amount+abs($bal):$amount);
		}
		return $amount;
	}
	
	function smoothdate ($year, $month, $day){
    	return sprintf ('%04d', $year) . sprintf ('%02d', $month) . sprintf ('%02d', $day);
	}
		
	function date_difference ($first, $second){
    	$month_lengths = array (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    	$retval = FALSE;

    	if(checkdate($first['month'], $first['day'], $first['year']) && checkdate($second['month'], $second['day'], $second['year']))
		{
        	$start = $this->smoothdate ($first['year'], $first['month'], $first['day']);
        	$target = $this->smoothdate ($second['year'], $second['month'], $second['day']);
                            
        	if ($start <= $target){
            	$add_year = 0;
            	while ($this->smoothdate ($first['year']+ 1, $first['month'], $first['day']) <= $target)
            	{
                	$add_year++;
	               	$first['year']++;
            	}
 
            	$add_month = 0;
            	while ($this->smoothdate ($first['year'], $first['month'] + 1, $first['day']) <= $target)
            	{
                	$add_month++;
                	$first['month']++;
                
                	if ($first['month'] > 12){
        	            $first['year']++;
    	                $first['month'] = 1;
	                }
            	}
       
            	$add_day = 0;
            	while ($this->smoothdate ($first['year'], $first['month'], $first['day'] + 1) <= $target)
            	{
                	if (($first['year'] % 100 == 0) && ($first['year'] % 400 == 0)){
	                    $month_lengths[1] = 29;
                	}else{
                    	if ($first['year'] % 4 == 0){
	                        $month_lengths[1] = 29;
                    	}
                	}
                
                	$add_day++;
                	$first['day']++;
                	if ($first['day'] > $month_lengths[$first['month'] - 1])
                	{
                    	$first['month']++;
                    	$first['day'] = 1;
                    
                    	if ($first['month'] > 12){
                        	$first['month'] = 1;
                    	}
                	}
            	}
          
            	$retval = array ('years' => $add_year, 'months' => $add_month, 'days' => $add_day);
        	}
    	}
                 
    	return $retval;
	}

	function UplaodImg($filename,$dirname,$watermarker=""){
		$uni=rand(100, 100000);
		$uploaded_file = "";
		if (isset($_FILES[$filename]['name']))
		{	
			$main_image = "BSS_".$uni.'_'.$_FILES[$filename]['name'];	
		
			if(isset($_FILES[$filename]["error"]))
			{
				if ($_FILES[$filename]["error"] == UPLOAD_ERR_OK){
					$image_Info_Arr=getimagesize($_FILES[$filename]['tmp_name']);
				}
				
				if(($_GET['msg']!='4')&&($_FILES[$filename]['tmp_name']!="")){
					global $addl_path;
					$dir = $dirname;
					//print_R($_FILES);echo $dir."--".$main_image;exit;
					$this->save_image($main_image,"$filename",$dir,$watermarker);
					$uploaded_file=$main_image;
					//$filesize = $_FILES['vchMainImage']['size'];
					//$row['vchSize1'] =  round($filesize/1000).' KB';
				}
			}
		}
		return $uploaded_file;
	}
	
	function UplaodImg1($filename,$dirname,$watermarker=""){
		$uni=rand(100, 100000);
		$uploaded_file = "";
		if (isset($_FILES[$filename]['name']))
		{	
			$main_image = "BSS_".$uni.'_'.$_FILES[$filename]['name'];	
		
			if(isset($_FILES[$filename]["error"]))
			{
				if ($_FILES[$filename]["error"] == UPLOAD_ERR_OK){
					$image_Info_Arr=getimagesize($_FILES[$filename]['tmp_name']);
				}
				
				if(($_GET['msg']!='4')&&($_FILES[$filename]['tmp_name']!=""))
				{
					global $addl_path;
					$dir = $dirname;
					//print_R($_FILES);echo $dir."--".$main_image;exit;
					$this->save_image1($main_image,"$filename",$dir,$watermarker);
					$uploaded_file=$main_image;
					//$filesize = $_FILES['vchMainImage']['size'];
					//$row['vchSize1'] =  round($filesize/1000).' KB';
				}
			}
		}
		return $uploaded_file;
	}
	
	function sendHtmlmail($to,$from,$subject,$body,$bcc="", $attachments = ''){   
	    $filename = $_SERVER['DOCUMENT_ROOT']."/mail.htm"; 
		$fd = fopen ($filename, "r") or die("Couldn't open file");
		$message = fread ($fd, filesize ($filename));
		$message=str_replace("#HOST#",SECURE_SITE_URL,$message);
		$message=str_replace("#BODY#",$body,$message);   
		$message=str_replace("#CR#",date("Y"),$message);
		$message=addslashes($message);
		eval ("\$message = \"$message\";");
		$message=stripslashes($message);
		
		/* To send HTML mail, you can set the Content-type header. */
		$headers  = "MIME-Version: 1.0\n";
		$headers .= "Content-type: text/html; charset=iso-8859-1\n";
		$headers .="From:".$from."< ".$from." >\n"; 
		//$headers .= "BCC: Inderpreet Kaur<inderpreet.kaur@redalkemi.com>\n";
		$headers .= "BCC: ".$bcc."\n";
	    //print $message;
		mail($to, $subject, $message, $headers);
	}
	
	/* -----Search Function----- */
	function getSearchInfo($keyWord){
		$strSql = "SELECT * FROM tblPageMaster pm left join tblContentMaster cm on (pm.intPageID=cm.intPageID)  WHERE (pm.vchPageName LIKE '%".$keyWord."%' or cm.txtContent like '%".$keyWord."%') and pm.enumStatus='A' order by pm.intSequence asc";
		return $this->dbFunc->dbFetchAll_page($strSql,$this->rec_pp,$this->paging_params);
	}
	
    function clean($string) {
		$string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

		return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
	}
	
	/* Function use to change the width height of youtube embeded code */
	function resizeMarkup($markup, $dimensions){
        $w = $dimensions['width'];
        $h = $dimensions['height'];
       
        $patterns = array();
        $replacements = array();
        if(!empty($w)){
            $patterns[] = '/width="([0-9]+)"/';
            $patterns[] = '/width:([0-9]+)/';
       
            $replacements[] = 'width="'.$w.'"';
            $replacements[] = 'width:'.$w;
        }
       
        if(!empty($h)){
            $patterns[] = '/height="([0-9]+)"/';
            $patterns[] = '/height:([0-9]+)/';
       
            $replacements[] = 'height="'.$h.'"';
            $replacements[] = 'height:'.$h;
        }
       
        return preg_replace($patterns, $replacements, $markup);
    }



	function chkCurrencyOptions($currencywstprice,$currencyprice){
		$output=$currencywstprice*$currencyprice;
		return $output;
	}
        
    function teacherRelative($relation)
	{
		if(isset($relation) && !empty($relation)){
			switch($relation){
				case 'S':
					return 'S/O';
				break;
				
				case 'W':
					return 'W/O';
				break;
				
				case 'D':
					return 'D/O';
				break;
			}
		} else {
			return false;
		} 
	}
	
	function getStaffName($admin_id) 
	{
		$strSql = "SELECT USER_NAME FROM `admin` WHERE `ADMIN_ID` = $admin_id";
		$row    = mysqli_query($_SESSION['CONN'],$strSql);
		$resul  = mysqli_fetch_array($row);
		
        return $resul[0];
	}
	function getUserLoginDetailsName($id) 
	{
		$strSql = "SELECT USERNAME,PASSWORD FROM `users` WHERE `ID` = '$id' AND `USER_TYPE`='S'";
		$row    = mysqli_query($_SESSION['CONN'],$strSql);
		$resul  = mysqli_fetch_array($row);
		
        return " Username :".$resul[0]." Password :".$resul[1];
	}
	function getFranchiseName($franchise_id) 
	{
		$strSql = "SELECT NAME FROM `franchise_master` WHERE `FRANCHISE_ID` = $franchise_id";
		$row    = mysqli_query($_SESSION['CONN'],$strSql);
		$resul  = mysqli_fetch_array($row);
		
        return $resul[0];
	}
	function getShortName($string){
		$string=explode(' ', $string);
		$newString='';
		foreach ($string as $k => $valu) {
			$newString=$newString.substr($valu, 0,1);
		}
		return $newString;
	}

}

?>