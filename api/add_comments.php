<?php
include './allow_cors.php';
include './db.php';
include './functions.php';
include './Models/movies.php';
include './api_key.php';
include './Models/user.php';
include './Models/tmdb.php';

$usr = new Users($GLOBALS['sql']);
$movies = new Movies($GLOBALS['sql']);
$tmdb = new TMDB($tmdb_api_key);
$movie_id = 0;



if(!$usr->logged_in()){
    error('Login is required!');
}

// check if information was given
if(!isset($_POST['tmdb_id']) || !isset($_POST['comment'])){
    error("Not enough information given");
}

if(empty($_POST['comment'])){
    error("Not enough information given!");
}

// check if movie exists in our database
if($movies->check_movie($_POST['tmdb_id'])){
    // we just need to get movie id based on tmdb id
    $movie_id = $movies->get_movieID($_POST['tmdb_id']);
}else{
    // movie does not exist, so we need to create it
    $data = $tmdb->get_movie_by_tmdbid($_POST['tmdb_id']);
    if($data['poster'] == null) error("tmdb_id does not exist");
    

    $insert_data = array(
        'movie_title' => $data['title'],
        'movie_img' => $data['poster'],
        'movie_year' => date("Y", strtotime($data['release_date'])),
        'tmdb_id' => $_POST['tmdb_id']
    );

    $movie_id = $movies->add_movie($insert_data);
    
    if($movie_id == 0){ // error appeared
        error('Movie could not be added successfully!');
    }
}
$usr_id = $_SESSION['movie-hub']['login'];
if($movies->insert_new_comment($usr_id, $movie_id, $_POST['comment'])){
    success("Comment has been inserted!");
}
error("Could not insert new comment into the database!");
?>