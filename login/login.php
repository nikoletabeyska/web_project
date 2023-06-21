<?php
// JS ATTACH EVENT -> HTML -> send request -> .php file :uses UserRequestHandler
    require_once '../database/UserRequestHandler.php';
    require_once "../database/Db.php";
    session_start();
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
        $userHandler->loginUser($userData);
        
    } else {
        $errors["all"] = "Некоректни данни!";
        echo json_encode(['valid' => false, 'errors' => $errors]);
        exit();     
    }