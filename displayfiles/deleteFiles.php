<?php
 require_once '../database/UserRequestHandler.php';
 require_once '../helpers/headers.php';

$files = json_decode(file_get_contents("php://input"), true); 

$request = new UserRequestHandler();

$delete = $request->deleteFiles($files);

if($delete){
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}