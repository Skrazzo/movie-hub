import React, { useEffect, useState } from 'react';
import '../scss/Info.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mantine/core';

export default function Info(props) {
    const [movieData, setMovieData] = useState([]);
    const navigate = useNavigate();
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movieData.map((x) => {
                        return (
                            <div className="moviereview">
                                <div className='movieimg' onClick={() => navigate('/review/' + x.tmdb_id)}>
                                    <div className='img-overlay'>
                                        <img class="hublogo" src="images\moviehub.png"></img>
                                        <p className='text-primary font-bold text-xl'>{Math.round(x.rating*10)}%</p>
                                    </div>
                                    <img className="reviewimg" src={window.baseImgUrl+x.movie_img}/>
                                </div>
                                <p className='text-white'>{x.movie_title} <span className='text-secondary'>({x.movie_year})</span></p>

                            </div>
                        );
                    })}
                <Pagination total={10} color="orange" withControls={false}/>
            </div>
        </>
    )
}
