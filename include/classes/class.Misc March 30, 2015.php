<?php
$addl_path ="";
ini_set("display_errors",0);
if(DIR_NAME == 'Webservice' || DIR_NAME == 'School')
$addl_path ='../';
if(DIR_NAME == 'SchoolAjax')
$addl_path ='../../';
require_once $addl_path ."include/common.php";  
class Cms extends BaseClass
{
	/**
	 * Constructor for the class
	 *
	 * @return Cms
	 */
	function Cms()
	{
		parent::__construct();
	}

	function pageImgContent($content)
	{
		//preg_match('~<img\b[^>]+\bsrc\s?=\s?[\'"](.*?)[\'"]~is',$content, $matches, PREG_OFFSET_CAPTURE);	
		//$imgsrclink = $matches[1][0];		

		//$content = preg_replace('~<img\b[^>]+\bsrc\s?=\s?[\'"](.*?)[\'"]~is', '<img rel="prettyPhoto[mg]" class="fckimg" href="thumbcms.php?img=$1&h=520&w=650" style="cursor:pointer" src="thumbcms.php?img=$1&h=200&w=200" ', $content);

		$content = preg_replace('/<img(.*?)src=(\'|")(.*?)(\'|")(.*?)>/ims', "<img rel='prettyPhoto[mg]' class='fckimg' style='cursor:pointer' href='thumbcms.php?img=$3&h=520&w=650' $1 src=\"thumbcms.php?img=$3&h=200&w=200\"$4$5>", $content);

		return $content;	
	}

	function save_image($imageName,$fname,$dir,$watermarker="")
	{		
		if(isset($_FILES[$fname]["error"]))
		{
			if ($_FILES[$fname]["error"] == UPLOAD_ERR_OK)
			{
				$str=$_FILES[$fname]['name'];
	
				$the_file = $_FILES[$fname]["tmp_name"];
	            
				$to_file = ROOT_PATH."$dir/$imageName";
                $to_file_thumb = ROOT_PATH."$dir/thumb/$imageName";
				$thumbto_file = ROOT_PATH.$dir."/thumb_".$imageName;
				 //$the_file."--".$to_file; 
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
			//	$logoImage = imagecreatefromjpeg($logo_file);
				$logoImage = imagecreatefrompng($logo_file);
				$logoW = imagesx($logoImage);
				$logoH = imagesy($logoImage);
				$photoFrame = imagecreatetruecolor($fotoW,$fotoH);
				$dest_x = $fotoW - ($logoW + 10);
				$dest_y = $fotoH - ($logoH + 10);
				// $dest_x = $fotoW/2 - $logoW/2;
			//  $dest_y = $fotoH/2 - $logoH/2;
				imagecopyresampled($photoFrame, $photo, 0, 0, 0, 0, $fotoW, $fotoH, $fotoW, $fotoH);
				imagecopy($photoFrame, $logoImage, $dest_x, $dest_y, 0, 0, $logoW, $logoH);
				imagejpeg($photoFrame, $targetfile);
				/////////////////////////
			}

				chmod($to_file, 0777);
				
			}
		}
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
			//	$logoImage = imagecreatefromjpeg($logo_file);
				$logoImage = imagecreatefrompng($logo_file);
				$logoW = imagesx($logoImage);
				$logoH = imagesy($logoImage);
				$photoFrame = imagecreatetruecolor($fotoW,$fotoH);
				$dest_x = $fotoW - ($logoW + 10);
				$dest_y = $fotoH - ($logoH + 10);
				// $dest_x = $fotoW/2 - $logoW/2;
			//  $dest_y = $fotoH/2 - $logoH/2;
				imagecopyresampled($photoFrame, $photo, 0, 0, 0, 0, $fotoW, $fotoH, $fotoW, $fotoH);
				imagecopy($photoFrame, $logoImage, $dest_x, $dest_y, 0, 0, $logoW, $logoH);
				imagejpeg($photoFrame, $targetfile);
				/////////////////////////
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
		 //$path="http://".$_SERVER['HTTP_HOST'];
		 //if($_SERVER['HTTP_HOST']=="10.10.34.54" || $_SERVER['HTTP_HOST']=="10.10.34.54")
		 //{
			$ratio=$srcW/$srcH;
			if($srcW >= $srcH)
			{
				 $width=($srcW > $width)?$width:$srcW;
				 $height=(($width/$ratio)>$height)?$height:($width/$ratio);
				 $width=$height*$ratio;
			}
			else
			{
				 $height=($srcH > $height)?$height:$srcH;
				 $width=(($height*$ratio)>$width)?$width:($height*$ratio);
				 $height=$width/$ratio;
			}
			 
