
<?php
include_once("db_connect.php");

$tbl_authors = "CREATE TABLE IF NOT EXISTS authors (
              id INT(11) NOT NULL AUTO_INCREMENT,
              fullname VARCHAR(32) NOT NULL,
              affiliation VARCHAR(100),
              PRIMARY KEY (id)
             )";
$query = mysql_query($tbl_authors);
if ($query === TRUE) {
	echo "<h3>user table created OK :) </h3>"; 
} else {
	echo "<h3>user table NOT created :( </h3>"; 
}
?>