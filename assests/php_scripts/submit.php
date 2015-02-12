
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
    
    foreach($authors as $author){
        if(!isset($author->isinDataBase)){
            include_once('signup.php');
            $min = 1000;
            $max= 100000;
            $author->signup = true;
            $author->password = rand($min, $max);
            signup($author);
        }
        $ath = R::dispense('author');
        $ath->username = $author->username;
        $ath->abstract_id = $paper_id;
        $ath->order = (isset($author->order)? $author->order: 1);
        R::store($ath);
    }
    echo '200';
}else{
    echo '404';   
}
exit();
?>
