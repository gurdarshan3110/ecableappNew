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
    		
    	//echo $url="http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms?AUTH_KEY=4c4d595e59e915e30341017a2ae31a&message=$message&senderId=HXTECH&routeId=1&mobileNos=9023279634&smsContentType=english";	
        $message = urlencode($message);
        $url="http://www.alertwings.in/api/sendhttp.php?authkey=248403Afoz1wcr1o5bf53e49&mobiles=$mobileNumber&message=$message&sender=ECABLE&route=4&country=91&unicode=0";
        $ch = curl_init();  
        $ch = curl_init($url);
        curl_setopt ($ch, CURLOPT_POST, 1);
        curl_setopt ($ch, CURLOPT_POSTFIELDS,$postData);
        curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        //get response
        $output = curl_exec($ch);
    	if(curl_errno($ch))
    	{
    		echo 'error:' . curl_error($ch);
    	}
    	curl_close($ch);
    	return $output;
    }
    public function send_smsUtility($mobileNumber,$message,$modulename,$smsType){
            
        //echo $url="http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms?AUTH_KEY=4c4d595e59e915e30341017a2ae31a&message=$message&senderId=HXTECH&routeId=1&mobileNos=9023279634&smsContentType=english"; 
        $msgType=(($smsType=='unicode')?1:0);
        $message = urlencode($message);
        $url="http://www.alertwings.in/api/sendhttp.php?authkey=248403Afoz1wcr1o5bf53e49&mobiles=$mobileNumber&message=$message&sender=ECABLE&route=4&country=91&unicode=$msgType";
        $ch = curl_init();  
        $ch = curl_init($url);
        curl_setopt ($ch, CURLOPT_POST, 1);
        curl_setopt ($ch, CURLOPT_POSTFIELDS,$postData);
        curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
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
            //$total=$this->GiveValue("STATUS='A' AND HEADOFFICE_ID=".$headofficeid,'SUM(SMS_COUNT)','sms_recharge');
            //$used=$this->GiveValue(" HEADOFFICE_ID=".$headofficeid,'SUM(SMS_COUNT)','sms_log');
            return 1;
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
    public function count_sms_parts_unicode($string,$type){
        $txtArray=$this->mbStringToArray($string);
        $txtcount=count($txtArray);
        switch($type){
            case 'english':
                if($txtcount<161){
                    $totSms=1;
                }else{
                    $totSms=$txtcount/153;
                    $totSms=ceil($totSms);
                }
            break;
            case 'unicode':
                if($txtcount<71){
                    $totSms=1;
                }else{
                    $totSms=$txtcount/67;
                    $totSms=ceil($totSms);
                }
            break;
        }  
       //$stringArray=str_split($string,160);
       //$countParts=count($stringArray);
        return $totSms;
    }
    function mbStringToArray($string) {
        $strlen = mb_strlen($string);
        while ($strlen) {
            $array[] = mb_substr($string,0,1,"UTF-8");
            $string = mb_substr($string,1,$strlen,"UTF-8");
            $strlen = mb_strlen($string);
        }
        return $array;
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
