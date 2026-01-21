<?php
define("ZW_IN", 'SETUP');
require_once("helper.php");

$msg    =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id     = base64_decode($_GET['id']);
class myCms extends Cms 
{
    function registerAjaxFunctions()
    {
        $this->xajax->registerFunction("get_Listing");
        $this->xajax->registerFunction("update_status");
        $this->xajax->registerFunction("deleteRow");
        $this->xajax->registerFunction("editMode");
        $this->xajax->registerFunction("sorting");
        $this->xajax->registerFunction("sortTitle");
        $this->xajax->registerFunction("viewSubscriber");
    }
}
$objMisc = new myCms();
$objMisc->initializeAjax(false,true);
$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;
$objMisc->rec_pp = 20;
$objMisc->dbFunc->ajax_pagin = true;

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    //print_r($_POST);exit;
        if($_POST['payment_method']=='L'){
            $actual_amount = $_POST['actual_amount'];
            $amount        = $_POST['amount'];

        }else{
            $actual_amount = $_POST['pactual_amount'];
            $amount        = $_POST['final_amount'];
        }
        $rowArray = array(  'USER_ID'           => $_SESSION['USER_ID'],
                            'NAME'              => $_POST['name'],
                            'CUSTOMER_ID'       => $_POST['customer_id'],
                            'MSO_ID'            => $_POST['mso_id'],
                            'OPENING_BALANCE'   => $_POST['opening_balance'],
                            'RELATION'          => $_POST['relation'],
                            'RELATIVE'          => $_POST['relative'],
                            'ADDRESS'           => $_POST['address'],
                        	'PHONE_NO'          => $_POST['phone_no'],
        					'EMPLOYEE_ID'       => $_POST['employee_id'],
                            'CONNECTION_DATE'   => $objMisc->changeDateFormat($_POST['connection_date']),
                            'UNIT_ID'           => $_POST['unit_id'],
                            'PAYMENT_METHOD'    => $_POST['payment_method'],
                            'PAYMENT_TYPE'      => $_POST['payment_type'],
                            'ACTUAL_AMOUNT'     => $actual_amount,
                            'DISCOUNT'          => $_POST['discount'],
        					'AMOUNT'            => $amount,
                			'REMARKS'           => addslashes($_POST['remarks']),
                			'UPDATED_BY'          => $_SESSION['USER_ID'],
                			'UPDATED_TIME'        => date('Y-m-d H:i:s'));
    $cond       = "";
    $cond       = " NAME = '$_POST[name]'";
    $whereSubc="SUBSCRIBER_ID='$_POST[id]'";
    $recdata    = $objMisc->GiveValue($cond,"UNIT_ID","subscribers"); 
    $val        = $objMisc->update("subscribers",$rowArray,$whereSubc);
      if($_POST['payment_method']=='P'){
        foreach ($_POST['subscription_id'] as $k => $rowRe) {
            $stbArray   = array(    'USER_ID'                => $_SESSION['USER_ID'],
                                    'INSTALLATION'           => $_POST['installation'][$k+1],
                                    'SECURITY'               => $_POST['security'][$k+1],
                                    'TYPE_ID'                => $_POST['id_type'][$k+1],
                                    'ID_NO'                  => $_POST['id_no'][$k+1],
                                    'PACKAGE_ID'             => $_POST['package_id'][$k],
                                    'PACKAGE_TYPE'           => $_POST['package_type'][$k],
                                    'UPDATED_BY'             => $_SESSION['USER_ID'],
                                    'UPDATED_TIME'           => date('Y-m-d H:i:s'));
            //print_r($_POST);exit;
            $whereStb=" STB_ID='".$_POST['stb_id'][$k]."' AND SUBSCRIPTION_ID='".$_POST['subscription_id'][$k+1]."'";
            $valstb     = $objMisc->update("stb_box",$stbArray,$whereStb);
        }
        }else{
            foreach ($_POST['subscription_id'] as $k => $rowRe) {
                if(!empty($_POST['subscription_id'][$k])){
                    $stbArray   = array(    'USER_ID'                => $_SESSION['USER_ID'],
                                            'SUBSCRIBER_ID'          => $lastId,
                                            'SUBSCRIPTION_ID'        => $_POST['subscription_id'][$k],
                                            'INSTALLATION'           => $_POST['installation'][$k],
                                            'SECURITY'               => $_POST['security'][$k],
                                            'TYPE_ID'                => $_POST['id_type'][$k],
                                            'ID_NO'                  => $_POST['id_no'][$k],
                                            'PACKAGE_ID'             => $_POST['package_id'][$k],
                                            'PACKAGE_TYPE'           => $_POST['package_type'][$k],
                                            'ADDED_BY'               => $_SESSION['USER_ID'],
                                            'ADDED_TIME'             => date('Y-m-d H:i:s'));
                    //print_r($stbArray);exit;
                    $valstb     = $objMisc->insert("stb_box",$stbArray);
                }
        }
        }               
    $_SESSION['msg'] = 2;
    header("location:subscribers.php");
    exit;
}

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
	case 1:
		$msg = "Subscriber added successfully.";
    break;
    case 2:
		$msg = "Record updated successfully.";
    break;
    case 3:
		$msg = "Record has been deleted successfully.";
	break;    
    case 4:
        $errormsg = "Subscriber name already exists.";
        $msg = "";
    break;
     case 5:
        $errormsg = "Subscriber name already exists.";
        $msg = "";
    break;
}

