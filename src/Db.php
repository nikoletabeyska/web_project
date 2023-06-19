<?php
    class Db
    {
        private $connection;

        public function __construct()
        {
            $dbhost = "localhost";
            $dbName = "filemeup";
            $userName = "root";
            $userPassword = "";

            $this->connection = new PDO("mysql:host=$dbhost;dbname=$dbName", $userName, $userPassword,
                [
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
        }
    }

?>