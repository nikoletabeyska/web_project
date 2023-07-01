<?php
    require_once "../database/Db.php";
$fileId = $_GET['file'];
$hashedEmail = $_GET['email'];
            $connection = (new Db())->getConnection();
            $selectStatement = $connection->prepare("SELECT path , name, size, type FROM `files` WHERE id=?");
            $selectStatement->execute([$fileId]);
            $fileinfo=$selectStatement->fetch(PDO::FETCH_ASSOC);
// Initialize a file URL to the variable
//if fileinfo is false
    $url =$GLOBALS['userPathFromLocalhost'].$fileinfo['path'];
    // echo $url;
    // echo $file;
    ob_start();
    //echo $fileinfo['path'];
    $file_name = $fileinfo['name'];
    //
    //if (file_put_contents($file_name, file_get_contents($url)))

// if($fileinfo['type']=="audio/wav"||$fileinfo['type']=="audio/ogg"||$fileinfo['type']=="audio/m4a"||$fileinfo['type']=="audio/mpeg"){
//     header('Content-type: '.$fileinfo['type']);
// }
// else{
    header('Content-type: application/octet-stream');
// }
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

try{
    $connection = (new Db())->getConnection();

    $updateStatement = $connection->prepare("
        UPDATE `sharedfiles`
        SET isDownloaded  = :isDownloaded
        WHERE hashedEmail = :hashedEmail AND file_id = :file_id
    ");
    $updateStatement->execute(["isDownloaded" => 1, "hashedEmail" => $hashedEmail, "file_id" => $fileId]);

} catch (PDOException $e) {
    http_response_code(500);
    print "Error: " . $e->getMessage();
    echo json_encode(['success'=> true]);
}




exit();
?>
