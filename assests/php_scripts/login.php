<?php 
session_start();
if(isset($_SESSION['username'])){
  $user=$_SESSION['username'];
  header("#/");
}
?><?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $output = new stdClass();
  if(isset($request->login)){
    include_once("php_includes/db_connect.php");
    $username = $request->username;
    $password = md5($request->password);
    $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
    if($username == "" || $password == ""){
      
      $output->status = 'ERR';
      $output-> error = "Both username and password is required";
      exit();
    } else {
      $sql = "SELECT *  FROM user WHERE username='$username' OR email='$username' LIMIT 1";
      $query = mysql_query($sql);
      $numUser = mysql_num_rows($query);
      if($numUser<1){
	$output->status = 'ERR';
	$output->error = 'There is no account associated with that username. Please signup first!';
      }else{
	$row = mysql_fetch_assoc($query);
	$db_id = $row['id'];
	$db_username = $row['username'];
	$db_p_hash = $row['password'];
	if($password != $db_p_hash){
	  $output->status = 'ERR';
	  $output->error = 'Password did not match';
	} else {
	  // CREATE THEIR SESSIONS AND COOKIES
	  $_SESSION['id'] = $db_id;
	  $_SESSION['username'] = $db_username;
	  $_SESSION['password'] = $db_p_hash;
	  setcookie("id", $db_id, strtotime( '+30 days' ), "/", "", "", TRUE);
	  setcookie("user", $db_username, strtotime( '+30 days' ), "/", "", "", TRUE);
	  setcookie("pass", $db_p_hash, strtotime( '+30 days' ), "/", "", "", TRUE); 
	  // UPDATE THEIR "IP" AND "LASTLOGIN" FIELDS
	  $sql = "UPDATE user SET ip='$ip', lastlogin=now() WHERE username='$db_username' LIMIT 1";
          $query = mysql_query($sql);
	  $output->status = 'login_sucess';
	  $output->user = $row;
	}
      }
    }
    echo json_encode($output);
    exit();
  }
  ?>
