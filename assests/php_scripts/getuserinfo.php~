<?php
include_once('db_connection.php');
if(isset($_GET['all_json'])){
    echo getAllUsers();
}

function getAllUsers(){
    $array = R::findAll('user');
    $arrays = R::exportAll($array);
    return json_encode($arrays);
}
?>