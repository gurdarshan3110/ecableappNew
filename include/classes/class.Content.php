<?php
/**
*------------------------------------------------------------
* 
*Developer:	Amritpal Singh.
* 
*Creation Date:	19/02/2009 (dd/mm/yyyy)
* 
*ModifiedDate	ModifiedBy		Comments (As and when)
* 
*-------------------------------------------------------------
*/

/**
Description: This will take care of Content Modules:
*/
$addl_path ="";
if((ZW_IN == 'ADMIN')){
	$addl_path="../";
}

require_once $addl_path ."include/common.php";

class classContent extends BaseClass
{
/**
 * This function is used to insert the content in the database
 */
	function insertContent($set)
	{
		return $this->dbFunc->dbInsert('tblContentMaster', $set);
	}
	
/**
 * This function is used to update the content in the database
 */	
	
	function updateContent($set,$page_id)
	{
		$where = "intPageID = ".$page_id;
		return $this->dbFunc->dbUpdate('tblContentMaster', $set, $where);
	}

/**
 * The getContent function is used to get the content from the database
 */	

	function getContent($page_id)
	{
		$sql = "SELECT * FROM tblContentMaster WHERE intPageID=$page_id";
		return $this->dbFunc->dbFetchRow($sql);
	}
	
	function getTitle($page_id)
	{
		$sql = "SELECT * FROM tblPageMaster WHERE intPageID=$page_id";
		return $this->dbFunc->dbFetchRow($sql);
	}
	
/**
 * The get_Page function is used to get the pages from the database
 */	
	
	function get_Page($key='',$parentPageId='',$showOnHomePage='')
	{
		$where='';
		if(!empty($key))
		{
			$where.=" AND pm.vchPageName like '%".$key."%'";
		}
		if(!empty($parentPageId))
		{
			$where.=" AND pm.intParentID =".$parentPageId.""; 
		}
		if(!empty($showOnHomePage) and $showOnHomePage='1')
		{
			$where.=" AND cm.enumShowOnHome ='Y'"; 
		}
		
		$strSql = "SELECT pm.vchPageName,pm.intPageID,pm.intSequence FROM tblPageMaster pm left join tblContentMaster cm on (cm.intPageID=pm.intPageID) Where pm.enumStatus = 'A'  ".$where." order by pm.intSequence ASC";
		return $this->dbFunc->dbFetchAll_page($strSql,$this->rec_pp,$this->paging_params);
		
	}

	
	function getparentPage($parentid)
	{
		 $sql = "SELECT vchBanner,tblContentMaster.intPageID,tblPageMaster.vchPageName  FROM tblPageMaster , tblContentMaster where tblPageMaster.intPageID = tblContentMaster.intPageID and  tblPageMaster.intPageID=$parentid";
		return $this->dbFunc->dbFetchRow($sql);
	}
	
	
	
	
	
	
	function getParentDetail($pageId)
	{
		
		
		
		  $sql = "SELECT intParentID  FROM tblPageMaster where  tblPageMaster.intPageID='$pageId'";
		  
		 $parentPageId=$this->dbFunc->dbFetchOne($sql);
		 
		 
		/* $sql3="SELECT intPageID  FROM tblPageMaster where  tblPageMaster.intPageID='$parentPageId'";
		  
		 $childPageId=$this->dbFunc->dbFetchOne($sql);
		 
		 
		 if($childPageId==$parentPageId)
		 {
		 	
		 	 $parentPageId=$parentPageId;
		 }*/
		 
		 
		 
		 if($pageId==1 || $pageId==7 || $pageId==56 || $pageId==57 || $pageId==58 || $pageId==62 || $pageId==63 || $pageId==65 || $pageId==69 || $pageId==71)
		{
			$parentPageId=$pageId;
			
		}elseif($parentPageId==8){
			
			 $parentPageId=$parentPageId;
			
		}elseif($parentPageId==7){
			
			 $parentPageId=$pageId;
		}
		 
		$sql1 = "Select tblPageMaster.intPageID ,tblPageMaster.vchPageName, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where tblPageMaster.intPageID = tblContentMaster.intPageID and  tblPageMaster.intParentID='$parentPageId' and tblPageMaster.enumStatus='A'";
		 
		return $this->dbFunc->dbFetchAll($sql1);
		
	}
/**
 * The isAlreadyExisting function is used to check the existing fakeUrl
 */		
	
