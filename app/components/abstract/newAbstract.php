<?php
session_start();
if(isset($_SESSION['username'])){
  include('newAbstractView.html');
} else {
    echo "<h2 class='text-center'>Please login or signup to submit your abstract</h2>";
    include('../../shared/404.html');
}
?>
