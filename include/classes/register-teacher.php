<?php
require_once("helper.php");
$fname      = $_REQUEST['fname'];
$lname      = $_REQUEST['lname'];
$schoolcode = $_REQUEST['schoolid'];
$email      = $_REQUEST['email'];
$contact    = $_REQUEST['contact'];
$schoolid = substr($schoolcode,3,3);

$wherecon   = " SCHOOL_CODE='".$schoolcode."'";
$existschool      = $objMisc->GiveValue($wherecon,"SCHOOL_ID","school");
if(!empty($existschool))
{
$wherecon   = " SCHOOL_ID=".$schoolid;
$existschool      = $objMisc->GiveValue($wherecon,"SCHOOL_ID","school");
if(!empty($existschool))
{
$wherecon   = " CONTACT = '".$contact."' and SCHOOL_ID=".$schoolid;
$exist      = $objMisc->GiveValue($wherecon,"TEACHER_ID","teacher");

if(empty($exist)){
        $password   = date("Gis",time());
        $userId     = 'T'.$contact;
        $rowArray = array(
                    'SCHOOL_ID'     => $_SESSION['SCHOOL_ID'],
                    'SCHOOL_CODE'   => $_SESSION['SCHOOL_CODE'],
                    'USER_ID'       => $userId,
                    'PASSWORD'      => addslashes($password),
                    'FIRST_NAME'    => addslashes($fname),
                    'LAST_NAME'     => addslashes($lname),
                    'EMAIL'         => addslashes($email),
                    'CONTACT'       => $contact,
                     'TYPE'         =>'T',
                    'DATE_ADDED'    => date('Y-m-d H:i:s')
                    );
        
        $val = $objMisc->insert("teacher",$rowArray);
        $lastInsertId = mysql_insert_id();
        if($lastInsertId){
            $EmailSubject   = "Welcome to ".HOST_NAME;
            $Email_Address  = $email;
            $filename       = "../txtMail/teacher.txt";
			$fd   = fopen($filename,"r") or die("couldn't open file");
			$body = fread($fd,filesize($filename));
            $body = str_replace("#name",$fname.' '.$lname,$body);
            $body = str_replace("#username",$userId,$body);
            $body = str_replace("#password",$password,$body);
            $body = str_replace("#year",date('Y'),$body);
            $body = str_replace("#pathimage",SITE_URL,$body);
            $body = str_replace("#host",HOST_NAME,$body);
            $headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: ".ADMIN_EMAIL_NAME." <".ADMIN_EMAIL.">";
           $sent = mail($Email_Address, $EmailSubject, $body, $headers);
           }
          
       

        $json= array(
                'type'=>"1",
                'User_id'=>$userId,
                'Password'=>$password,
                'school_id'=>$schoolid,
                'msg'=>'success'
                );
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'msg'=>'Contact No. Already Exist Please Change Contact No.'
          );
        echo json_encode($json);
        exit;
      }
      }else{
        $json= array(
            'type'=>"0",
            'msg'=>'School id does not exist.'
          );
        echo json_encode($json);
        exit;
        
      }
      }else{
        $json= array(
            'type'=>"0",
            'msg'=>'School Code does not exist.'
          );
        echo json_encode($json);
        exit;
        
      }
?>