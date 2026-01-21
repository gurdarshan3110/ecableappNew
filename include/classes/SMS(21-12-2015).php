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
    public function send_sms($contact, $message ,$modulename) {
        if(isset($_SESSION['SMS_SENDER_ID'])){
            $senderid = $_SESSION['SMS_SENDER_ID'];
        } else {
            $senderid = "mskool";
        }
        // Set POST variables
        $message    = strip_tags($message); 
        $message   = html_entity_decode($message);
        $message    = urlencode($message);
        
        $url  ='http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms?AUTH_KEY=a24bcd706ee23f127d848e9c13c3cb58&message='.$message.'&senderId=mskool&routeId=1&mobileNos='.$contact.'&smsContentType='.$modulename.'';    
        
         // create curl resource
        $ch = curl_init();

        // set url
        curl_setopt($ch, CURLOPT_URL, $url);

        //return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // $output contains the output string
        $output = curl_exec($ch);
                       
        // close curl resource to free up system resources
        //curl_close($ch);
        return $output;
        

    }
    /**
     * Check how many message allocate to school admin.
     * */
    public function school_total_sms($schoolid){
        //echo $schoolid;
        return $this->GiveValue(" SCHOOL_ID=".$schoolid,'SMS_COUNT','school');
    }
    /**
     * Check How many message used by school.
     * */
    public function school_used_sms($schoolid){
        return $this->GiveValue(" SCHOOL_ID=".$schoolid." and STATUS='1'",' COUNT(SMS_ID) AS used ','sms_detail');
    }
    /**
     * Check sms balance in school account.
     * */
    public function school_balance_sms($schoolid){
        return $this->school_total_sms($schoolid) - $this->school_used_sms($schoolid);
    }
    
    public function insert_balance_sms($rowdata){
        //return $this->school_total_sms($schoolid) - $this->school_used_sms($schoolid);
       
        $rowArray = array(
                'SCHOOL_ID'          =>$rowdata['school_id'],
                'SMS_GROUP_ID'       =>$rowdata['sms_group_id'],
                'SEND_BY_ID'         =>$rowdata['send_by_id'],
                'SEND_TO_ID'         =>$rowdata['send_to_id'],
                'SEND_TO_TYPE'       =>$rowdata['send_to_type'],
                'SEND_BY_TYPE'       =>$rowdata['send_by_type'],
                'MOBILE_NO'          =>$rowdata['mobile_no'],
                'REQUEST_ID'         =>$rowdata['request_id'],
                'MESSAGE'            =>$rowdata['message'],
                'MODULE'             =>$rowdata['module'],
                'SMS_PARTS'          =>$rowdata['sms_parts'],
                'STATUS'             =>'1',
                'DATE'               => date('Y-m-d H:i:s')
                );
                 
        $val = $this->insert("sms_detail",$rowArray);
        
              return($val);
    }
    
     /**
     * Fetch max sms group id.
     * */
    public function max_sms_groupid($schoolid){
        //echo $schoolid;
        return $this->GiveValue(" SCHOOL_ID=".$schoolid,'max(sms_group_id) as id','sms_detail');
    }
    
     public function count_sms_parts($string){ 
       $stringArray=str_split($string,160);
       $countParts=count($stringArray);
        return $countParts;
    }
}

?>
