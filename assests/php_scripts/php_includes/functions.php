<?php
function confirm_query($error_message, $query){
	if(!$query){
		die ($error_message . " " . mysql_error());
	}
}
?>