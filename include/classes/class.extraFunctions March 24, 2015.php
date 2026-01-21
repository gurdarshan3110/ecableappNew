<?php
/*------------------------------------------------------------
Developer:	Sumit Kumar, Riti Gulati.
Creation Date:	31/10/2006 (dd/mm/yyyy)
ModifiedDate	ModifiedBy		Comments (As and when)
-------------------------------------------------------------*/
$addl_path ="";
if(DIR_NAME == 'Webservice' || DIR_NAME == 'School')
$addl_path ='../';
if(DIR_NAME == 'SchoolAjax')
$addl_path ='../../';
require_once $addl_path ."include/common.php";

class ExtraFunctions 
{
	public $errMsg;
	var $dbFunc;
	/*function getMailBody($tpl,$arTokens)
	{
		//$txt = $this->get_auto_responder('Mail_Template',$arTokens);

		//$txt= file_get_contents(SITE_URL."/templates/mailTemplates/" .$tpl .".tpl");
		if(is_array($arTokens))
		{
			foreach($arTokens as $strKeys=>$strValues)
			{
				$token="#".$strKeys."#";
				$txt = str_replace($token, nl2br($strValues), $txt);
			}
		}

		return $txt['htmlbody'];
	}*/

	function displayNextPage($page)
	{
		$this->dbFunc = new dbFunctions();
		echo "<script language='javascript'>location.href='".$page."'</script>";
	}

	/* Used :: ClickSize*/
	function getMasterValues($enumType,$id=0,$fields='')
	{
		$this->dbFunc = new dbFunctions();
		if(!empty($fields))
		{
			$strSql="SELECT $fields FROM tblAdminMaster where enumType = '$enumType'";
		}
		else
		{
			$strSql="SELECT * FROM tblAdminMaster where enumType = '$enumType'";
		}

		if($id>0)
		{
			$strSql .= " AND intValueID = '$id'";
			return $this->dbFunc->dbfetchRow($strSql);
		}
		else
		{
			return $this->dbFunc->dbfetchAll($strSql);
		}
	}

