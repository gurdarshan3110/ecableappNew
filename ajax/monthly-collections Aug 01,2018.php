<?php
require_once("helper.php");
$action=$_REQUEST['action'];
switch($action)
{
    case 'fetchWing';
    $headofficeId        =   $_REQUEST['headofficeId'];
    $where          =   " 1 = 1 and STATUS='A' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ";
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
    $where          =   " 1 = 1 and STATUS='A' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and UNIT_ID =".$unitId;
    $subscribers   .=   "<option value=''>-Please Select-</option>";
    $subscribers   .=   $objMisc->myFunc->fnWriteOptionList('','NAME,SUBSCRIBER_ID','subscribers',$where,0,0,0);
    echo $subscribers;
    break;
    case 'fetchbill';
    $subscriberId   =   $_REQUEST['subscriberId'];
    $where          =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and SUBSCRIBER_ID =".$subscriberId;
    $totalDebit     =   $objMisc->GiveValue($where." AND STATUS='A' AND AMOUNT_TYPE='D'",'SUM(`AMOUNT`)','monthly_charges');
    $totalCredit    =   $objMisc->GiveValue($where." AND STATUS='A' AND AMOUNT_TYPE='C'",'SUM(`AMOUNT`)','monthly_charges');
    if($totalCredit>=$totalDebit){
        $totalDue=0;
    }else{
        $totalDue       =   $totalDebit-$totalCredit;
    }
    echo $totalDue;
    break;
    case 'AutoFill':
    $name = $_REQUEST['name'];
        if(isset($_POST['name']))
        {
        $name=trim($_POST['name']);
        $or='';
        $or .=" AND (`NAME` LIKE '%$name%' OR `PHONE_NO` LIKE '%$name%' OR `CUSTOMER_ID` LIKE '%$name%' OR `MSO_ID` LIKE '%$name%')";
        //echo "SELECT s.*,SI.ROLL_NO as roll,SI.CLASS_ID,SI.GROUP_ID FROM student s JOIN student_info SI ON s.STUDENT_ID=SI.STUDENT_ID WHERE s.SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND (s.FIRST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[1]%')";
        $query2=$objMisc->getAllRecordsNew("SELECT subscriber_id,name,customer_id FROM subscribers where STATUS='A' and HEADOFFICE_ID='$_SESSION[HEADOFFICE]' $or ORDER BY SUBSCRIBER_ID DESC");
        echo "<ul>";
        if(!empty($query2)){
        foreach($query2 as $r =>$query3)
        {
           ?>
          <li onclick='fill("<?php echo $query3['name'].' ('.$query3['customer_id'].')';?>");fillUser(<?php echo $query3['subscriber_id'];?>);fetchbill();getSubscriberData();'><b><?php echo $query3['name'].' ('.$query3['customer_id'].')';?></li>
          <?php
        }
        }
        else{
          ?>
          <li><?php echo 'no records found';?></li>
          <?php
        }
        echo '</ul>';
       }
    break;
    case 'fetchData':
        $subscriber_id = $_REQUEST['subscriberId'];
        if(!empty($subscriber_id))
        {
        $query2=mysql_query("SELECT subscriber_id,name,customer_id,mso_id,address,phone_no,package_id FROM subscribers where STATUS='A' and HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND SUBSCRIBER_ID='$subscriber_id' ORDER BY SUBSCRIBER_ID DESC");
        $num=mysql_num_rows($query2);
        if($num>0){
            $data .="<table class='table table-striped table-bordered col-lg-12'>";
                $data .="<tr>";   
                $data .="<th width='10%'>Customer ID</th>";   
                $data .="<th width='10%'>MSO ID/Customer Code</th>";       
                $data .="<th width='15%'>Address</th>";   
                $data .="<th width='15%'>Package</th>";   
                $data .="</tr>";
            $res=mysql_fetch_array($query2);
            $data .="<tr>";   
            $data .="<td>".$res['customer_id']."</td>";   
            $data .="<td>".$res['mso_id']."</td>";     
            $data .="<td>".$res['address']."</td>";    
            $data .="<td>".$objMisc->GiveValue("PACKAGE_ID='$res[package_id]'",'NAME','package_master')."</td>";    
            $data .="</tr>"; 
            $data .="</table>";
        }
       }
       echo $data;
    break;
}
?>
