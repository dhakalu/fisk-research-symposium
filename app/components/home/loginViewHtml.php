<?php
session_start();
if (isset($_SESSION['username'])){
  echo "<h1>You are already logedin!</h1>";
}else{
  include "loginView.html";
}
?>
