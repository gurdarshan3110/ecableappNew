<?php
//session_start();
require_once("helper.php");
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
$uploaddir = 'uploads/channels/';
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir, 0777, true);
        } 
$fname=explode('.',$_FILES['uploadfile']['name']);
$file_name = $objMisc->clean('ecableapp'.date("Gis",time()).basename($fname[0])).'.'.$fname[1];
$file = $uploaddir.$file_name;
if (move_uploaded_file($_FILES['uploadfile']['tmp_name'], $file)) { 
  echo "success_M2i_".$file; 
} else {
	echo "error";
}
?>