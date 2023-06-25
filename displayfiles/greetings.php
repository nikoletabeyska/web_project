<?php
require_once "../database/Db.php";

try{
    $connection = (new Db())->getConnection();
                
    $selectStatement = $connection->prepare("SELECT name,surname FROM `users` WHERE username=?");
    $selectStatement->execute([$_SESSION['username']]);
    $fileInfo=$selectStatement->fetch(PDO::FETCH_ASSOC);
    $userName=$fileInfo['name']." ".$fileInfo['surname']."!";
    echo json_encode([$userName]);


    }
catch (PDOException $e) {
    http_response_code(500);
    print "Error: " . $e->getMessage();
    }