if($id){
    $where = 'SUBSCRIBER_ID = '.$id;
    $rowArray = $objMisc->getRow("subscribers",$where);
}
$addData='';
if($rowArray['payment_method']=='L' && !empty($rowArray['subscriber_id'])){
    $addData.='<div class="form-group col-lg-12" id="paymentAmt">
                <div class="form-group col-lg-4">
                        <label>Amount</label>
                        <input type="text" onkeyup="monthlyCharges();" name="actual_amount" id="amount" class="form-control" value="'.$rowArray['actual_amount'].'" >
                    </div>
                    <div class="form-group col-lg-4">
                        <label>Monthly Charges</label>
                        <input type="text" name="amount" id="monthly_charges" class="form-control" value="'.$rowArray['monthly_charges'].'" >
                    </div>
                </div>';     
    $addData.=' <div class="form-group col-lg-12" id="payment_amt">
                    
                    <div class="form-group col-lg-12">&nbsp;</div>';
             $addData.='<div class="col-lg-12">
                            
                            <div class="table-data">
                                <label>Stb NO</label>
                                <input required type="text" name="subscription[]" onkeyup="KeyedUp(1);" id="subscription_id1" autocomplete="off" class="form-control"/>
                                <input required type="hidden" name="subscription_id[]" id="subscription1" autocomplete="off" class="form-control" value=""/>
                                <div id="display1" class="display"></div>
                            </div>
                            <div class="table-data">
                                <label>Id Type</label>
                                <input type="text" name="id_type[]" id="id_type" class="form-control" value="'.$rowArray['id_type'].'">
                            </div>
                            <div class="table-data">
                                <label>Id</label>
                                <input type="text" name="id_no[]" id="id_no" class="form-control" value="{$rowRec.id_no}">
                            </div>
                            <div class="table-data">
                                <label>Security</label>
                                <input type="text" name="security[]" id="security" class="form-control" value="{$rowRec.security}">
                            </div>
                            <div class="table-data">
                                <label>Installation</label>
                                <input type="text" name="installation[]" id="installation" class="form-control" value="{$rowRec.installation}">
                            </div>
                            <div class="form-group col-lg-1">
                                <label>&nbsp;</label>
                                <a href="javascript:;" onclick="Addmore();" title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                            </div>
                        </div>';
             $addData.='<div id="allownace-data"></div>
                </div>';
    $addData.='<div class="form-group col-lg-12">&nbsp;</div>
            <div class="col-lg-12" id="payment_mthd" style="display:none;">
                <div class="col-lg-12">
                    <div class="table-data">
                        <label>Stb NO</label>
                        <input required type="text" name="subscription[]" onkeyup="KeyedUp1(1);" id="subscription_id11" autocomplete="off" class="form-control"/>
                        <input required type="hidden" name="subscription_id[]" id="subscription11" autocomplete="off" class="form-control"/>
                        <div id="display11" class="display"></div>
                    </div>
                    <div class="table-data">
                        <label>Id Type</label>
                        <input type="text" name="id_type[]" id="id_type" class="form-control" value="">
                    </div>
                    <div class="table-data">
                        <label>Id</label>
                        <input type="text" name="id_no[]" id="id_no" class="form-control" value="">
                    </div>
                    <div class="table-data">
                        <label>Security</label>
                        <input type="text" name="security[]" id="security" class="form-control" value="">
                    </div>
                    <div class="table-data">
                        <label>Installation</label>
                        <input type="text" name="installation[]" id="installation" class="form-control" value="">
                    </div>
                    <div class="table-data">
                        <label>Package</label>
                        <select id="package_id1"  name="package_id[]" class="form-control">
                            <option value="">-Please Select-</option>
                            {$packageArray}
                        </select>
                    </div>
                    <div class="table-data">
                        <label>Type</label>
                        <select class="form-control" id="package_type1" onchange="TotAmt(1);"  name="package_type[]">
                            <option value="">-Please Select-</option>
                            <option value="P">Parent</option>
                            <option value="C">Child</option>
                        </select>
                    </div>
                    <div class="table-data">
                        <label>Amount</label>
                        <input type="text" name="amount1[]" id="amount1" class="form-control" value="">
                    </div>
                    <div class="table-data">
                        <label>&nbsp;</label>
                        <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                    </div>
                </div>
                <div id="allow-data"></div>
                <div class="col-lg-12">
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">
                        <label>Total Amount</label>
                        <input type="text" name="pactual_amount" id="totamount" class="form-control" readonly value="">
                    </div>
                    <div class="table-data">
                        <label>Discount</label>
                        <input type="text" name="discount" id="discount" onkeyup="finalAmt();" class="form-control" value="">
                    </div>
                    <div class="table-data">
                        <label>Final Amount</label>
                        <input type="text" name="final_amount" id="final_amount" class="form-control" readonly value="">
                    </div>
                </div>
            </div> ';
}else{
    $addData.='<div class="form-group col-lg-12" id="paymentAmt">
                <div class="form-group col-lg-4">
                        <label>Amount</label>
                        <input type="text" onkeyup="monthlyCharges();" name="actual_amount" id="amount" class="form-control" value="" >
                    </div>
                    <div class="form-group col-lg-4">
                        <label>Monthly Charges</label>
                        <input type="text" name="amount" id="monthly_charges" class="form-control" value="" >
                    </div>
                </div>     
                <div class="form-group col-lg-12" id="payment_amt">
                    
                    <div class="form-group col-lg-12">&nbsp;</div>
                        <div class="col-lg-12">
                            
                            <div class="table-data">
                                <label>Stb NO</label>
                                <input required type="text" name="subscription[]" onkeyup="KeyedUp(1);" id="subscription_id1" autocomplete="off" class="form-control"/>
                                <input required type="hidden" name="subscription_id[]" id="subscription1" autocomplete="off" class="form-control" value=""/>
                                <div id="display1" class="display"></div>
                            </div>
                            <div class="table-data">
                                <label>Id Type</label>
                                <input type="text" name="id_type[]" id="id_type" class="form-control" value="">
                            </div>
                            <div class="table-data">
                                <label>Id</label>
                                <input type="text" name="id_no[]" id="id_no" class="form-control" value="">
                            </div>
                            <div class="table-data">
                                <label>Security</label>
                                <input type="text" name="security[]" id="security" class="form-control" value="">
                            </div>
                            <div class="table-data">
                                <label>Installation</label>
                                <input type="text" name="installation[]" id="installation" class="form-control" value="">
                            </div>
                            <div class="form-group col-lg-1">
                                <label>&nbsp;</label>
                                <a href="javascript:;" onclick="Addmore();" title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                            </div>
                        </div>
                        <div id="allownace-data"></div>
                </div>';
$addData.='<div class="form-group col-lg-12">&nbsp;</div>
            <div class="col-lg-12" id="payment_mthd" style="display:none;">';
    $recs=$objMisc->getAllRecordsNew("SELECT * FROM stb_box SB JOIN subscriptions S ON S.`SUBSCRIPTION_ID`=SB.`SUBSCRIPTION_ID` WHERE SB.`SUBSCRIBER_ID`='$rowArray[subscriber_id]' AND SB.`USER_ID`='$_SESSION[USER_ID]'");
    $totalAmt=0;
    $i=1;
    $count=count($recs);
    foreach ($recs as $k => $val) {
    $addData.=' <div class="col-lg-12">
                    <div class="table-data">
                        <label>Stb NO</label>
                        <input type="hidden" id="alwrow" value="1" />
                        <input type="hidden" id="alwRow" value="'.$count.'" />
                        <input required type="text" name="subscription[]" readonly value="'.$val['stb_no'].'" id="subscription_id11" autocomplete="off" class="form-control"/>
                        <input required type="hidden" name="subscription_id[]" value="'.$val['subscription_id'].'" id="subscription11" autocomplete="off" class="form-control"/>
                        <input required type="hidden" name="stb_id[]" value="'.$val['stb_id'].'" class="form-control"/>
                        <div id="display11" class="display"></div>
                    </div>
                    <div class="table-data">
                        <label>Id Type</label>
                        <input type="text" name="id_type[]" id="id_type" class="form-control" value="'.$val['id_type'].'">
                    </div>
                    <div class="table-data">
                        <label>Id</label>
                        <input type="text" name="id_no[]" id="id_no" class="form-control" value="'.$val['id_no'].'">
                    </div>
                    <div class="table-data">
                        <label>Security</label>
                        <input type="text" name="security[]" id="security" class="form-control" value="'.$val['security'].'">
                    </div>
                    <div class="table-data">
                        <label>Installation</label>
                        <input type="text" name="installation[]" id="installation" class="form-control" value="'.$val['installation'].'">
                    </div>
                    <div class="table-data">
                        <label>Package</label>
                        <select id="package_id'.$i.'"  name="package_id[]" class="form-control">
                            <option value="">-Please Select-</option>';
            $wherePackage      =   " 1 = 1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' order by PACKAGE_ID DESC";
            $packageArray      =   $objMisc->myFunc->fnWriteOptionList($val['package_id'],'NAME,PACKAGE_ID','package_master',$wherePackage,0,0,0);                  
            if($val['package_type']=='P'){
                $packAmt=$objMisc->GiveValue(" PACKAGE_ID='$val[package_id]'",'PARENT_CHARGES','package_master');
            }else{
                $packAmt=$objMisc->GiveValue(" PACKAGE_ID='$val[package_id]'",'CHILD_CHARGES','package_master');
            }
            $totalAmt=$totalAmt+$packAmt;
            $addData.=$packageArray;
            $addData.='</select>
                    </div>
                    <div class="table-data">
                        <label>Type</label>
                        <select class="form-control" id="package_type'.$i.'" onchange="TotAmt('.$i.');"  name="package_type[]">
                            <option value="">-Please Select-</option>
                            <option '.(($val['package_type']=='P')?'selected="selected"':'').' value="P">Parent</option>
                            <option '.(($val['package_type']=='C')?'selected="selected"':'').' value="C">Child</option>
                        </select>
                    </div>
                    <div class="table-data">
                        <label>Amount</label>
                        <input type="text" name="amount'.$i.'[]" id="amount'.$i.'" class="form-control" value="'.$packAmt.'">
                    </div>';
         $addData.='<div class="table-data">
                        <label>&nbsp;</label>';
                        
         $addData.='</div>
                </div>';
            $FinamtTot=$rowArray['amount'];
            $i++;
            }
    $addData.=' <div id="allow-data"></div>
                <div class="col-lg-12">
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">&nbsp;</div>
                    <div class="table-data">
                        <label>Total Amount</label>
                        <input type="text" name="pactual_amount" id="totamount" class="form-control" readonly value="'.$totalAmt.'">
                    </div>
                    <div class="table-data">
                        <label>Discount</label>
                        <input type="text" name="discount" id="discount" onkeyup="finalAmt();" class="form-control" value="'.$val['discount'].'">
                    </div>
                    <div class="table-data">
                        <label>Final Amount</label>
                        <input type="text" name="final_amount" id="final_amount" class="form-control" readonly value="'.$FinamtTot.'">
                    </div>
                </div>
            </div> ';
}  
if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Subscriber Information";
}else{
   $pageheading = "Add New Subscriber"; 
}
$wingId            =   $objMisc->GiveValue("UNIT_ID='$rowArray[unit_id]'",'WING_ID','unit_master');
$headOffice        =   $objMisc->GiveValue("WING_ID='$wingId'",'HEADOFFICE_ID','wing_master');
$where             =   " 1 = 1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' order by HEADOFFICE_ID";
$headofficeArray   =   $objMisc->myFunc->fnWriteOptionList($headOffice,'NAME,HEADOFFICE_ID','headoffice_master',$where,0,0,0);  
$whereWing         =   " 1 = 1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' and HEADOFFICE_ID='$headOffice' order by WING_ID";
$wingArray         =   $objMisc->myFunc->fnWriteOptionList($wingId,'NAME,WING_ID','wing_master',$whereWing,0,0,0); 
$whereUnit         =   " 1 = 1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' and WING_ID='$wingId' order by UNIT_ID";
$unitArray         =   $objMisc->myFunc->fnWriteOptionList($rowArray['unit_id'],'NAME,UNIT_ID','unit_master',$whereUnit,0,0,0); 
$whereEmp          =   " 1 = 1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' order by EMPLOYEE_ID";
$empArray          =   $objMisc->myFunc->fnWriteOptionList($rowArray['employee_id'],'NAME,EMPLOYEE_ID','employees',$whereEmp,0,0,0); 
$wherePackage      =   " 1 = 1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' order by PACKAGE_ID DESC";
$packageArray      =   $objMisc->myFunc->fnWriteOptionList($rowArray['package_id'],'NAME,PACKAGE_ID','package_master',$wherePackage,0,0,0);  
$whereStbBox       =   " 1 = 1 AND USER_ID='$_SESSION[USER_ID]' and STATUS = 'A' AND AVAILABILITY='AV' order by SUBSCRIPTION_ID DESC";
$stbArray          =   $objMisc->myFunc->fnWriteOptionList($rowArray['subscription_id'],'STB_NO,SUBSCRIPTION_ID','subscriptions',$whereStbBox,0,0,0);  


