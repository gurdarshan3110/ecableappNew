<?php
/*------------------------------------------------------------
Developer:	Sumit Kumar, Riti Gulati.
Creation Date:	31/10/2006 (dd/mm/yyyy)
ModifiedDate	ModifiedBy		Comments (As and when)
-------------------------------------------------------------*/
$addl_path ="";
if(DIR_NAME=='ajax' || DIR_NAME=='Webservice')
$addl_path ="../";
require_once $addl_path ."include/common.php";

class BaseClass 
{
	var $smarty;
	var $xajax;
	var $zMail;
	var $myFunc;
	var $dbFunc;
	var $rec_pp;
	var $smartyVars;
	var $paging_params="";

	function BaseClass()
	{
		//parent::__construct();
		$this->initializeSmarty();
		$this->myFunc = new ExtraFunctions();
		$this->dbFunc = new dbFunctions();
		$this->rec_pp = 10;
	}

	function initializeSmarty($debug=false)
	{
		$this->smarty = new Smarty;
		//$smarty->force_compile = true;
		$smarty->debugging = true;
		$smarty->caching = true;
		$smarty->cache_lifetime = 120;
	}

	function initializeAjax($debug=false,$admin=false)
	{
		$this->xajax = new xajax();
		
		/*registering the functions*/
		$this->registerAjaxFunctions();

		$this->xajax->processRequests();

		//$this->xajax->waitCursorOn();
		$this->xajax->errorHandlerOn();
		$this->xajax->bDebug=$debug;
		//$this->xajax->debugOn();
		$this->xajax->statusMessagesOn();
		if($admin==true)
		{
			//$this->xajax->printJavascript('../include/ajax');
			$this->smartyVars['init_ajax_js'] = $this->xajax->getJavascript('../include/ajax');
		}
		else
		{
			//$this->xajax->printJavascript('include/ajax');
			$this->smartyVars['init_ajax_js'] = $this->xajax->getJavascript('include/ajax');
		}
	}

