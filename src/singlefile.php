<?php

 $filename = $_GET['path'];
header('Content-type: Application/octet-stream');
header('Content-Disposition: attachment; filename=$nome_file');
header('Content-Description: My Download :)');
header('Content-Length: '. filesize($filename) );
readfile($filename);