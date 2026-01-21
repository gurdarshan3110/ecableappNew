<?php
;
require('paging.class.inc');

// enter your query here and no. of records you want to display per page
$pagging = new mysqlPaging("select * from tbBook where active='A'", 25);

//by this you will get the total number of records fetched by the query
//like mysql_num_rows();
print $pagging->total;

print "<br><br>";

//this how the loop will work for displaying the record
while($sqlar=mysql_fetch_array($pagging->returnQuery()))
{
	print_r($sqlar);
	print "<br>-----------------<br>";
}

//Define the get value or values if any otherwise leave it blank 
$addon="&msg=hello world";

//This will display the paging
$pagging->printPagesNums($addon);

print "<br><br>";

//This will display current page and total pages
$pagging->printTotalPages();
?>
