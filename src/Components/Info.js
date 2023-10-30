import React, { useEffect, useState } from 'react';
import '../scss/Info.scss';
import axios from 'axios';


export default function Info() {
    const [movieData, setMovieData] = useState([]);
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
                    {movieData.map((x) => {
                        return (
                            <>
                            <div className='movieimg'>
                                <img src={x.movie_img}/>
                            </div>
                            <div className='img-overlay'></div>
                                <p className='text-white'>{x.movie_title} <span className='text-secondary'>({x.movie_year})</span></p>

                            </>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