	function update_floating_baloon($row)
	{
		$this->dbFunc = new dbFunctions();
			// enumType='F' for floating-baloon
			$where = $this->dbFunc->quoteInto('enumType = ?', 'F');
			$rows_affected = $this->dbFunc->dbupdate("tblAdminMaster",$row,$where);
			return $rows_affected;
	}
	function export_csv($csv_output, $fname ="export",$file_type='csv')
	{
		if(ini_get('zlib.output_compression'))
			ini_set('zlib.output_compression', 'Off');

		header("Expires: Mon, 26 Jul 2001 05:00:00 GMT"); // Date in the past
		header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); // always modified
		header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
		header("Cache-Control: post-check=0, pre-check=0", false);
		header("Pragma: no-cache"); // HTTP/1.0
		header("Cache-control: private");
		if ($file_type=='csv')
			header ("Content-Type: text/text");
		else
		{
			header('Content-Type: application/vnd.ms-excel;');                 // This should work for IE & Opera
    		header("Content-type: application/x-msexcel");                    // This should work for the rest
		}
		header ("Content-Disposition: attachment; filename=" .$fname.$file_type);
		echo $csv_output;
		exit;
	}

	function dbDateTime($time="")
	{
		$time  = ($time=="") ? time() : strtotime($time);
		return date("Y-m-d H:i:s", $time);
	}
	function fnWriteOptionListCst($id,$fldlist,$table,$where=1,$debug=0,$multi=0,$unique=1)
	{
		$this->dbFunc = new dbFunctions();
		if($unique==1)
		 	$query="select distinct $fldlist from $table where $where ";
		else
			$query="select $fldlist from $table where $where ";
		      //echo $query;
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$value=strtolower($fldArray[1]);

		if($debug == 1){ print $query;}

		if($debug == 2){ print $query; exit();}

		//$recordset=mysql_query($query);
		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$valR=$record[$counter][$value];
				/*do not allow records with empty key/values*/

				if(!empty($keyR) && !empty($valR))
				{
					$data .='<option value="'.$valR.'"';
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? ' selected="selected"' : "";
					}
					else
					{
						$data.= ($id==$valR)? ' selected="selected"'  : "";
					}
					$data .=">".stripslashes($keyR);
					$data .="</option>";
				}
			}
			//$selOp=ob_get_contents();
		}

		return $data;
	}
	function fnWriteOptionListId($id,$fldlist,$table,$where=1,$debug=0,$multi=0,$unique=1)
	{
		$this->dbFunc = new dbFunctions();
		if($unique==1)
		 	$query="select distinct $fldlist from $table where $where ";
		else
			$query="select $fldlist from $table where $where ";
		      //echo $query;
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$value=strtolower($fldArray[1]);
		$val=strtolower($fldArray[2]);

		if($debug == 1){ print $query;}

		if($debug == 2){ print $query; exit();}

		//$recordset=mysql_query($query);
		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$valR=$record[$counter][$value];
				$vaR=$record[$counter][$val];
				/*do not allow records with empty key/values*/

				if(!empty($keyR) && !empty($valR) && !empty($vaR))
				{
					$data.="<option value='$valR'";
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? " selected='selected' " : "";
					}
					else
					{
						$data.= ($id==$valR)? " selected='selected' " : "";
					}
					$data.=">".stripslashes($keyR)."-(".stripslashes($vaR).")";
					$data.="</option>";
				}
			}
			//$selOp=ob_get_contents();
		}

		return $data;
	}
	function fnWriteOptionList($id,$fldlist,$table,$where=1,$debug=0,$multi=0,$unique=1)
	{
		$this->dbFunc = new dbFunctions();
		if($unique==1)
		 	$query="select distinct $fldlist from $table where $where ";
		else
			$query="select $fldlist from $table where $where ";
		      //echo $query;
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$value=strtolower($fldArray[1]);

		if($debug == 1){ print $query;}

		if($debug == 2){ print $query; exit();}

		//$recordset=mysql_query($query);
		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$valR=$record[$counter][$value];
				/*do not allow records with empty key/values*/

				if(!empty($keyR) && !empty($valR))
				{
					$data.="<option value='$valR'";
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? " selected='selected' " : "";
					}
					else
					{
						$data.= ($id==$valR)? " selected='selected' " : "";
					}
					$data.=">".stripslashes($keyR);
					$data.="</option>";
				}
			}
			//$selOp=ob_get_contents();
		}

		return $data;
	}
 	function fnWriteOptionListWithJoin($id,$query,$debug=0,$multi=0)
	{
		$this->dbFunc = new dbFunctions();
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$value=strtolower($fldArray[1]);
        
		if($debug == 1){ print $query;}

		if($debug == 2){ print $query; exit();}

		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$valR=$record[$counter][$value];
				/*do not allow records with empty key/values*/

				if(!empty($keyR) && !empty($valR))
				{
					$data.="<option value='$valR'";
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? " selected='selected' " : "";
					}
					else
					{
						$data.= ($id==$valR)? " selected='selected' " : "";
					}
					$data.=">".stripslashes($keyR);
					$data.="</option>";
				}
			}
			//$selOp=ob_get_contents();
		}

		return $data;
	}
 
    
    function fnWriteOptionList1($id,$fldlist,$table,$where=1,$debug=0,$multi=0,$unique=1)
	{
		$this->dbFunc = new dbFunctions();
		if($unique==1)
		 	$query="select distinct $fldlist from $table where $where ";
		else
			$query="select $fldlist from $table where $where ";
		      //echo $query;
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$key1=strtolower($fldArray[2]);
		$value=strtolower($fldArray[1]);

		if($debug == 1){ print $query;}

		if($debug == 2){ print $query; exit();}

		//$recordset=mysql_query($query);
		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$keyR1=$record[$counter][$key1];
				$valR=$record[$counter][$value];
                //echo $key1;
				/*do not allow records with empty key/values*/

				if(!empty($keyR) && !empty($keyR1) && !empty($valR))
				{
					$data.="<option value='$valR'";
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? " selected='selected' " : "";
					}
					else
					{
						$data.= ($id==$valR)? " selected='selected' " : "";
					}
					$data.=">".stripslashes($keyR).' '.stripslashes($keyR1);
					$data.="</option>";
				}
			}
			//$selOp=ob_get_contents();
		}

		return $data;
	}
     function fnWriteOptionListEmp($id,$fldlist,$table,$where=1,$debug=0,$multi=0,$unique=1)
	{
		$this->dbFunc = new dbFunctions();
		if($unique==1)
		 	$query="select distinct $fldlist from $table where $where ";
		else
			$query="select $fldlist from $table where $where ";
		      //echo $query;
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$key1=strtolower($fldArray[2]);
        $key2=strtolower($fldArray[3]);
        $key3=strtolower($fldArray[4]);
        $key4=strtolower($fldArray[5]);
		$value=strtolower($fldArray[1]);
		if($debug == 1){ print $query;}
		if($debug == 2){ print $query; exit();}
       
		//$recordset=mysql_query($query);
		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$keyR1=$record[$counter][$key1];
                $keyR2=$record[$counter][$key2];
                $keyR3=$record[$counter][$key3];
                $keyR4=$record[$counter][$key4];
				$valR=$record[$counter][$value];
                if($keyR3=='S'){
                    $keyR3 = 'S/O';
                } elseif($keyR3=='D') {
                    $keyR3 = 'D/O';
                } elseif($keyR3=='W') {
                    $keyR3 = 'W/O';
                }
				if(!empty($keyR) && !empty($keyR1) && !empty($valR))
				{
					$data.="<option value='$valR'";
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? " selected='selected' " : "";
					}
					else
					{
						$data.= ($id==$valR)? " selected='selected' " : "";
					}
					$data.=">".stripslashes($keyR).' '.stripslashes($keyR1);
                    if(!empty($keyR4)){
                    $data .=' '.$keyR3.' '.stripslashes($keyR4);    
                    }
                    if(!empty($keyR2)){
                    $data .=' ('.stripslashes($keyR2).')';
                    }
                    
					$data.="</option>";
				}
			}
			//$selOp=ob_get_contents();
		}

		return $data;
	}
