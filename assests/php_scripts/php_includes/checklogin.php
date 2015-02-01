<?php
session_start();
include_once("db_connect.php");
$user_ok = false;
$log_id = "";
$log_email = "";
$log_password = "";
// User Verify function
function evaluateStatus($id,$e,$p){
	$sql = "SELECT ip FROM users WHERE id='$id' AND email='$e' AND password='$p'  LIMIT 1";
    $query = mysql_query($sql);
    $numrows = mysql_num_rows($query);
	if($numrows > 0){
		return true;
	}
}
if(isset($_SESSION["userid"]) && isset($_SESSION["email"]) && isset($_SESSION["password"])) {
	$log_id = $_SESSION['userid'];
	$log_email =$_SESSION['email'];
	$log_password = $_SESSION['password'];
	// Verify the user
	$user_ok = evaluateStatus($log_id,$log_email,$log_password);
} else if(isset($_COOKIE["id"]) && isset($_COOKIE["user"]) && isset($_COOKIE["pass"])){
	$_SESSION['userid'] = $_COOKIE['id'];
    $_SESSION['email'] = $_COOKIE['user'];
    $_SESSION['password'] = $_COOKIE['pass'];
	$log_id = $_SESSION['userid'];
	$log_email = $_SESSION['email'];
	$log_password = $_SESSION['password'];
	
	$user_ok = evaluateStatus($log_id,$log_email,$log_password);
	if($user_ok == true){
		$sql = "UPDATE users SET lastlogin=now() WHERE id='$log_id' LIMIT 1";
        $query = mysql_query($sql);
	}
}
?>