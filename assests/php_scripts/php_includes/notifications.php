<?php if(isset($_GET['user_id'])){
	$id = $_GET['user_id'];
} else {
    header("location: http://www.funkytunky.com");
    exit();	
}
$owner="no";
if($id==$_SESSION['userid']){
$owner=="yes"
}
if($owner=="yes"){
$sql="SELECT * FROM notifications WHERE id='$id' ";
}
?>