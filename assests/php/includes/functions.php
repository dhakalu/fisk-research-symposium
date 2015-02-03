<?php
function confirm_query($query){
	if(!$query){
		die ("Database query failed" . mysql_error());
	}
}
function redirect_to($location){
	header("location:$location");
	exit;
}
?>