<?php
   require_once '../database/UserRequestHandler.php';
   require_once '../helpers/headers.php';

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
/*

  $user_id = 1;
  $request = new UserRequestHandler();
  $files = $request->getFiles($user_id);
  echo json_encode($files);
  */














?>