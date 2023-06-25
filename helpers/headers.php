<?php
// Allow requests from any origin
   header('Access-Control-Allow-Origin: *');
   // Allow the following HTTP methods
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
   // Allow the following headers
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Authorization');

?>