function fnWriteOptionListNew($id,$fldlist,$table,$where=1,$debug=0,$multi=0,$unique=1)
	{
		$this->dbFunc = new dbFunctions();
		if($unique==1)
		 	$query="select distinct $fldlist from $table where $where ";
		else
			$query="select $fldlist from $table where $where ";
		      //echo $query;
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$key1=strtolower($fldArray[2]);
        $key2=strtolower($fldArray[3]);
		$value=strtolower($fldArray[1]);

		if($debug == 1){ print $query;}

		if($debug == 2){ print $query; exit();}

		//$recordset=mysql_query($query);
		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$keyR1=$record[$counter][$key1];
                $keyR2=$record[$counter][$key2];
				$valR=$record[$counter][$value];
                //echo $key1;
				/*do not allow records with empty key/values*/

				if(!empty($keyR) && !empty($keyR1) && !empty($valR))
				{
					$data.="<option value='$valR'";
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? " selected='selected' " : "";
					}
					else
					{
						$data.= ($id==$valR)? " selected='selected' " : "";
					}
					$data.=">".stripslashes($keyR).' '.stripslashes($keyR1).'('.$keyR2.')';
					$data.="</option>";
				}
			}
			//$selOp=ob_get_contents();
		}

		return $data;
	}


	function fnWriteOptionListWithOther($id,$fldlist,$table,$where=1,$debug=0,$multi=0,$unique=1,$otherTxtInfo="")
	{
		$this->dbFunc = new dbFunctions();
		if($unique==1)
		 	$query="select distinct $fldlist from $table where $where ";
		else
			$query="select $fldlist from $table where $where ";
		//echo($query);
		$fldArray=explode(",",$fldlist);
		$key=strtolower($fldArray[0]);
		$value=strtolower($fldArray[1]);

		if($debug == 1){ print $query;}

		if($debug == 2){ print $query; exit();}

		//$recordset=mysql_query($query);
		$record = $this->dbFunc->dbfetchAll($query);
		//echo "<pre>";
		//print_r($record);
		$sel_chk = "";
		if(!$record)
		{
			$this->errMsg="Unable to dbfetch rows";
		}
		else
		{
			$numrows=count($record);
			//ob_start();
			$data="";
			for($counter=0;$counter<$numrows;$counter++)
			{
				$keyR=$record[$counter][$key];
				$valR=$record[$counter][$value];
				/*do not allow records with empty key/values*/

				if(!empty($keyR) && !empty($valR))
				{
					$data.="<option value='$valR'";
					if($multi==1)
					{
						$idArray=array();
						$idArray=explode(",",$id);
						$data.=(in_array($valR,$idArray))? " selected " : "";
					}
					else
					{
						$data.= ($id==$valR)? " selected " : "";
					}
					$data.=">".stripslashes(trim($keyR));
					$data.="</option>";
				}
			}
		}
		if($multi==1)
		{
			$idOtherArray=array();
			$idOtherArray=explode(",",$id);
			$data.="<option value='Other' ".((in_array('Other',$idOtherArray))?'selected':'').">Other ".$otherTxtInfo."</option>";
		}
		else
		{
			$data.="<option value='Other' ".(($id=='Other')?'selected':'').">Other ".$otherTxtInfo."</option>";
		}
		return $data;
	}

	function ReturnDate($mname='',$dname='',$yname='',$month='',$date='',$year='',$startYear=2000,$endYear=2020,$rev='')
	{
		$dtDate="";
		if($mname!=''){
			$dtDate.=	"<select name='$mname' id='$mname'>
			";
			if($month == 0)
				$dtDate.= "<option value='' selected>MM</option>
				";
			for ($i=1;$i<13;$i++)
			{
				$i=($i<10)?'0'.$i:$i;

				if($i == $month)
					$dtDate.= "<option value='$i' selected>$i</option>
					";
				else
				$dtDate.= "<option value='$i'>$i</option>
				";
			}
			$dtDate.= "</select>";
		}
		if($dname!=''){
			$dtDate.=	"<select name='$dname' id='$dname'>
			";
			if($date == 0)
				$dtDate.= "<option value='' selected>DD</option>
				";
			for ($i=1;$i<32;$i++)
			{
				$i=($i<10)?'0'.$i:$i;

				if($i == $date)
					$dtDate.= "<option value='$i' selected>$i</option>
					";
				else
				$dtDate.= "<option value='$i'>$i</option>
				";
			}
			$dtDate.= "</select>";
		}
		if($yname!=''){
			$dtDate.= "<select name='$yname' id='$yname'>
			";
			if($year == 0)
				$dtDate.= "<option value='' selected>YYYY</option>
				";

			if($rev!='')
			{
				for ($i=$endYear;$i>$startYear;$i--)
				{
					$i=($i<10)?'0'.$i:$i;

					if($i == $year)
						$dtDate.= "<option value='$i' selected>$i</option>
						";
					else
					$dtDate.= "<option value='$i'>$i</option>
					";
				}
			}
			else
			{
				for ($i=$startYear;$i<$endYear;$i++)
				{
					$i=($i<10)?'0'.$i:$i;

					if($i == $year)
						$dtDate.= "<option value='$i' selected>$i</option>
						";
					else
					$dtDate.= "<option value='$i'>$i</option>
					";
				}
			}
			$dtDate.= "</select>";
		}
		return $dtDate;
	}

	function ReturnTime($hname='',$mname='',$hour='',$mins='',$min_intervals=15)
	{
		$dtDate="";
		if($hname!=''){
			$dtDate.=	"<select name='$hname' id='$hname'>
			";
			if($month == 0)
				$dtDate.= "<option value='' selected>HH</option>
				";
			for ($i=0;$i<24;$i++)
			{
				$i=($i<10)?'0'.$i:$i;

				if($i == $hour)
					$dtDate.= "<option value='$i' selected>$i</option>
					";
				else
				$dtDate.= "<option value='$i'>$i</option>
				";
			}
			$dtDate.= "</select>";
		}
		if($mname!=''){
			$dtDate.=	"<select name='$mname' id='$mname'>
			";
			if($mins == 0)
				$dtDate.= "<option value='' selected>MM</option>
				";
			for ($i=0;$i<60;$i=$i+$min_intervals)
			{
				$i=($i<10)?'0'.$i:$i;

				if($i == $mins)
					$dtDate.= "<option value='$i' selected>$i</option>
					";
				else
				$dtDate.= "<option value='$i'>$i</option>
				";
			}
			$dtDate.= "</select>";
		}
		return $dtDate;
	}

	function fnWriteOptionListArray($recordset,$fldlist)		//used
	{
		$this->dbFunc = new dbFunctions();
		$arrFld=explode(",",$fldlist);
		$numrows=count($recordset);

		for($counter=0;$counter<$numrows;$counter++)
		{
			  $key=strtolower($arrFld[0]);
			  $value=strtolower($arrFld[1]);
			  $recordset[0][$key];
			  $resultArray[$recordset[$counter][$key]]=stripslashes($recordset[$counter][$value]);
		}
		return $resultArray;
	}

	/*function to return a array with the associative records for compatibility with the older functions*/
	function fnDisplayRecords($table,$fields,$wherecondition,$orderby,$debug)
	{
		$this->dbFunc = new dbFunctions();
		try
		{
			$strsql = "select $fields from $table where $wherecondition order by $orderby";
			($debug == 1)? print $strsql: print "";

			$result = $this->dbFunc->dbfetchAll($strsql);
			//print_r($result);
			return $result;
		}catch(Zend_Db_Exception $e){
			$this->errMsg="<br><b>An exception occured operation could not be completed.</b>";
		}
	}

