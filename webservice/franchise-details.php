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
