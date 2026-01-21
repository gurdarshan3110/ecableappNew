<?php
function UploadImage_admin($strFieldName,$a="",$b="",$c="",$d="",$foldername)
{
	if (is_uploaded_file($_FILES[$strFieldName]['tmp_name']))
	{
		$strFileDir = ROOT_PATH.$foldername;
		$t=explode(".",$_FILES[$strFieldName]['name']);
		if($t[1]="gif")
		$t[1]="jpeg";
		$strSmallFileName=$t[0].date("Gis",time()).".".$t[1];
		$strFileDir=$strFileDir.$strSmallFileName;

		copy($_FILES[$strFieldName]['tmp_name'], $strFileDir) or die("Couldn't copy");
		return $strSmallFileName;
	}
}
?>