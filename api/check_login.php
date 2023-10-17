<?php
include './allow_cors.php';

include './functions.php';


@session_start();
if(!isset($_SESSION['movie-hub']) || isset($_SESSION['movie-hub']['login'])){
    error('Login is required!');
}

?>