<?php
require_once("helper.php");
$action=$_REQUEST['action'];
switch($action)
{
    case 'First';
    $type         = $_REQUEST['type'];
    $user = $_REQUEST['user'];
    if($type=='S'){
        $user_id    = $objMisc->GiveValue("USER_ID ='$user' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]'","STUDENT_ID","student"); 
        $who_rec="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$type' AND USER_ID='$user_id' AND RETURN_DATE='0000-00-00'";
    }
    else{
        $who_rec="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$type' AND USER_ID='$user' AND RETURN_DATE='0000-00-00'";
    }
    $tot_rec    = $objMisc->GiveValue($who_rec,"count(*)","book_issue");
    $whe         ="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$_POST[type]'";
    $no_of_books    = $objMisc->GiveValue($whe,"TOTAL_BOOKS","library_rules");
    if($no_of_books<=$tot_rec){
               echo $errormsg   =1;
            }
    break;
    
}
?>
