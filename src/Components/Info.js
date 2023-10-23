import React, { useEffect, useState } from 'react';
import '../scss/Info.scss';
import axios from 'axios';


export default function Info() {
    const [movieData, setMovieData] = useState({title: '', image: ''});
    useEffect(() => {
        axios.get('get_index_info.php').then((res) => {
            
            if(res.data.code === 0){
                alert("Error: "+ res.data.reason);
            }else{
                console.log(res.data.reason);
                setMovieData(res.data.reason);
            }
            
        });
    }, []);
    return (
        <>
            <div className="infocontainer">
                <div className="moviereview">
                    <img src={movieData.movie_img} alt={movieData.movie_title} />
                    <h1>{movieData.movie_title}</h1>
                </div>
            </div>
        </>
    )
}
