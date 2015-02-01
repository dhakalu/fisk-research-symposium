<?php
if(isset($_POST["signup"])){
	include_once("php_includes/db_connect.php");
	$u = $_POST['username'];
	$fn = $_POST['firstname'];
	$ln = $_POST['lastname'];
	$e = $_POST['email'];
	$p = md5($_POST['password']);
    $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
	$sql = "SELECT id FROM users WHERE email='$e' LIMIT 1";
    $query = mysql_query($sql); 
	$e_check = mysql_num_rows($query);
	
	if($fn == "" || $ln == "" || $e == "" || $p == "" || $g == ""){
		echo "The form submission is missing values.";
        exit();
	}else if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $e)) {
		echo "Please Enter a valid email";
		exit();
	} else if ($e_check > 0){ 
        echo "There is an account associated with the given email. Please login to continue.";
        exit();
    } else {
    	if($g == 'm'){
    		$profilepic='/assests/img/default_propic.jpg';
    	} elseif ($g == 'f'){
    		$profilepic='/assests/default_propic_female.jpg';
    	}
		$sql = "INSERT INTO users (username, firstname, lastname,email, password, gender, profilepic, ip, signup, lastlogin)       
		        VALUES('$u', '$fn', '$ln', '$e', '$p', '$g', '$profilepic', '$ip', now(), now())";
		mysql_query($sql) or die(mysql_error()); 
		$keywords = $u.' '.$fn.' '.$ln.' '.$e;
		$title = $fn.' '.$ln;
		$link = 'profile.php?u='.$u;
		mysql_query("INSERT INTO search VALUES('','$title','$keywords','$link',' ')");
		if (!file_exists("user/$u")) {
			mkdir("user/$u", 0755,true);
		} 
		echo "signup_sucess";
		exit();
	}
	exit();
} else {
	echo'notposted'; 
	exit();
 }
?>
