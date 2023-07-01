<?php
 require_once "../database/Db.php";
 require_once "../helpers/headers.php";

 $input = json_decode(file_get_contents("php://input"), true); 
//print_r($input);

 if($input){
    $regexEmail = '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/';

    if (!preg_match($regexEmail,$input['email'])) {
        echo json_encode(['success' => false, 'errors' => "Невалиден имейл!"]);
    } else {

    try{
        $connection = (new Db())->getConnection();
        $hashedEmail = password_hash( $input['email'], PASSWORD_DEFAULT);
        $insertStatement = $connection->prepare("
            INSERT INTO `sharedfiles` (file_id, email, isSeen, hashedEmail, isDownloaded)
            VALUE (:file_id, :email, :isSeen, :hashedEmail, :isDownloaded)
        ");
        $insertStatement->execute(["file_id" => $input["file_id"], "email" => $input["email"], "isSeen" => 0, "hashedEmail" => $hashedEmail, "isDownloaded" => 0]);
        echo json_encode(['success'=> true, "hashedEmail" => $hashedEmail]);

    } catch (PDOException $e) {
        http_response_code(500);
        print "Error: " . $e->getMessage();
        echo json_encode(['success'=> true]);

    }

    }   
    

 }