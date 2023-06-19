<?php 

require_once 'Db.php';

class UserRequestHandler {

    public static function loginUser($loginData){
        $filteredLoginData = [
            'username' => $loginData['username'],
            'password' => $loginData['password']
        ];
        //Check with the database
        try{
            $connection = (new Db())->getConnection();
            $selectStatement = $connection->prepare("SELECT * FROM `users` WHERE username=?");
            $selectStatement->execute([$loginData['username']]);
            
            $user=$selectStatement->fetch();

            if($user){
                // da proverq dali parolata suvpada s vuvedenata
                if(password_verify($filteredLoginData['password'],$user['password'])){
                    // echo "success login";
                    session_start();
                    //problemno li e
                    $_SESSION['user_id']=$user['id'];
                    $_SESSION['username']=$user['username'];

                    // echo "Welcome, ".$_SESSION['username'];

                    // expires after three hours
                    $sessionId=session_id();
                    setcookie('session_id',$sessionId,time()+10800,'/');
                    echo json_encode(["valid" => true, "message" => "Sucesfull Login".$filteredLoginData['password']]);
                }
                else{
                    echo json_encode(["error" => "Грешна парола"]);
                    // echo "wrong password";
                }
            }
            else{
                // pylnene na error mqstoto s greshka, che nqma takyw user
                echo json_encode(["error" => "Грешна потребител"]);

                // echo "no such user found here";
            }
            //fininsh the if/else check for correct hased password
            
            // echo json_encode(["valid" => true, "message" => "Sucesfull Login".$filteredLoginData['password']]);

        } catch (PDOException $e) {
            http_response_code(500);
            print "Error: " . $e->getMessage();
            echo json_encode(["error" => "Грешка при регистрация!"]);
        }
        
    }

    public static function createUser($userData) {
        $filteredData = [
            'username' =>$userData['username'],
            'name' => $userData['name'],
            'surname' => $userData['surname'],
            'email' => $userData['email'],
            'password' => $userData['password'],
        ];

        try{
            $connection = (new Db())->getConnection();
            $insertStatement = $connection->prepare("
                INSERT INTO `users` (username,name, surname, email, password)
                VALUE (:username, :name, :surname, :email, :password)
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
        $usernameSelectStatement=$connection->prepare("SELECT * FROM `users` WHERE username=?");
        $usernameSelectStatement->execute([$userData['username']]);
        $countOfUsernames=$usernameSelectStatement->fetchAll();
        

        if($count!=NULL) {
           $errors["email"] = "Имейлът вече е регистриран!";
           $isValid = false;
            return;
        } 

        if($countOfUsernames!=NULL){
            $errors["username"]="Потребителското име вече е заето! Моля опитайте с ново!";
            $isValid=false;
            return;
        }
        $connection = null;
        return; 
    }

    public function uploadFile($fileData) : bool {
       
        try{
            $connection = (new Db())->getConnection();
            $insertStatement = $connection->prepare("
                INSERT INTO `files` (name, size, type, owner, path)
                VALUE (:name, :size, :type, :owner, :path)
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
            $selectStatement = $connection->prepare($query);
            $selectStatement->execute(['userId' => $userId, 'userId' => $userId]);
            $rows = $selectStatement->fetchAll();
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