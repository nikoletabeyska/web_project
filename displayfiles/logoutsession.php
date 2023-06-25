<?php
 require_once '../helpers/headers.php';

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