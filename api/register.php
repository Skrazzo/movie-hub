<?php
include './allow_cors.php';
include './db.php';
include './functions.php';
include './Models/user.php';
$usr = new Users($GLOBALS['sql']);

if($usr->check_username($_POST['username']) >= 1){
    error('Account already exists');
}

if($usr->register($_POST['username'], $_POST['password'], $_POST['pfp'])){
    success('Account was created successfully!');
}

?>