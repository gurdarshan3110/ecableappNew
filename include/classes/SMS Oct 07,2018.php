<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SMS
 *
 * @author Divyanshu Garg
 */
class SMS extends Cms{

    
    function __construct() {
        parent::__construct();
    }

    /**
     * Sending SMS
     */
 
    
    public function send_sms($mobileNumber,$message,$modulename){
    		
    	$senderId = "DEMOES";
    	$url="http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms?AUTH_KEY=7692cbb1ca149c21f5a452f99d3f4252";	
        $str=explode(',',$mobileNumber);
        $arr=array_filter($str);
        $mobileNumber=implode(',',$arr);  
    	$postData = array(
    		'mobileNumbers' => $mobileNumber,        
    		'smsContent' => $message,
    		'senderId' => $senderId,
    		'routeId' => '1',		
    		"smsContentType" =>'unicode'
    	);

    	$data_json = json_encode($postData);
    	$ch = curl_init();	
    	curl_setopt_array($ch, array(
        CURLOPT_URL => $url,
        CURLOPT_HTTPHEADER => array('Content-Type: application/json','Content-Length:'. strlen($data_json)),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $data_json,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0
    	));

        //get response
    	$output = curl_exec($ch);
    	if(curl_errno($ch))
    	{
    		echo 'error:' . curl_error($ch);
    	}
    	curl_close($ch);
    	return $output;
    }

    public function pending_sms($headofficeid){
        //echo $headofficeid;exit;
        $sendSms=$this->GiveValue("HEADOFFICE_ID=".$headofficeid,'SEND_SMS','sms_settings');
        if($sendSms=='N'){
            return 0;
        }else{
            $total=$this->GiveValue("STATUS='A' AND HEADOFFICE_ID=".$headofficeid,'SUM(SMS_COUNT)','sms_recharge');
            $used=$this->GiveValue(" HEADOFFICE_ID=".$headofficeid,'SUM(SMS_COUNT)','sms_log');
            return $bal=$total-$used;
        }
    }
        
    public function insert_balance_sms($rowdata){
        //return $this->school_total_sms($schoolid) - $this->school_used_sms($schoolid);
       
        $rowArray = array(
                'HEADOFFICE_ID'      =>$rowdata['headoffice_id'],
                'SMS_GROUP_ID'       =>$rowdata['sms_group_id'],
                'SMS_TO'             =>$rowdata['user_id'],
                'SEND_TO_TYPE'       =>$rowdata['send_to_type'],
                'MOBILE_NO'          =>$rowdata['mobile_no'],
                'REQUEST_ID'         =>$rowdata['request_id'],
                'MESSAGE'            =>$rowdata['message'],
                'MODULE_NAME'        =>$rowdata['module_name'],
                'SMS_COUNT'          =>$rowdata['sms_count'],
                'STATUS'             =>'1',
                'ADDED_TIME'         => date('Y-m-d H:i:s')
                );
                 
        $val = $this->insert("sms_log",$rowArray);
        
              return($val);
    }
    
     /**
     * Fetch max sms group id.
     * */
    public function max_sms_groupid($headofficeid){
        //echo $schoolid;
        return $this->GiveValue(" HEADOFFICE_ID=".$headofficeid,'max(SMS_GROUP_ID) as id','sms_log');
    }
    
    public function count_sms_parts($string){ 
       $stringArray=str_split($string,160);
       $countParts=count($stringArray);
        return $countParts;
    }
    
    public function delevery_status($requestId){
		$url  ='http://msg.msgclub.net/rest/services/delivery/pullDeliveryReport?AUTH_KEY=7692cbb1ca149c21f5a452f99d3f4252&requestId='.$requestId;
		// create curl resource
        $ch = curl_init();
        
		// set url
        curl_setopt($ch, CURLOPT_URL, $url);

        //return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // $output contains the output string
        $output = curl_exec($ch);

		//getting the json response and decode
		$status = json_decode($output);
		
		//getting status of request id 
        $delevery_status=$status[0]->status;
		
        // close curl resource to free up system resources
        //curl_close($ch);
        return $delevery_status;
		
	}
}

?>
