<?php
    require_once "../database/Db.php";
$file = $_GET['file'];
            $connection = (new Db())->getConnection();
            $selectStatement = $connection->prepare("SELECT path ,name FROM `files` WHERE id=?");
            $selectStatement->execute([$file]);
            $fileinfo=$selectStatement->fetch(PDO::FETCH_ASSOC);
// Initialize a file URL to the variable
//if fileinfo is false
    $url ="http://localhost/".$fileinfo['path'];
    ob_start();
    echo $fileinfo['path'];
    $file_name = $fileinfo['name'];
    //if (file_put_contents($file_name, file_get_contents($url)))
header('Content-type: Application/octet-stream');
header('Content-Disposition: attachment; filename='.$file_name);
header('Content-Description: My Download :)');
header('Content-Length: '. filesize($url) );
ob_end_clean();
readfile($url);
?>
