<?php
if(isset($_COOKIE["PHPSESSID"]))
    readfile("http://localhost/web_project/displayfiles/uploadPage.html");
    // include 'uplaodPage.html';
else{
    header('Location: ../mainpage/mainpage.php');
}
?>
