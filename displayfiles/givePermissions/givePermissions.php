<?php

require_once '../../database/Db.php';

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
        $result = $selectStatement->fetch(PDO::FETCH_ASSOC); 
        //print_r($result); 

        if($selectStatement->fetchAll() > 0) {
            $filteredData = [
                'file_id' => "",
                'granted_by' => 1, //$_SESSION['user_id'],
                'granted_to' => $result['id']
            ];

            $files = $data["files"];

            foreach ($files as $file){
                $filteredData['file_id'] = $file;

                $selectStatement = $connection->prepare("
                    INSERT INTO `permissions` (file_id , granted_by, granted_to)
                    VALUE (:file_id , :granted_by, :granted_to)");
                $selectStatement->execute($filteredData);
            }

            echo json_encode(['success' => true, "message" => "Успешно дадохте права на потребител ".$result['username']]);
          
        } else {
            echo json_encode(['success' => false, "error" => "Не съществува потребител с такъв имейл!"]);
        }

        $connection = null;
        return true;

    } catch (PDOException $e) {
        http_response_code(500);
        print "Error: " . $e->getMessage();
        return false;
    }

}