	function isAlreadyExisting($vchPageFakeURL,$intPageID='') // id
	{
		if($intPageID!='') {
			$where=" and intPageID!= '".$intPageID."'";
		}
		$strSql = "SELECT * FROM tblContentMaster WHERE vchPageFakeURL='".$vchPageFakeURL."' ".$where ;
		//echo($strSql);
		return $this->dbFunc->dbFetchRow($strSql);
	}
	
	function isAlreadyExistingPage($vchPageName,$intPageID='') // id
	{
		if($intPageID!='') {
			$where=" and intPageID!= '".$intPageID."'";
		}
		$strSql = "SELECT * FROM tblContentMaster WHERE vchPageName='".$vchPageName."' ".$where ;
		//echo($strSql);
		return $this->dbFunc->dbFetchRow($strSql);
	}
	
	function isAlreadyExistingPageMaster($vchPageName,$intPageID='') // id
	{
		if($intPageID!='') {
			$where=" and intPageID!= '".$intPageID."'";
		}
		$strSql = "SELECT * FROM tblPageMaster WHERE vchPageName='".$vchPageName."' ".$where ;
		//echo($strSql);
		return $this->dbFunc->dbFetchRow($strSql);
	}
	
	function getPageDetail($intPageID){
		$sql="select * from tblContentMaster where intPageID=$intPageID";
		return $this->dbFunc->dbFetchRow($sql);
	}
	
	function getContentTop(){
		$sql = "SELECT tblPageMaster.intPageID ,tblPageMaster.vchPageName, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where tblPageMaster.intPageID = tblContentMaster.intPageID order by tblPageMaster.intPageID";
		return $this->dbFunc->dbFetchAll($sql);
	}
	
	function getContentPage(){
		$sql = "SELECT tblContentMaster.intPageID ,tblPageMaster.vchPageName,tblPageMaster.enumStatus, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where  tblPageMaster.intPageID = tblContentMaster.intPageID order by tblPageMaster.intPageID";
		return $this->dbFunc->dbFetchAll($sql);
	}	
	
	function getContentPageByParentID($parnetid)
	{
		echo $sql = "SELECT tblContentMaster.intPageID ,tblPageMaster.vchPageName,tblPageMaster.enumStatus, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where  tblPageMaster.intPageID = tblContentMaster.intPageID and tblPageMaster.intParentID='$parnetid' order by tblPageMaster.intPageID";
		return $this->dbFunc->dbFetchAll($sql);
		
	}
	function getservicecontent()
	{
		echo $sql = "SELECT tblServiceQueries.vchName ,tblServiceQueries.vchEmail,tblServiceQueries.vchContactNumber, tblServiceQueries.txtMaillingAddress,tblServiceQueries.vchMsgSubject,tblServiceQueries.txtMessage,tblServices.vchService FROM tblServiceQueries , tblServices where  tblServiceQueries.intServiceID = tblServices.intServiceID";
		return $this->dbFunc->dbFetchAll($sql);
		
	}
	
	
	
	function getPageID($fakeURL)	
	{
		$sql = "SELECT * FROM tblContentMaster WHERE vchPageFakeURL='$fakeURL'";
		return $this->dbFunc->dbFetchRow($sql);
	}
	
	function insertPage($set)
	{
		
		return $this->dbFunc->dbInsert('tblPageMaster', $set);
		
		
	}
	
	function updatePage($page_id,$set)
	{
		
		$where = 'intPageID = '.$page_id;
		return $this->dbFunc->dbUpdate('tblPageMaster', $set, $where);
	
	
	}
	

