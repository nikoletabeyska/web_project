<?php
 require_once "../database/Db.php";
 require_once "../helpers/headers.php";

 $file_id = json_decode(file_get_contents("php://input"), true); 
 if($file_id){

    try{
        $connection = (new Db())->getConnection();
        $selectStatement = $connection->prepare("
            SELECT email
            FROM `sharedfiles` 
            WHERE file_id = :file_id AND isSeen = 1"
        );
        $selectStatement->execute([":file_id" => $file_id]);
        $seenEmailList = $selectStatement->fetchAll();


        echo json_encode(['success'=> true, "emails" => $seenEmailList]);


   // $selectStatementNonUsers = 

    } catch (PDOException $e) {
        http_response_code(500);
        print "Error: " . $e->getMessage();
     echo json_encode(['success'=> true]);

    }
 }