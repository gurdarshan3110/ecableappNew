<?php
//-------------Paging Class file for Photocrazed-----------------------------
//-------------Created By Harminder Singh------------------------------------------------------
//-------------Date: 26 April 2005-------------------------------------------------------------
/**
 * mysqlPaging	- This is a simple class that can return a MySQL database query results for spliting into multiple pages given the 
		- maximum number of result rows to present on each page.
		
		- Its usage is simple:
		- Create a class object with 2 arguments: MySQL SQL query, limit of records per page
		- Output the page numbers as links
		- Retriev the MySQL Query for results for retriving the results for the current page
 * @author Harminder Singh
 * @copyright 2005 - 2006 Harminder Singh
 */
/**
 * @desc MySQL Database rows pagging
 */
class mysqlPaging {
	var $max;
	var $query;
	var $dataQuery;
	var $start;
	var $page;
	var $total;
	var $pageNum;
	var $link;
	var $setQuery;
	var $set=false;
	var $totalPages;
	/**
	 * @param String $query
	 * @param Integer $max
	 * @param Integer $link
	 * @return void
	 */
	function mysqlPaging($query, $max) {
		$this->query=$query;
		$this->max=$max;
		$this->link=$link;
		if (isset($_REQUEST['page']) && $_GET['page'] >0) {
			$this->page = $_GET['page'];
		} else {
			$this->page = 1;
		}
		$this->total = mysqli_num_rows(mysqli_query($_SESSION['CONN'],$this->query));
		$this->totalPages=ceil($this->total/$this->max);
		$this->start = ($this->max*$this->page)-$this->max;
		if ($this->total<=$this->max) {
			$this->pageNum = 1;
		} elseif (($this->total%$this->max)==0) {
			$this->pageNum=$this->total/$this->max;
		} else {
			$this->pageNum=$this->total/$this->max+1;
		}
		$this->pageNum=floor($this->pageNum);
		//echo "NUM!".$this->pageNum;
		$this->dataQuery=$this->query." LIMIT ".$this->start.", ".$this->max;	
		$this->setQuery();
	}
	function mysqlPagingRe() {

		$this->total = mysqli_num_rows(mysqli_query($_SESSION['CONN'],$this->query));
		$this->totalPages=ceil($this->total/$this->max);
		$this->start = ($this->max*$this->page)-$this->max;
		if ($this->total<=$this->max) {
			$this->pageNum = 1;
		} elseif (($this->total%$this->max)==0) {
			$this->pageNum=$this->total/$this->max;
		} else {
			$this->pageNum=$this->total/$this->max+1;
		}
		$this->pageNum=floor($this->pageNum);
		//echo "NUM".$this->pageNum;
		$this->dataQuery=$this->query." LIMIT ".$this->start.", ".$this->max;
		$this->setQuery();
	}
	/**
	 * Prints page numbers
	 * @return void
	 */
	/*********COMMENTED FUNCTION
	function printPagesNums($addon = "") 
	{

		$sqlq=mysql_query($this->dataQuery);
		$pagelist="";
		if (mysql_num_rows($sqlq)> 0)
		{			
			for ($pageId=1; $pageId<=$this->pageNum; $pageId++) {
				if ($pageId != $this->page) {
					if ($pageId==1) {
						if ($this->page > 1)
						{
							$pagelist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.($this->page-1).$addon.'">';
							$pagelist.= "<<";
							$pagelist.= "</a>&nbsp;\n";
						}
						$pagelist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$pageId.$addon.'">'.$pageId.'</a>&nbsp;'."\n";
					}elseif ($pageId==$this->pageNum){
						$pagelist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$pageId.$addon.'">'.$pageId.'</a>&nbsp;'."\n";
						if ($this->page!=$this->pageNum)
						{
							$pagelist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.($this->page+1).$addon.'">';
							$pagelist.= ">>";
							$pagelist.= "</a>\n";
						}
					}else
						$pagelist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$pageId.$addon.'">'.$pageId.'</a>&nbsp;'."\n";
					
				} else {
					if ($pageId==1) {
						if ($this->page > 1)
						{
							$pagelist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.($this->page-1).$addon.'">';
							$pagelist.= "<<";
							$pagelist.= "</a>&nbsp;\n";
						}
						$pagelist.= '<strong>'.$pageId.'</strong>&nbsp;'."\n";
					}elseif ($pageId==$this->pageNum){
						$pagelist.= '<strong>'.$pageId.'</strong>&nbsp;'."\n";
						if ($this->page!=$this->pageNum)
						{
							$pagelist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.($this->page+1).$addon.'">';
							$pagelist.= ">>";
							$pagelist.= "</a>\n";
						}
					}else
						$pagelist.= '<strong>'.$pageId.'</strong>&nbsp;'."\n";
				}
			}			
		}
		if($pagelist=='1')
			$pagelist="";
		return $pagelist;
	}
	*****/
	/**
	 * Prints page numbers
	 * @return void
	 */
	function printPagesNums($addon = "")
	{
		$datalist="";
		$sqlq=mysqli_query($_SESSION['CONN'],$this->dataQuery);
		if (mysqli_num_rows($sqlq)> 0)
		{
			/* Print the first and previous page links if necessary */ 
			if (($this->page != 1) && ($this->page)) 
			{ 
				$datalist.= '<a href="'.$_SERVER['PHP_SELF'].'?page=1'.$addon.'"  color="white">';
				$datalist.= "";
				$datalist.= "</a>&nbsp;\n";

				$datalist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.($this->page-1).$addon.'"   color="white" >';
				$datalist.= "<img src='images/left-page-indicator.gif' alt='Previous' title='Previous' border='0' valign='center'>";
				$datalist.= "</a>&nbsp;\n";
			  
		   
			} 
			///////////////////
			//print "this->pageNum: ".$this->pageNum;
			//print "this->page: ".$this->page;
			$countStart=1;
			$countEnd=10;
			//$countEnd=20;
			$countEnd=($this->pageNum > $countEnd)?$countEnd:$this->pageNum;
			if ($this->page >= $countEnd) 
			{
				$countEnd=$this->page+5;
				$countStart=$this->page-4;
				//$countEnd=$this->page+10;
				//$countStart=$this->page-9;
			}

			$countEnd=($this->pageNum > $countEnd)?$countEnd:$this->pageNum;
			
			$countStart=($countStart>$this->pageNum)?$this->pageNum:$countStart;
			//echo $countStart."--".$countEnd."<br/>";
			//if($countEnd >= $this->pageNum-4)
			if($countEnd >= $this->pageNum)
			{
				$countStart= $this->pageNum -9;
				//$countStart= $this->pageNum -19;
				$countEnd=$this->pageNum;
			}
			//print " Start: ".$countStart;
			//print " End: ".$countEnd;
			$countStart=($countStart<1)?1:$countStart;
			//echo $countStart."--".$countEnd;
			////////////////////////
			//mfor ($pageId=1; $pageId<=$this->pageNum; $pageId++)
			for ($pageId=$countStart; $pageId<=$countEnd; $pageId++)
			{
			 //print "<BR>PAGEID: ".$pageId;
			 //print "<BR>this->page: ".$this->page;//current page
			
				if ($pageId != $this->page)
				{
					if ($pageId==1)
					{
						$datalist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$pageId.$addon.'"  color="white" class="link">'.$pageId.'</a>&nbsp;'."\n";
					}
					elseif ($pageId==$this->pageNum)
					{
						$datalist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$pageId.$addon.'"  color="white" class="link">'.$pageId.'</a>&nbsp;'."\n";
					}
					else
						$datalist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$pageId.$addon.'"  color="white" class="link">'.$pageId.'</a>&nbsp;'."\n";
					
				} 
				else 
				{
					if ($pageId==1)
					{
						$datalist.= '<strong>'.$pageId.'</strong>&nbsp;'."\n";
					}
					elseif ($pageId==$this->pageNum)
					{
						$datalist.= '<strong>'.$pageId.'</strong>&nbsp;'."\n";
					}
					else 				
						$datalist.= '<strong>'.$pageId.'</strong>&nbsp;'."\n";
				}
			}	
			/* Print the Next and Last page links if necessary */ 
			//print "this->page: ".$this->page;
			//print "this->pageNum: ".$this->pageNum;
			 if (($this->page != $this->pageNum) && ($this->pageNum != 0)&&($this->page != "")) 
			  { 
					$datalist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.($this->page+1).$addon.'"  color="white">';
					$datalist.= "<img src='images/right-page-indicator.gif' alt='Next' title='Next' border='0' valign='center'>";
					$datalist.= "</a>&nbsp;\n";

					$datalist.= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->pageNum.$addon.'"  color="white">';
					$datalist.= "";
					$datalist.= "</a>&nbsp;\n";
			  } 
		}
		
		return $datalist;
	}

	function setQuery() {
		if ($this->set==false)
		{
			$sqlq=mysqli_query($_SESSION['CONN'],$this->dataQuery);
			if (mysqli_num_rows($sqlq)==0 && $this->page > 1)
			{
				$page=$this->page;
				$this->page=($page-1);
				$this->mysqlPagingRe();
			}else{
				$this->set=true;
				$this->setQuery=mysqli_query($_SESSION['CONN'],$this->dataQuery);
			}
		}
	}
	/**
	 * Returns Prepared MySQL Query
	 * @return MySQL Query
	 */

	function returnQuery() {
		
		return $this->setQuery;
	}
	/**
	 * Prints page numbers of total pages
	 * @return void
	 */
	function printTotalPages() {
		
		return "Showing page ".$this->page." of ".$this->totalPages;
	}
	function TotalPages() {
		
		return $this->totalPages;
	}
}
?>