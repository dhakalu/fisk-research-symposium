<?php
require_once("constants.php");
require_once("functions.php");
$link = mysql_connect(DBSERVER, DBUSER, DBPASS);
$db_connect=mysql_select_db(DBNAME,$link);
confirm_query("Could not connect: ", $link);
confirm_query("Can not use, " . DBNAME, $db_connect)
?>