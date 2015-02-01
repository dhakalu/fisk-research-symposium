<?php
session_start();
	if(isset($_POST['shownotifications'])){
		if(isset($_SESSION['username'])){
				$username=$_SESSION['username'];
				$getNotifications=mysql_query("SELECT * FROM notifications WHERE username='$username' ORDER BY id DESC LIMIT 7");
				while($row=mysql_fetch_assoc($getNotifications)){
					$notification=$row['note'];
					$notificationFrom=$row['initiator'];
					$link=$row['link'];
					$date=$row['date_time'];
					$getNotifierInfo=mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE username='$notificationFrom' "));
					$img =$getNotifierInfo['profilepic'];
					$fullName=$getNotifierInfo['firstname'].' '.$getNotifierInfo['lastname'];
					echo "<div class='container'><a href='$link'><div style='float:left'><img src='$img' width='45' height='45'></div><div style='margin-left:50px; height:50px;'><b>$fullName</b> $notification</div><div>$date</div></a></div>";
				}
				if(mysql_num_rows(mysql_query("SELECT * FROM notifications WHERE username='$username'"))>10){
				echo "<a href='notifications.php?u=$username'><div class='container'><center><b>See More</b></center></div></a> ";
				}	
			}
	}
?>