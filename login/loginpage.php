<?php
if(!isset($_COOKIE["PHPSESSID"]))
    readfile("login.html");
    // include 'uplaodPage.html';
else{
    header('Location: ../displayfiles/uploadPage.php');
}
?>
