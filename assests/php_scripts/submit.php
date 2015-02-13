
<?php
session_start();
if(isset($_SESSION['username'])){
  include_once("db_connection.php");
  $presenter = $_SESSION['username'];
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $body = $request->abstract;
  $title = $request->title;
  $type = $request->type;
  $authors = $request->authors;
  $advisor = $request->advisor;
  $external_mentor = null;
  if (isset($request->mentor)){
        $external_mentor= $request->mentor;
  }
  
  $paper = R::dispense('abstract');
  $paper->title = $title;
  $paper->advisor = $advisor;
  $paper->body = $body;
  $paper->presenter= $presenter;
  $paper_id = R::store($paper);
  
  $output = new stdClass();
  $output->status = '';
  $output->errors = array();
  foreach($authors as $author){
    if(!isset($author->isinDataBase)){
      include_once('signup.php');
      $min = 1000;
      $max= 100000;
      $author->signup = true;
      $author->username = $author->firstname . $author->lastname;
      $author->password = rand($min, $max);
      $status = signup($author);
      $status;
      if ($status == '501'){
	$username_check = R::getAll( 'select * from user where username = :username', 
				     array(':username'=>$author->username));
	$count = count($username_check);
	$author->username = $author->username . (string)($count+1);
	signup($author);
      } else if($status == '500'){
	$output->status = 'ERR';
	$error = 'It seems ' . $author->firstname .' '. $author->lastname . ' alrady has an FRS account. Please romve ' . $author->firstname .' first. Then choose the user form list. If you believe this is a technical error. Please contact us.';
	array_push($output->errors, $error);
      }else if($status != '200'){
	$output->status == 'ERR';
	array_push($output->errors, 'Unknon error!');
	exit();
      }
    }
    $affiliations = $author->affiliations;
    foreach($affiliations as $aff){
      $affiliation = R::dispense('affiliation');
      $affiliation->institution = (isset($aff->institution) ? $aff->institution: null);
      $affiliation->discipline = (isset($aff->discipline) ? $aff->discipline: null);
      $affiliation->department = (isset($aff->department) ? $aff->department: null);
      $aff_id = R::store($affiliation);
      $ath = R::dispense('author');
      $ath->username = $author->username;
      $ath->is_presenter = $author->presenter;
      $ath->abstract_id = $paper_id;
      $ath->affiliation_id = $aff_id;
      $ath->order = (isset($author->order)? $author->order: 1);
      R::store($ath);
    }
  }
  if($output->status != 'ERR'){
    $output->status = 'OK';
  }
  echo json_encode($output);
}else{
  echo '404';   
}
exit();
?>
