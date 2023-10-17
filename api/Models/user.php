<?php

class Users{
    private $sql;

    function __construct($sql){
        $this->sql = $sql;
    }

    function check_username($username){
        $this->sql->where('username', $username);
        return $this->sql->getValue('users', 'COUNT(*)');
    }

    function register($username, $password){
        $data = array(
            'username' => $username,
            'password' => md5($password)
        );

        if(!$this->sql->insert('users', $data)){
            return $this->sql->getLastError();
        }

        return 1;
    }
}

?>