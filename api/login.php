<?php
include './allow_cors.php';
include './db.php';
include './functions.php';
include './Models/user.php';
$usr = new Users($GLOBALS['sql']);

if($usr->check_username($_POST['username']) == 0){
    error('Account does not exist');
}


$usrID = $usr->login($_POST['username'], $_POST['password']);
if(!$usrID){
    error('Username or password was not correct');
}

@session_start();
$_SESSION['movie-hub']['login'] = $usrID;

success("Logged in successfully ");
?>