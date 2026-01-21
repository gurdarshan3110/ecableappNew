<?php
$uploaddir = './uploads/';
$file_name = 'ecableapp'.date("Gis",time()).basename($_FILES['uploadfile']['name']);
$file_name=str_replace(' ','',$file_name);
$target_file = $uploaddir.$file_name;

if(move_uploaded_file($_FILES['uploadfile']['tmp_name'], $target_file)) {
  echo "success_M2i_".$file_name; 
} else {
	echo "error";
}

?>