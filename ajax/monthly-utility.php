<?php
require_once("helper.php");
$action=$_REQUEST['action'];
switch($action)
{
    case 'fetchWing';
    $headofficeId        =   $_REQUEST['headofficeId'];
    $where          =   " 1 = 1 and STATUS='A' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE_ID]'";
    $wings         .=   "<option value=''>-Please Select-</option>";
    $wings         .=   $objMisc->myFunc->fnWriteOptionList('','NAME,WING_ID','wing_master',$where,0,0,0);
    echo $wings;
    break;
    case 'fetchSubscribers';
    $headofficeId   =   $_REQUEST['headofficeId'];
    $where          =   " 1 = 1 and S.STATUS='A' AND S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]'";
    //echo "SELECT count(*) FROM `subscribers` S JOIN `unit_master` U ON U.`UNIT_ID`=S.`UNIT_ID` JOIN `wing_master` W ON W.`WING_ID`=U.`WING_ID` JOIN `head_master` H ON H.`HEADOFFICE_ID`=W.`HEADOFFICE_ID` WHERE $where";
    $subscribers    =   $objMisc->GiveValueNew("SELECT count(*) FROM `subscribers` S JOIN `unit_master` U ON U.`UNIT_ID`=S.`UNIT_ID` JOIN `wing_master` W ON W.`WING_ID`=U.`WING_ID` JOIN `headoffice_master` H ON H.`HEADOFFICE_ID`=W.`HEADOFFICE_ID` WHERE $where");
    echo 'No. of Subscribers: '.$subscribers;
    break;
    case 'fetchUnit';
    $wingId         =   $_REQUEST['wingId'];
    $where          =   " 1 = 1 and STATUS='A' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and WING_ID =".$wingId;
    $units         .=   "<option value=''>-Please Select-</option>";
    $units         .=   $objMisc->myFunc->fnWriteOptionList('','NAME,UNIT_ID','unit_master',$where,0,0,0);
    echo $units;
    break;
    case 'fetchWingSubscribers';
    $wingId         =   $_REQUEST['wingId'];
    $where          =   " 1 = 1 and S.STATUS='A' AND S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and W.WING_ID =".$wingId;
    $subscribers    =   $objMisc->GiveValueNew("SELECT count(*) FROM `subscribers` S JOIN `unit_master` U ON U.`UNIT_ID`=S.`UNIT_ID` JOIN `wing_master` W ON W.`WING_ID`=U.`WING_ID` JOIN `headoffice_master` H ON H.`HEADOFFICE_ID`=W.`HEADOFFICE_ID` WHERE $where");
    echo 'No. of Subscribers: '.$subscribers;
    break;
    case 'fetchUnitSubscribers';
    $unitId         =   $_REQUEST['unitId'];
    $where          =   " 1 = 1 and S.STATUS='A' AND S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and U.UNIT_ID =".$unitId;
    $subscribers    =   $objMisc->GiveValueNew("SELECT count(*) FROM `subscribers` S JOIN `unit_master` U ON U.`UNIT_ID`=S.`UNIT_ID` JOIN `wing_master` W ON W.`WING_ID`=U.`WING_ID` JOIN `headoffice_master` H ON H.`HEADOFFICE_ID`=W.`HEADOFFICE_ID` WHERE $where");
    echo 'No. of Subscribers: '.$subscribers;
    break;
    case 'EditInvoice';
    $invoiceNo         =   $_REQUEST['invoiceNo'];
    $id         =   $_REQUEST['id'];
    $where          =   " 1 = 1 and AMOUNT_TYPE='D' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and `ID` =".$id;
    $rowArray=array('RECEIPT_NO'        =>$invoiceNo);
    $update=$objMisc->update('monthly_charges',$rowArray,$where);
    if($update){
        echo $invoiceNo;
    }
    break;
}
?>
