
<?php
include_once("php_includes/db_connect.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$body = $request->abstract;
$title = $request->title;
$author = $request->author;
$affiliation = $request->authorAff;
$type = $request->type;
$authors = $request->authors;
$funding = $request->funding;
$advisor = $request->advisor;
$external_mentor = null;
if ($request->mentor){
    $external_mentor= $request->mentor;
}
$query = "INSERT INTO papers VALUES ('', '$title', '$author', '$affiliation', '$advisor','$type','$external_mentor', '$body', '$funding', now(), '0')";
$result = mysql_query($query);
// We need the id of the abstract to insert the authors to the authors table
$abstract_id = mysql_insert_id();
foreach($authors as $author){
$name = $author->name;
$aff = $author->affiliation;
$addAuthorQuery = "INSERT INTO authors VALUES('', '$abstract_id', '$name', 'noemail', '$aff')";
mysql_query($addAuthorQuery);
} 

exit();
?>
