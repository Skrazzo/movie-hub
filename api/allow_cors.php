<?php

// Specify which request methods are allowed
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Headers: Content-Type");
?>