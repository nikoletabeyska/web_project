<?php
if(!isset($_COOKIE["PHPSESSID"]))
    readfile("http://localhost/web_project/mainpage/mainpage.html");
    // include 'uplaodPage.html';
else{
    header('Location: ../displayfiles/uploadPage.php');
}
?>
