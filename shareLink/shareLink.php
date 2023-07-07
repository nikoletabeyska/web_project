<?php
 require_once "../database/Db.php";
 require_once "../helpers/headers.php";

    $fileId = $_GET['file'];
    $seenEmail = $_GET['email'];
    //echo $seenEmail;
   // echo urlencode($seenEmail);
    //$seenEmail= password_hash($seenEmail, PASSWORD_DEFAULT);
    date_default_timezone_set("Europe/Sofia");
    $date = date('Y-m-d H:i:s');
    //echo date('Y/m/d h:i:s', time());

    try{
        $connection = (new Db())->getConnection();
    
        $updateStatement = $connection->prepare("
            UPDATE `sharedfiles`
            SET isSeen  = :isSeen, isSeenDate = :isSeenDate
            WHERE hashedEmail = :hashedEmail AND file_id = :file_id
        ");
        $updateStatement->execute(["isSeen" => 1, "isSeenDate" => $date, "hashedEmail" => $seenEmail, "file_id" => $fileId]);
    
    } catch (PDOException $e) {
        http_response_code(500);
        print "Error: " . $e->getMessage();
        echo json_encode(['success'=> true]);
    }

//readfile("http://localhost/web_project/singlefile/singlefile.html?file=".$fileId);
header('Location: ../singlefile/singlefileShared.html?file='.urlencode($fileId)."&email=".urlencode($seenEmail));