	function displayTreeMenu($parentID)
	{
		$sql="SELECT tblContentMaster.intPageID ,tblPageMaster.vchPageName,tblPageMaster.enumStatus, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where  tblPageMaster.intPageID = tblContentMaster.intPageID and tblPageMaster.intParentID='$parentID' and tblPageMaster.enumStatus='A' order by tblPageMaster.intPageID ";
		
	$rows = $this->dbFunc->dbFetchAll($sql);
		
	if(!empty($rows))
	{
   	   foreach($rows as $page)
   	   {
   	   
   	   	
   		$selectbox.= "<li><a href='".$page['vchpagefakeurl']."'>".$page['vchpagename']."</a>";
   		$selectbox.=$this->childtree($page['intpageid']);
   		$selectbox.= "</li>";
   	   }
	}else{
		
		$selectbox.= "";
	}

   
  
   		
   		
   			
   			
   			//$selectbox.=$this->childtree($row['intcatid'],$level+1,$catgoryid);
   	
   	   
   	return $selectbox;
} 

function  childtree($parentId)
{
	
	 $sql="SELECT tblContentMaster.intPageID ,tblPageMaster.vchPageName,tblPageMaster.enumStatus, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where  tblPageMaster.intPageID = tblContentMaster.intPageID and tblPageMaster.intParentID='$parentId' and tblPageMaster.enumStatus='A' order by tblPageMaster.intPageID";
	  
    $rows = $this->dbFunc->dbFetchAll($sql);
    if(!empty($rows))
    {
	  	$selectbox.="<ul>";
	   	foreach($rows as $inpage)
	   	{
	      	
	  		$selectbox.="<li><a href='".$inpage['vchpagefakeurl']."' title='".$inpage['vchpagename']."'>".$inpage['vchpagename']."</a>";
	  		
	  		   $selectbox.=$this->childtreelevel($inpage['intpageid']);
	  		
	  		$selectbox.="</li>";
	   
	     	
	  	}
		$selectbox.="</ul>";
    }else{
    	$selectbox.="";
    }
	//$selectbox.=$this->childtree($inpage['intpageid'], $level+1,$catgoryid);
  	
	return $selectbox;
	
	
}

function  childtreelevel($parentId)
{
	
	 $sql="SELECT tblContentMaster.intPageID ,tblPageMaster.vchPageName,tblPageMaster.enumStatus, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where  tblPageMaster.intPageID = tblContentMaster.intPageID and tblPageMaster.intParentID='$parentId' and tblPageMaster.enumStatus='A' order by tblPageMaster.intPageID";
	  
    $rows = $this->dbFunc->dbFetchAll($sql);
    if(!empty($rows))
    {
	  	$selectbox.="<ul>";
	   	foreach($rows as $inpage)
	   	{
	      	
	  		$selectbox.="<li><a href='".$inpage['vchpagefakeurl']."' title='".$inpage['vchpagename']."'>".$inpage['vchpagename']."</a>
	  		
	  		
	  		</li>";
	   
	     	
	  	}
		$selectbox.="</ul>";
    }else{
    	$selectbox.="";
    }
	//$selectbox.=$this->childtree($inpage['intpageid'], $level+1,$catgoryid);
  	
	return $selectbox;
	
	
}


function displayTreeSitemap($parentID, $level,$catgoryid)
{
	
		 $sql="SELECT tblContentMaster.intPageID ,tblPageMaster.vchPageName,tblPageMaster.enumStatus, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where  tblPageMaster.intPageID = tblContentMaster.intPageID   and  tblPageMaster.intParentID='0' and  tblPageMaster.enumStatus='A' order by tblPageMaster.intPageID";
	
	$rows = $this->dbFunc->dbFetchAll($sql);
		
	if(!empty($rows))
	{
   	   foreach($rows as $page)
   	   {
   	   
   	   	
   		$selectbox.= "<li style='font-family:Arial;font-size:15px;color:#035E91'><a href='".$page['vchpagefakeurl']."'>".$page['vchpagename']."</a>";
   		$selectbox.=$this->childTreeSitemap($page['intpageid']);
   		$selectbox.= "</li>";
   	   }
	}else{
		
		$selectbox.= "";
   
} 
	return $selectbox;
}
function  childTreeSitemap($parentId,$level,$catgoryid)
{
	
 	
	  
     $sql="SELECT tblContentMaster.intPageID ,tblPageMaster.vchPageName,tblPageMaster.enumStatus, tblContentMaster.vchPageFakeURL FROM tblPageMaster , tblContentMaster where  tblPageMaster.intPageID = tblContentMaster.intPageID and tblPageMaster.intParentID='$parentId' and tblPageMaster.enumStatus='A' order by tblPageMaster.intPageID";
	  
    $rows = $this->dbFunc->dbFetchAll($sql);
    //myPrintR($rows);
    if(!empty($rows))
    {
	  	$selectbox.="<ul>";
	   	foreach($rows as $inpage)
	   	{
	      	
	  		$selectbox.="<li><a href='".$inpage['vchpagefakeurl']."' title='".$inpage['vchpagename']."'>".$inpage['vchpagename']."</a>
	  		
	  		
	  		</li>";
	   
	     	$selectbox.=$this->childTreeSitemap($inpage['intpageid']);
	  	}
		$selectbox.="</ul>";
    }else{
    	$selectbox.="";
    }
	
	return $selectbox;
}

function getMainCatContent($fakeURL)	
{
	$sql = "SELECT * FROM tblYachtMainCategory WHERE vchFakeURL='$fakeURL'";
	return $this->dbFunc->dbFetchRow($sql);
}	
	
	
	
	

	
	
	
}

?>