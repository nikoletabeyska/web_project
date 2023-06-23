<?php
   require_once '../database/UserRequestHandler.php';
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Authorization');
/*
   session_start();
  if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $request = new UserRequestHandler();
    $files = $request->getFiles($user_id);
    echo json_encode($files);
  }
    else {
      // Redirect or handle unauthorized access
      // ...
  }

*/
$user_id = 1;
$request = new UserRequestHandler();
$files = $request->getFiles($user_id);
echo json_encode($files);

















?>