<?php
require_once('helper.php');
$msg        =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id = base64_decode($_GET['id']);
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
    $permission="";
    foreach ($_POST['permission'] as $y) {
        if($permission=="")
        {
          $permission=$y;  
        }
        else
        {
          $permission=$permission.",".$y;    
        }
    }
        $rowArray = array(
                'NAME'         =>$_POST['name'],
                'PARENT'     =>'0',
                'PERMISSION'     =>$permission,
                'ADDED_TIME'      =>date('Y-m-d H:i:s'),
                'ADDED_BY'      =>$_SESSION['USER_ID'],
                );
    $cond       = "";
    $cond       = "SCHOOL_ID = ".$_SESSION['SCHOOL_ID']." AND NAME =".$_POST['name'];
    $recdata= $objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' and NAME='$_POST[name]'","ID","modulemaster");
    
    if($id)
	{
	    if($recdata!=$id)
        {           
                $_SESSION['msg'] = 5;
                if(!$_POST['ID'])
                {
                $rowArray = "";
                $rowArray = $_POST;
                }
        }
        else{
                $where         =   "ID =".$id;
              
                $rowArray1 = array(
                        'NAME'         =>$_POST['name'],
                        'PARENT'     =>'0',
                        'PERMISSION'     =>$permission,
                        'UPDATED_TIME'      =>date('Y-m-d H:i:s'),
                        'UPDATED_BY'      =>$_SESSION['USER_ID'],
                        );
        		$val   = $objMisc->update("modulemaster",$rowArray1,$where);
                $_SESSION['msg'] = 2;
        		header("Location:permissions-admin.php?page=".$_REQUEST['page']."");
                exit;
            }
	} else {
	    
            if($recdata)
            {           
                    $_SESSION['msg'] = 5;
                        if(!$_POST['ID'])
                        {
                            $rowArray = "";
                            $rowArray = $_POST;
                        }
            }
            else
            {
                $val = $objMisc->insert("modulemaster",$rowArray);
                $_SESSION['msg'] = 1;
                header("location:permissions-admin.php");
                exit;
            }
        }
   
}

if($id){
    $where = 'ID = '.$id;
    $rowArray = $objMisc->getRow("modulemaster",$where);
}

$per=explode(',',$rowArray['permission']);

