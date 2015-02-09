
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

$tbl_abstracts = "CREATE TABLE IF NOT EXISTS papers (
              id INT(11) NOT NULL AUTO_INCREMENT,
              title VARCHAR(250) NOT NULL,
			  username VARCHAR(16) NOT NULL,
			  affiliation VARCHAR(255) NOT NULL,
			  advisor VARCHAR(255) NOT NULL,
			  type ENUM('Poster','Oral','Demo') NOT NULL,
			  external_mentor VARCHAR(255) NULL,
              body TEXT NOT NULL,
              funding VARCHAR(255) NULL,
			  submitteddate DATETIME NOT NULL,
			  accepted ENUM('0','1') NOT NULL DEFAULT '0',
              PRIMARY KEY (id),
              UNIQUE KEY (id)
             )";
$query = mysql_query($tbl_abstracts);
if ($query === TRUE) {
  echo "<h3>Abstract Table table created OK :) </h3>"; 
} else {
    echo $query;
    echo "<h3>Abstract  NOT created :( </h3>"; 
}

$tbl_authors = "CREATE TABLE IF NOT EXISTS authors (
              id INT(11) NOT NULL AUTO_INCREMENT,
              abstract_id INT(11) NOT NULL,
              fullname VARCHAR(255) NOT NULL,
              email VARCHAR(250) NOT NULL,
			  affiliation VARCHAR(255) NOT NULL,
              PRIMARY KEY (id),
			  UNIQUE KEY (id)
             )";
$query = mysql_query($tbl_authors);
if ($query === TRUE) {
  echo "<h3>Author Table table created OK :) </h3>"; 
} else {
  echo "<h3>Author  NOT created :( </h3>"; 
}
?>
