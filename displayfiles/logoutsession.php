<?php
 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
 header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Authorization');

session_start();
$_SESSION=array();
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
} 
session_destroy();
//setcookie('session_id','',time-10800,'/');
            echo json_encode(["message" => "php"]);