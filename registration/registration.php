<?php

    require_once '../database/UserRequestHandler.php';
    require_once "../database/Db.php";
    require_once "../helpers/headers.php";

    $errors = [];
    $isValid = true;
    $userData = json_decode(file_get_contents("php://input"), true); 

    if($userData) {
        $userHandler = new UserRequestHandler();
        $userHandler->validateUserData($userData, $errors, $isValid, $connection);
        
        if(!$isValid) {
            echo json_encode(['valid' => false, 'errors' => $errors]);
            exit();
        }

        $userData["password"] = password_hash($userData["password"], PASSWORD_DEFAULT);
        $result = $userHandler->createUser($userData);

    } else {
        //
        $errors["all"] = "Некоректни данни!";
        echo json_encode(['valid' => false, 'errors' => $errors]);
        exit();
       
    }