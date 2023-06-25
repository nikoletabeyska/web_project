<?php
// JS ATTACH EVENT -> HTML -> send request -> .php file :uses UserRequestHandler
    require_once '../database/UserRequestHandler.php';
    require_once "../database/Db.php";
    ob_start();
    
    // Allow requests from any origin
    header('Access-Control-Allow-Origin: *');
    // Allow the following HTTP methods
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    // Allow the following headers
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Authorization');

    $errors = [];
    $isValid = true;
    $userData = json_decode(file_get_contents("php://input"), true); 
    if($userData) {
        
        $userHandler = new UserRequestHandler();
        $userHandler->validateLoginUserData($userData, $errors, $isValid, $connection);
        
        ob_end_clean();
        if(!$isValid) {
            //$userHandler->loginUser($userData);
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