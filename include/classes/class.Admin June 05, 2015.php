<?php
/*------------------------------------------------------------
Developer:	Sumit Kumar, Riti Gulati.
Creation Date:	31/10/2006 (dd/mm/yyyy)
ModifiedDate	ModifiedBy		Comments (As and when)
-------------------------------------------------------------*/
/*This will take care of one of the two actors of the website i.e. ADMIN */

$addl_path ="";
if((DIR_NAME == 'Webservice'))
$addl_path ='../';

require_once $addl_path ."include/common.php";    

class Admin extends BaseClass
{
	function Admin()
	{
		parent::__construct();
	}
	function insert($row)
	{
		
		$lastInsertId=$this->dbFunc->dbInsert("tblAdminMaster", $row);
		return $lastInsertId;
	}
	
	function insertSubAdmin($row){
		return $lastInsertId=$this->dbFunc->dbInsert("tblAdminMaster", $row);
	}

/*	$set is assoc array with key-value pairs */
	function update($id, $row)
	{
//		$set['dtStatus']=$this->myFunc->dbDateTime();
		$where = "intAdminID = '$id'";
		$rows_affected = $this->dbFunc->dbUpdate("tblAdminMaster",$row,$where);
	}

//If admin has not done activity, then can be deleted
	function can_delete($id)
	{
		$sql="SELECT 	* FROM message
			WHERE intMemberIDFrom=$id
			AND enumMessageType = 'A'
			LIMIT 0,1";
		$res = $this->dbFunc->dbFetchRow($sql);
		if(is_array($res))
			return false;

		//todo: add more checks

		return true;
	}

	function delete($id)
	{
		if( $this->can_delete($id) )
		{
			$where = $this->dbObj->quoteInto('intAdminID = ?', $id);
			$rows_affected = $this->dbFunc->dbDelete("tblAdminMaster", $where);
			if ($rows_affected)	return 1;
			else				return 0;
		}
		return 0;
	}

