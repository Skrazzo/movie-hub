import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/Review.scss';
import StarRating from '../Components/StarRating';

export default function Review() {
    const [movieData, setMovieData] = useState({});
    const [yourRating, setYourRating] = useState(0);
    // Use the useParams hook to access route parameters
    const { tmdb_id } = useParams();

    useEffect(() => {
        axios.get('get_movie.php?id=' + tmdb_id).then((res) => {
            if(res.data.code === 1){
                console.log('movie data:',res.data.reason);
                setMovieData(res.data.reason);
            }
        });
    }, []);

    useEffect(() => {
        console.log(yourRating);
    }, [yourRating]);

    return (
        <div className='text-white'>
            {/* <img src={window.baseImgUrl + movieData.backdrop}/> */}
            <div className='movie-info-container' style={{
                backgroundImage: 'url('+ window.baseImgUrl + movieData.backdrop +')',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat' 
            }}>
                <img className='max-h-96 rounded mr-3 shadow shadow-xl' src={window.baseImgUrl + movieData.poster} />
                <div className='max-w-4xl'>
                    <h1 className='text-primary text-2xl font-bold'>{movieData.title} <span className='text-secondary'>({movieData.release_date})</span></h1>
                    <div className='flex items-center text-lg font-medium mt-2'>
                        <img className='w-16 mr-2' src={'images/tmdb.svg'}/>
                        <span className='mr-2 text-primary'>{Math.round(movieData.vote_average * 10)} %</span>

                        <img className='mx-2 w-24 rounded' src={'images/moviehub.png'}/>
                        <span className='text-primary'>0%</span>
                    </div>

                    <div className='text-secondary mt-5 italic'>
                        <span>{movieData.tagline}</span>
                    </div>

                    <div className='text-primary mt-2'>
                        <h2 className='text-2xl font-semibold'>Overview</h2>
                        <p className='italic font-medium'>{movieData.overview}</p>
                    </div>

                    <div className='text-primary mt-2'>
                        <h3 className='text-xl font-semibold'>Leave your rating</h3>
                        <StarRating setRating={(x) => setYourRating(x)} defaultRating={5} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}
