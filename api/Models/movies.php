<?php

class Movies{
    private $sql;

    function __construct($sql){
        $this->sql = $sql;
    }

    function check_movie($tmdb_id){
        $this->sql->where('tmdb_id', $tmdb_id);
        return ($this->sql->getValue('movie', 'COUNT(*)') == 1) ? true : false;
    }

    function add_movie($data){
        $id = $this->sql->insert('movie', $data);
        if(!$id){
            return 0; // unsuccessfull movie add
        }
        return $id; // added successfully
    }

    function get_movieID($tmdb_id){
        $this->sql->where('tmdb_id', $tmdb_id);
        return $this->sql->getValue('movie', 'id');
    }

    function has_user_rated($usrID, $movieID){
        $this->sql->where('user_id', $usrID);
        $this->sql->where('movie_id', $movieID);
        return ($this->sql->getValue('movie_ratings', 'COUNT(*)') == 1) ? true : false;
    }

    function update_rating($usrID, $movieID, $rating){
        $this->sql->where('user_id', $usrID);
        $this->sql->where('movie_id', $movieID);

        $data = array(
            'user_id' => $usrID,
            'movie_id' => $movieID,
            'rating' => $rating
        );

        if(!$this->sql->update('movie_ratings', $data)) return false;
        return true;
    }

    function insert_new_rating($usrID, $movieID, $rating){
        $data = array(
            'user_id' => $usrID,
            'movie_id' => $movieID,
            'rating' => $rating
        );

        $id = $this->sql->insert('movie_ratings', $data);
        if(!$id) return false;
        return true;
    }
}

?>