	function get_name($id)
	{
		$sql="SELECT CONCAT(vchFirstName, ' ', vchLastName) FROM tblAdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_email($id)
	{
		$sql="SELECT vchEmailAddress FROM tblAdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_admin($id)
	{
		$sql="SELECT * FROM tblAdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchRow($sql);
		//return $retArr[0]; 	//Returns associative array
	}

/*	$type -- All (but Superadmin), A, D 	*/
	function get_admins($type='SA')
	{
		$sql="SELECT * FROM tblAdminMaster WHERE enumType IN('$type') AND enumType<>'S' AND 1";
		return $this->dbFunc->dbFetchAll($sql, $this->rec_pp,$this->paging_params);
	}

	function get_type($id)
	{
		$sql="SELECT enumType FROM tblAdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_status($id)
	{
		$sql="SELECT enumStatus FROM tblAdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}
	function get_id($email)
	{
		$sql="SELECT intAdminID FROM tblAdminMaster WHERE vchAdminEmail='" .$email ."'";
		return $this->dbFunc->dbFetchOne($sql);
	}

/*
	$key --> keyword (value)
	$keyType --> 0 - ID
			    1 - Email
*/
	function get_password($key)
	{
			
		$sql="SELECT vchAdminPassword FROM tblAdminMaster WHERE vchAdminEmail='" .$key ."'";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_password_for_change_pass($adminid)
	{
		$sql="SELECT vchadminpassword FROM tbladminmaster WHERE intadminid='" .$adminid ."'";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function change_password($id, $oldPass, $newPass, $rePass)
	{
		$currPass = $this->get_password_for_change_pass($id);
		if($currPass != $oldPass)
			return 0;
		$where = "intadminid =$id";
		$set  = array('vchadminpassword'=>$newPass);
		$rows_affected = $this->dbFunc->dbUpdate("tbladminmaster", $set, $where);
		return 1;
	}

//	function set_status($id, $status)
//	{
//		$set = array ( 'enumStatus' => $status);
//		$where = $this->dbObj->quoteInto('intAdminID = ?', $id);
//		$this->dbFunc->dbUpdate("tblAdminMaster", $set, $where);
//	}
    function getAllClass($schoolId)
    {
        $sql = "SELECT * FROM class WHERE SCHOOL_ID = $schoolId order by CLASS_CODE";
		return $this->dbFunc->dbFetchAll($sql);
    }
    
    function getAllGroups($schoolId)
    {
        $sql = "SELECT * FROM groups WHERE SCHOOL_ID = $schoolId ";
		return $this->dbFunc->dbFetchAll($sql);
    }
    
    function getAllSubjects($schoolId)
    {
        $sql = "SELECT * FROM subject WHERE SCHOOL_ID = $schoolId ";
		return $this->dbFunc->dbFetchAll($sql);
    }

	function set_status($id, $status)
	{
		$set = array ( 'enumStatus' => $status);
		$where = "intAdminID ='$id'";
		$this->dbFunc->dbUpdate("tblAdminMaster", $set, $where);
	}
	
	function delete_subadmin($id)
	{
		$where = "intAdminID ='$id'";
		$this->dbFunc->dbDelete("tblAdminMaster",$where);
	}
	
	function admin_login($vchEmailAddress, $vchAdminPassword)
	{
		$strSql = "SELECT * FROM tbladminmaster WHERE vchemailaddress='".$vchEmailAddress ."' AND vchadminpassword='".$vchAdminPassword."' and enumdelstatus='N' ";
//		AND (enumStatus = 'A' OR enumStatus = 'SA')
		$row = $this->dbFunc->dbFetchRow($strSql);
		if(strcmp($vchAdminPassword,$row['vchadminpassword'])==0){
			if($row['enumstatus']=='D'){
				return 1; //account deactivated
			}elseif(is_array($row) )
			{
			         
				    $_SESSION['intschoolid']=$row['intschoolid'];
					$_SESSION['intAdminID']=$row['intadminid'];
					$_SESSION['enumadmintype']=$row['enumadmintype'];
					$_SESSION['vchemailaddress']=$row['vchemailaddress'];
                    $_SESSION['vchassignedmodules']=$row['vchassignedmodules'];
                    $_SESSION['intqid']=$row['intqid'];
                  
					return $row;
					
			}
			else
			{
				return 0;			//wrong user/pass
			}
		}else{
			return 0;			//wrong user/pass
		}
	}

	function add_admin_action($set)
	{
		$set['intAdminID']=$_SESSION['intAdminID'];

		if($set['dtAction']=='')
			$set['dtAction']=$this->myFunc->dbDateTime();
		//myPrintR($set);
		if($_SESSION['intAdminID'])
			$lastInsertId=$this->dbFunc->dbInsert("adminactionlog", $set);
		return $lastInsertId;
	}

	function get_count_of_records($table)
	{
		$sql="SELECT count(*) FROM $table WHERE enumStatus='A'";
		return $this->dbFunc->dbFetchOne($sql);
	}

	/*function isAlreadyExisting($adminEmail,$id=''){
		$where .= " WHERE ";
		$where .= $this->dbObj->quoteInto('vchEmailAddress = ?', $adminEmail);
		if(!empty($id)){
			$where .= " and ".$this->dbObj->quoteInto('intAdminID != ?', $id);
		}
		$strSql = "SELECT vchEmailAddress FROM tblAdminMaster $where";
		return $this->dbFunc->dbFetchOne($strSql);
	}*/
	
	function isAlreadyExisting($adminEmail,$id){
		$where = "vchEmailAddress = '$adminEmail'";
		if(!empty($id)){
			$where .= " and intAdminID = '$id'";
		}
		$strSql = "SELECT vchEmailAddress FROM tblAdminMaster  WHERE $where";
		return $this->dbFunc->dbFetchOne($strSql);
	}
	
	function isAlreadyExistingName($checkname){
		$where = "intAdminID = '".$_POST['intAdminID']."'";
		if(!empty($id)){
			$where .= " and intAdminID = '$id'";
		}
		$strSql = "SELECT vchFirstName,vchLastName FROM tblAdminMaster  WHERE $where";
		return $this->dbFunc->dbFetchOne($strSql);
	}

	function get_modules($moduleids="")
	{
		$sql="SELECT * FROM tbladminmodules WHERE enumstatus = 'A'";
		return $this->dbFunc->dbFetchAll($sql);
	}
	
//	function get_modulesName($id)
//	{
//		$sql="SELECT intModuleID FROM tblAdminModules WHERE intAdminID ='$id'";
//		return $this->dbFunc->dbFetchAll($sql);
//	}
	
	function get_modules_for_listing()
	{
		$sess_moduleids = $_SESSION['intmoduleid'];
		if (empty($sess_moduleids)) $sess_moduleids=0;
		$sql="SELECT * FROM tbladminmodules  WHERE intmoduleid IN ($sess_moduleids) ";
		return $this->dbFunc->dbFetchAll($sql);
	}	
	function get_admin_deatils($key, $keyType)
	{
		
		switch ($keyType){
			case 0:
				$keyType="intAdminID";	break;
			case 1:
				$keyType="vchemailaddress ";	break;
		}

		$sql="SELECT * FROM tbladminmaster WHERE $keyType='$key'";
		//echo $sql;
		
		return $this->dbFunc->dbFetchRow($sql);
		
	}
	
	function get_video_records($id){
		$sql="SELECT * FROM tblHomepageVideos  WHERE intHomepageVideoId =".$id." ";
		return $this->dbFunc->dbFetchAll($sql);
		//print_R($result);exit;
	}
	
	/*------(Start)Sub admin related function--------*/
	function getSubAdminListing($type='A'){
		$sql="SELECT * FROM tblAdminMaster WHERE enumAdminType ='$type' ORDER by intAdminID DESC";
		return $this->dbFunc->dbFetchAll_page($sql,$this->rec_pp,$this->paging_params);
	}
	
	function getSubAdmin($id){
		$sql="SELECT * FROM tbladminmaster WHERE intadminid='$id'";
		return $this->dbFunc->dbFetchRow($sql);
	}
		
	/*------(End)Sub admin related function--------*/
}
?>
