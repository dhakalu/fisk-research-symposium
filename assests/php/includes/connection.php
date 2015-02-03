<?php
require_once("constants.php");
require_once("functions.php");
$connection = mysql_connect(DBSERVER, DBUSER, DBPASS);
confirm_query($connection);
$db_select = mysql_select_db(DBNAME, $connection);
confirm_query($db_select);
?>