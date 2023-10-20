import { IconMenu2, IconX } from '@tabler/icons-react';
import {React, useState} from 'react';
import '../scss/Header.scss';
import '../scss/login.scss';
import axios from 'axios';
import { form_to_obj, get_form_object } from '../functions';
import MovieSearchSelect from './MovieSearchSelect';
import '../scss/MovieSearchSelect.scss';

export default function Header(props) {
    const [dialogOpen, setDialogOpen] = useState(true);
    const [searchResults, setsearchResults] = useState([]);


    function getMoviesSearch(){
        axios.post('search_movies.php', form_to_obj('movie-search')).then((res) => {
            if(res.data.code === 0){
                alert("Error: "+ res.data.reason);
            }else{
                console.log(res.data.reason);
                setsearchResults(res.data.reason);
            }
        });
    }

    return (
        
        <>
            <div className={(dialogOpen) ? 'header-dialog' : ''}>
                <dialog open={dialogOpen}>
                    <div className={'title'}>
                        <span>Search movies</span>
                        <IconX onClick={() => setDialogOpen(false)}/>
                    </div>

                    <div className={'content '}>
                        
                        <form onSubmit={(e) => e.preventDefault()} id="movie-search" className='search-input'>
                            <input name="title" placeholder='Movie Title' />
                            <button onClick={getMoviesSearch} className='btn-primary'>Search</button>

                        </form>
                        
                    </div>

                    <div className='gap-4 max-h-96 primary-scroll'>
                        {searchResults.map((x) => <MovieSearchSelect arg={x} />)}
                    </div>
                </dialog>
            </div>
            <div className='main-header'>
                <div>
                    <img src={props.pfp}/>
                    <span>{props.username}</span>
                </div>
                <div><IconMenu2 onClick={() => setDialogOpen(true)} size={35}/></div>
            </div>
        </>
    );
}
