<?php
   require_once '../database/UserRequestHandler.php';
   require_once '../helpers/headers.php';
   require_once '../helpers/makeSizeReadable.php';

   session_start();

  if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $request = new UserRequestHandler();
    $files = $request->getFiles($user_id);
 
    foreach($files as &$file){
     // print_r(format_size($file['size']));
      $file['size'] = format_size($file['size']);
    }
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