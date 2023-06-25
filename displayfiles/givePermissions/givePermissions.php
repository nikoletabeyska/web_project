<?php

require_once '../../database/Db.php';
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Authorization');

$data = json_decode(file_get_contents("php://input"), true); 

if($data){
    $regexEmail = '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/';
    if (!preg_match($regexEmail,$data["email"])) {
        echo json_encode(['success' => false, 'error' => "Невалиден имейл!"]);
    }

    try{
        $connection = (new Db())->getConnection();

        $selectStatement = $connection->prepare("SELECT id,username FROM `users` WHERE email = ?");
        $selectStatement->execute([$data["email"]]);

        if($selectStatement->rowCount() > 0) {
            $result = $selectStatement->fetch(PDO::FETCH_ASSOC); 
            $filteredData = [
                'file_id' => "",
                'granted_by' => 1,//$_SESSION['user_id'],
                'granted_to' => $result['id']
            ];
            print_r($filteredData['file_id']);
            print_r($filteredData['granted_by']);
            print_r($filteredData['granted_by']);
            $files = $data["files"];

            foreach ($files as $file){
                $filteredData['file_id'] = $file;

                if(!permissionExists($filteredData)){

                    $selectStatement = $connection->prepare("
                        INSERT INTO `permissions` (file_id , granted_by, granted_to)
                        VALUE (:file_id , :granted_by, :granted_to)");
                    $selectStatement->execute($filteredData);
                }
            }
            $connection = null;
            echo json_encode(['success' => true, "message" => "Успешно дадохте права на потребител ".$result['username']]);
          
        } else {
            $connection = null;
            echo json_encode(['success' => false, "error" => "Не съществува потребител с такъв имейл!"]);
        }

        $connection = null;

    } catch (PDOException $e) {
        http_response_code(500);
        print "Error: " . $e->getMessage();
        return false;
    }

}

function permissionExists($filteredData) : bool{
    $connection = (new Db())->getConnection();
    $selectStatement = $connection->prepare("SELECT permission_id FROM `permissions` WHERE file_id = :file_id AND granted_by=:granted_by AND granted_to=:granted_to");
    $selectStatement->execute([":file_id"=>$filteredData['file_id'], ":granted_by"=>$filteredData['granted_by'],  ":granted_to"=>$filteredData['granted_to']]);

    if($selectStatement->rowCount() > 0) {
        return true;
    }
    return false;
}

