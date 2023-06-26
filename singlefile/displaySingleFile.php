<?php
   require_once "../database/Db.php";
   function format_size($bytes){
        $coeficientForMB=1048576;
        $coeficientForKB=1024;
        $coeficientForBytes=1;
        if ($bytes >= $coeficientForMB) {
            $bytes = number_format($bytes / $coeficientForMB, 2) . ' MB';
        }
        elseif ($bytes >= $coeficientForKB) {
            $bytes = number_format($bytes / $coeficientForKB, 2) . ' KB';
        }
        elseif ($bytes > $coeficientForBytes) {
            $bytes = $bytes . ' bytes';
        }
        elseif ($bytes == $coeficientForBytes) {
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