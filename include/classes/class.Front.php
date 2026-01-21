<?php
/*------------------------------------------------------------
Developer:	Sumit Kumar, Riti Gulati.
Creation Date:	31/10/2006 (dd/mm/yyyy)
ModifiedDate	ModifiedBy		Comments (As and when)
-------------------------------------------------------------*/
/*This will take care of one of the two actors of the website i.e. ADMIN */
$addl_path ="";
if(ZW_IN == 'ADMIN')
	$addl_path="../";
require_once $addl_path ."include/common.php";

class Front extends BaseClass
{
	function Admin()
	{
		parent::__construct();
	}
	function insert($row)
	{
		//$row['enumType']='A';
		$row['enumStatus']='A';
		$row['dtStatus']=$this->myFunc->dbDateTime();
		$lastInsertId=$this->dbFunc->dbInsert("AdminMaster", $row);
		return $lastInsertId;
	}

/*	$set is assoc array with key-value pairs */
	function update($id, $set)
	{
		$set['dtStatus']=$this->myFunc->dbDateTime();
		$where = $this->dbObj->quoteInto('intAdminID = ?', $id);
		$rows_affected = $this->dbFunc->dbUpdate("AdminMaster", $set, $where);
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
			$rows_affected = $this->dbFunc->dbDelete("AdminMaster", $where);
			if ($rows_affected)	return 1;
			else				return 0;
		}
		return 0;
	}

	function get_name($id)
	{
		$sql="SELECT CONCAT(vchFirstName, ' ', vchLastName) FROM AdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_email($id)
	{
		$sql="SELECT vchEmailAddress FROM AdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_admin($id)
	{
		$sql="SELECT * FROM AdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchRow($sql);
		//return $retArr[0]; 	//Returns associative array
	}

/*	$type -- All (but Superadmin), A, D 	*/
	function get_admins($type='SA')
	{
		$sql="SELECT * FROM AdminMaster WHERE enumType IN('$type') AND enumType<>'S' AND 1";
		return $this->dbFunc->dbFetchAll($sql, $this->rec_pp,$this->paging_params);
	}

	function get_type($id)
	{
		$sql="SELECT enumType FROM AdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_status($id)
	{
		$sql="SELECT enumStatus FROM AdminMaster WHERE intAdminID=$id";
		return $this->dbFunc->dbFetchOne($sql);
	}
	function get_id($email)
	{
		$sql="SELECT intAdminID FROM AdminMaster WHERE vchAdminEmail='" .$email ."'";
		return $this->dbFunc->dbFetchOne($sql);
	}

/*
	$key --> keyword (value)
	$keyType --> 0 - ID
			    1 - Email
*/
	function get_password($key)
	{
			
		$sql="SELECT vchPassword FROM AdminMaster WHERE vchAdminEmail='" .$key ."'";
		return $this->dbFunc->dbFetchOne($sql);
	}

	function get_password_for_change_pass($adminid)
	{
		$sql="SELECT vchPassword FROM AdminMaster WHERE intAdminID='" .$adminid ."'";
		return $this->dbFunc->dbFetchOne($sql);
	}

	/*
	Description: Updates the Password
	Returns:	0 if Old Password doesn't match.
			1 if Updated
			2 if New Pass and Retype Pass doesn't match.
	*/
	function change_password($id, $oldPass, $newPass, $rePass)
	{
		$currPass = $this->get_password($id);
		if($currPass != $oldPass)
			return 0;
		$where = "intAdminID =$id";
		$set  = array('vchPassword'=>$newPass);
		$rows_affected = $this->dbFunc->dbUpdate("AdminMaster", $set, $where);
		return 1;
	}

	function set_status($id, $status)
	{
		$set = array ( 'enumStatus' => $status);
		$where = $this->dbObj->quoteInto('intAdminID = ?', $id);
		$this->dbFunc->dbUpdate("AdminMaster", $set, $where);
	}

	function admin_login($vchUserName, $vchPassword)
	{
		$strSql = "SELECT * FROM AdminMaster WHERE vchUserName='".$vchUserName ."' AND vchPassword='".$vchPassword."'";
		$row = $this->dbFunc->dbFetchRow($strSql);
		if(is_array($row) )
		{
			
				$_SESSION['intAdminID']=$row['intadminid'];
				$_SESSION['vchUserType']=$row['vchusertype'];
				$_SESSION['vchUserName']=$row['vchusername'];
				return $row;
				
		}
		else
		{
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

	function isAlreadyExisting($adminEmail,$id=''){
		$where .= " WHERE ";
		$where .= $this->dbObj->quoteInto('vchEmailAddress = ?', $adminEmail);
		if(!empty($id)){
			$where .= " and ".$this->dbObj->quoteInto('intAdminID != ?', $id);
		}
		$strSql = "SELECT vchEmailAddress FROM AdminMaster $where";
		return $this->dbFunc->dbFetchOne($strSql);
	}

	function get_modules($moduleids="")
	{
		$sql="SELECT * FROM tblAdminModules ";
		return $this->dbFunc->dbFetchAll($sql);
	}
	function get_modules_for_listing()
	{
		$sess_moduleids = $_SESSION['vchmoduleid'];
		if (empty($sess_moduleids)) $sess_moduleids=0;
		$sql="SELECT * FROM tblAdminModules  WHERE intModuleID IN ($sess_moduleids) ";
		return $this->dbFunc->dbFetchAll($sql);
	}	
}
?>
