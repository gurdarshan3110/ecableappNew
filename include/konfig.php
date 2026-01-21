<?php
/*------------------------------------------------------------
Developer:	Gurdarshan Singh
-------------------------------------------------------------*/
ini_set ('magic_quotes_gpc', 0);
if(!defined("__CONFIG__"))
{
	define("__CONFIG__",true);
	ini_set("display_errors",0);
    //print_r($_SERVER);
    $setup_at = $_SERVER['HTTP_HOST'];
    if($setup_at == 'https://ecableapp.com' || $setup_at == 'www.ecableapp.com' || $setup_at == 'ecableapp.com')
	{
		define("ADMIN_EMAIL","admin@ecableapp.com");
		define("ADMIN_EMAIL_NAME","ecableApp Administrator");
		define("BCC_EMAIL","admin@ecableapp.com");
		define("MAILS_PREFIX",'');
		define("SECURE_SITE_URL",'http://www.ecableapp.com/');
		define("NON_SECURE_SITE_URL",'http://www.ecableapp.com/');
		define("SITE_URL", 'https://www.ecableapp.com/');
        define("HOST_NAME", 'ecableApp');
		define('ROOT_PATH',$_SERVER["DOCUMENT_ROOT"].'/');
		define('MAX_IMG_UPLOAD_SIZE',2*1024*1024);
		define("EMAIL_URL", 'gurdarshan3110@gmail.com');
        define("GOOGLE_API_KEY", "AIzaSyAjOzYpKvL2gYJu4elMSp2LZHiif_-asTk");
        date_default_timezone_set("Asia/Kolkata");
		$dbHost = 'localhost';
		$dbUser = 'root';
		$dbPass = 'Apple@2706';
		$dbName = 'ecableapp';
        //echo $_SERVER["DOCUMENT_ROOT"]; exit;
                
	}elseif($setup_at == 'local.demo2.com')
	{
	/** * Mail Configurations for the different mails that will be sent to the memebers and the admin. */
		// For Localhost
		define("SECURE_SITE_URL",$setup_at);
		define("NON_SECURE_SITE_URL",$setup_at);
		define("SITE_URL", $setup_at);	
		define('ROOT_PATH','E:/xampp/htdocs/ecable');
        date_default_timezone_set("Asia/Kolkata");
        define("HOST_NAME", 'ecable');
        define("GOOGLE_API_KEY", "");
		$dbHost = 'localhost';
		$dbUser = 'root';
		$dbPass = '';
		$dbName = 'ecable';
	}
    
	$conn = mysqli_connect($dbHost, $dbUser, $dbPass,$dbName);
	$_SESSION['CONN']=$conn;
	
}
?>