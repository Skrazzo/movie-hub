import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/Review.scss';
import StarRating from '../Components/StarRating';
import { object_to_urlsearchparams } from '../functions';
import '../scss/Comments.scss';
import Comments from '../Components/Comments';



export default function Review() {
    const [movieData, setMovieData] = useState({});
    const [yourRating, setYourRating] = useState(0);
    const [requestPending, setRequestPending] = useState(false);
    // Use the useParams hook to access route parameters
    const { tmdb_id } = useParams();
    
    const [infoContainerHeight, setInfoContainerHeight] = useState(0);
    const infoContainerRef = useRef(null);

    
    
        
    function uploadRating(rating){
        // rating has changed, so that means we need to update the database
        const data = {
            tmdb_id: tmdb_id,
            rating: rating
        }

        if(!requestPending){ // before sending another request, validate that another one is not pending
            setRequestPending(true);
            axios.post('add_rating.php', object_to_urlsearchparams(data)).then((res) => {
                if(res.data.code === 0){
                    alert(res.data.reason);
                }else{
                    // upadet rating in real time
                    setRequestPending(false);
                }
            });

        }
    }

    useEffect(() => {
        axios.get('get_movie.php?id=' + tmdb_id).then((res) => {
            if(res.data.code === 1){
                console.log('movie data:',res.data.reason);
                setMovieData(res.data.reason);
            }
        });

        setInfoContainerHeight(infoContainerRef.current.clientHeight);
        setTimeout(() => {
            setInfoContainerHeight(infoContainerRef.current.clientHeight);
        }, 2500);
    }, []);

    useEffect(() => {
        console.log('Current request:', requestPending);
        
    }, [requestPending]);

    return (
        <div className=''>
            {/* <img src={window.baseImgUrl + movieData.backdrop}/> */}
            <div className='movie-info-overlay' style={{
                height: infoContainerHeight + 'px'
            }}></div>
            <div className='movie-info-container ' ref={infoContainerRef} style={{
                backgroundImage: 'url('+ window.baseImgUrl + movieData.backdrop +')',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'

            }}>
                

                <img className='z-10 max-h-96 rounded mr-3 shadow shadow-xl' src={window.baseImgUrl + movieData.poster} />
                <div className='z-10 max-w-4xl'>
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
                        <StarRating setRating={(x) => uploadRating(x)} defaultRating={0} />
                    </div>
                </div>
                
            </div>
            <Comments addTmdb={tmdb_id} />
        </div>
    )
}