$customer_id = $objMisc->GiveValue(" USER_ID='$_SESSION[USER_ID]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'CUSTOMER_ID','subscribers');
$mso_id      = $objMisc->GiveValue(" USER_ID='$_SESSION[USER_ID]' ORDER BY SUBSCRIBER_ID DESC LIMIT 1",'MSO_ID','subscribers');
if(empty($customer_id)){
    $customerId='000001';
}elseif(!empty($rowArray)){
    $customerId=$rowArray['customer_id'];
}else{
    $customerId=sprintf("%06d", $customer_id+1);
}
if(empty($mso_id)){
    $msoId='000001';
}elseif(!empty($rowArray)){
    $msoId=$rowArray['mso_id'];
}else{
    $msoId=sprintf("%06d", $mso_id+1);
}


$smartyVars['addData']              =   $addData;
$smartyVars['employeeArray']        =   $empArray;
$smartyVars['stbArray']             =   $stbArray;
$smartyVars['customerId']           =   $customerId;
$smartyVars['msoId']                =   $msoId;
$smartyVars['packageArray']         =   $packageArray;
$smartyVars['wingArray']            =   $wingArray;
$smartyVars['unitArray']            =   $unitArray;
$smartyVars['headofficeArray']      =   $headofficeArray;
$smartyVars['errormsg']     		=   $errormsg;
$smartyVars['add']          		=   $add;
$smartyVars['group']       		 	=   $id;
$smartyVars['rowRec']       		=   $rowArray;
$smartyVars['pageheading']  		=   $pageheading;
$smartyVars['classData']    		=   $pagin_recs;
$smartyVars['msg']         		 	=   $msg;
$smartyVars['page']         		=   $_REQUEST['page'];
$objMisc->displayPage("header,update-subscribers,footer",$smartyVars);
function update_status($id,$status)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    $changeTo = ($status=='A') ? 'D' : 'A';
    $row = array(
                    'STATUS' => $changeTo
                );
    $where = "SUBSCRIBER_ID =".$id;
    $objMisc->update("subscribers",$row,$where);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Subscriber record has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Subscriber record has been deactivated successfully.';
    } 
    $objResponse->addAssign('imgStatus'.$id,'src',$imgName);
    $objResponse->addAssign('imgStatus'.$id,'alt',$title);
    $objResponse->addAssign('imgStatus'.$id,'title',$title);
    $objResponse->addAssign('enumStatus'.$id,'value',$changeTo);
    $objResponse->addScript("document.getElementById('msg').style.display='inline';");
    $objResponse->addAssign('msg','innerHTML','&nbsp;');
    $objResponse->addAssign('msg','innerHTML','<div class="notify notify-success"><a class="close" href="javascript:;"><img src="images/close.png" /></a><h3>'.$msg.'</h3></div>'); 
    $objResponse->addScript("setTimeout(\"document.getElementById('msg').style.display='none'\",3000);");
    return $objResponse;
} 
function deleteRow($id)
{
    global $objMisc;
    global $lang;
    $objResponse = new XajaxResponse();
    $idArray = explode(',',$id);
    foreach($idArray as $bid)
    {
       $where = " SUBSCRIBER_ID =".$bid;
       $objMisc->delete("subscribers",$where); 
    }
    $_SESSION['msg'] = 3;
    $sscript .= "var a;";
    $sscript .= "a = window.location;";
    $sscript .= "window.location = a;";
    //$objResponse->addAlert($sscript);
    $objResponse->addScript($sscript);
    return $objResponse;
}
?>
