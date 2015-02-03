
<?php require_once("includes/connection.php"); ?>
<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$abstract = $request->abstract;

echo "abstract is: " . $abstract;

$query = "INSERT INTO abstract_form(abstract_content) ";
$query .= "VALUES ('{$abstract}')";

$result = mysql_query($query);
confirm_query($result);
if(mysql_affected_rows() == 1){
	echo "Record created successfully";
exit;
}

?>
