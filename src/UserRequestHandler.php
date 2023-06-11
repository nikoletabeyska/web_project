<?php 

require_once 'Db.php';

class UserRequestHandler {

    public static function createUser($userData) {
        $filteredData = [
            'name' => $userData['name'],
            'surname' => $userData['surname'],
            'email' => $userData['email'],
            'password' => $userData['password'],
        ];

        try{
            $connection = (new Db())->getConnection();
            $insertStatement = $connection->prepare("
                INSERT INTO `users` (name, surname, email, password)
                VALUE (:name, :surname, :email, :password)
            ");

            $insertStatement->execute($filteredData);
            echo json_encode(["valid" => true, "message" => "Регистрацията е успешна!"]);

        } catch (PDOException $e) {
            http_response_code(500);
            print "Error: " . $e->getMessage();
            echo json_encode(["error" => "Грешка при регистрация!"]);
        }
        

    }

    public static function validateUserData($userData, &$errors, &$isValid, &$connection) {
        foreach($userData as $key => $value){
            if(!isset($value) || trim($value) == ''){
                $errors[$key] = "Полето е задължително!";
                //$errors[$key] = "The $key field is compulsory!";
                $isValid = false;
            }
        }
       
        if(!$isValid) return;
         // Regex pattern for validating letters only
         $regexName = '/^\p{L}+$/u';

        if (!preg_match($regexName, $userData["name"]))  {
            $errors["name"] = "Невалидно име!";
            $isValid = false;
            return;
        }

        if(!preg_match($regexName,$userData["surname"])) {
            $errors["surname"] = "Невалидна фамилия!";
            $isValid = false;
            return;
        }
        
        $regexEmail = '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/';

        if (!preg_match($regexEmail,$userData["email"])) {
            $errors["email"] = "Невалиден имейл!";
            $isValid = false;
            return;
        }

        if ($userData["password"] != $userData["confirm-password"]) {
            $errors["confirm-password"] = "Паролите не съвпадат!";
            $isValid = false;
            return;
        }
        
        $connection = (new Db())->getConnection();
        $selectStatement = $connection->prepare("SELECT * FROM `users` WHERE email = ?");
        $selectStatement->execute([$userData["email"]]);
        $count = $selectStatement->fetchAll();

        if($count!=NULL) {
           $errors["email"] = "Имейлът вече е регистриран!";
           $isValid = false;
            return;
        } 

        return; 
    }
}

?>