$wherethis = "1=1 AND PARENT='0' order by ID DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","modulemaster",$wherethis);
$i  = 1;
$pagin_recs = "";
if($_SESSION['USER_TYPE']=='A')
{
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th>ID</th><th width="20%">Module Name</th>
<th>Permissions</th><th>Action';

if(is_array($classRecord[1])){
    
    if(in_array('1_D',$_SESSION['pass']) || $_SESSION['USER_TYPE']=='SCH'){
       //$pagin_recs .='&nbsp;&nbsp;<a href="javascript:;" title="Check All"  onclick="check_all(\'artCatCount\',\'artCatCheckbox\')"><input type="checkbox"></a>All';
        
       //$pagin_recs .= '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" title="Delete" onclick="return chkOptions_all(\'Delete\',frmListing,\'artCatCheckbox\',\'artCatCount\')" class="btn btn-red"class="btn btn-red">Delete</a>';
     }
     
}
$pagin_recs .= '</th></tr></thead><tbody>';				
	if(is_array($classRecord[1]) && !empty($classRecord[1]))
	{
	   foreach ($classRecord[1] as $k => $rowRec)
    	{		
        	if($k%2==0)	
        	$pagin_recs .= '<tr class="odd gradeX">';
        	else
        	$pagin_recs .= '<tr class="even gradeX">';
            $pagin_recs .='<td>'.$rowRec['id'].'</td>';
            $pagin_recs .='<td>'.$rowRec['name'].'</td>';
            $pagin_recs .='<td>'.$rowRec['permission'].'</td>';
            $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['id'].'" id="enumStatus'.$rowRec['id'].'"  value="'.$rowRec['status'].'">';
           
            if($_SESSION['USER_TYPE']=='A'){
                    if($rowRec['status']=='A')
                    {
                       $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['id'].'" id="imgStatus'.$rowRec['id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['id'].');">';
                    }
                    else
                    {
                       $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['id'].'" id="imgStatus'.$rowRec['id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['id'].');">';
                    }
                }
            if(in_array('1_E',$_SESSION['pass'])  || $_SESSION['USER_TYPE']=='SCH'){
                $pagin_recs .='<a href="permissions-admin.php?id='.base64_encode($rowRec['id']).'&page='.$_GET['page'].'" style="margin-right:5px;"><img src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>';
                }
                if(in_array('1_D',$_SESSION['pass']) || $_SESSION['USER_TYPE']=='SCH'){
               // $pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['id'].'" id="artCatCheckbox_'.$i.'">';
                }
                $pagin_recs .='<a href="permissions-sub-module.php?par='.base64_encode($rowRec['id']).'" class="btn btn-warning" style="margin-left:14px;text-align:center;">Sub Modules</a>';
                $pagin_recs .= '</td></tr>';
                $i++;
        }
	      $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="4">'.$classRecord[0].'</td></tr>';
          }
          
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="4" align="center">No Record Found</td></tr></tbody>';
    }
}
else{
    header('location:dashboard.php');
}

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
	case 1:
		$msg = "Permission module added Successfully.";
    break;
    case 2:
		$msg = "Permission module updated successfully.";
    break;
    case 3:
		$msg = "Permission module has been deleted successfully.";
	break;
    case 5:
        $errormsg = "Permission module already exists.";
        $msg = "";
    break;
}

if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Permission Modules";
}else{
   $pageheading = "Add New Permission Module"; 
}

$add = true;  
$where           =   " 1 = 1 and SCHOOL_ID = ".$_SESSION['SCHOOL_ID']." and PARENT='0' and STATUS = 'A' ";
$parent     =   $objMisc->myFunc->fnWriteOptionList($rowArray['id'],'NAME,ID','modulemaster',$where,0,0,0);

//echo $_SESSION['SCHOOL_ID'];

$smartyVars['arr']    =   $per;
$smartyVars['parent']    =   $parent;
$smartyVars['errormsg']    =   $errormsg;
$smartyVars['add']          =   $add;
$smartyVars['group']        =   $id;
$smartyVars['rowRec']       =   $rowArray;
$smartyVars['pageheading']  =   $pageheading;
$smartyVars['classData']    =   $pagin_recs;
$smartyVars['msg']          =   $msg;
$smartyVars['page']          =   $_REQUEST['page'];
$objMisc->displayPage("header,permissions-admin,footer",$smartyVars);   
function update_status($id,$status)
{
	global $objMisc;
	$objResponse = new XajaxResponse();
	$changeTo = ($status=='A') ? 'D' : 'A';
	$row = array(
					'STATUS' => $changeTo
				);
	$where = "id =".$id;
	$objMisc->update("modulemaster",$row,$where);
	$imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
	if($changeTo=='A')
	{
		$title= 'Deactivate';
		$msg = 'Permission module has been activated successfully.';
	}
	else
	{
		$title= 'Activate';
		$msg = 'Permission module has been deactivated successfully.';
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
	$objResponse = new XajaxResponse();
	$idArray = explode(',',$id);
	foreach($idArray as $bid)
	{
       $where3      = "SCHOOL_ID =".$_SESSION['SCHOOL_ID']." and id = ".$bid;
	   $val = $objMisc->delete("modulemaster",$where3);
      
       
	}
    if($val){
	   $_SESSION['msg'] = 3;
    } else {
       $_SESSION['msg'] = 4; 
    }
	$sscript .= "var a;";
	$sscript .= "a = window.location;";
	$sscript .= "window.location = a;";
	$objResponse->addScript($sscript);
	return $objResponse;
}    
?>
