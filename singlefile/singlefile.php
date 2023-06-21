<?php
    require_once "../database/Db.php";
$json = json_decode(file_get_contents("php://input"), true); 
$path = $json['file'];
            $connection = (new Db())->getConnection();
            $selectStatement = $connection->prepare("SELECT * FROM `files` WHERE 'name'=?");
            $selectStatement->execute([$path]);
            
            $user=$selectStatement->fetch();
// Initialize a file URL to the variable
    $url ="http://localhost/web_project/login/login.html"; 
    echo "Test";
    $file_name = basename($url);
    //if (file_put_contents($file_name, file_get_contents($url)))
error_reporting(E_ERROR | E_PARSE);
header('Content-type: Application/octet-stream');
header('Content-Disposition: attachment; filename='.$file_name);
header('Content-Description: My Download :)');
header('Content-Length: '. filesize($url) );
readfile($url);
?>
