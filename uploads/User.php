<?php

class User implements JsonSerializable {

    private $id;

    private $email;

    private $password;

    private $birthdate;

    private $gender;

    private $settings;

    public function __construct(string $id, string $email, string $password, string $birthdate, string $gender) {

        $this->id = $id;
        $this->email = $email;
        $this->password = $password;
        $this->birthdate = $birthdate;
        $this->gender = $gender;
        $this->settings = new Settings();
    }


    public function getEmail(): string {
        return $this->email;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'birthdate' => $this->birthdate,
            'gender' => $this->gender,
        ];
    }

    /**
     * Generates a "random" password for a new user
     */
    public static function generateRandomPassword(): string {
        return "1234";
    }

}