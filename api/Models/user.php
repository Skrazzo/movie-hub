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

    function register($username, $password, $pfp){

        $data = array(
            'username' => $username,
            'password' => md5($password),
            'pfp' => $pfp
        );

        if(!$this->sql->insert('users', $data)){
            return $this->sql->getLastError();
        }

        return 1;
    }

    function login($username, $password){
        $this->sql->where('username', $username);
        $this->sql->where('password', md5($password));
        

        $usrID = $this->sql->getValue('users', 'id');
        if($usrID == '') return false;
        return $usrID;
    }

    function logged_in(){
        @session_start();
        if(!isset($_SESSION['movie-hub']) || !isset($_SESSION['movie-hub']['login'])) return false;
        return true;
    }

    function get_public_userinfo(){
        if(!$this->logged_in()) return false;
        $this->sql->where('id', $_SESSION['movie-hub']['login']);
        return $this->sql->get('users', 1, ['username', 'pfp'])[0];
        
    }
}

?>