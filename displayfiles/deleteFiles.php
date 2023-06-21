<?php
 require_once '../database/UserRequestHandler.php';
 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
 header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Authorization');

$files = json_decode(file_get_contents("php://input"), true); 

$request = new UserRequestHandler();

$delete = $request->deleteFiles($files);

if($delete){
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}