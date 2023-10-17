<?php

function error($msg){
    die(json_encode(array('code' => 0, 'reason' => $msg)));
}

function success($msg){
    die(json_encode(array('code' => 1, 'reason' => $msg)));
}

?>