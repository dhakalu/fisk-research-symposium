<?php
include_once"php_includes/db_connect.php";
$loginLink="<span><form onsubmit='return false'><input id='emailorusername' type='text'/><input id='pass' type='password'/></span><span><button onclick='javascript:signin()' id='loginButton'>Login</button></span></form>";
$envelope='';
$logoutLink='';
$homeLink='<a href="http://localhost/funkytunky"><div id="logo">Foducate</div></a>';
$searchBar='';
$massageLink='';
$settingsLink="";
if(isset($_SESSION['username'])) {
	$username=$_SESSION['username'];
	$getuserinfo=mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE username='$username' LIMIT 1"));
	$first_name=$getuserinfo['firstname'];
	$lastlogin=$getuserinfo['lastlogin'];
	$notescheck=$getuserinfo['notescheck'];
	$username=$_SESSION['username'];
	$query = mysql_query("SELECT * FROM notifications WHERE username='$username'");
	$numrows=0;
	while($row=mysql_fetch_assoc($query)){
		if($row['date_time']>$notescheck){
			$numrows=$numrows+1;
		}
	}
    if ($numrows == 0) {
		$envelope = '<a  title="Your notifications and friend requests"><span class="menuOptions" id="notificationIcon" onclick="showNotifications()"><img src="picture_library/notification.png" style="width:25px;height:25px"></span></a>';
    } else {
		$envelope = '<a title="You have new notifications" id="notificationIcon" onclick="showNotifications()"><span id="notificationNumber">'.$numrows.'</span> <span class="menuOptions"><img id="notifyImage" src="picture_library/notification.png" style="width:25px;height:25px"></span></a>';
	}
    $loginLink = '<a href="profile.php?u='.$username.'"><span class="menuOptions">'.$first_name.'</span></a><a href="home.php?u='.$username.'"><span class="menuOptions">Home</span></a>';
    $massageLink='<a href="massages.php?u='.$username.'"><span class="menuOptions"><img src="picture_library/chat.png" style="width:15px;height:15px"></span></a>';
	$logoutLink='<a href="account_settings.php?u='.$username.'" ><span class="menuOptions">Settings</span></a>';
	
	$searchBar='<form action="search.php" name="k" method="GET">
			<ul>
				<li><input name="k" type="text" id="search" placeholder="Search for books,college,career,papers and many more!"/></li>
				<li><img id="searchIcon" src="http://localhost/funkytunky/picture_library/search.png" style="width:23px;height:23px;"></li>
			</ul>
		</form>'	;
	
	$homeLink='<a href="home.php?u='.$username.'" ><div id="logo"><img src="http://funkytunky.com/picture_library/foducate.png" style="height:27px;"></div></a>';
}
?>
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/main.css"/>
<link rel="icon" href="http://funkytunky.com/picture_library/favicon.ico"/>
<script src="http://localhost/funkytunky/js/login.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<style type="text/css">
	#notifications{
		height: 75%;
		overflow-y: scroll;
		overflow-x:hide;
	}
</style>
<script>
$(document).ready(function(){
	$("#notifications").hide();
	var x=$("#notifyImage").offset().left;
		var y=$("#notifyImage").offset().top+$("notifyImage").width()+35;
		var z=$("#notifications").width();
		var left=x-z;
		$("#notifications").css({position:"fixed",top:y,left:left});
	$(window).resize(function(){
		var x=$("#notifyImage").offset().left;
		var y=$("#notifyImage").offset().top+$("notifyImage").width()+35;
		var z=$("#notifications").width();
		var left=x-z;
		$("#notifications").css({position:"fixed",top:y,left:left});
	});
});

function _(x){
return document.getElementById(x);
}
function signin(){
	var e = _("emailorusername").value;
	var p = _("pass").value;
	if(e == "" || p == ""){
		window.location= "loginfailed.php?error=1";
	} else {
		setStatus('please wait ...');
		var params="e="+e+"&p="+p;
					 request = new ajaxRequest();
					 
					 request.open("POST", "login.php", true);
					
					 request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					 request.onreadystatechange = function(){
						 if (this.readyState == 4){
							 if (this.status == 200){
								if (request.responseText==='1'){
									window.location="loginfailed.php?error="+request.responseText;
								}else if(request.responseText==='2'){
									window.location="loginfailed.php?error="+request.responseText+"&e="+e;
								} else{
								window.location="profile.php?u="+request.responseText;
								}
							}
						}
					} 
				request.send(params)
			}
		}
	function ajaxRequest(){
	 try { var request = new XMLHttpRequest(); }
	 catch(e1) {
	 try { request = new ActiveXObject("Msxml2.XMLHTTP"); }
	 catch(e2) {
	 try { request = new ActiveXObject("Microsoft.XMLHTTP"); }
	 catch(e3) {
	 request = false;
	 } } }
	 return request;
				
		}

	//Show Notifications 
	function showNotifications(){
		console.log("called");
		var params='shownotifications=whatever';
		_('notifications').style.display='block';
		 request = new ajaxRequest();
					 request.open("POST", "processingnotifications.php", true);
					 request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					 request.onreadystatechange = function(){
						 if (this.readyState == 4 && this.status == 200){
							_("notifications").innerHTML=request.responseText;
						}
					} 
				request.send(params);
			}
</script>
<style>
#emailorusername{
width:200px;
padding:5px;
margin-top:5px;
margin-left:10px;
}
#pass{
width:200px;
padding:5px;
margin-top:5px;
margin-left:10px;
}
#loginButton{
margin-left:5px;
padding:5px;
width:70px;
color:white;
background:#003333;
border-color:#003333;
border-radius:3px;
}
#headMenuOptions{
	background-color: white;
	color:black;
	z-index: 10;
}
#headMenuOptions a:link{
	color:black;
}
#headMenuOptions a:visited{
	color:black;
}
#headMenuOptions a:hover{
	color:black;
}
#menu{
	top:0px;
}
</style>
</head>
<body>
<div id="navHome">
	<div id="navHomeWrap">
		<?php echo $homeLink;?>
		<div id="searchBar">
		<?php echo $searchBar;?>
		</div>
		<div id="menu">
		<span><?php echo $loginLink.$envelope.$massageLink.$logoutLink.$settingsLink; ?></span>
		</div>
		<div id='notifications' style='color:blcak'>
		</div>
	</div>
</div>
</body>
</html>

