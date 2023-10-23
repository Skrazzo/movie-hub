<?php
include './allow_cors.php';
include './db.php';
include './functions.php';
include './Models/user.php';
include './Models/tmdb.php';
include './api_key.php';

$usr = new Users($GLOBALS['sql']);
$tmdb = new TMDB($tmdb_api_key);


if(!$usr->logged_in()){
    error('Login is required!');
}

success($sql->get('movie'));

?>