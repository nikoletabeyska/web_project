<?php
if(!isset($_COOKIE["PHPSESSID"]))
    readfile("registration.html");
    // include 'uplaodPage.html';
else{
    header('Location: ../displayfiles/uploadPage.php');
}
?>
