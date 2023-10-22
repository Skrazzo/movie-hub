import React from 'react';
import '../scss/Header.scss';
import { IconPhotoFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function MovieSearchSelect(arg) {
    const navigate = useNavigate();
    const props = arg.arg;
    

    return (
        <div className='movie-search-result' onClick={() => navigate('/review/' + props.id)}>
            
            <div className='flex'>
                <div className='select-sidebar'></div>
                {(props.poster === null) ? 
                    <div className='null-poster'>
                        <IconPhotoFilled size={35}/>
                    </div>
                :
                    <img src={window.baseImgUrl + props.poster}/>
                }
            </div>

            <div className='select-description flex-col flex gap-1'>
                <p>{props.name} <span>{props.release_date}</span></p>
                <p>{props.overview}</p>
            </div>

        </div>
    );
}