			// $dim=imagecreate($width,$height);
			  $dim = imagecreatetruecolor($width, $height);
			  imagecopyresized($dim,$sim,0,0,0,0,$width,$height,$srcW,$srcH);
			  $this->output_image_to($dim,$destination,$source);
		 //}
		 //else
		 //{
		//	$dim = imagecreatetruecolor($width, $height);
		//	imagecopyresampled($dim,$sim,0,0,0,0,$width,$height,$srcW,$srcH);
		//}
		//$dim = imagecreatetruecolor($width, $height);	
		// imagecopyresized($dim,$sim,0,0,0,0,$width,$height,$srcW,$srcH);
		// $this->output_image_to($dim,$destination,$source);
	}

	function create_image_from($source)
	{
	 //die($source);
	 $source1=str_replace ("gif","png", $source);
		$size=getimagesize($source);
		
	 switch ($size[2])
	 {
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
		// $destination="/home/httpd/html/new-proacoustics/Products/abc.jpeg";
		// exit;
		 
		 switch ($size[2])
		 {
		  case 1: imagejpeg($dim,$destination); break;
		  case 2: imagejpeg($dim,$destination); break;
		  case 3: imagepng($dim,$destination); break;
		  case 6: imagewbmp($dim,$destination); break;
		  default:imagejpeg($dim,$destination); break;
		 }
		 
	}

	
	
	//////////////////////  Common Functions  ////////////////////////////////
	
	function GiveValue($wherecondition,$fields,$tablename)
	{
	    $strSql = " select $fields from $tablename where $wherecondition";
		return $this->dbFunc->dbFetchOne($strSql);	
	}
    function GiveValues($wherecondition,$fields,$tablename)
	{
	    $strSql = " select $fields from $tablename where $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	
	function getRow($table,$wherecondition)
	{
		$strSql = "SELECT * FROM $table WHERE $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	function getRowQuery($strSql)
	{
		$strSql = "SELECT * FROM $table WHERE $wherecondition";
		return $this->dbFunc->dbFetchRow($strSql);	
	}
	function insert($table,$set)
	{
		return $this->dbFunc->dbInsert($table,$set);
	}
	function update($table,$set,$where)
	{
		 $this->dbFunc->dbUpdate($table, $set, $where);
		 return 1;
	}
	function delete($table,$where) 
	{
		$rows_affected = $this->dbFunc->dbDelete($table, $where);
		return $rows_affected;
	}
	function getAllRecords($fields,$table,$where) 
	{
	    $strSql = "SELECT $fields FROM $table WHERE $where";
		return $this->dbFunc->dbFetchAll($strSql);
	}
    function getAllRecordsNew($strSql) 
	{
	    //$strSql = "SELECT $fields FROM $table WHERE $where";
		return $this->dbFunc->dbFetchAll($strSql);
	}
	function getAllRecordsPaging($fields,$table,$where) 
	{
		$strSql = "SELECT $fields FROM $table WHERE $where ";
		return $this->dbFunc->dbFetchAll_page($strSql,$this->rec_pp,$this->paging_params);
	}
    function getAllRecordsPagingNew($strSql) 
	{
		//$strSql = "SELECT $fields FROM $table WHERE $where ";
		return $this->dbFunc->dbFetchAll_page($strSql,$this->rec_pp,$this->paging_params);
	}
	function getSubjectName($subjectid) 
	{
		$strSql = "SELECT `SUBJECT_NAME` FROM `subject` WHERE `SUBJECT_ID` = $subjectid";
		return $this->dbFunc->dbFetchSujectName($strSql);
	}
	function trunc($phrase, $max_words)
	{
	   $phrase_array = explode(' ',$phrase);
	   if(count($phrase_array) > $max_words && $max_words > 0)
	      $phrase = implode(' ',array_slice($phrase_array, 0, $max_words)).'...';  
	   return $phrase;
	}
	function addSlashTrim($value)
	{
	   $finalValue = trim(addslahes($value));
	   return $finalValue;
	}

		
	function professional__web_urls($urls)
    {
        $url_address = stripslashes(trim($urls));
        $http_type = preg_match("'^https://'is",$url_address);
        if ($http_type == 1)
        {
            $http_typo = 'https://';
            $web_url = preg_replace("'^https://'is", "", $url_address);
        }
        else
        {
            $http_typo = 'http://';
            $web_url = preg_replace("'^http://'is", "", $url_address);
        }
        $website_address = $http_typo.$web_url;
        return $website_address;
    }
    function changeDateFormat ($date)
	{  
	    if(!empty($date)){   
	    $userDate = str_replace('/','-',$date);
		$newdate = date("Y-m-d", strtotime($userDate) );
    	return $newdate;
        } 
	}
    function dateFormat ($date)
	{
	    if(!empty($date)){
    		$newdate=date("d M, Y", strtotime($date) );
        	return $newdate;
        } else {
            return '';
        }
	}
	function dayNamedateFormat ($date)
	{
		$newdate=date("l M d", strtotime($date) );
    	return $newdate;
	}
	function dayNamedateFormat_year ($date)
	{
		$newdate=date("l M d, Y", strtotime($date) );
    	return $newdate;
	}
	
	/////////////////////////////////////////////////
	/////Function for calculate Days Difference/////
	function daysDifference($endDate, $beginDate)
	{

   		//explode the date by "-" and storing to array
   		$date_parts1=explode("-", $beginDate);
   		$date_parts2=explode("-", $endDate);
   		//gregoriantojd() Converts a Gregorian date to Julian Day Count
   		$start_date=gregoriantojd($date_parts1[1], $date_parts1[2], $date_parts1[0]);
   		$end_date=gregoriantojd($date_parts2[1], $date_parts2[2], $date_parts2[0]);
   		return $end_date - $start_date;
	}
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	
	function smoothdate ($year, $month, $day)
	{
    	return sprintf ('%04d', $year) . sprintf ('%02d', $month) . sprintf ('%02d', $day);
	}
		
	function date_difference ($first, $second)
	{
    	$month_lengths = array (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    	$retval = FALSE;

    	if (  	checkdate($first['month'], $first['day'], $first['year']) &&
            	checkdate($second['month'], $second['day'], $second['year'])
        	)
    	{
        	$start = $this->smoothdate ($first['year'], $first['month'], $first['day']);
        	$target = $this->smoothdate ($second['year'], $second['month'], $second['day']);
                            
        	if ($start <= $target)
        	{
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
                
                	if ($first['month'] > 12)
            	    {
        	            $first['year']++;
    	                $first['month'] = 1;
	                }
            	}
       
            	$add_day = 0;
            	while ($this->smoothdate ($first['year'], $first['month'], $first['day'] + 1) <= $target)
            	{
                	if (($first['year'] % 100 == 0) && ($first['year'] % 400 == 0))
                	{
	                    $month_lengths[1] = 29;
                	}
                	else
                	{
                    	if ($first['year'] % 4 == 0)
                    	{
	                        $month_lengths[1] = 29;
                    	}
                	}
                
                	$add_day++;
                	$first['day']++;
                	if ($first['day'] > $month_lengths[$first['month'] - 1])
                	{
                    	$first['month']++;
                    	$first['day'] = 1;
                    
                    	if ($first['month'] > 12)
                    	{
                        	$first['month'] = 1;
                    	}
                	}
                
            	}
          
            	$retval = array ('years' => $add_year, 'months' => $add_month, 'days' => $add_day);
        	}
    	}
                                                                                                                     
    	return $retval;
	}

	function UplaodImg($filename,$dirname,$watermarker="")
	{
	   $uni=rand(100, 100000);
		$uploaded_file = "";
		if (isset($_FILES[$filename]['name']))
		{	
			$main_image = "BSS_".$uni.'_'.$_FILES[$filename]['name'];	
		
			if(isset($_FILES[$filename]["error"]))
			{
				if ($_FILES[$filename]["error"] == UPLOAD_ERR_OK)
				{
					$image_Info_Arr=getimagesize($_FILES[$filename]['tmp_name']);
				}
				if(($_GET['msg']!='4')&&($_FILES[$filename]['tmp_name']!=""))
				{
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
    	function UplaodImg1($filename,$dirname,$watermarker="")
	{
	   $uni=rand(100, 100000);
		$uploaded_file = "";
		if (isset($_FILES[$filename]['name']))
		{	
			$main_image = "BSS_".$uni.'_'.$_FILES[$filename]['name'];	
		
			if(isset($_FILES[$filename]["error"]))
			{
				if ($_FILES[$filename]["error"] == UPLOAD_ERR_OK)
				{
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
	/////////////////////////////////////////////////////////////////////////
	
	function sendHtmlmail($to,$from,$subject,$body,$bcc="", $attachments = '')
	{   
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
//		$headers .= "BCC: Inderpreet Kaur<inderpreet.kaur@redalkemi.com>\n";
		$headers .= "BCC: ".$bcc."\n";
	    //print $message;
		mail($to, $subject, $message, $headers);
	}
	
	////////////Search Function//////////
	function getSearchInfo($keyWord)
	{
		$strSql = "SELECT * FROM tblPageMaster pm left join tblContentMaster cm on (pm.intPageID=cm.intPageID)  WHERE (pm.vchPageName LIKE '%".$keyWord."%' or cm.txtContent like '%".$keyWord."%') and pm.enumStatus='A' order by pm.intSequence asc";
		return $this->dbFunc->dbFetchAll_page($strSql,$this->rec_pp,$this->paging_params);
	}
	
	function resizeMarkup($markup, $dimensions)  // Function use to change the width height of youtube embeded code
    {
        $w = $dimensions['width'];
        $h = $dimensions['height'];
       
        $patterns = array();
        $replacements = array();
        if( !empty($w) )
        {
            $patterns[] = '/width="([0-9]+)"/';
            $patterns[] = '/width:([0-9]+)/';
       
            $replacements[] = 'width="'.$w.'"';
            $replacements[] = 'width:'.$w;
        }
       
        if( !empty($h) )
        {
            $patterns[] = '/height="([0-9]+)"/';
            $patterns[] = '/height:([0-9]+)/';
       
            $replacements[] = 'height="'.$h.'"';
            $replacements[] = 'height:'.$h;
        }
       
        return preg_replace($patterns, $replacements, $markup);
    }



	function chkCurrencyOptions($currencywstprice,$currencyprice)
		{
			 $output=$currencywstprice*$currencyprice;
				return $output;
		}


}

?>