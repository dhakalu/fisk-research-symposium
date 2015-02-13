<?php
include_once('db_connection.php');
function signup($request){
  $username = $request->username;
  $firstname = $request->firstname;
  $lastname = $request->lastname;
  $email = $request->email;
  $password = md5($request->password);
  $classification = (isset($request->classification)? $request->classification : null);
  $institution = $request->institution;
  $department = (isset($request->department)? $request->department: null);
  $discipline =(isset($request->discipline)? $request->discipline: null);
  $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
  $email_check = R::getAll( 'select * from user where email = :email', 
                            array(':email'=>$email));
  $username_check = R::getAll( 'select * from user where username = :username', 
                               array(':username'=>$username));
  if ($firstname == "" || 
		    $lastname == "" ||
				 $email == "" || 
					   $password == ""){
    return "The form submission is missing values.";	
  } else if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
    return "Please Enter a valid email";
  } else if (count($email_check) > 0){ 
    return '500';
  } else if(count($username_check) > 0){
    return '501';
  } else {
    $user1 = R::dispense('user');
    if($institution == '1' || $institution == 1){
      $inst = R::dispense('institution');
      $inst->name = $request->instname;
      $address = $request->instcity + ', ' . $request->inststate . ' ' . $request->instzip;
      $inst->address = $address;
      $user1->institution = R::store($inst);
    }else{
      $user1->institution = $institution;
    }
    $user1->firstname = $firstname;
    $user1->middlenaem = '';
    $user1->lastname = $lastname;
    $user1->username = $username;
    $user1->email = $email;
    $user1->password = $password;
    $user1->classification = $classification;
    $user1->discipline = $discipline;
    $user1->department = $department;
    $user1->profilepic = 'default_propic.jpg';
    $id = R::store($user1);
    return '200';
  }
}
?>

<?php 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($request->signup)){
  echo signup($request);
}
?>
