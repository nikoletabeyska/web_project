<?php
 require_once "../database/Db.php";
 require_once "../helpers/headers.php";

 $file_id = json_decode(file_get_contents("php://input"), true); 
 if($file_id){

    try{
        $connection = (new Db())->getConnection();
        $selectStatementUsers = $connection->prepare("
            SELECT user.email
            FROM `users` user 
            JOIN `permissions` perm ON user.id = perm.granted_to 
            WHERE perm.file_id = :file_id"
        );
        $selectStatementUsers->execute([":file_id" => $file_id]);
        $emailListUsers = $selectStatementUsers->fetchAll();
        //print_r($emailList);
        $selectStatementNonUsers = $connection->prepare("
            SELECT email
            FROM `sharedfiles` 
            WHERE file_id = :file_id"
        );
        $selectStatementNonUsers->execute([":file_id" => $file_id]);
        $emailListNonUsers = $selectStatementNonUsers->fetchAll();

        $emails = array_merge($emailListUsers, $emailListNonUsers);

        echo json_encode(['success'=> true, "emails" => $emails]);


   // $selectStatementNonUsers = 

    } catch (PDOException $e) {
        http_response_code(500);
        print "Error: " . $e->getMessage();
     echo json_encode(['success'=> true]);

    }
 }