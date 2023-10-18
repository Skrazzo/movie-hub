import { IconMenu2 } from '@tabler/icons-react';
import React from 'react';

export default function Header(props) {
    return (
        <div className='header'>
            <div>
                <img src={props.pfp}/>
                <span>{props.username}</span>
            </div>
            <div><IconMenu2 color='white'/></div>
        </div>
    );
}