	/*
	$templates -> comma separated string of  filenames without extention in sequence
	$header -> it could be of type :
			string -- for heading in header.tpl
			assoc-array -> with keys and values
	Usage :
	$page = new BaseClass();
	$arSmarty = array('heading'=>$heading,
				    'thanks_msg'=>$thanks_msg);
	$page->displayPage("header,thanks,footer",$arSmarty);
	*/
	function displayPage($templates,$smartyVars="")
	{
	//	global $jsForceShow,$jsNoScriptMsg;
		if(is_array($this->smartyVars))
		{
			$this->smartyVars=array_merge($this->smartyVars,$smartyVars);
			$smartyVars=$this->smartyVars;
		}

		if(is_array($smartyVars))
		{
			foreach($smartyVars as $k=>$v)
				$this->smarty->assign($k,$v);
		}

	//	$this->smarty->assign("jsForceShow",$jsForceShow);
	//	$this->smarty->assign("jsNoScriptMsg",$jsNoScriptMsg);
		$tplArray=explode(",",$templates);
		foreach($tplArray as $tpl)
			$this->smarty->display($tpl.".tpl");
	}

//	function initZendMail()
//	{
//		//$mailServer=new Zend_Mail_Transport_Smtp($this->smtp_server, $this->mail_user, $this->mail_pass);
//		//$mailServer=new Zend_Mail_Transport_Smtp($this->smtp_server);
////		Zend_Mail::setDefaultTransport($mailServer);
//		$this->zMail = new Zend_Mail();
//	}
//	function ZendMail($arTo, $arFrom, $autoRespName="", $tokens=array(),$mType='T',$subjectTitle='')
//	{
//		try
//		{
//			if(isset($arFrom[0]))
//				$this->zMail->setFrom($arFrom[0], $arFrom[1]);
//			else
//				$this->zMail->setFrom('no-replies@multitrode.com',$arFrom[1]);
//
//			$autoResp = $this->myFunc->get_auto_responder($autoRespName,$tokens);
//
//			//$tplReplace = array('SITE_URL'=>SITE_URL,'BODY'=>$autoResp['htmlbody']);
//			//$autoResp['htmlbody'] = $this->myFunc->getMailBody('mail-template',$tplReplace);
//			//myPrintR($autoResp['htmlbody']);
//	
//			if(MAILS_TEST_MODE)
//			{
//				//$this->zMail->addTo('sudhanshu.kashyap@redalkemi.com', 'Email: '.$arTo[0].' Name: '.$arTo[1]);
//				$this->zMail->addTo('richa.dhingra@redalkemi.com', 'Email: '.$arTo[0].' Name: '.$arTo[1]);
//				if (empty($subjectTitle))
//					$this->zMail->setSubject(MAILS_PREFIX.$autoResp['vchsubject']);
//				else
//					$this->zMail->setSubject(MAILS_PREFIX.$subjectTitle);
//			}
//			else
//			{
//				
//				$this->zMail->addTo($arTo[0], $arTo[1]);
//				if (empty($subjectTitle))
//					$this->zMail->setSubject(MAILS_PREFIX.$autoResp['vchsubject']);	
//				else
//					$this->zMail->setSubject(MAILS_PREFIX.$subjectTitle);	
//			}
//			//$this->zMail->addBcc('rajat.garg@redalkemi.com', 'Email: '.$arTo[0].' Name: '.$arTo[1]);
//			//$this->zMail->addBcc('sudhanshu.kashyap@redalkemi.com', 'Email: '.$arTo[0].' Name: '.$arTo[1]);
//			$this->zMail->addBcc('richa.dhingra@redalkemi.com', 'Email: '.$arTo[0].' Name: '.$arTo[1]);
//
//			if($mType != 'T')			//If not Text
//			{
//				$mail_template = $this->myFunc->get_auto_responder('Mail_Template');
//				$autoResp['htmlbody'] = str_replace('#BODY#', nl2br($autoResp['htmlbody']), $mail_template['htmlbody']);
//			}
//			
//			if($mType == 'B')			//Both
//			{
//				$this->zMail->setBodyText($autoResp['txtbody']);
//				$this->zMail->setBodyHtml(($autoResp['htmlbody']));
//			}
//			elseif($mType == 'H')
//			{
//				$autoResp['htmlbody'] = str_replace('#SITE_URL#', $_SERVER['HTTP_HOST'], $autoResp['htmlbody']);
//				$autoResp['htmlbody'] = str_replace('#YEAR#', date("Y"), $autoResp['htmlbody']);
//				$this->zMail->setBodyHtml(($autoResp['htmlbody']));
//			}
//			else
//				$this->zMail->setBodyText($autoResp['txtbody']);
//			
//			$this->zMail->send();
//
//			//Sys_Log::Log("-- <Mail Content> {$autoResp['htmlbody']}", basename(__FILE__), __LINE__, 'debug');
//			/*Sys_Log::Log("-- <Mail Sent> From: {$this->zMail->getFrom()}, To: {$arTo[0]}", basename(__FILE__), __LINE__, 'debug');*/
//		}
//		catch(Zend_Mail_Transport_Exception $e)
//		{
//			//myPrintR($e);
//			//die("mail error");
//			echo '<p>Sorry, we encountered an error trying to create your account. The system administrator has been notified. Please try again in a few minutes.Our apologies for any incovenience this may have caused.</p>';
//		}
//	}

//	function indicate_new_message($arTo, $mType='B', $custom_sub=array())		//For zwaggle
//	{
//		$tokens = array('MAIL_TO'=>$arTo[1]);
//		if(is_array($custom_sub))
//			$tokens = array_merge($custom_sub,$tokens);
//
//		$arFrom = array(ADMIN_EMAIL, ADMIN_EMAIL_NAME);
//		$this->ZendMail($arTo, $arFrom, 'New_Message', $tokens, $mType);
//	}

function ZendMail($arTo, $arFrom, $autoRespName="", $arTokens=array(),$mType='T',$bcc='')
	{
		
			$sqlTemplate = "select * from tblAdminMaster where vchEmailAddress = 'tejinder.singh@redalkemi.com'";
           
            $resTemplate = $this->dbFunc->dbFetchRow($sqlTemplate);
            $templateBody=$resTemplate['htmlbody'];

            $sqlMail = "select * from tblAdminMaster where vchEmailAddress = 'tejinder.singh@redalkemi.com'";
           
            $msg = $this->dbFunc->dbFetchRow($sqlMail);
		
            if(is_array($arTokens))
			{
				foreach($arTokens as $k=>$v)
				{
					$token="#".$k."#";
					$msg['txtbody'] = str_replace($token, stripslashes($v), $msg['txtbody']);
					$msg['htmlbody'] = str_replace($token, stripslashes($v), $msg['htmlbody']);
					$msg['vchsubject'] = str_replace($token, stripslashes($v), $msg['vchsubject']);
					if($k == 'CHANGED_SUBJECT')
					$msg['vchsubject'] = stripcslashes($v);
				}
			}
			$msg['htmlbody'] = str_replace('#BODY#', $msg['htmlbody'],$templateBody);
			$msg['txtbody'] = str_replace('#SITE_URL#', SITE_URL, $msg['txtbody']);
			$msg['htmlbody'] = str_replace('#SITE_URL#', SITE_URL, $msg['htmlbody']);
			$msg['htmlbody'] = str_replace('#HOST_NAME#', $_SERVER['HTTP_HOST'], $msg['htmlbody']);
			$msg['htmlbody'] = str_replace('#YEAR#', date("Y"), $msg['htmlbody']);
			
            $EmailSubject=$msg['vchsubject'];
            $WelcomeMessage=$msg['htmlbody'];
            		$headers  = "MIME-Version: 1.0\r\n";
			$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
			$headers .="From:".$arFrom[1]."< ".$arFrom[0]." >\n"; 
			//$headers .= "BCC: ".$bcc."\r\n";
            $Email_Address=$arTo[1]."< ".$arTo[0]." >";

         $sent = mail($Email_Address, $EmailSubject, $WelcomeMessage, $headers,$bcc);
		return $sent;		
	}

}

