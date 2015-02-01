<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style type="text/css">
#pageBackground{display: none; opacity: .8; position: fixed; top: 0px; left: 0px; background:blcak; width: 100%; z-index: 10; }
#dialogbox{display: none; position: fixed; border-radius:1px; width:550px; z-index: 10; }
#alertBoxHeader{ background: #197575; border-style:solid;border-color:#197575; border-bottom: none; font-weight:bold;font-size:19px; padding:5px; color:white; border-top-right-radius:10px; border-top-left-radius:10px; } #alertBoxBody{ background:#FFF; padding:20px; color:#black;border-style:solid;border-color:#197575; }
#alertBoxFooter{background:#CCE0E0; border-style:solid; border-top-style:none; padding:5px; text-align:right;border-color:#197575; } </style>
<script>
		function CustomAlert(){
			this.render = function(dialog){
				var windowWidth = window.innerWidth; 
				var windowHeight = window.innerHeight; 
				var pageBackground = document.getElementById('pageBackground'); 
				var dialogbox = document.getElementById('dialogbox'); 
				pageBackground.style.display = "block"; 
				pageBackground.style.height = windowHeight+"px";
				dialogbox.style.left = (windowWidth/2) - (550 * .5)+"px";
				 dialogbox.style.top = "100px"; dialogbox.style.display = "block"; 
				 document.getElementById('alertBoxHeader').innerHTML = "Attention Required";
				 document.getElementById('alertBoxBody').innerHTML = dialog;
				 document.getElementById('alertBoxFooter').innerHTML = '<button onclick="Alert.ok()" style="width:100px;height:25px;">OK</button>'; 
				} 

				 this.ok = function(){
				 	document.getElementById('dialogbox').style.display = "none";
				 document.getElementById('pageBackground').style.display = "none"; 
				} 
			} 
		var Alert = new CustomAlert(); 
</script>
</head>
<body>
<div id="pageBackground"></div>
<div id="dialogbox">
  <div>
    <center><div id="alertBoxHeader"></div></center>
    <div id="alertBoxBody"></div>
    <div id="alertBoxFooter"></div>
  </div>
</div>
</body>
</html>