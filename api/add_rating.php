<?php
include './allow_cors.php';
include './db.php';
include './functions.php';
include './Models/user.php';
include './Models/movies.php';
include './Models/tmdb.php';
include './api_key.php';

$usr = new Users($GLOBALS['sql']);
$movies = new Movies($GLOBALS['sql']);
$tmdb = new TMDB($tmdb_api_key);
$movie_id = 0;

if(!$usr->logged_in()){
    error('Login is required!');
}

$_POST = $_GET;

// check if information was given
if(!isset($_POST['tmdb_id']) || !isset($_POST['rating'])){
    error("Not enough information given");
}

// check if information is correct
if($_POST['rating'] < 1 || $_POST['rating'] > 10){
    error("Incorrect rating given");
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

// now we need to add rating to the database
// for that we will also need to acquire user id (to prevent rating spam, and later leaderboard of people who did rate)
// id is stored in session variable $_SESSION['movie-hub']['login']
$usr_id = $_SESSION['movie-hub']['login'];
if($movies->has_user_rated($usr_id, $movie_id)){
    // user has already rated this movie, that means we need to update not insert new rating
    if($movies->update_rating($usr_id, $movie_id, $_POST['rating'])){
        success("Rating has been updated!");
    }
    error("Could not update rating!");
}else{
    // user has not rated the movie yet, so we need to insert the rating into database
    if($movies->insert_new_rating($usr_id, $movie_id, $_POST['rating'])){
        success("Rating has been inserted!");
    }
    error("Could not insert new rating into the database!");
}


?>