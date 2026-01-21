<?php
/* This is a common file for all the files common includes */
if(!defined("__COMMON__"))
{
	
	define("__COMMON__",true);
	require_once("konfig.php"); 
	require_once("ajax/xajax.inc.php");	
	require_once("classes/class.dbFunctions.php");	
	
	require_once("classes/class.coreClasses.php");
	require_once("classes/class.extraFunctions.php");
	require_once 'smarty/libs/Smarty.class.php';
	
	//for including smarty library
	
   // require $_SERVER['DOCUMENT_ROOT'].'min/utils.php';
	//echo $_SERVER['DOCUMENT_ROOT']; exit;
	//session_start();	# revised version of php print_r to use <pre> for formatting
	function myPrintR($arr='', $all=0)
	{
		echo '<pre>';
		echo "Passed --";
		if(is_array($arr))
			print_r($arr);
		elseif(is_object($arr))
			var_dump($arr);
		elseif($arr=="")
			$all=1;
		else
			echo $arr;
		if($all)
		{
			$_POST['files'] = $_FILES;
			echo "GET--";
			print_r($_GET);
    			echo "POST--";			print_r($_POST);
    			echo "SESSION--";
			print_r($_SESSION);
       			echo "COOKIE--";
			print_r($_COOKIE);
		}
		echo "</pre>";
	}
	function escape_string($str)
	{
		return mysqli_real_escape_string($str);
	}
	function fnErrorMessage($errMsg, $e=object)
	{
		$str = $e->getMessage();
		$str .= "<BR> $errMsg <br>";
		echo $str;
	}
	/*if($_SESSION['USER_TYPE']=='A'){
		$headerName = "Welcome to Admin Console";
		$smartyVars['headerName'] = $headerName;
	} elseif(!empty($_SESSION['SCHOOL_ID'])){
		$sql = "select * from school where SCHOOL_ID =".$_SESSION['SCHOOL_ID'];
		$school_data = mysqli_query($_SESSION['CONN'],$sql);
		$schoolRec = mysqli_fetch_array($school_data);
		$name = stripslashes($schoolRec['NAME']);
		$school_logo = stripslashes($schoolRec['SCHOOL_LOGO']);
		if (preg_match("/school/", $name)){
			$name = str_replace('school','School',$name);
			$smartyVars['headerName'] = "Welcome to ".$name;  
		} else {
		  $smartyVars['headerName'] = "Welcome to ".$name;    
		}		
		$smartyVars['schoolLogo'] = $school_logo;   
	}

	$sql = "select * from pagemaster where 1";
	$cmsPageData = mysqli_query($_SESSION['CONN'],$sql);
	if(count($cmsPageData)>0){
		while($recordData = mysqli_fetch_array($cmsPageData)){
			$dataArray[] = $recordData; 
		}
	}
	$query   = "select * from siteconstant where ID =1";
	$siteConstantData = mysqli_query($_SESSION['CONN'],$query);
	if(count($siteConstantData)>0){
		$siteConstant = mysqli_fetch_array($siteConstantData);
	}*/
	/*
	$jsUris = Minify_getUri(array(
		'//javascripts/all.js'
	));
	$cssUris = Minify_getUri(array(
		 '//css/style1.css',
		 '//css/developer.css'
	));
	$smartyVars['jsUris'] = $jsUris;
	$smartyVars['cssUris'] = $cssUris;
	*/
	$smartyVars['siteConstant'] = $siteConstant;
	$smartyVars['cmsArray'] = $dataArray;

}
?>
