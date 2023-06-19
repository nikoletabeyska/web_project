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
            $connection = null;

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

        $connection = null;
        return; 
    }


    public function uploadFile($fileData) : bool {
       
        try{
            $connection = (new Db())->getConnection();
            $insertStatement = $connection->prepare("
                INSERT INTO `files` (name, size, type, path)
                VALUE (:name, :size, :type, :path)
            ");

            $insertStatement->execute($fileData);
            $connection = null;
            return true;

        } catch (PDOException $e) {
            http_response_code(500);
            print "Error: " . $e->getMessage();
            return false;
        }
        

    }

    public function getFiles($userId) {
       
        try{
            $connection = (new Db())->getConnection();
            $query = "
            SELECT file.name, file.type, file.size, user.username , file.date
            FROM `files` file
            JOIN `users` user ON file.owner = user.id
            WHERE file.owner = :userId
                    OR file.id IN (
                            SELECT perm.file_id
                            FROM `permissions` perm
                            WHERE perm.granted_to = :userId)" ;
            //$query = "SELECT * FROM `files`";
            $selectStatement = $connection->prepare($query);
           // $selectStatement->bindParam(':userId', $userId);
            $selectStatement->execute(['userId' => $userId, 'userId' => $userId]);
            //$stmt->bindParam(':userId', $userId);
            //$stmt->execute(array(':userId' => $userId));
            $rows = $selectStatement->fetchAll();
            //print_r($rows);
            $connection = null;
            return $rows;
        } catch (PDOException $e) {
            http_response_code(500);
            print "Error: " . $e->getMessage();
            return false;
        }
        

    }


}

?>