/*
*code for automatic display record array with inbuilt paging
*pass any additional condition if you need to show only search results
*Arguments :
*$tableName-->name of table to display listing from
*$action-->pass action if you want any other argument with the page listing
*$condition-->condition for the listing ex for searches
*$orderBy-->order by argument default is 1
*$debug-->1 if you want any debugging information
*$custPage-->pass this argument if you want a page to be displayed by default instead of 1 selected by default
*$maintainSearch-->true if you want your search to be maintained ie across multiple pages default-- true
*if page listing is obtained from a condition
*maintainSearch is under testing as per now --6-3-06
*/

//put all the records in a array for Display-------------->

function phpDisplay($tableName,$action="",$condition=null,$orderBy=1,$rec=5,$debug=0,$custPage=0,$maintainSearch=false,$fields="*")
{
	$arrRecord=array();//array contain the records to display
	$table=$tableName;

	if($condition!=null)
		$whereCondition=$condition;
	elseif(!empty($_REQUEST['srchString']))
	  	$whereCondition=$_REQUEST['srchString'];
	else
	 	$whereCondition="1=1";

	//$record = $this->dbFunc->dbfetchAll($query);
	$showTableRec=$this->fnDisplayRecords($table,$fields,$whereCondition,$orderBy,$debug);
	$p=new Pager;
	if($showTableRec)
	{
		if(count($showTableRec))
		{
			$num=count($showTableRec);
			if($custPage==0)
			{
				if($_REQUEST["page"]=="")
					$_REQUEST["page"]=1;
			}
			else
			{
				$_REQUEST["page"]=$custPage;
				$_GET["page"]=$custPage;
			}
			$limit =$rec; // this variable is defined in config file we are overriding it here.
			$getpages=$p->findPages($num,$limit);
			if(isset($_REQUEST["page"]) and $_REQUEST["page"]>$getpages)
			{
				$_REQUEST["page"]=$getpages;
				$_GET["page"]=$getpages;
			}

			/* store page in temp session variable*/
			//$_SESSION['tempPage']=$_GET["page"];

			$start = $p->findStart($limit);
			$showCustRecPaging=$this->fnDisplayRecords($table,$fields,$whereCondition,$orderBy." Limit $start,$limit",0);
			//print_r($showCustRecPaging);
		}
	}
	$arrMain=array();
	if($maintainSearch)
	{
	 	if($condition!=null)
		 {
		   $arrMain[0]=$p->pageList($_REQUEST['page'],$getpages,"action=".$action."&srchString=".$condition);
		 }
	}
	else
	{
		$arrMain[0]=$p->pageList($_REQUEST['page'],$getpages,"action=".$action);
	}
	$arrMain[1]=$showCustRecPaging;
	return $arrMain;
}

	/* Used :: ClickSize*/
	public function getCountry($id)
	{
		$sql = "SELECT vchCountryName FROM country WHERE intCountryID = $id";
		$recordset=$this->dbFunc->dbfetchOne($sql);
		return $recordset;
	}

	function getRandomPassword()
	{
		$chars = "abcdefghijkmnopqrstuvwxyz023456789";
    		srand((double)microtime()*1000000);
    		$i = 0;
    		$pass = '' ;

    		while ($i <= 7) 		//8 digit password will be created
    		{
        		$num = rand() % 33;
        		$tmp = substr($chars, $num, 1);
        		$pass = $pass . $tmp;
        		$i++;
    		}
		return $pass;
	}

	/*
	Description: Check if the FAKE URL is available or not.
	Returns: 1 if available... else 0 if not available.
	Inputs: fakeURL: URL to check
	*/
	function isDuplicateFakeURL($fakeURL,$id=0)
	{
	    if($id==0)
	    {
		$catSql = $this->dbFunc->dbfetchOne("SELECT COUNT(*) FROM categorymaster WHERE vchPageFakeURL = '$fakeURL'");
		if($catSql>0)
		{
		    return 0;
		}
		else
		{
		    $itemSql = $this->dbFunc->dbfetchOne("SELECT COUNT(*) FROM itemmaster WHERE vchPageFakeURL = '$fakeURL'");
		    if($itemSql>0)
			return 0;
		    else
			return 1;
		}
	    }
	    else
	    {
		$catSql = $this->dbFunc->dbfetchOne("SELECT COUNT(*) FROM categorymaster WHERE vchPageFakeURL = '$fakeURL' AND intCategoryID <> '$id'");
		if($catSql>0)
		{
		    return 0;
		}
		else
		{
		    $itemSql = $this->dbFunc->dbfetchOne("SELECT COUNT(*) FROM itemmaster WHERE vchPageFakeURL = '$fakeURL' AND intItemID <> '$id'");
		    if($itemSql)
			return "0";
		    else
			return "1";
		}
	    }
	}

	/* Gets the Mail Auto Responders with Name. */
	function get_auto_responder($vchName, $arTokens=array())
	{
		$msg = $this->dbFunc->dbfetchRow("SELECT * FROM autoresponder WHERE vchAutoResponderName = '$vchName'");
		//myPrintR($msg);

		$arTokens['ADDITIONAL_TEXT']=($arTokens['ADDITIONAL_TEXT']=='' ? ' ' : ' '.$arTokens['ADDITIONAL_TEXT'].' ');

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
		$msg['txtbody'] = str_replace('#SITE_URL#', SITE_URL, $msg['txtbody']);
		$msg['htmlbody'] = str_replace('#SITE_URL#', SITE_URL, $msg['htmlbody']);
		//myPrintR($msg);exit;
		return $msg;
	}

	function safe_post_header($redirect_url)
	{
		header("Cache-Control: must-revalidate");
	   	$offset = 60 * 60 * 24 * -1;
   		$ExpStr = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT";
  		header($ExpStr);
  		header('location: ' .$redirect_url);
		exit(1);
	}

	function makeClickableLinks($text,$class='')
	{
  		$text = eregi_replace('(((f|ht){1}tp://)[-a-zA-Z0-9@:%_\+.~#?&//=]+)', '<a href="\\1" class="'.$class.'">\\1</a>', $text);
		$text = eregi_replace('([[:space:]()[{}])(www.[-a-zA-Z0-9@:%_\+.~#?&//=]+)', '\\1<a href="http://\\2" class="'.$class.'">\\2</a>', $text);
		$text = eregi_replace('([_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,3})',  '<a href="mailto:\\1" class="'.$class.'">\\1</a>', $text);
		return $text;
	}

	// Calender
	function jsCalDate($field='cal', $value="", $method='put', $align="BR")
	{
		global $smartyVars;
		$altCaldate ="Calender";
		$disp_value = ($value=='' || substr($value,0,10)=='0000-00-00')? ' ' : date('Y/m/d',strtotime($value));
		$strDate = "<table>
		       	<tr>
		       	<td>
          			<input type=\"hidden\" name=\"$field\" id=\"$field\" value=\"$value\">
          			<div id=\"disp_cal_$field\" class=\"input2\" style=\"width:80px;\">".$disp_value."&nbsp;</div>
          		</td>
          		<td>
          		<img id=\"cal_$field\" style=\"cursor: pointer;\" src=\"images/calendar.gif\" alt=\"$altCaldate\" title=\"$altCaldate\">
			<img id=\"del_cal_$field\" style=\"cursor: pointer;\" src=\"images/delete1.gif\" alt=\"Clear Date\" title=\"Clear Date\" onclick=\"clear_cal_date('$field');\">
          		<script language=\"javascript\">
				Calendar.setup({
					inputField     :    \"$field\",
					displayArea	   :	\"disp_cal_$field\",
					button         :    \"cal_$field\",
					daFormat	   :	\"".DEFAULT_DATE_FORMAT."\",
					ifFormat	   :	\"%Y/%m/%d\",
					align          :    \"$align\"
				});
				</script>
					</td></tr>
		          </table>";

		//inputField -  id of the input field
		//displayArea - display field
		//button - trigger for the calendar (button ID)
		//daFormat - Display date format
		//ifFormat - Input Field date format
		//align - alignment (defaults to 'BR')
		if($method == 'get')
			return $strDate;
		else
			$smartyVars['cal_'.$field] = $strDate;
	}

	function jsCalDate_update($field, $value, $objAjax)
	{
// 		$disp_value = ($value=='')? '' : strftime(DEFAULT_DATE_FORMAT,strtotime($value));
		$disp_value = ($value=='' || substr($value,0,10)=='0000-00-00')? '&nbsp;' : date('Y/m/d',strtotime($value));
		//$disp_value = ($value=='' )? '' : date('m/d/Y',strtotime($value));
		$objAjax->addAssign($field,'value',date('Y/m/d',strtotime($value)));
		$objAjax->addAssign('disp_cal_'.$field,'innerHTML',$disp_value);
		
	}

	// This function is used to generate the random name of the file during the "File Saving Process" in Affiliate Class..
	function uniqueTimeStamp() {
		$milliseconds = microtime();
		$timestring = explode(" ", $milliseconds);
		$sg = $timestring[1];
		$mlsg = substr($timestring[0], 2, 4);
		$timestamp = $sg.$mlsg;
		return ($timestamp);
	}

	function date_format($date="")
	{
	    if (substr($date,0,10)=='0000-00-00')
			$format = '';
		elseif($date!='')
			$format = date("m/d/Y",strtotime($date));
		else
			$format = date("m/d/Y");

		return $format;
	}


	function get_fckEditor($instance='fckEditor', $value= "", $height = 200, $width=450, $toolBarSet="fckCustom", $tbLoc=false)
	{
		$oFCKeditor = new FCKeditor($instance);
		$oFCKeditor->BasePath = '../include/FCKeditor/';
		$oFCKeditor->Value = stripslashes($value);
		$oFCKeditor->Height = $height;	//250;
		$oFCKeditor->Width = $width;		//534 ;
//		$oFCKeditor->ToolBarSet = 'Basic';		//Basic ;
		$oFCKeditor->ToolbarSet = htmlspecialchars($toolBarSet);

		//if($tbLoc)
			//$oFCKeditor->Config['ToolBarLocation'] = 'tb_Loc';

		return $oFCKeditor->CreateHtml() ;
	}

	function truncate($string, $length = 80, $etc = '...',$break_words = false)
	{
	    if ($length == 0)
	        return '';

	    if (strlen($string) > $length) {
	        $length -= strlen($etc);
	        if (!$break_words)
	            $string = preg_replace('/\s+?(\S+)?$/', '', substr($string, 0, $length+1));

	        return substr($string, 0, $length).$etc;
	    } else
	        return $string;
	}

}
?>
