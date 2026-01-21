<?php
header('Access-Control-Allow-Origin: *');
require_once("include/classes/class.Admin.php");
require_once("include/classes/class.Misc.php");
require_once("include/classes/GCM.php");
$objAdmin = new Admin();
$objMisc  = new Cms();
$gcm   = new GCM();
ini_set("display_errors",0);
$method=$_REQUEST['method'];
if(isset($_REQUEST['device'])){
    $device     = $_REQUEST['device'];
}
if(isset($_REQUEST['device_id'])){
    $device_id  = $_REQUEST['device_id'];
}
switch($method)
{
    case 'login';
    $user       = trim(addslashes($_REQUEST['username']));
    $password   = trim(addslashes($_REQUEST['password']));
   
    if($user!='admin'){
    /*
    $user       = explode('-',$user);
    $userType   = $user[0];
    $Code       = $user[1];
    $Id         = $user[2];
    */
    $userType = substr($user,0,1);
    /*
    *if School Login
    */ 
    if(strtoupper($userType) == 'S'){
        
      $sql      = "select * from school where USER_ID = '$user' and PASSWORD = '$password' ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $recData = mysql_fetch_array($result);
        if($device_id){
            $whereRec = "DEVICE_ID = '$device_id' and USER_ID = '".$recData['USER_ID']."' ";
            $exist    = $objMisc->GiveValue($whereRec,'id','gcm_users');
            if(!$exist){
                $row = array('DEVICE_NAME'=>$device,
                            'DEVICE_ID'=>$device_id,
                            'USER_ID'=>$recData['USER_ID']);
                $val = $objMisc->insert("gcm_users",$row); 
            }
        }
        $classes  = $objAdmin->getAllClass($Id);
        foreach($classes as $class){                                                    
          $where = "CLASS_ID = ".$class['class_id']; 
          $groups = $objMisc->getAllRecords('*','groups',$where);
         // print_r($groups);  
           $groupsData = array();
           foreach($groups as $group){
                $where = "CLASS_ID = ".$class['class_id']." and GROUP_ID =".$group['group_id']; 
                $subjects = $objMisc->getAllRecords('*','subject',$where);
                $subjectsData = array();
                foreach($subjects as $subject){                                                    
                    $subjectsData[]=array(
                    "Subjectname"=>$subject['subject_name'],
                    "Subjectid"=>$subject['subject_id']
                    
                    );
                } 
                
               $groupsData[]=array(
                "Sectionname"=>$group['group_name'],
                "Sectionid"=>$group['group_id'],
                "Subjects"=>$subjectsData
                
                ); 
      
           }
            $classData[]=array(
            "classname"=>$class['class_name'],
            "classid"=>$class['class_id'],
            "Sections"=>$groupsData,
            ); 
          
        }
        /*
        $groups = $objAdmin->getAllGroups($Id);
        $i = 1;
        foreach($groups as $group){                                                    
            $groupsData[]=array(
            "class_id"=>$group['class_id'],
            "group_id"=>$group['group_id'],
            "group_name"=>$group['group_name']
            ); 
            $i++;
        }
        
        $subjects = $objAdmin->getAllSubjects($Id);
        $k = 1;
        foreach($subjects as $subject){                                                    
            $subjectsData[]=array(
            "class_id"=>$subject['class_id'],
            "group_id"=>$subject['group_id'],
            "subject_name"=>$subject['subject_name']
            ); 
            $k++;
        }
        */
        //print_r($class);
        $json= array(
                'type'=>"1",
                'flag'=>'SCH',
                'class'=>$classData,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Wrong Username Password',
            'msg'=>'You have entered wrong username or password'
          );
        echo json_encode($json);
        exit;
      }
    /*
    *if Student Login
    */    
    } elseif(strtoupper($userType) == 'C') {
      $userId = substr($user,1);
      $sql      = "select STU.*,SCH.NAME,CLS.CLASS_NAME,GRP.GROUP_NAME  from student STU left join school SCH on STU.SCHOOL_ID = SCH.SCHOOL_ID inner join class CLS on STU.CLASS = CLS.CLASS_ID join groups GRP on STU.GROUP = GRP.GROUP_ID where STU.STUDENT_ID = $userId  and STU.PASSWORD='$password' ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $data  = mysql_fetch_array($result);
        if(isset($device_id)) {
            $whereRec = "DEVICE_ID = '$device_id' and USER_ID = '".$data['USER_ID']."' ";
            $exist    = $objMisc->GiveValue($whereRec,'id','gcm_users');
            
            if(!$exist){
             
                $row = array('DEVICE_NAME'=>$device,
                            'DEVICE_ID'=>$device_id,
                            'USER_ID'=>$data['USER_ID']);
                $val = $objMisc->insert("gcm_users",$row); 
            }
        }
        $where = "CLASS_ID = ".$data['CLASS']." and GROUP_ID =".$data['GROUP']; 
        $subjects = $objMisc->getAllRecords('*','subject',$where);
        $k = 1;
        foreach($subjects as $subject){                                                    
            $subjectsData[]=array(
            "subject_id"=>$subject['subject_id'],
            "subject_name"=>$subject['subject_name']
            ); 
            $k++;
        }
        $sqlQuery = "select P.FIRST_NAME,P.LAST_NAME from parent P inner join parent_student PS on P.PARENT_ID = PS.PARENT_ID and PS.STUDENT_ID = ".$data['STUDENT_ID'];
       
        $fetchData   = mysql_query($sqlQuery) or mysql_error();
        if(mysql_num_rows($fetchData)>0){
            $recData = mysql_fetch_array($fetchData);
        }
        $fname = (!empty($recData['FIRST_NAME']))?$recData['FIRST_NAME']:'';
        $mname = (!empty($recData['LAST_NAME']))?$recData['LAST_NAME']:'';
        
        $image = ((isset($data['IMAGE'])) && !empty($data['IMAGE']))?'http://www.myskoolapp.com/uploads/'.$data['IMAGE']:'http://www.myskoolapp.com/images/profile.png';
        $json= array(
                'type'=>"1",
                'flag'=>'STU',
                'student'=>array('schoolid'=>$data['SCHOOL_ID'],
                                'id'=>$data['STUDENT_ID'],
                                'loginid'=>$data['USER_ID'],
                                'name'=>stripslashes($data['FIRST_NAME']).stripslashes($data['LAST_NAME']),
                                'email'=>stripcslashes($data['EMAIL']),
                                'image'=>$image,
                                'class-id'=>$data['CLASS'],
                                'class'=>stripslashes($data['CLASS_NAME']),
                                'group'=>stripslashes($data['GROUP_NAME']),
                                'group-id'=>$data['GROUP'],
                                'rollnumber'=>$data['ROLL_NO'],
                                'fathername'=>$fname,
                                'mothername'=>$mname,
                                'contact'=>$data['CONTACT'],
                                'address'=>$data['C_ADDRESS'],
                                'schoolname'=>$data['NAME'],
                                'subjects'=>$subjectsData
                                ),
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Wrong Username Password',
            'msg'=>'You have entered wrong username or password'
          );
        echo json_encode($json);
        exit;
      }
    /*
    *if Teacher Login
    */   
    } elseif(strtoupper($userType) == 'T') {
      $sql      = "select * from teacher where USER_ID = '$user'  and PASSWORD = '$password' ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $teacher = mysql_fetch_array($result);
         if(isset($device_id)) {
            $whereRec = "DEVICE_ID = '$device_id' and USER_ID = '".$teacher['USER_ID']."' ";
            $exist    = $objMisc->GiveValue($whereRec,'id','gcm_users');
            if(!$exist){
                $row = array('DEVICE_NAME'=>$device,
                            'DEVICE_ID'=>$device_id,
                            'USER_ID'=>$teacher['USER_ID']);
                $val = $objMisc->insert("gcm_users",$row); 
            }
        }
        $whereRec = "DEVICE_ID = '$device_id' and USER_ID = '".$recData['USER_ID']."' ";
        $exist    = $objMisc->GiveValue($whereRec,'id','school');
        
        /*
        $cls      = "SELECT T.*,C.CLASS_NAME from teacher_class T join class C on T.CLASS_ID=C.CLASS_ID   where T.TEACHER_ID = $Id";
        $clsresult   = mysql_query($cls) or mysql_error();
        $clsgrp = array();
        while($clsdata = mysql_fetch_array($clsresult)){
        $where = "CLASS_ID = ".$clsdata['CLASS_ID']." and GROUP_ID = ".$clsdata['GROUP_ID']; 
        $groups = $objMisc->getAllRecords('*','groups',$where);
         // print_r($groups);  
           $groupsData = array();
           foreach($groups as $group){
                
               $sbject         = "SELECT S.SUBJECT_ID,S.SUBJECT_NAME FROM subject S join teacher_subject T on T.SUBJECT_ID = S.SUBJECT_ID where S.CLASS_ID = ".$clsdata['CLASS_ID']." and  S.GROUP_ID = ".$group['group_id']." and T.TEACHER_ID = $Id";
                $fetchsubject   = mysql_query($sbject) or mysql_error();
            
                $subjectsData = array();
                while($subjects =mysql_fetch_array($fetchsubject) ){
                    
                $subjectsData[]=array(
                    "Subjectname"=>$subjects['SUBJECT_NAME'],
                    "Subjectid"=>$subjects['SUBJECT_ID']
                    );
              
                }
      
               $groupsData[]=array(
                "Sectionname"=>$group['group_name'],
                "Sectionid"=>$group['group_id'],
                "Subjects"=>$subjectsData
                
                ); 
      
           }
            $clsgrp[]=array(
            "classname"=>$clsdata['CLASS_NAME'],
            "classid"=>$clsdata['CLASS_ID'],
            "Sections"=>$groupsData
            ); 
        }
        */
        $classes  = $objAdmin->getAllClass($teacher['SCHOOL_ID']);
        
        $whereRec = "SCHOOL_ID = '".$teacher['SCHOOL_ID']."' ";
        $school    = $objMisc->GiveValue($whereRec,'NAME','school');
        
        foreach($classes as $class){                                                    
          $where = "CLASS_ID = ".$class['class_id']; 
          $groups = $objMisc->getAllRecords('*','groups',$where);
         // print_r($groups);  
           $groupsData = array();
           foreach($groups as $group){
                $where = "CLASS_ID = ".$class['class_id']." and GROUP_ID =".$group['group_id']; 
                $subjects = $objMisc->getAllRecords('*','subject',$where);
                $subjectsData = array();
                foreach($subjects as $subject){                                                    
                    $subjectsData[]=array(
                    "Subjectname"=>$subject['subject_name'],
                    "Subjectid"=>$subject['subject_id']
                    
                    );
                } 
                
               $groupsData[]=array(
                "Sectionname"=>$group['group_name'],
                "Sectionid"=>$group['group_id'],
                "Subjects"=>$subjectsData
                
                ); 
      
           }
            $classData[]=array(
            "classname"=>$class['class_name'],
            "classid"=>$class['class_id'],
            "Sections"=>$groupsData,
            ); 
          
        }
        $where = "SCHOOL_ID = ".$teacher['SCHOOL_ID']; 
        $papers = $objMisc->getAllRecords('*','papers',$where);
        $k = 1;
        foreach($papers as $paper){                                                    
            $paperData[]=array(
            "paper_id"=>$paper['paper_id'],
            "name"=>$paper['name'],
            "marks"=>$paper['marks'],
            "passing_marks"=>$paper['passing_marks']
            ); 
            $k++;
        }
        if(isset($paperData) && !empty($paperData)){
            
        } else{
            $paperData = array(); 
        }
        if(isset($classData) && !empty($classData)){
            
        } else{
            $classData = array(); 
        }
        $image = ((isset($teacher['IMAGE'])) && !empty($teacher['IMAGE']))?'http://www.myskoolapp.com/uploads/'.$teacher['IMAGE']:'http://www.myskoolapp.com/images/profile.png';
        $json= array(
                'type'=>"1",
                'flag'=>'T',
                'schoolid'=>$teacher['SCHOOL_ID'],
                'id' =>$teacher['TEACHER_ID'],
                'name' =>$teacher['FIRST_NAME'].' '.$teacher[' 	LAST_NAME'],
                'contact'=>$teacher['CONTACT'],
                'email'=>$teacher['EMAIL'],
                'address'=>$teacher['ADDRESS'],
                'school'=>$school,
                'loginid'=>$teacher['USER_ID'],
                'image'=>$image,
                'class'=>$classData,
                'papers'=>$paperData,
                'msg'=>'success');
        echo json_encode($json);
        exit;
        
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Wrong Username Password',
            'msg'=>'You have entered wrong username or password'
          );
        echo json_encode($json);
        exit;
      } 
    /*
    *if Parent Login
    */
    }elseif(strtoupper($userType) == 'P'){
      $sql      = "select * from parent where USER_ID = '$user' and PASSWORD = '$password' ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $data       = mysql_fetch_array($result);
         if(isset($device_id)) {
            $whereRec = "DEVICE_ID = '$device_id' and USER_ID = '".$data['USER_ID']."' ";
            $exist    = $objMisc->GiveValue($whereRec,'id','gcm_users');
            if(!$exist){
                $row = array('DEVICE_NAME'=>$device,
                            'DEVICE_ID'=>$device_id,
                            'USER_ID'=>$data['USER_ID']);
                $val = $objMisc->insert("gcm_users",$row); 
            }
        }
        $sql        = "select S.* from student S join parent_student P on S.STUDENT_ID = P.STUDENT_ID and P.PARENT_ID = $Id";
        $student    = mysql_query($sql);
        $count      = 1;
        while($studentData = mysql_fetch_array($student)){
            
            $whereRec = "CLASS_ID = '".$studentData['CLASS']."' ";
            $class   = $objMisc->GiveValue($whereRec,'CLASS_NAME','class');
            
            $whereRec = "GROUP_ID = '".$studentData['GROUP']."' ";
            $group    = $objMisc->GiveValue($whereRec,'GROUP_NAME','groups');
            
            $whereRec = "SCHOOL_ID = '".$studentData['SCHOOL_ID']."' ";
            $school    = $objMisc->GiveValue($whereRec,'NAME','school');
            
        $where = "CLASS_ID = ".$studentData['CLASS']." and GROUP_ID =".$studentData['GROUP']; 
        $subjects = $objMisc->getAllRecords('*','subject',$where);
        $k = 1;
        foreach($subjects as $subject){                                                    
            $subjectsData[]=array(
            "subject_id"=>$subject['subject_id'],
            "subject_name"=>$subject['subject_name']
            ); 
                $k++;
            } 
            $stuImage = ((isset($studentData['IMAGE'])) && !empty($studentData['IMAGE']))?'http://www.myskoolapp.com/uploads/'.$studentData['IMAGE']:'';
            $students[]=array(
                "school_id"            =>stripslashes($studentData['SCHOOL_ID']),
                "student_id"            =>stripslashes($studentData['STUDENT_ID']),
                "student_name"          =>stripslashes($studentData['FIRST_NAME']).' '.stripslashes($studentData['LAST_NAME']),
                "class_id"            =>$studentData['CLASS'],
                "section_id"            =>$studentData['GROUP'],
                'loginid'           =>$studentData['USER_ID'],
                'email'             =>stripcslashes($studentData['EMAIL']),
                'rollnumber'        =>$studentData['ROLL_NO'],
                'contact'        =>$studentData['CONTACT'],
                'class'  =>$class,
                'section' =>$group,
                'school'=>$school,
                "image"             =>$stuImage,
                "subjects"              =>$subjectsData
                ); 
            $count++;
        }
        $image = ((isset($data['IMAGE'])) && !empty($data['IMAGE']))?'http://www.myskoolapp.com/uploads/'.$data['IMAGE']:'http://www.myskoolapp.com/images/profile.png';
        $json= array(
                'type'=>"1",
                'flag'=>'P',
                'parent'=>array('parent_id'     =>$data['PARENT_ID'],
                                'fathername'    =>stripslashes($data['FIRST_NAME']),
                                'mothername'    =>stripslashes($data['LAST_NAME']),
                                'email'         =>stripslashes($data['EMAIL']),
                                'contact'         =>stripslashes($data['CONTACT']),
                                'loginid'         =>stripslashes($data['USER_ID']),
                                'image'         =>$image,
                                'students'      =>$students
                ),
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Wrong Username Password',
            'msg'=>'You have entered wrong username or password'
          );
        echo json_encode($json);
        exit;
      } 
    }
    
    }else{
    /*
    *if Admin Login
    */ 
      $user       = strtolower($user);
      $sql        = "select * from admin where USER_NAME = '$user' and PASSWORD='$password' ";
      $result     = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $json= array(
                'type'=>"1",
                'flag'=>'A',
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Wrong Username Password',
            'msg'=>'You have entered wrong username or password'
          );
        echo json_encode($json);
        exit;
      }  
    }
    break; 
     
    case 'homeWork';
    $classid        = $_REQUEST['classid'];
    $groupid        = $_REQUEST['groupid'];
    $whereRec = "CLASS_ID = '".$classid."' ";
    $class   = $objMisc->GiveValue($whereRec,'CLASS_NAME','class');
    $whereRec1 = "GROUP_ID = '".$groupid."' ";
    $group    = $objMisc->GiveValue($whereRec1,'GROUP_NAME','groups');
    $fromdate     = $_REQUEST['fromdate'];
    if(!empty($fromdate)){
       $fromdate = date('Y-m-d 00:00:00',strtotime($fromdate)); 
    }
    $todate     = $_REQUEST['todate'];
    if(!empty($todate)){
       $todate = date('Y-m-d 23:59:59',strtotime($todate)); 
    }
    $and = "";
        if(!empty($fromdate) && !empty($todate)){
            $and .= " and (H.DATE between '$fromdate' and '$todate' )";
        }elseif(!empty($fromdate)){
            $and .= " and H.DATE >= '$fromdate' ";
        }elseif(!empty($todate)){
            $and .= " and H.DATE <= '$todate'";
        }
    /*
    *if School Login
    */ 
   
      //$sql      = "select S.*,T.* from student_home_work S join teacher T on S.TEACHER_ID = T.TEACHER_ID where S.SUBJECT_ID = $subjectid and S.DATE = '$date' ";
      $sql      = "select H.*,T.FIRST_NAME,T.LAST_NAME,S.SUBJECT_NAME from student_home_work H join subject S on S.SUBJECT_ID = H.SUBJECT_ID join teacher T on T.TEACHER_ID=H.TEACHER_ID and H.CLASS_ID = $classid and H.GROUP_ID = $groupid $and";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $count = 1;
        while ($data = mysql_fetch_array($result)){
            $work[]=array(
            "class"  => $class,
            "section"  => $group,
            "teacher_name"  => $data['FIRST_NAME'].' '.$data['LAST_NAME'],
            "home_work_id"  => $data['HOME_WORK_ID'],
            "subject"       => $data['SUBJECT_NAME'],
            "home_work"     => stripslashes($data['HOME_WORK']),  
            "date"          => date("d M,Y",strtotime($data['DATE']))
            ); 
            $count++;
        }
        $json= array(
                'type'=>"1",
                'description'=>$work,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'No Record Found',
            'msg'=>'Home Work Not Assigned'
          );
        echo json_encode($json);
        exit;
      }
    
     break;
     
     case 'childHomeWork';
    $classid        = $_REQUEST['classid'];
    $groupid        = $_REQUEST['groupid'];
    $date           = $_REQUEST['date'];
    if(!empty($date)){
        $date   = date("Y-m-d",strtotime($date));
    }
    
        //echo $sql      = "select S.*,T.* from student_home_work S join teacher T on S.TEACHER_ID = T.TEACHER_ID where S.SUBJECT_ID = $subjectid and S.DATE = '$date' ";
          $sql      = "select H.*,S.SUBJECT_NAME from student_home_work H join subject S on S.SUBJECT_ID = H.SUBJECT_ID and H.CLASS_ID = $classid and H.GROUP_ID = $groupid and H.DATE = '$date' ";
          $result   = mysql_query($sql) or mysql_error();
          if(mysql_num_rows($result)>0){
            $count = 1;
            while ($data = mysql_fetch_array($result)){
                $work[]=array(
                "home_work_id"  =>$data['HOME_WORK_ID'],
                "subject"       => $data['SUBJECT_NAME'],
                "home_work"     =>stripslashes($data['HOME_WORK']),
                "date"          => date("d M,Y",strtotime($data['DATE']))
                ); 
                $count++;
            }
            $json= array(
                    'type'=>"1",
                    'description'=>$work,
                    'msg'=>'success');
            echo json_encode($json);
            exit;
          }else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'No Record Found',
                'msg'=>'Home Work Not Assigned'
              );
            echo json_encode($json);
            exit;
          }
      
    
     break;
     case 'childNotice';
    $studentid      = $_REQUEST['studentid'];
    $date           = $_REQUEST['date'];
    if(!empty($date)){
        $date   = date("Y-m-d",strtotime($date));
    }
    $parentid       = $_REQUEST['parentid'];
    /*
    *if School Login
    */ 
    if($parentid){ 
      $sql      = "select * from student_notice where SEND_TO_ID = $studentid and SEND_TO_TYPE = 'STU' and DATE('$date') ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $count = 1;
        while ($data = mysql_fetch_array($result)){                                                    
            
            if($data['BY_TYPE']=='T'){
                $where = "TEACHER_ID =".$data['BY_ID'];
                $send_by    = "Teacher";
                $teacher = $objMisc->getRow("teacher",$where);
                $name = $teacher['first_name'].' '.$teacher['last_name']; 
            }else{
                $where = "SCHOOL_ID = ".$data['BY_ID'];
                $send_by    = "School Admin";
                $name = $objMisc->GiveValue($where,"NAME","school");
            }
            
            $notice[]=array(
            "notice_id"     =>$data['NOTICE_ID'],
            "description"   =>stripslashes($data['NOTICE']),
            "send_by"       =>$send_by,
            "sender_name"   =>$name
            ); 
            $count++;
        }
        $json= array(
                'type'=>"1",
                'notice'=>$notice,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'No Record Found',
            'msg'=>'No Notice assigned on this date'
          );
        echo json_encode($json);
        exit;
      }
    
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'Parent id not found',
            'msg'=>'Please Login to Continue'
          );
        echo json_encode($json);
        exit;
      }
    
     break;
    
    case 'childResult';
    $studentid     = $_REQUEST['studentid'];
    $fromdate     = $_REQUEST['fromdate'];
    if(!empty($fromdate)){
       $fromdate = date('Y-m-d 00:00:00',strtotime($fromdate)); 
    }
    $todate     = $_REQUEST['todate'];
    if(!empty($todate)){
       $todate = date('Y-m-d 23:59:59',strtotime($todate)); 
    }
    $and = "";
        if(!empty($fromdate) && !empty($todate)){
            $and .= " and (R.DATE between '$fromdate' and '$todate' )";
        }elseif(!empty($fromdate)){
            $and .= " and R.DATE >= '$fromdate' ";
        }elseif(!empty($todate)){
            $and .= " and R.DATE <= '$todate'";
        }
    /*
    *if School Login
    */ 
      $sql      = "select R.MARKS,R.PASSING_MARKS,R.MARKS_OBTAINED,R.DATE,C.CLASS_NAME,G.GROUP_NAME,P.NAME,CONCAT(T.FIRST_NAME,' ',T.LAST_NAME) as sender from student_result R join papers P on R.PAPER_ID = P.PAPER_ID join class C on R.CLASS_ID=R.CLASS_ID join groups G on R.GROUP_ID=G.GROUP_ID join teacher T on R.TEACHER_ID=T.TEACHER_ID and R.STUDENT_ID = $studentid $and";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $count = 1;
        while ($data = mysql_fetch_array($result)){
            $results[]=array(
            "class"         =>stripslashes($data['CLASS_NAME']),
            "section"         =>stripslashes($data['GROUP_NAME']),
            "sender"         =>stripslashes($data['sender']),
            "paper_name"         =>stripslashes($data['NAME']),
            "Max Marks/Grade"   =>$data['MARKS'],
            "Pass Marks/Grade"  =>$data['PASSING_MARKS'],
            "Obt. Marks/Grade"  =>$data['MARKS_OBTAINED'],
            "date"              =>date("d M,Y",strtotime($data['DATE']))
            ); 
            $count++;
        }
        $json= array(
                'type'=>"1",
                'results'=>$results,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'No Record Found',
            'msg'=>'Result Not Assigned'
          );
        echo json_encode($json);
        exit;
      }
   
     break;
        case 'markAttendance';
      
    $schoolid       = $_REQUEST['schoolid'];
    $classid        = $_REQUEST['classid'];
    $groupid        = $_REQUEST['sectionid'];
    //$studentid      = $_REQUEST['studentid'];
    $teacherid      = $_REQUEST['teacherid'];
    $subjectid      = $_REQUEST['subjectid'];
      $student = $_REQUEST['studentid'];
      $students = explode(',',$student);
      $attendance = $_REQUEST['mark'];
      $atd = explode(',',$attendance);
      foreach($students as $k=>$studentid){
        
        $rowArray=array(
                    'SCHOOL_ID'=>$schoolid,
                    'CLASS_ID'=>$classid,
                    'GROUP_ID'=>$groupid,
                    'SUBJECT_ID'=>$subjectid,
                    'STUDENT_ID'=>$studentid,
                    'TEACHER_ID'=>$teacherid,
                    'MARK'=>$atd[$k]
                	);
        $val = $objMisc->insert("attendance",$rowArray);
          $subjectname = $objMisc->getSubjectName($subjectid);
        
        $whereRec = " STUDENT_ID = '".$studentid."' ";
        $student    = $objMisc->GiveValue($whereRec,'USER_ID','student');
        
        if($student){
            $notification = array("notifcationfiontype"=>"Attendance Recieved","user"=>$student,"tag"=>"attendance","subjectname"=>$subjectname,"mark"=>$atd[$k]);
            $where = "1=1 and USER_ID ='".$student."' ";
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            if(isset($gcm_users) && !empty($gcm_users)){
                $registatoin_ids = array();
                foreach($gcm_users as $usersp){
                    $registatoin_ids[] = $usersp['device_id']; 
                }
                $resultp = $gcm->send_notification($registatoin_ids, $notification); 
            }
        }
        
        
        $sql = "select P.USER_ID from parent P join parent_student PS on P.PARENT_ID = PS.PARENT_ID and PS.STUDENT_ID =".$_POST['students'][$k];
        $parentData = mysql_query($sql);
        if(mysql_num_rows($parentData)>0){
            $parent = mysql_fetch_array($parentData);     
            $whereP = "1=1 and USER_ID ='".$parent['USER_ID']."' ";
            $gcm_p = $objMisc->getAllRecords('*','gcm_users',$whereP);
           
            if(isset($gcm_p) && !empty($gcm_p)){
                $registatoin_id = array();
                $j = 1;
                foreach($gcm_p as $usersp){
                    
                    $registatoin_id[] = $usersp['device_id'];
                    $j++;
                }
                
                $notifications = array("notifcationfiontype"=>"Attendance Recieved","user"=>$parent['USER_ID'],"tag"=>"attendance","subjectname"=>$subjectname,
                    "mark"=>$atd[$k]);
              
                $resultzzx = $gcm->send_notification($registatoin_id, $notifications);
                
            }
                
        }
        
        
        
        
      }
      
      $json= array(
                    'type'=>"1",
                    'msg'=>'Record insert succesfully'
                    );
            echo json_encode($json);
            exit;
      
 
    /*
    
    if(!empty($schoolid) && !empty($classid) && !empty($groupid) && !empty($studentid) && !empty($teacherid) && !empty($subjectid) && !empty($mark))
    {
        $rowArray=array(
                    'SCHOOL_ID'=>$schoolid,
                    'CLASS_ID'=>$classid,
                    'GROUP_ID'=>$groupid,
                    'SUBJECT_ID'=>$subjectid,
                    'STUDENT_ID'=>$studentid,
                    'TEACHER_ID'=>$teacherid,
                    'MARK'=>$mark
                	);
        $val = $objMisc->insert("attendance",$rowArray);
        if($val){
            
        }else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'query error',
                'msg'=>'Error in submit record please try again'
              );
            echo json_encode($json);
            exit;
        }
        
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'insuficient data',
            'msg'=>'Please fill all manadatory fields'
          );
        echo json_encode($json);
        exit;
      }
    */
     break;
     case 'postHomeWork';
    $schoolid      = $_REQUEST['schoolid'];
    $subjectid      = $_REQUEST['subjectid'];
    $teacherid      = $_REQUEST['teacherid'];
    $classid      = $_REQUEST['classid'];
    $groupid      = $_REQUEST['sectionid'];
    $homework       = addslashes($_REQUEST['homework']);
    if(!empty($_REQUEST['date'])){
        $date           = date("Y-m-d",strtotime($_REQUEST['date']));
    }
    /*
    *if School Login
    */ 
   if(!empty($teacherid)){
    
      if(!empty($subjectid))
          {
            if(!empty($homework) && !empty($date)) {
                if($groupid=='all'){
                     $where = "CLASS_ID = ".$classid; 
                     $groups = $objMisc->getAllRecords('*','groups',$where);
                     foreach($groups as $group){
                 
                  $rowArray=array(
                            'SCHOOL_ID'=>$schoolid,
                            'CLASS_ID'=>$classid,
                            'GROUP_ID'=>$group['group_id'],
                            'SUBJECT_ID'=>$subjectid,
                            'HOME_WORK'=>$homework,
                            'TEACHER_ID'=>$teacherid,
                            'DATE'=>$date,
                            'DATE_ADDED'=>date("Y-m-d H:i:s")
                        	);
                         $val = $objMisc->insert("student_home_work",$rowArray);
                 
                 $subjectname = $objMisc->getSubjectName($subjectid);
                 
                 $sql ="SELECT s.*,p.USER_ID as parent FROM `student` s join parent_student ps on s.`STUDENT_ID`=ps.`STUDENT_ID` join parent p on ps.PARENT_ID=p.PARENT_ID WHERE 1 and s.`CLASS`=".$classid." and s.`GROUP`=".$group['group_id'];
                 $sqlResult = mysql_query($sql);       
                 if(mysql_num_rows($sqlResult)>0){
                    $i = 1;
                    while($student = mysql_fetch_array($sqlResult))  {
                        
                            $notification = array("notifcationfiontype"=>"Home-work","user"=>$student['USER_ID'],"tag"=>"homework","homework"=>$homework,
                                "subjectname"=>$subjectname);
                            $pnotification = array("notifcationfiontype"=>"Home-Work","user"=>$student['parent'],"tag"=>"homework","homework"=>$homework,
                                "subjectname"=>$subjectname);
                            $where = "1=1 and USER_ID ='".$student['USER_ID']."' ";
                            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
                            if(isset($gcm_users) && !empty($gcm_users)){
                                $registatoin_ids = array();
                                foreach($gcm_users as $users){
                                    $registatoin_ids[] = $users['device_id'];
                                    $result = $gcm->send_notification($registatoin_ids, $notification);
                                }
                            }
                            
                            $whereP = "1=1 and USER_ID ='".$student['parent']."' ";
                            $gcm_p = $objMisc->getAllRecords('*','gcm_users',$whereP);
                            if(isset($gcm_p) && !empty($gcm_p)){
                                $registatoin_id = array();
                                foreach($gcm_p as $usersp){
                                    $registatoin_id[] = $usersp['device_id'];
                                    $resultp = $gcm->send_notification($registatoin_id, $pnotification);
                                }
                            }
                            $i++;
                    }
                 }  
               
                     }
                     $json= array(
                                'type'=>"1",
                                'msg'=>'Home Work submit Successfully');
                        echo json_encode($json);
                        exit;
                } else{
                $rowArray=array(
                    'SCHOOL_ID'=>$schoolid,
                    'CLASS_ID'=>$classid,
                    'GROUP_ID'=>$groupid,
                    'SUBJECT_ID'=>$subjectid,
                    'HOME_WORK'=>$homework,
                    'TEACHER_ID'=>$teacherid,
                    'DATE'=>$date,
                    'DATE_ADDED'=>date("Y-m-d H:i:s")
                	);
                   $val = $objMisc->insert("student_home_work",$rowArray);
                   $subjectname = $objMisc->getSubjectName($subjectid);

                   $sql ="SELECT s.*,p.USER_ID as parent FROM `student` s join parent_student ps on s.`STUDENT_ID`=ps.`STUDENT_ID` join parent p on ps.PARENT_ID=p.PARENT_ID WHERE 1 and s.`CLASS`=".$classid." and s.`GROUP`=".$groupid;
                 $sqlResult = mysql_query($sql);       
                 if(mysql_num_rows($sqlResult)>0){
                    $i = 1;
                    while($student = mysql_fetch_array($sqlResult))  {
                        
                            $notification = array("notifcationfiontype"=>"Home-Work","user"=>$student['USER_ID'],"homework"=>$homework,
                                "subjectname"=>$subjectname,"tag"=>"homework");
                            $pnotification = array("notifcationfiontype"=>"Home-Work","user"=>$student['parent'],"homework"=>$homework,
                                "subjectname"=>$subjectname,"tag"=>"homework");
                            $where = "1=1 and USER_ID ='".$student['USER_ID']."' ";
                            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
                            if(isset($gcm_users) && !empty($gcm_users)){
                                $registatoin_ids = array();
                                foreach($gcm_users as $users){
                                    $registatoin_ids[] = $users['device_id'];
                                    $result = $gcm->send_notification($registatoin_ids, $notification);
                                }
                            }
                            
                            $whereP = "1=1 and USER_ID ='".$student['parent']."' ";
                            $gcm_p = $objMisc->getAllRecords('*','gcm_users',$whereP);
                            if(isset($gcm_p) && !empty($gcm_p)){
                                $registatoin_id = array();
                                foreach($gcm_p as $usersp){
                                    $registatoin_id[] = $usersp['device_id'];
                                    $resultp = $gcm->send_notification($registatoin_id, $pnotification);
                                }
                            }
                            $i++;
                    }
                 } 
                   
                   
                    if($val){
                        $json= array(
                                'type'=>"1",
                                'msg'=>'Home Work submit Successfully');
                        echo json_encode($json);
                        exit;
                    }else {
                        $json= array(
                        'type'=>"0",
                        'err_desc'=>'query error',
                        'msg'=>'There is error occured Please submit again'
                      );
                    echo json_encode($json);
                    exit;
                    }
                 }
                    
            } else {
                    $json= array(
                    'type'=>"0",
                    'err_desc'=>'home work field empty',
                    'msg'=>'Please fill home work and date field'
                  );
                echo json_encode($json);
                exit;
                
              }
            
          } else {
                $json= array(
                'type'=>"0",
                'err_desc'=>'subect id  not set',
                'msg'=>'Please select subject'
              );
            echo json_encode($json);
            exit;
            
          }
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'techer id not found',
            'msg'=>'Please login to continue'
          );
        echo json_encode($json);
        exit;
      }
    
     break;
     
     case 'stuResult';
    $studentid      = $_REQUEST['studentid'];
    /*
    *if School Login
    */ 
      //echo $sql      = "select R.MARKS_OBTAINED,E.NAME,E.MARKS,E.PASSING_MARKS,S.SUBJECT_NAME from student_result R join exams E on R.EXAM_ID = E.EXAM_ID join subject S on S.SUBJECT_ID = E.SUBJECT_ID where R.STUDENT_ID = $studentid ";
      $sql      = "select R.*,P.NAME from student_result R join papers P on R.PAPER_ID = P.PAPER_ID and R.STUDENT_ID = $studentid ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $count = 1;
        while ($data = mysql_fetch_array($result)){
            $results[]=array(
            "paper_name"        =>stripslashes($data['NAME']),
            "Max Marks/Grade"   =>$data['MARKS'],
            "Pass Marks/Grade"  =>$data['PASSING_MARKS'],
            "Obt. Marks/Grade"  =>$data['MARKS_OBTAINED']
            ); 
            $count++;
        }
        $json= array(
                'type'=>"1",
                'results'=>$results,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'No Record Found',
            'msg'=>'Result Not Assigned'
          );
        echo json_encode($json);
        exit;
      }
     break;
     
     case 'postResult';
    $studentid      = $_REQUEST['studentid'];
    $paperid        = $_REQUEST['paperid'];
    $schoolid       = $_REQUEST['schoolid'];
    $teacherid      = $_REQUEST['teacherid'];
    $subjectid      = $_REQUEST['subjectid'];
    $marks          = $_REQUEST['marks'];
    /*
    *if School Login
    */ 
    if(!empty($studentid) && !empty($paperid) && !empty($schoolid) && !empty($teacherid) && !empty($marks))
    {
        $where      = "PAPER_ID = ".$paperid;
        $paper = $objMisc->getRow("papers",$where);
        $rowArray=array(
                    'SCHOOL_ID'=>$schoolid,
                    'STUDENT_ID'=>$studentid,
                    'CLASS_ID'=>$paper['class_id'],
                    'GROUP_ID'=>$paper['group_id'],
                    'SUBJECT_ID'=>$subjectid,
                    'PAPER_ID'=>$paperid,
                    'MARKS'=>$paper['marks'],
                    'PASSING_MARKS'=>$paper['passing_marks'],
                    'MARKS_OBTAINED'=>$marks,
                    'TEACHER_ID'=>$teacherid,
                    'DATE'=>date('Y-m-d H:i:s')
                	);
        $val = $objMisc->insert("student_result",$rowArray);
        
        
        if($val){
            
        $whereRec = " STUDENT_ID = '".$studentid."' ";
        $student    = $objMisc->GiveValue($whereRec,'USER_ID','student');
        
        if($student){
            $notification = array("notifcationfiontype"=>"Result Recieved","user"=>$student);
            $where = "1=1 and USER_ID ='".$student."' ";
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            if(isset($gcm_users) && !empty($gcm_users)){
                $registatoin_ids = array();
                foreach($gcm_users as $usersp){
                    $registatoin_ids[] = $usersp['device_id']; 
                }
                $resultp = $gcm->send_notification($registatoin_ids, $notification); 
            }
        }
        
          
        $sql = "select P.USER_ID from parent P join parent_student PS on P.PARENT_ID = PS.PARENT_ID and PS.STUDENT_ID =".$studentid;
        $parentData = mysql_query($sql);
        if(mysql_num_rows($parentData)>0){
            $parent = mysql_fetch_array($parentData);     
            $whereP = "1=1 and USER_ID ='".$parent['USER_ID']."' ";
            $gcm_p = $objMisc->getAllRecords('*','gcm_users',$whereP);
           
            if(isset($gcm_p) && !empty($gcm_p)){
                $registatoin_id = array();
                $j = 1;
                foreach($gcm_p as $usersp){
                    
                    $registatoin_id[] = $usersp['device_id'];
                    $j++;
                }
                
                $notifications = array("notifcationfiontype"=>"Result Recieved","user"=>$parent['USER_ID']);
              
                $resultzzx = $gcm->send_notification($registatoin_id, $notifications);
                
            }
                
        }
        
            $json= array(
                    'type'=>"1",
                    'msg'=>'Record insert succesfully'
                    );
            echo json_encode($json);
            exit;
        }else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'query error',
                'msg'=>'Error in submit record please try again'
              );
            echo json_encode($json);
            exit;
        }
        
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'insuficient data',
            'msg'=>'Please fill all manadatory fields'
          );
        echo json_encode($json);
        exit;
      }
     break;
     
     case 'searchStudents';
    $class     = $_REQUEST['classid'];
    $group     = $_REQUEST['sectionid'];
    /*
    *if School Login
    */ 
    if(!empty($class) && !empty($group))
    {
        $where = "`CLASS` =".$class." and `GROUP` =".$group; 
        $students = $objMisc->getAllRecords('*','student',$where);        
        $k = 1;
        foreach($students as $student){                                                    
            $studentsData[]=array(
            "studentname"=>stripslashes($student['first_name']).' '.stripslashes($student['last_name']),
            "studentid"=>$student['student_id'],
            "roll_number"=>$student['roll_no']
            ); 
            $k++;
        }
        if(empty($studentsData)){
            $studentsData = array();
        }     
        $json= array(
                'type'=>"1",
                'student'=>$studentsData,
                'msg'=>'success');
        echo json_encode($json);
        exit; 
        
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'insuficient data',
            'msg'=>'Please fill all manadatory fields'
          );
        echo json_encode($json);
        exit;
      }
    
     break;
     
    case 'sendNotice';    
    $schoolid      = $_REQUEST['schoolid'];
    $sendtoid      = $_REQUEST['sendtoid'];
    $sendtotype    = $_REQUEST['sendtotype'];
    $sendbyid      = $_REQUEST['sendbyid'];
    $sendbytype    = $_REQUEST['sendbytype'];
    $notice        = $_REQUEST['notice'];
    $classid       = $_REQUEST['classid'];
    $sectionid     = $_REQUEST['sectionid'];
    $type          = $_REQUEST['type'];
    $filname       = $_REQUEST['filname'];
    $bool = false;      
    if($type=='image'){
        
        $school = './uploads/school_'.$schoolid.'/notice/images/';
        if (!file_exists($school)) {
            mkdir($school, 0777, true);
            
        }
        
        if (move_uploaded_file($_FILES['file']['tmp_name'], $school.$_FILES['file']['name'])) { 
            $bool = true; 

        } 
        $file = '/uploads/school_'.$schoolid.'/notice/images/'.$_FILES['file']['name'];
        
    }elseif($type=='voice'){
        
        $school = './uploads/school_'.$schoolid.'/notice/voice/';
        if (!file_exists($school)) {
            mkdir($school, 0777, true);
            
        }
        
        if (move_uploaded_file($_FILES['file']['tmp_name'], $school.$_FILES['file']['name'])) { 
            $bool = true; 

        } 
        $file = '/uploads/school_'.$schoolid.'/notice/voice/'.$_FILES['file']['name'];
        
    }
    if($sendbytype=='T' || $sendbytype=='S'){
        $whereRec   = " TEACHER_ID = '".$sendbyid."' ";
        $sendername    = $objMisc->GiveValue($whereRec,"CONCAT(FIRST_NAME,' ',LAST_NAME)",'teacher');
    }elseif($sendbytype=='SCH'){
        //$whereRec   = " SCHOOL_ID = '".$sendbyid."' ";
        $sendername    = "School Admin";
    }elseif($sendbytype=='P'){
        $whereRec   = " PARENT_ID = '".$sendbyid."' ";
        $sendername    = $objMisc->GiveValue($whereRec,"CONCAT(FIRST_NAME,' ',LAST_NAME)",'parent');
    } else {
        $sendername = "";
    }  
    if($sendtotype=='all'){
        $teachers = $objMisc->getAllRecords('TEACHER_ID,USER_ID','teacher',"1=1 and STATUS='A' and TYPE='T' and SCHOOL_ID = ".$schoolid);
        
        $i = 1;
        foreach($teachers as $teacher){                                                    
            $rowArray = array(
                'SCHOOL_ID'        =>$schoolid,
                'SEND_TO_ID'       =>$teacher['teacher_id'],
                'NOTICE_GROUP_ID'  =>$notice_group_id,
                'SEND_BY_ID'       =>$sendbyid,
                'SEND_TO_TYPE'     =>'T',
                'SEND_BY_TYPE'     =>$sendbytype,
                'NOTICE'           =>$notice,
                'DATE'             => date('Y-m-d H:i;s')
                );
        $val = $objMisc->insert("student_notice",$rowArray);
        $where = "1=1 and USER_ID = ".$teacher['USER_ID'];
        $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
        $notification = array("notifcationfiontype"=>"Notification recieved","user"=>$teacher['USER_ID']);
        if(isset($gcm_users) && !empty($gcm_users)){
            foreach($gcm_users as $users){
                
             $result = $gcm->send_notification($users['DEVICE_ID'], $notification);
            }
        }            
        $i++;
        }
        
        $staffs = $objMisc->getAllRecords('TEACHER_ID','teacher',"1=1 and STATUS='A' and TYPE='S' and SCHOOL_ID = ".$schoolid);
        $k = 1;
        foreach($staffs as $staff){                                                    
            $rowArray = array(
                'SCHOOL_ID'        =>$schoolid,
                'SEND_TO_ID'       =>$staff['teacher_id'],
                'NOTICE_GROUP_ID'  =>$notice_group_id,
                'SEND_BY_ID'       =>$sendbyid,
                'SEND_TO_TYPE'     =>'S',
                'SEND_BY_TYPE'     =>$sendbytype,
                'NOTICE'           =>$notice,
                'DATE'             => date('Y-m-d H:i;s')
                );
        $_SESSION['msg'] = 1;
        $val = $objMisc->insert("student_notice",$rowArray); 
        $k++;
        }
                
       
        $sql = "SELECT s.STUDENT_ID,s.USER_ID,p.USER_ID as parent FROM `student` s join parent_student ps on s.`STUDENT_ID`=ps.`STUDENT_ID` join parent p on ps.PARENT_ID=p.PARENT_ID WHERE 1 and s.SCHOOL_ID = ".$schoolid;
        $sqlResult = mysql_query($sql);     
        if(mysql_num_rows($sqlResult)>0){
        $j = 1;
        while($student = mysql_fetch_array($sqlResult)) {                                         
            $rowArray = array(
                'SCHOOL_ID'        =>$schoolid,
                'SEND_TO_ID'       =>$student['STUDENT_ID'],
                'NOTICE_GROUP_ID'  =>$notice_group_id,
                'SEND_BY_ID'       =>$sendbyid,
                'SEND_TO_TYPE'     =>'STU',
                'SEND_BY_TYPE'     =>$sendbytype,
                'NOTICE'           =>$notice,
                'DATE'             => date('Y-m-d H:i;s')
                );
            $val = $objMisc->insert("student_notice",$rowArray);
            
            $notification = array("notifcationfiontype"=>"Notification recieved","user"=>$student['USER_ID']);
            $pnotification = array("notifcationfiontype"=>"Notification recieved","user"=>$student['parent']);
            $where = "1=1 and USER_ID ='".$student['USER_ID']."' ";
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            if(isset($gcm_users) && !empty($gcm_users)){
                $registatoin_ids = array();
                foreach($gcm_users as $users){
                    $registatoin_ids[] = $users['device_id'];   
                    $result = $gcm->send_notification($registatoin_ids, $notification);
                }
            }
            
            $whereP = "1=1 and USER_ID ='".$student['parent']."' ";
            $gcm_p = $objMisc->getAllRecords('*','gcm_users',$whereP);
            if(isset($gcm_p) && !empty($gcm_p)){
                $registatoin_id = array();
                foreach($gcm_p as $usersp){
                    $registatoin_id[] = $usersp['device_id'];
                    $resultp = $gcm->send_notification($registatoin_id, $pnotification);
                }
            }
            $j++;
         }
        }
         $json= array(
                'type'=>"1",
                'msg'=>'success');
            echo json_encode($json);
            exit;
    } else{
        if($sendtotype=='T'){
        
        if($sendtoid=='all'){
             $teachers = $objMisc->getAllRecords('TEACHER_ID,USER_ID','teacher',"1=1 and STATUS='A' and TYPE='T' and SCHOOL_ID = ".$schoolid);
        
        $i = 1;
        foreach($teachers as $teacher){                                                    
                $rowArray = array(
                    'SCHOOL_ID'        =>$schoolid,
                    'SEND_TO_ID'       =>$teacher['teacher_id'],
                    'NOTICE_GROUP_ID'  =>$notice_group_id,
                    'SEND_BY_ID'       =>$sendbyid,
                    'SEND_TO_TYPE'     =>'T',
                    'SEND_BY_TYPE'     =>$sendbytype,
                    'NOTICE'           =>$notice,
                    'DATE'             => date('Y-m-d H:i;s')
                    );
            $val = $objMisc->insert("student_notice",$rowArray);
            $where = "1=1 and USER_ID = ".$teacher['USER_ID'];
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            $notification = array("notifcationfiontype"=>"Notification recieved","user"=>$teacher['USER_ID']);
            if(isset($gcm_users) && !empty($gcm_users)){
                foreach($gcm_users as $users){
                    
                 $result = $gcm->send_notification($users['DEVICE_ID'], $notification);
                }
            }            
            $i++;
            }
        } else {
            if(gettype($sendtoid)=='integer'){
                $rowArray = array(
            'SCHOOL_ID'       =>$schoolid,
            'SEND_TO_ID'       =>$sendtoid,
            'SEND_BY_ID'       =>$sendbyid,
            'SEND_TO_TYPE'       =>$sendtotype,
            'SEND_BY_TYPE'       =>$sendbytype,
            'NOTICE'            =>$notice,
            'TYPE'                  =>$type,
            'DATE'              =>date("Y-m-d H:i:s")
            );
        if($bool) {
                    $link = $_SERVER['HTTP_HOST'].$file;
                    $rowArray['MEDIA'] = $link;
                }
                    
        $val = $objMisc->insert("student_notice",$rowArray);
        
            $whereRec   = " TEACHER_ID = '".$sendtoid."' ";
            $teacher    = $objMisc->GiveValue($whereRec,'USER_ID','teacher');
         
            $where = "1=1 and USER_ID = ".$teacher['USER_ID'];
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            $notification = array("notifcationfiontype"=>"Notification recieved","tag"=>"message","message"=>$notice,"user"=>$teacher['USER_ID'],"sender"=>$sendername);
            if(isset($gcm_users) && !empty($gcm_users)){
                foreach($gcm_users as $users){
                    
                 $result = $gcm->send_notification($users['DEVICE_ID'], $notification);
                }
            } 
            
        
        
        $lastInsertId = mysql_insert_id();
            if($lastInsertId){
               $json= array(
                    'type'=>"1",
                    'msg'=>'success');
                echo json_encode($json);
                exit;
            } else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'query error',
                'msg'=>'Message Not Send'
              );
            echo json_encode($json);
            exit;
          }    
          } elseif(gettype($sendtoid=='string')) {
            $ids = explode(',',$sendtoid);
            foreach($ids as $id){
            $rowArray = array(
            'SCHOOL_ID'       =>$schoolid,
            'SEND_TO_ID'       =>$id,
            'SEND_BY_ID'       =>$sendbyid,
            'SEND_TO_TYPE'       =>$sendtotype,
            'SEND_BY_TYPE'       =>$sendbytype,
            'NOTICE'            =>$notice,
            'TYPE'                  =>$type,
            'DATE'              =>date("Y-m-d H:i:s")
            );
        if($bool) {
                    $link = $_SERVER['HTTP_HOST'].$file;
                    $rowArray['MEDIA'] = $link;
                }
                    
        $val = $objMisc->insert("student_notice",$rowArray);
        
            $whereRec   = " TEACHER_ID = '".$id."' ";
            $teacher    = $objMisc->GiveValue($whereRec,'USER_ID','teacher');
         
            $where = "1=1 and USER_ID = ".$teacher['USER_ID'];
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            $notification = array("notifcationfiontype"=>"Notification recieved","tag"=>"message","message"=>$notice,"user"=>$teacher['USER_ID'],"sender"=>$sendername);
            if(isset($gcm_users) && !empty($gcm_users)){
                foreach($gcm_users as $users){
                    
                 $result = $gcm->send_notification($users['DEVICE_ID'], $notification);
                }
            } 
            
            $lastInsertId = mysql_insert_id();
                if($lastInsertId){
                   $json= array(
                        'type'=>"1",
                        'msg'=>'success');
                    echo json_encode($json);
                    exit;
                } else{
                $json= array(
                    'type'=>"0",
                    'err_desc'=>'query error',
                    'msg'=>'Message Not Send'
                  );
                echo json_encode($json);
                exit;
               }    
              }
            }
        }
        
        } elseif($sendtotype=='S') {
            if($sendtoid=='all'){
                $staffs = $objMisc->getAllRecords('USER_ID,TEACHER_ID','teacher',"1=1 and STATUS='A' and TYPE='S' and SCHOOL_ID = ".$schoolid);
               
                $k = 1;
                foreach($staffs as $staff){                                                    
                    $rowArray = array(
                        'SCHOOL_ID'        =>$schoolid,
                        'SEND_TO_ID'       =>$staff['teacher_id'],
                        'NOTICE_GROUP_ID'  =>$notice_group_id,
                        'SEND_BY_ID'       =>$sendbyid,
                        'SEND_TO_TYPE'     =>'S',
                        'SEND_BY_TYPE'     =>$sendbytype,
                        'NOTICE'           =>$notice,
                        'DATE'             => date('Y-m-d H:i;s')
                        );
      
                $val = $objMisc->insert("student_notice",$rowArray);
                $where = "1=1 and USER_ID = ".$staff['user_id'];
                $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
                $notification = array("notifcationfiontype"=>"Notification recieved","user"=>$staff['user_id']);
                if(isset($gcm_users) && !empty($gcm_users)){
                    foreach($gcm_users as $users){
                        
                     $result = $gcm->send_notification($users['device_id'], $notification);
                    }
                } 
                $k++;
                }
            } else {
                $rowArray = array(
                    'SCHOOL_ID'       =>$schoolid,
                    'SEND_TO_ID'       =>$sendtoid,
                    'SEND_BY_ID'       =>$sendbyid,
                    'SEND_TO_TYPE'       =>$sendtotype,
                    'SEND_BY_TYPE'       =>$sendbytype,
                    'NOTICE'            =>$notice,
                    'TYPE'                  =>$type,
                    'DATE'              =>date("Y-m-d H:i:s")
                    );
        if($bool) {
                    $link = $_SERVER['HTTP_HOST'].$file;
                    $rowArray['MEDIA'] = $link;
                }
                    
        $val = $objMisc->insert("student_notice",$rowArray);
        
            $whereRec   = " TEACHER_ID = '".$sendtoid."' ";
            $teacher    = $objMisc->GiveValue($whereRec,'USER_ID','teacher');
         
            $where = "1=1 and USER_ID = ".$teacher['USER_ID'];
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            $notification = array("notifcationfiontype"=>"Notification recieved","tag"=>"message","message"=>$notice,"user"=>$teacher['USER_ID'],"sender"=>$sendername);
            if(isset($gcm_users) && !empty($gcm_users)){
                foreach($gcm_users as $users){
                    
                 $result = $gcm->send_notification($users['DEVICE_ID'], $notification);
                }
            } 
            
        
        
        $lastInsertId = mysql_insert_id();
            if($lastInsertId){
               $json= array(
                    'type'=>"1",
                    'msg'=>'success');
                echo json_encode($json);
                exit;
            } else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'query error',
                'msg'=>'Message Not Send'
              );
            echo json_encode($json);
            exit;
          } 
            }
            
        } elseif($sendtotype=='STU') {
             $and = "";
        if(!empty($classid)){
            $and .= " and s.`CLASS` =".$classid;
        }
        if(!empty($sectionid) && $sectionid!="all"){
             $and .= " and s.`GROUP` =".$sectionid;
        }
        if(!empty($sendtoid) && $sendtoid!="all"){
           $and .= " and s.`STUDENT_ID` =".$sendtoid; 
        }
         $where = "1=1  and SCHOOL_ID = ".$schoolid.$and;
         
        $sql = "SELECT s.*,p.USER_ID as parent FROM `student` s join parent_student ps on s.`STUDENT_ID`=ps.`STUDENT_ID` join parent p on ps.PARENT_ID=p.PARENT_ID WHERE 1 ".$and;
        
         $sqlResult = mysql_query($sql);
         if(mysql_num_rows($sqlResult)>0){
         $i = 1;
         while($student = mysql_fetch_array($sqlResult))  { 
            $rowArray = array(
                        'SCHOOL_ID'       =>$schoolid,
                        'SEND_TO_ID'       =>$student['STUDENT_ID'],
                        'SEND_BY_ID'       =>$sendbyid,
                        'SEND_TO_TYPE'       =>'STU',
                        'SEND_BY_TYPE'       =>$sendbytype,
                        'NOTICE'            =>$notice,
                        'TYPE'                  =>$type,
                        'DATE'              =>date("Y-m-d H:i:s")
                        );
            if($bool) {
                $link = $_SERVER['HTTP_HOST'].$file;
                $rowArray['MEDIA'] = $link;
            }
            
            $val = $objMisc->insert("student_notice",$rowArray);
            
            $notification = array("notifcationfiontype"=>"Notification recieved","tag"=>"message","message"=>$notice,"user"=>$student['USER_ID'],"sender"=>$sendername);
            $pnotification = array("notifcationfiontype"=>"Notification recieved","tag"=>"message","message"=>$notice,"user"=>$student['parent'],"sender"=>$sendername);
            $where = "1=1 and USER_ID ='".$student['USER_ID']."' ";
            $gcm_users = $objMisc->getAllRecords('*','gcm_users',$where);
            if(isset($gcm_users) && !empty($gcm_users)){
                $registatoin_ids = array();
                foreach($gcm_users as $users){
                    $registatoin_ids[] = $users['device_id'];
                    $result = $gcm->send_notification($registatoin_ids, $notification);
                }
            }
            
            $whereP = "1=1 and USER_ID ='".$student['parent']."' ";
            $gcm_p = $objMisc->getAllRecords('*','gcm_users',$whereP);
            if(isset($gcm_p) && !empty($gcm_p)){
                $registatoin_id = array();
                foreach($gcm_p as $usersp){
                    $registatoin_id[] = $usersp['device_id'];
                    $resultp = $gcm->send_notification($registatoin_id, $pnotification);
                }
            }
            
         }
         $i++;
         }
         $json= array(
                'type'=>"1",
                'msg'=>'success');
            echo json_encode($json);
            exit; 
        }
         
    }   
    
   
    break;
       
    case 'stuNotice';
    $sendtoid     = $_REQUEST['id'];
    $type         = $_REQUEST['type'];
    $fromdate     = $_REQUEST['fromdate'];
    $schoolid     = $_REQUEST['schoolid'];  
    if(!empty($fromdate)){
       $fromdate = date('Y-m-d 00:00:00',strtotime($fromdate)); 
    }
    $todate     = $_REQUEST['todate'];
    if(!empty($todate)){
       $todate = date('Y-m-d 23:59:59',strtotime($todate)); 
    }
     $and = "";
        if(!empty($fromdate) && !empty($todate)){
            $and .= " and (DATE between '$fromdate' and '$todate' )";
        }elseif(!empty($fromdate)){
            $and .= " and DATE >= '$fromdate' ";
        }elseif(!empty($todate)){
            $and .= " and DATE <= '$todate'";
        }
    /*
    *if School Login
    */ 
   
      $sql      = "select * from student_notice where SCHOOL_ID = $schoolid and SEND_TO_ID = $sendtoid  and SEND_TO_TYPE='$type' $and ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $count = 1;
        while ($data = mysql_fetch_array($result)){                                                    
            
            if($data['SEND_BY_TYPE']=='T' || $data['SEND_BY_TYPE']=='S'){
                $where = "TEACHER_ID = ".$data['SEND_BY_ID'];
                $send_by    = "Teacher";
                $name = $objMisc->GiveValue($where,"CONCAT(FIRST_NAME,' ',LAST_NAME)","teacher");
                //$name = $teacher['first_name'].' '.$teacher['last_name']; 
            } else {
                $where = "SCHOOL_ID = ".$data['SEND_BY_ID'];
                $send_by    = "School Admin";
                $name = $objMisc->GiveValue($where,"CONCAT(FIRST_NAME,' ',LAST_NAME)","school");
               // $name = $objMisc->GiveValue($where,"NAME","school");
            }
            if($type=='STU'){
                $where1  = "TEACHER_ID = ".$sendtoid;
                $name    = "Teacher";
                $tchname = $objMisc->GiveValue($where1,"CONCAT(FIRST_NAME,' ',LAST_NAME)","teacher");
                $reciver = array('reciver_name'=>$tchname); 
            }elseif($type=='T'){
                $sqlQuery = "select S.ROLL_NO,CONCAT(S.FIRST_NAME,' ',S.LAST_NAME) as stuname,C.CLASS_NAME,G.GROUP_NAME from student S join class C on S.CLASS=C.CLASS_ID join groups G on S.GROUP=G.GROUP_ID where 1 and S.STUDENT_ID='".$sendtoid."'";
                $recData   = mysql_query($sqlQuery) or mysql_error();
                
                if(mysql_num_rows($recData)>0){
                    $dataRec= mysql_fetch_array($recData);
                    $reciver = array('reciver_name'=>$dataRec['stuname'],
                                    'roll_no'=>$dataRec['ROLL_NO'],
                                    'class'=>$dataRec['CLASS_NAME'],
                                    'section'=>$dataRec['GROUP_NAME']
                                    );
                }
                
            }
            
            if(empty($name)){
                $name = "";
            }
            if(empty($reciver)){
                $reciver = array();
            }
            $notice[]=array(
            "notice_id"     =>$data['NOTICE_ID'],
            "type"     =>$data['TYPE'],
            "media"     =>$data['MEDIA'],
            "description"   =>stripslashes($data['NOTICE']),
            "send_by"       =>$send_by,
            "name"          =>$name,
            "reciver"       =>$reciver,
            "notice_date"   =>date("d M,Y",strtotime($data['DATE']))
            ); 
            $count++;
        }
        /*
        if($type=='STU'){
            $sqlQuery = "select S.ROLL_NO,CONCAT(S.FIRST_NAME,' ',S.LAST_NAME),C.CLASS_NAME,G.GROUP_NAME from student S join class C on S.CLASS=C.CLASS_ID join groups on S.GROUP=G.GROUP_ID ";
        }
        */
        $json= array(
                'type'=>"1",
                'notice'=>$notice,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'No Record Found',
            'msg'=>'No Notice assigned on this date'
          );
        echo json_encode($json);
        exit;
      }
    
     break;

     case 'stuResult';
    $subjectid      = $_REQUEST['studentid'];
    /*
    *if School Login
    */ 
   
      $sql      = "select R.MARKS_OBTAINED,E.NAME,E.MARKS,E.PASSING_MARKS,S.SUBJECT_NAME from student_result R join exams E on R.EXAM_ID = E.EXAM_ID join subject S on S.SUBJECT_ID = E.SUBJECT_ID where R.STUDENT_ID = $subjectid ";
      $result   = mysql_query($sql) or mysql_error();
      if(mysql_num_rows($result)>0){
        $count = 1;
        while ($data = mysql_fetch_array($result)){
            $results[]=array(
            "subject_name"      =>stripslashes($data['SUBJECT_NAME']),
            "exam_name"         =>stripslashes($data['NAME']),
            "Max Marks/Grade"   =>$data['MARKS'],
            "Pass Marks/Grade"  =>$data['PASSING_MARKS'],
            "Obt. Marks/Grade"  =>$data['MARKS_OBTAINED']
            ); 
            $count++;
        }
        $json= array(
                'type'=>"1",
                'results'=>$results,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'No Record Found',
            'msg'=>'Home Work Not Assigned'
          );
        echo json_encode($json);
        exit;
      }
    
     break;
     
     case 'calendar';
     $schoolid    = $_REQUEST['schoolid'];
     $where = "SCHOOL_ID = ".$schoolid; 
     $events = $objMisc->getAllRecords('*','events',$where);
     foreach($events as $event){
        $data[] = array(  'id'=>$event['id'],
                        'title'=>$event['title'],
                        'start'=>$event['start'],
                        'end'=>$event['end']
                        );
     }
     if(is_array($data) && !empty($data)){
     $json= array(
                'type'=>"1",
                'events'=>$data,
                'msg'=>'success');
        echo json_encode($json);
        exit;
      }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'No Record Found',
            'msg'=>'No events Add'
          );
        echo json_encode($json);
        exit;
      }    
     break;
     
     case 'imageGallery';
     $schoolid    = $_REQUEST['schoolid'];
     $where = "SCHOOL_ID = ".$schoolid; 
     $albums = $objMisc->getAllRecords('*','gallery_album',$where);
     foreach($albums as $album){
        $where1 = "ALBUM_ID = ".$album['album_id']; 
        $images = $objMisc->getAllRecords('*','gallery_images',$where1);
        $i = 1;
        $data = array();
        foreach($images as $image){
            
            if($i==1){
                $album_image  = $image['name'];
            }
            if(!empty($image['name'])){
                $image = $image['name'];
            } else {
                $image = "";
            }
             $data[] = array(
                            'name'=>$image,
                            'caption'=>$image['caption']
                        );
             $i++;
        }
        if(isset($album_image) && !empty($album_image)){
            $album_image = $album_image;
        } else{
            $album_image = "";
        }
       $record[] = array('album'=>$album['album_name'],
                        'album_image'=>$album_image,
                        'images'=>$data);
     }
     $json= array(
                'type'=>"1",
                'events'=>$record,
                'msg'=>'success');
        echo json_encode($json);
        exit;
     
     
     
     break;
     
    case 'viewAttendance';
    $studentid    = $_REQUEST['studentid'];
    $fromdate     = $_REQUEST['fromdate'];
    if(!empty($fromdate)){
       $fromdate = date('Y-m-d 00:00:00',strtotime($fromdate)); 
    }
    $todate     = $_REQUEST['todate'];
    if(!empty($todate)){
       $todate = date('Y-m-d 23:59:59',strtotime($todate)); 
    }
    
    /*
    *if School Login
    */ 
    if(!empty($studentid))
    {   
        $and = "";
        if(!empty($fromdate) && !empty($todate)){
            $and .= " and (A.DATE between '$fromdate' and '$todate' )";
        }elseif(!empty($fromdate)){
            $and .= " and A.DATE >= '$fromdate' ";
        }elseif(!empty($todate)){
            $and .= " and A.DATE <= '$todate'";
        }
        
        $and .=" and A.STUDENT_ID = ".$studentid;
         
        $attendance = "select A.MARK,A.DATE,C.CLASS_NAME,G.GROUP_NAME,S.SUBJECT_NAME,CONCAT(T.FIRST_NAME,' ',T.LAST_NAME) as sender from attendance A join subject S on A.SUBJECT_ID = S.SUBJECT_ID join class C on A.CLASS_ID=C.CLASS_ID join groups G on G.GROUP_ID=A.GROUP_ID join teacher T on A.TEACHER_ID=T.TEACHER_ID where 1 $and"; 
        $data  = mysql_query($attendance);
         if(mysql_num_rows($data)>0) 
         {
            $record = array();
            while($result = mysql_fetch_array($data)){
                $record[] = array(
                                    'class'=>$result['CLASS_NAME'],
                                    'section'=>$result['GROUP_NAME'],
                                    'teacher_name'=>$result['sender'],
                                    'subjectname'=>$result['SUBJECT_NAME'],
                                    'attendance'=>$result['MARK'],
                                    'date'=>date('d/m/Y',strtotime($result['DATE']))
                                    );
            }
             $json= array(
                'type'=>"1",
                'attendance'=>$record,
                'msg'=>'success');
            echo json_encode($json);
            exit; 
         }else{
                $json= array(
                'type'=>"0",
                'err_desc'=>'no record found',
                'msg'=>'No Record Found'
              );
            echo json_encode($json);
            exit;
         }
        
    }else{
        $json= array(
            'type'=>"0",
            'err_desc'=>'insuficient data',
            'msg'=>'Please fill all manadatory fields'
          );
        echo json_encode($json);
        exit;
      }
    
     break; 
     
     case 'logout':
        $user = $_REQUEST['user'];
        $where = "USER_ID = '$user' and DEVICE_ID ='$device_id'";
        $name = $objMisc->delete('gcm_users',$where);
        if($name){
          $json= array(
            'type'=>"1"
          );
        echo json_encode($json);
        exit;   
        } else {
            $json= array(
            'type'=>"0"
          );
        echo json_encode($json);
        exit; 
        }
     break;
     case 'schoolStaff';
     $type = $_REQUEST['type'];
     $schoolid = $_REQUEST['schoolid'];
     if($type=='SCH'){
        $where = "SCHOOL_ID = ".$schoolid;
        $name = $objMisc->GiveValue($where,"CONCAT(FIRST_NAME,' ',LAST_NAME)","school");
        if($name){
            $staffData[]=array(
            'id'=>$schoolid,
            'name'=>$name,
            );
        $json= array(
                'type'=>"1",
                'staff'=>$staffData,
                'msg'=>'success');
        echo json_encode($json);
        exit;
        }else{
           $json= array(
            'type'=>"0",
            'err_desc'=>'insuficient data',
            'msg'=>'No Record Found'
          );
        echo json_encode($json);
        exit; 
        } 
     } elseif($type=='S' || $type=='T') {
        $where = "SCHOOL_ID = ".$schoolid." and TYPE='".$type."'";
        $staffs = $objMisc->getAllRecords('*','teacher',$where);
        foreach($staffs as $staff){                                                    
            $staffData[]=array(
            "id"=>$staff['teacher_id'],
            "name"=>$staff['first_name'].' '.$staff['last_name']
            );
        }
        if(!empty($staffs)){
            $json= array(
                'type'=>"1",
                'staff'=>$staffData,
                'msg'=>'success');
            echo json_encode($json);
            exit;
        }else{
           $json= array(
            'type'=>"0",
            'err_desc'=>'insuficient data',
            'msg'=>'No Record Found'
          );
        echo json_encode($json);
        exit; 
        } 
        
     }                                                                                                                                                
}
?>