interface RegisterAjax{
  function registerAjaxFunctions();
}

#we are extending xajax class for extra functionality
class myXajaxResponse extends xajaxResponse
{
	function addAddOption($sSelectId, $sOptionText, $sOptionValue,$empty=false,$selected="")
	{
		if($empty)
			$sScript .="document.getElementById('".$sSelectId."').options.length=0;";

		$sScript .= "var objOption = new Option('".$sOptionText."','".$sOptionValue."');";
		$sScript .= "var selectElement = document.getElementById('".$sSelectId."');";
		$sScript .= "try { selectElement.add(objOption,null); }";
		$sScript .= "catch (exc) { selectElement.add(objOption); }";    // hack for IE
		// original: $sScript .= "document.getElementById('".$sSelectId."').options.add(objOption);";
		$this->addScript($sScript);
	}
	function setSelectedOption($sSelectId,$index)
	{
	  	$sScript .="document.getElementById('".$sSelectId."').options[$index].selected=true;";
	  	$this->addScript($sScript);
	}
	function clearOption($sSelectId)
	{
	  	$sScript .="document.getElementById('".$sSelectId."').options.length=0;";
	  	$this->addScript($sScript);
	}

	function populateCombo($name,$resArray,$objResponse)
	{
		//if (window.console) { window.console.log("name:" + $name); }
   		$objResponse->clearOption($name);
   		if($name == 'cat_level2')
		{
			$objResponse->addAddOption($name,"--Select Sub Category--","");
	 	}
		if($name == 'cat_level3')
	 		$objResponse->addAddOption($name,"--Select Sub Sub Category--","");

  		$count=0;
  		if(count($resArray)>0)
  		{
			foreach($resArray as $key=>$value)
		  		$objResponse->addAddOption($name,addslashes($value),$key);
  		}
	}

	function populateClothingFitCombo($name,$resArray,$objResponse)
	{
		//if (window.console) { window.console.log("name:" + $name); }
   		$objResponse->clearOption($name);
   		if($name == 'fit_level')
		{
			$objResponse->addAddOption($name,"-- Select --","");
	 	}

  		$count=0;
  		if(count($resArray)>0)
  		{
			foreach($resArray as $key=>$value)
		  		$objResponse->addAddOption($name,addslashes(html_entity_decode($value)),$key);
  		}
	}
}
?>
