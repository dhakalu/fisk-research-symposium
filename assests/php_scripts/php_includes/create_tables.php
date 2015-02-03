
<?php
include_once("php_includes/db_connect.php");

$tbl_users = "CREATE TABLE IF NOT EXISTS users (
              id INT(11) NOT NULL AUTO_INCREMENT,
              firstname VARCHAR(16) NOT NULL,
              lastname VARCHAR(16) NOT NULL,
			  username VARCHAR(16) NOT NULL,
			  email VARCHAR(255) NOT NULL,
			  password VARCHAR(255) NOT NULL,
			  classification ENUM('Freshmen', 'Sophomore', 'Junior', 'Senior', 'Graduate Student', 'Faculty', 'External Collaborator') NOT NULL,
			  profilepic VARCHAR(255) NULL,
			  ip VARCHAR(255) NOT NULL,
			  signup DATETIME NOT NULL,
			  lastlogin DATETIME NOT NULL,
			  notescheck DATETIME NOT NULL,
			  activated ENUM('0','1') NOT NULL DEFAULT '0',
              PRIMARY KEY (id),
			  UNIQUE KEY username (username,email)
             )";
$query = mysql_query($tbl_users);
if ($query === TRUE) {
	echo "<h3>user table created OK :) </h3>"; 
} else {
	echo "<h3>user table NOT created :( </h3>"; 
}
?>