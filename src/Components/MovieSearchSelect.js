import React from 'react';
import '../scss/Header.scss';
import { IconPhotoFilled } from '@tabler/icons-react';

export default function MovieSearchSelect(arg) {
    const props = arg.arg;
    console.log(props);

    return (
        <div className='movie-search-result'>
            
            <div className='flex'>
                <div className='select-sidebar'></div>
                {(props.poster === null) ? 
                    <div className='null-poster'>
                        <IconPhotoFilled size={35}/>
                    </div>
                :
                    <img src={'https://image.tmdb.org/t/p/original'+ props.poster}/>
                }
            </div>

            <div className='select-description flex-col flex gap-1'>
                <p>{props.name} <span>{props.release_date}</span></p>
                <p>{props.overview}</p>
            </div>

        </div>
    );
}
