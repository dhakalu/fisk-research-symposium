<?php include_once("php_includes/db_connect.php");?>
<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$author_name = $request->name;
$author_affiliation = $request->affiliation;

$query = "INSERT INTO authors(fullname, affiliation) ";
$query .= "VALUES ('{$author_name}', '{$author_affiliation}')";

$result = mysql_query($query);
confirm_query($result);
if(mysql_affected_rows() == 1){
	echo "Record created successfully";
exit;
}

?>
