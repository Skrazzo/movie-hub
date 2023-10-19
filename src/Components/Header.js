import { IconMenu2, IconX } from '@tabler/icons-react';
import {React, useState} from 'react';
import '../scss/Header.scss';

export default function Header(props) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        
        <>
            <div className={(dialogOpen) ? 'header-dialog' : ''}>
                <dialog open={dialogOpen}>
                    <div className={'title'}>
                        <span>Search movies</span>
                        <IconX onClick={() => setDialogOpen(false)}/>
                    </div>

                    <div className={'content'}>

                    </div>
                </dialog>
            </div>
            <div className='header'>
                <div>
                    <img src={props.pfp}/>
                    <span>{props.username}</span>
                </div>
                <div><IconMenu2 onClick={() => setDialogOpen(true)} size={35}/></div>
            </div>
        </>
    );
}
