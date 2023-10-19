<?php
include './allow_cors.php';
include './db.php';
include './functions.php';
include './Models/user.php';

$usr = new Users($GLOBALS['sql']);


if(!$usr->logged_in()){
    error('Login is required!');
}


?>