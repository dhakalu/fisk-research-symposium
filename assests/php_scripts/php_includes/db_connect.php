<?php
$link=mysql_connect("localhost","root","","funkytunky");
	 $db_connect=mysql_select_db("funkytunky",$link);
	 if(!$link){
	 die('Could not connect :'.mysql_error());
	 }
	 if(!$db_connect){
	 die('Can not use funkytunky '.mysql_error());
	 }
?>