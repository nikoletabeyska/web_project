<?php
$fileId = $_GET['file'];
//readfile("http://localhost/web_project/singlefile/singlefile.html?file=".$fileId);
header('Location: http://localhost/web_project/singlefile/singlefile.html?file='.$fileId);
