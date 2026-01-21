<?php
require_once("helper.php");

$user       = trim(addslashes($_REQUEST['username']));
$password   = trim(addslashes($_REQUEST['password']));
$userId     = $_REQUEST['user_id'];
$imei     = $_REQUEST['imei'];
$headofficeId     = $_REQUEST['headoffice_id'];
$wingId     = $_REQUEST['wing_id'];
$unitId     = $_REQUEST['unit_id'];
$method=$_REQUEST['method'];
switch($method){ 
    case 'login'; 
        if(!empty($user) && !empty($password)){
            $userId       = trim(addslashes($user));
            $password   = trim(addslashes($password));
            $where = "USERNAME = '$userId' and PASSWORD = '$password' "; 
            $record = $objMisc->getRow('users',$where);
            $office = $objMisc->getRow('headoffice_master',"HEADOFFICE_ID='$record[headoffice_id]'");
            $franchises=$objMisc->getAllRecords('*','franchise_master',"HEADOFFICE_ID='$record[headoffice_id]'");
            foreach ($franchises as $ey => $vle) {
                $franData[]=array('FRANCHISE_ID'        =>$vle['franchise_id'],
                                  'NAME'                =>$vle['name'],
                                  'PHONE_NO'            =>$vle['phone_no'],
                                  'MOBILE_NO'           =>$vle['mobile_no'],
                                  'GSTIN'               =>$vle['gstin'],
                                  'ADDRESS'             =>$vle['address'],
                              );
            }
            if($record['user_type']=='S'){
                $rec = $objMisc->getRow('subscribers',"SUBSCRIBER_ID='$record[id]'");
                $loggedinUser=array(
                        "USER_ID"       =>$record['user_id'],
                        "SUBSCRIBER_ID" =>$rec['subscriber_id'],
                        "PHONE_NO"      =>$rec['phone_no'],
                        "EMAIL"         =>$rec['email'],
                        "IMAGE"         =>$rec['image'],
                        "USER_TYPE"     =>$record['user_type'],
                        "NAME"          =>$rec['name'],
                        "ADDRESS"       =>$rec['address'],
                        "Area_Permissions"   =>json_decode($record['permissions']),
                        "headoofice_id"     =>$office['headoffice_id'],
                        "headoffice_name"=> $office['name'],
                        "headoffice_address"=> $office['address'],
                        "headoffice_gstin"=> $office['gstin'],
                        "headoffice_mobile_no"=> $office['mobile_no']);
                $json= array(
                        'type'=>"1",
                        'flag'=>'Loggedin',
                        'data'=>$loggedinUser,
                        'msg'=>'success');
                echo json_encode($json);
                exit;
            }else if($record['user_type']=='E'){
            //}else if($record['user_type']=='E' && $record['imei']==$imei){
                $rec = $objMisc->getRow('employees',"EMPLOYEE_ID='$record[id]'");
                if($rec['status']=='A'){
                    $loggedinUser=array(
                            "USER_ID"       =>$record['user_id'],
                            "EMPLOYEE_ID"       =>$rec['employee_id'],
                            "USER_TYPE"     =>$record['user_type'],
                            "PERMISSIONS"   =>unserialize($record['module_permissions']),
                            "NAME"          =>$rec['name'],
                            "ADDRESS"       =>$rec['address'],
                            "Area_Permissions"   =>json_decode($record['permissions']),
                            "headoofice_id"     =>$office['headoffice_id'],
                            "headoffice_name"=> $office['name'],
                            "headoffice_address"=> $office['address'],
                            "headoffice_gstin"=> $office['gstin'],
                            "headoffice_mobile_no"=> $office['mobile_no'],
                            "franchises"=>$franData
                        );
                    $json= array(
                            'type'=>"1",
                            'flag'=>'Loggedin',
                            'data'=>$loggedinUser,
                            'msg'=>'success');
                    echo json_encode($json);
                    exit;
                }else{
                   $json= array(
                    'type'=>"0",
                    'err_desc'=>'Account is deactivated',
                    'msg'=>'Account is deactivated.'
                  );
                    echo json_encode($json);
                    exit; 
                }
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
    
    case 'Subscribers'; 
        $and='';
        if(!empty($unitId)){
            $and .=" AND UNIT_ID='$unitId'";
        }
        if($_REQUEST['check_active_deactive']=='true'){
            $and .=" AND STATUS='A'";
        }else{
            $and .=" AND STATUS='D'";
        }
        $where = " 1=1 $and order by CAST(`SERIAL_NO` AS SIGNED) ASC"; 
        $records = $objMisc->getAllRecords('*','subscribers',$where);
            $k = 1;
            $SubAreaOffices='';
            $count=0;
            foreach($records as $record){   
                $SubsStatus=$objMisc->GiveValue("SUBSCRIBER_ID='$record[subscriber_id]'",'STB_ID','stb_box');
                if(!empty($SubsStatus)){
                    $subscriberDebit=$objMisc->GiveValue(" SUBSCRIBER_ID='$record[subscriber_id]' AND AMOUNT_TYPE='D' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');
                    $subscriberCollec=$objMisc->GiveValue(" SUBSCRIBER_ID='$record[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(AMOUNT)','monthly_charges');
                    $subscriberDiscount=$objMisc->GiveValue(" SUBSCRIBER_ID='$record[subscriber_id]' AND AMOUNT_TYPE='C' AND STATUS='A'",'SUM(DISCOUNT)','monthly_charges');
                    $amt=$subscriberDebit-$subscriberCollec-$subscriberDiscount;
                    $taxAmt=($amt*18)/100;
                    if($_REQUEST['check_onoff']=='true' && $amt>0){
                        $SubAreaOffices[]=array(
                            "ID"            =>$record['subscriber_id'],
                            "FRANCHISE_ID"  =>$record['franchise_id'],
                            "STATUS"        =>$record['status'],
                            "CUSTOMER_ID"   =>$record['customer_id'],
                            "CUSTOMER_CODE" =>$record['mso_id'],
                            "NAME"          =>$record['name'],
                            "PHONE_NO"      =>$record['phone_no'],
                            "ADDRESS"       =>$record['address'],
                            "TOTAL_DEBIT"   =>round($subscriberDebit,2),
                            "TOTAL_CREDIT"  =>round($subscriberCollec,2),
                            "TOTAL_DISCOUNT"=>round($subscriberDiscount,2),
                            "TOTAL_AMOUNT"  =>round($amt,2),
                            "PACKAGE_AMOUNT"=>round($amt-$taxAmt-$taxAmt,2),
                            "TAX_SGST"      =>round(($taxAmt/2),2),
                            "TAX_CGST"      =>round(($taxAmt/2),2),
                            "Description"   =>$record['remarks']);
                        
                    }else if($_REQUEST['check_onoff']=='false' && $amt<=0){
                        $SubAreaOffices[]=array(
                            "ID"            =>$record['subscriber_id'],
                            "FRANCHISE_ID"  =>$record['franchise_id'],
                            "STATUS"        =>$record['status'],
                            "CUSTOMER_ID"   =>$record['customer_id'],
                            "CUSTOMER_CODE" =>$record['mso_id'],
                            "NAME"          =>$record['name'],
                            "PHONE_NO"      =>$record['phone_no'],
                            "ADDRESS"       =>$record['address'],
                            "TOTAL_AMOUNT"  =>round($amt,2),
                            "PACKAGE_AMOUNT"=>round($amt-$taxAmt-$taxAmt,2),
                            "TAX_SGST"      =>round(($taxAmt/2),2),
                            "TAX_CGST"      =>round(($taxAmt/2),2),
                            "Description"   =>$record['remarks']);
                    }
                    $count++;
                    $k++;
                }
            }
            if(!empty($records) && $count!=0){
            $json= array(
                    'type'=>"1",
                    'flag'=>'SubAreaOffices',
                    'data'=>$SubAreaOffices,
                    'msg'=>'success');
            echo json_encode($json);
            exit;
        }else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'no records',
                'msg'=>'No Records Found'
              );
            echo json_encode($json);
            exit;
        }    
    break;
    case 'Channels';
        $where = " 1=1 AND HEADOFFICE_ID='$headofficeId' order by SEQUENCE ASC"; 
        $records = $objMisc->getAllRecords('*','channels',$where);
        foreach($records as $record){
            $channels[]=array('CHANNEL_ID'      =>$record['channel_id'],
                              'NAME'            =>$record['name'],
                              'LOGO'            =>$record['path'],
                              'PRICE'           =>$record['price'],
                              'DESCRIPTION'     =>$record['description'],
                            );
        }
        if(!empty($records)){
            $json= array(
                    'type'=>"1",
                    'flag'=>'Channels',
                    'data'=>$channels,
                    'msg'=>'success');
            echo json_encode($json);
            exit;
        }else{
            $json= array(
                'type'=>"0",
                'err_desc'=>'no records',
                'msg'=>'No Records Found'
              );
            echo json_encode($json);
            exit;
        }
    break;
}
?>
