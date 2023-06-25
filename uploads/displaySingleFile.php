<?php
   require_once "../database/Db.php";
   function format_size($bytes){
        
        if ($bytes >= 1048576) {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        }
        elseif ($bytes >= 1024) {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        }
        elseif ($bytes > 1) {
            $bytes = $bytes . ' bytes';
        }
        elseif ($bytes == 1) {
            $bytes = $bytes . ' byte';
        }
        else {
            $bytes = '0 bytes';
        }
        
        return $bytes;
   }
     
    $file = $_GET['file'];
    
    try{
        $connection = (new Db())->getConnection();
                
        $selectStatement = $connection->prepare("SELECT path ,name, size, type, date, owner FROM `files` WHERE id=?");
        $selectStatement->execute([$file]);
        $fileInfo=$selectStatement->fetch(PDO::FETCH_ASSOC);
        $fileInfo['size'] = format_size($fileInfo['size']);
        echo json_encode($fileInfo);

    
    } catch (PDOException $e) {
        http_response_code(500);
        print "Error: " . $e->getMessage();
    }