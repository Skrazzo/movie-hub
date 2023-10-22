<?php

class TMDB{
    private $link_search_base_movie = "https://api.themoviedb.org/3/search/movie?api_key="; // link start
    private $api_key = '';

    function __construct($api_key){
        $this->api_key = $api_key;
    }

    function search_by_title($title){
        $searchValue = 'shrek';
        $query = "&query=" . str_replace(" ", "+", $title);

        $full_search_link = $this->link_search_base_movie . $this->api_key . $query;

        $results = json_decode(file_get_contents($full_search_link), true);
        $results = $results['results'];

        // creating response array
        $res = [];
        for($i = 0; $i < count($results); $i++){
            $res = array_merge($res, array([
                'id' => $results[$i]['id'],
                'name' => $results[$i]['original_title'],
                'poster' => $results[$i]['poster_path'],
                'release_date' => $results[$i]['release_date'],
                'overview' => $results[$i]['overview'],
                'rating' => round($results[$i]['vote_average'], 2)]
            ));
        }

        return $res;
    }

    function get_movie_by_tmdbid($id){
        $arr = json_decode(file_get_contents('https://api.themoviedb.org/3/movie/'. $id .'?api_key='. $this->api_key), true);
        $rtn_arr = array(
            'backdrop' =>       $arr['backdrop_path'],
            'title' =>          $arr['original_title'],
            'overview' =>       $arr['overview'],
            'poster' =>         $arr['poster_path'],
            'release_date' =>   $arr['release_date'],
            'tagline' =>        $arr['tagline'],
            'vote_average' =>   $arr['vote_average']
        );

        return $rtn_arr;
    }
}

?>