<?php
if(isset($_COOKIE["PHPSESSID"]))
    readfile("uploadPage.html");
    // include 'uplaodPage.html';
else{
    header('Location: ../mainpage/mainpage.php');
}
?>
