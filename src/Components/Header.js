import { IconMenu2 } from '@tabler/icons-react';
import React from 'react';
import '../scss/Header.scss';

export default function Header(props) {
    return (
        <div className='header'>
            <div>
                <img src={props.pfp}/>
                <span>{props.username}</span>
            </div>
            <div><IconMenu2 size={35}/></div>
        </div>
    );
}
