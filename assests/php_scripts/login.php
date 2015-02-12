<?php 
session_start();
if(isset($_SESSION['username'])){
  $user=$_SESSION['username'];
  header("#/");
}
?><?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  if(isset($request->login)){
    include_once("php_includes/db_connect.php");
    $username = $request->username;
    $password = md5($request->password);
    $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
    if($username == "" || $password == ""){
      echo "Both username and password is required";
      exit();
    } else {
      $sql = "SELECT id, username, password FROM user WHERE username='$username' OR email='$username' LIMIT 1";
      $query = mysql_query($sql);
      $numUser=mysql_num_rows($query);
      if($numUser<1){
	echo 'There is no account associated with that username. Please signup first!';
	exit();
      }
      $row = mysql_fetch_row($query);
      $db_id = $row[0];
      $db_username = $row[1];
      $db_p_hash = $row[2];
      if($password != $db_p_hash){
      echo 'Passwords did not match!';
	exit();
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
	echo "login_sucess";
	exit();
      }
    }
    exit();
  }
  ?>
