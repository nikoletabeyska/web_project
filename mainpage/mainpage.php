<?php
if(!isset($_COOKIE["PHPSESSID"]))
    readfile("mainpage.html");
    // include 'uplaodPage.html';
else{
    header('Location: ../displayfiles/uploadPage.php');
}
?>
