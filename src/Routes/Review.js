import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Review() {
    const [movieData, setMovieData] = useState({});
    // Use the useParams hook to access route parameters
    const { tmdb_id } = useParams();

    useEffect(() => {
        axios.get('get_movie.php?id=' + tmdb_id).then((res) => {
            if(res.data.code === 1){
                setMovieData(res.data.reason);
            }
        });
    }, []);

    return (
        <div className='text-white'>
            <img src={window.baseImgUrl + movieData.backdrop}/>
        </div>
    )
}
