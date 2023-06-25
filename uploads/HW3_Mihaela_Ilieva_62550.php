<?php
public static function getUser(string $wantedId){
    $connection=(new Db())->getConnection();
    $selectStatement=$connection->prepare("SELECT * FROM `users` WHERE id=?");
    $selectStatement->execute([$wantedId]);
    $user=$selectStatement->fetch();

    if($user){
        return [
            'id' => $user[id],
            'name' => $user[name],
            'email' => $user[email],
        ];
    }
    else{
        return null;
    }
}