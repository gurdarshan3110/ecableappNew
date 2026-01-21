<?php
require_once("helper.php");
$action=$_REQUEST['action'];
switch($action)
{
    case 'fetchWing';
    $headofficeId        =   $_REQUEST['headofficeId'];
    $where          =   " 1 = 1 and STATUS='A' and HEADOFFICE_ID =".$headofficeId;
    $wings         .=   "<option value=''>-Please Select-</option>";
    $wings         .=   $objMisc->myFunc->fnWriteOptionList('','NAME,WING_ID','wing_master',$where,0,0,0);
    echo $wings;
    break;
    case 'fetchUnit';
    $wingId         =   $_REQUEST['wingId'];
    $where          =   " 1 = 1 and STATUS='A' and WING_ID =".$wingId;
    $units         .=   "<option value=''>-Please Select-</option>";
    $units         .=   $objMisc->myFunc->fnWriteOptionList('','NAME,UNIT_ID','unit_master',$where,0,0,0);
    echo $units;
    break;
    case 'fetchEmployee';
    $unitId         =   $_REQUEST['unitId'];
    $where          =   " 1 = 1 and STATUS='A' and UNIT_ID =".$unitId;
    $employees     .=   "<option value=''>-Please Select-</option>";
    $employees     .=   $objMisc->myFunc->fnWriteOptionList('','NAME,EMPLOYEE_ID','employees',$where,0,0,0);
    echo $employees;
    break;
    case 'fetchPackageAmt';
    $package_id     =   $_REQUEST['package_id'];
    $package_type   =   $_REQUEST['package_type'];
    $where          =   " 1 = 1 and PACKAGE_ID='$package_id' and STATUS ='A'";
    if($package_type=='P'){
        $amt            =   $objMisc->GiveValue($where,'PARENT_CHARGES','package_master');
    }else{
        $amt            =   $objMisc->GiveValue($where,'CHILD_CHARGES','package_master');
    }
    echo $amt;
    break;
    case 'viewSubscriber';
    $subscriberId=$_REQUEST['Id'];
    $where          =   " 1 = 1 and SUBSCRIBER_ID='$subscriberId' and STATUS ='A'";
    $row = $objMisc->getRow('subscribers',$where);
    $packId = $objMisc->GiveValue($where,'PACKAGE_ID','stb_box');
    $popup .='<table width="100%" class="table table-bordered table-hover table-striped">';
    	$popup .='<tr>';
    		$popup .='<th>Stb No.</th>';
    		$popup .='<th>Vc No.</th>';
    		$popup .='<th>Saf NO.</th>';
    		$popup .='<th>Mac No.</th>';
    		$popup .='<th>Model</th>';
    		if($packId!=0){
    			$popup .='<th>Package</th>';
    			$popup .='<th>Type</th>';
    			$popup .='<th>Amount</th>';
    		}
    	$popup .='</tr>';
    $recs= $objMisc->getAllRecordsNew("SELECT B.*,S.* FROM `stb_box` B JOIN `subscriptions` S ON B.`SUBSCRIPTION_ID`=S.`SUBSCRIPTION_ID` WHERE B.`SUBSCRIBER_ID`='$subscriberId'");
    foreach ($recs as $d => $rowRec) {
    	$popup .='<tr>';
    		$popup .='<td>'.$rowRec['stb_no'].'</td>';
    		$popup .='<td>'.$rowRec['vc_no'].'</td>';
    		$popup .='<td>'.$rowRec['saf_no'].'</td>';
    		$popup .='<td>'.$rowRec['mac_no'].'</td>';
    		$popup .='<td>'.$rowRec['model'].'</td>';
    		if($packId!=0){
    			$wherePack=" PACKAGE_ID='$rowRec[package_id]'";
    			$Rec = $objMisc->getRow('package_master',$wherePack);
    			$popup .='<td>'.$Rec['name'].'</td>';
    			$popup .='<td>'.(($rowRec['package_type']=='C')?'Child':'Parent').'</td>';
    			$popup .='<td>'.(($rowRec['package_type']=='C')?$Rec['child_charges']:$Rec['parent_charges']).'</td>';
    		}
    	$popup .='</tr>';
    }
    $popup .='</table>';
    echo $popup;
    break;
}
?>
