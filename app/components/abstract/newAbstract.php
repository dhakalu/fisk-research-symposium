<?php
session_start();
if(isset($_SESSION['username'])){
  include('newAbstractView.html');
} else {
  echo "<h1>Please signup/login to submit the abstract</h1>";
}
?>
