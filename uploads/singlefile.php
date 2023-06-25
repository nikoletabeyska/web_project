<?php
    require_once "../database/Db.php";
$file = $_GET['file'];
            $connection = (new Db())->getConnection();
            $selectStatement = $connection->prepare("SELECT path , name, size FROM `files` WHERE id=?");
            $selectStatement->execute([$file]);
            $fileinfo=$selectStatement->fetch(PDO::FETCH_ASSOC);
// Initialize a file URL to the variable
//if fileinfo is false
    $url ="http://localhost/".$fileinfo['path'];
    //echo $url;
    ob_start();
    //echo $fileinfo['path'];
    $file_name = $fileinfo['name'];
    //
    //if (file_put_contents($file_name, file_get_contents($url)))


header('Content-type: application/octet-stream');
header('Content-Disposition: attachment; filename='.$file_name);
header('Content-Description: My Download');
header('Content-Description: File Transfer');
header('Content-Transfer-Encoding: binary');
header('Connection: Keep-Alive');
header('Expires: 0');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Pragma: public');
header('Content-Length: '. $fileinfo['size']);
ob_end_clean();
readfile($url);
die();
?>
