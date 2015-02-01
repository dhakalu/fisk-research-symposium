<?php 
session_start();
 if(isset($_SESSION['username'])){
 $user=$_SESSION['username'];
 header("Location:home.php?u=$user");
 }
?><?php
if(isset($_POST["e"])){
	include_once("php_includes/db_connect.php");
	$e = mysql_real_escape_string($_POST['e']);
	$p = md5( $_POST['p']);
    $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
	
	if($e == "" || $p == ""){
		echo "login_failed";
        exit();
	} else {
		$sql = "SELECT id, username, password FROM users WHERE email='$e' LIMIT 1";
        $query = mysql_query($sql);
        $numUser=mysql_num_rows($query);
        if($numUser<1){
        	echo '1';
        	exit();
        }
        $row = mysql_fetch_row($query);
		$db_id = $row[0];
		$db_username = $row[1];
        $db_p_hash = $row[2];
		if($p != $db_p_hash){
			echo '2';
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
			$sql = "UPDATE users SET ip='$ip', lastlogin=now() WHERE username='$db_username' LIMIT 1";
            $query = mysql_query($sql);
			echo $db_username;
		    exit();
		}
	}
	exit();
}
?>
