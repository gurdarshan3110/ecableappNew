<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");
$action=$_REQUEST['action'];

switch($action)
{
    
    // case 'typeahead':
    //     $name = $_REQUEST['name']; 
    //     $franchiseId=$_REQUEST['franchiseId'];
    //     if(!empty($franchiseId)){
    //         $and .=" AND S.FRANCHISE_ID='$franchiseId'";
    //     }
    //     $wingId=$_REQUEST['wingId'];
    //     if(!empty($wingId)){
    //         $and .=" AND W.WING_ID='$wingId'";
    //     }
    //     $unitId=$_REQUEST['unitId'];
    //     if(!empty($unitId)){
    //         $and .=" AND S.UNIT_ID='$unitId'";
    //     } 
    //     if(isset($_REQUEST['name']))
    //     {
    //         $and .= " and (S.NAME like '%$name%' OR S.CUSTOMER_ID like '%$name%' OR S.MSO_ID like '%$name%' OR S.PHONE_NO like '%$name%') $and";
       
    //     //$and.="MATCH(S.`FIRST_NAME`,S.`MIDDLE_NAME`,S.`LAST_NAME`,S.`FATHER_NAME`,S.`MOTHER_NAME`,S.`ADDMISSION`) AGAINST('$name' IN NATURAL LANGUAGE MODE)";
    //     $query = "SELECT CONCAT(S.`NAME`,' [ Phone No :',S.`PHONE_NO` ,'] [ Customer Id :',S.`CUSTOMER_ID`,'] [MSO ID :',S.`MSO_ID`,']')as NAME,S.`SUBSCRIBER_ID`,S.`PHONE_NO`,S.`STATUS` from subscribers S JOIN `franchise_master` F ON S.`FRANCHISE_ID`=F.`FRANCHISE_ID` JOIN `unit_master` U ON S.UNIT_ID=U.UNIT_ID JOIN `wing_master` W ON W.WING_ID=U.WING_ID WHERE S.`HEADOFFICE_ID`='$_SESSION[HEADOFFICE]' $and ORDER BY S.`NAME`,S.`CUSTOMER_ID`,S.`MSO_ID` ASC limit 50";
    //         $subRecord = $objMisc->getAllRecordsNew($query);
    //         //$resp  = '';
    //         //$resp .= '<ul>';
    //         if(!empty($subRecord)){
    //             foreach($subRecord as $row){
    //               $result[]=array(
    //                             'id'   => $row['subscriber_id'],
    //                             'name' => $row['name'].'#'.$row['status'],
    //                             'phone_no' => $row['phone_no'],
    //                             'name' => $row['name'].'#'.$row['status'],
    //                             'oname' => $row['name'],
    //                             );                
    //             }
    //             echo json_encode($result);exit;
    //         }
    //     }
    // break;
    case 'fetchWing':
        $franchiseId    =   $_REQUEST['franchiseId'];
        $where          =   " S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND S.FRANCHISE_ID='$franchiseId' AND S.`STATUS`='A' AND U.`STATUS`='A' AND W.`STATUS`='A' GROUP BY W.`WING_ID` ORDER BY W.`NAME` ASC";
        $query="SELECT W.`WING_ID`,W.`NAME` FROM `subscribers` S JOIN `unit_master` U ON U.`UNIT_ID`=S.`UNIT_ID` JOIN `wing_master` W ON W.`WING_ID`=U.`WING_ID` WHERE $where";
        $wings         .=   "<option value=''>-Please Select-</option>";
        $wings         .=   $objMisc->myFunc->fnWriteOptionListWithJoin('','NAME,WING_ID',$query,0,0);
        echo $wings;
    break;
    case 'fetchUnit':
        $wingId         =   $_REQUEST['wingId'];
        $franchiseId    =   $_REQUEST['franchiseId'];
        $where          =   " S.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND S.FRANCHISE_ID='$franchiseId' AND S.`STATUS`='A' AND U.`STATUS`='A' AND W.`STATUS`='A' AND U.WING_ID='$wingId' GROUP BY U.`UNIT_ID` ORDER BY W.`NAME` ASC";
        $query="SELECT U.`UNIT_ID`,U.`NAME` FROM `subscribers` S JOIN `unit_master` U ON U.`UNIT_ID`=S.`UNIT_ID` JOIN `wing_master` W ON W.`WING_ID`=U.`WING_ID` WHERE $where";
        $units         .=   "<option value=''>-Please Select-</option>";
        $units         .=   $objMisc->myFunc->fnWriteOptionListWithJoin('','NAME,UNIT_ID',$query,0,0);
        echo $units;
    break;
    case 'fetchSubscribers':
        $unitId         =   $_REQUEST['unitId'];
        $franchiseId    =   $_REQUEST['franchiseId'];
        $where          =   "HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND FRANCHISE_ID='$franchiseId' and UNIT_ID =".$unitId." ORDER BY SERIAL_NO ASC";
        $sql=$objMisc->getAllRecords("SUBSCRIBER_ID,NAME,MSO_ID,CUSTOMER_ID,PHONE_NO,STATUS",'subscribers',$where);
        $subsTab.='';
        $subsTab.='<table class="table">
                        <thead>
                            <th width="35%">Name</th>
                            <th width="13%">Phone No</th>
                            <th width="13%">MSO Id</th>
                            <th width="13%">Customer Id</th>
                            <th width="13%">Balance</th>
                            <th width="10%"><input type="checkbox" onclick="select_all();" id="selectAll">Select All<br>
                                <input type="checkbox" onclick="not_paid();" id="notPaid">Not Paid<br> 
                                <input type="checkbox" onclick="deactivateSubs();" id="deactive">Deactive
                            </th>
                        </thead>
                        <tbody>';
        foreach ($sql as $k => $value) {
            $pndAmt=$objMisc->calSubsPngAmount($_SESSION['HEADOFFICE'],$value['subscriber_id']);
            $currentMonth=date('m');
            $currentYear=date('Y');
            $unpaid=$objMisc->GiveValue("HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$value[subscriber_id]' AND AMOUNT_TYPE='C' AND MONTH(MONTH_DATE)='$currentMonth' AND YEAR(MONTH_DATE)='$currentYear' AND STATUS='A'",'ID','monthly_charges');
            $subsTab.='<tr>
                            <td style="color:'.(($value['status']=='D')?'red':'').'">'.$value['name'].'</td>
                            <td style="color:'.(($value['status']=='D')?'red':'').'">'.$value['phone_no'].'</td>
                            <td style="color:'.(($value['status']=='D')?'red':'').'">'.$value['mso_id'].'</td>
                            <td style="color:'.(($value['status']=='D')?'red':'').'">'.$value['customer_id'].'</td>
                            <td style="color:'.(($value['status']=='D')?'red':'').'">'.$pndAmt.'</td>
                            <td style="color:'.(($value['status']=='D')?'red':'').'"><input type="checkbox" class="allSelect '.((empty($unpaid) && $pndAmt>0)?'unpaid':'').(($value['status']=='D')?' deactiveSubs':'').'" id="sub'.$value['subscriber_id'].'" name="subscriber_id[]" value="'.$value['subscriber_id'].'"></td>
                       </tr>';
        }
        $subsTab.=' </tbody>
                   </table>';
        echo $subsTab;
    break;
}
?>
