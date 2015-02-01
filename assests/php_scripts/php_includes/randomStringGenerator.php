<?php
function randStrGen($x){
	$chars="abcdefghijklmnopqrstuvwxyz!$-?_0123456789";
	$charArray=str_split($chars);
	for($i=0;$i<$x;$i++){
		$randItem=array_rand($charArray);
		$result="".$charArray[$randItem];
		}
	return $result;
	}
?>