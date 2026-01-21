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
    case 'fetchUnit';
    $wingId         =   $_REQUEST['wingId'];
    $where          =   " 1 = 1 and STATUS='A' AND USER_ID='$_SESSION[USER_ID]' and WING_ID =".$wingId;
    $units         .=   "<option value=''>-Please Select-</option>";
    $units         .=   $objMisc->myFunc->fnWriteOptionList('','NAME,UNIT_ID','unit_master',$where,0,0,0);
    echo $units;
    break;
}
?>
