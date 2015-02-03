<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if($request->signup){
	include_once("php_includes/db_connect.php");
	$username = $request->username;
	$firstname = $request->firstname;
	$lastname = $request->lastname;
	$classification = $request->classification;
	$email = $request->email;
	$password = md5($request->password);
    $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
	$sql = "SELECT id FROM users WHERE email='$e' LIMIT 1";
    $query = mysql_query($sql); 
	$e_check = mysql_num_rows($query);
	
	if ($firstname == "" || 
		$lastname == "" ||
		$classification == "" ||
		$email == "" || 
		$password == ""){
			echo "The form submission is missing values.";
        	exit();	
	} else if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
		echo "Please Enter a valid email";
		exit();
	} else if ($e_check > 0){ 
        	echo "There is an account associated with the given email. Please login to continue.";
        	exit();
    } else {
		$profilepic='assests/default_propic_female.jpg';    	
		$sql = "INSERT INTO users (firstname, lastname, username, email, password, classification, profilepic, ip, signup, lastlogin)VALUES('$firstname', '$lastname', '$username', '$email', '$password', '$classification', '$profilepic', '$ip', now(), now())";
		mysql_query($sql) or die(mysql_error()); 
		echo "signup_sucess";
		exit();
	}
		exit();
} else {
	echo'notposted'; 
	exit();
 }
?>