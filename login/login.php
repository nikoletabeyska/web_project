<?php
// JS ATTACH EVENT -> HTML -> send request -> .php file :uses UserRequestHandler
    require_once '../database/UserRequestHandler.php';
    require_once "../database/Db.php";
    require_once "../helpers/headers.php";
    ob_start();

    $errors = [];
    $isValid = true;
    $userData = json_decode(file_get_contents("php://input"), true); 
    if($userData) {
        
        $userHandler = new UserRequestHandler();
        $userHandler->validateLoginUserData($userData, $errors, $isValid, $connection);
        
        ob_end_clean();
        if(!$isValid) {
            echo json_encode(['valid' => false, 'errors' => $errors]); 
                       
            exit();
        }
        else
        {
           session_start();
            echo json_encode(["valid" => true, "message" => "Успешен вход!"]);
        }

    } else {
        $errors["all"] = "Некоректни данни!";
        ob_end_clean();
        echo json_encode(['valid' => false, 'errors' => $errors]);
        exit();     
    }