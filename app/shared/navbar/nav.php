<?php
session_start();
if(isset($_SESSION['username'])){
  include('logedInNavBar.html');
} else {
  include('navBarView.html');
}
?>
