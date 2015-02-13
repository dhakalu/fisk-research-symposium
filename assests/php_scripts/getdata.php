<?php
include_once('db_connection.php'); 
if(isset($_GET['institutions_json'])){
    echo getInstitutions();
}

if(isset($_GET['departments_json'])){
    echo getDepartments();
}

if(isset($_GET['abstracts_json'])){
    echo getAbstracts();
}

if(isset($_GET['disciplines_json'])){
    echo getDesciplines();
}

if(isset($_GET['abstracts_by_user'])){
    $user = $_GET['abstracts_by_user'];
    if($user){
        echo json_encode(getAbstractByUser($user));
    }else{
        echo 'User is required';
    }
}

if(isset($_GET['getloged_user'])){
  session_start();
  if(isset($_SESSION['username'])){
    $user  = R::findOne( 'user', ' username = ? ', [ $_SESSION['username'] ]);
    echo json_encode($user->export());
  }else{
    echo 'None';
  }
};

function getDesciplines(){
    $bean_objects = R::findAll('discipline');
    return (json_encode(R::exportAll($bean_objects)));
}

function getInstitutions(){
    $bean_object = R::findAll('institution');
    $institutions_array = R::exportAll($bean_object);
    $institutions_json = json_encode($institutions_array);
    return $institutions_json; 
}

function getDepartments(){
    $bean_depts = R::findAll('department');
    $departments_json = json_encode(R::exportAll($bean_depts));
    return $departments_json;
}

function getAbstracts(){
    $bean_abstracts = R::findAll('abstract');
    $abstracts_json = json_encode(R::exportAll($bean_abstracts, TRUE));
    return $abstracts_json;
}

function getAbstractByUser($user){
    $data = new stdClass();
    $user_check = R::getAll( 'select * from user where username = :username', array(':username'=>$user));
    if(count($user_check) > 0){
        $data->status = 'OK';
        $data->results = R::getAll('select * from abstract where presenter = :presenter', array(':presenter'=>$user));
    } else {
        $data->status = 'ERR';
        $data->error ='No such user';
    }
    return $data;
}
?>
