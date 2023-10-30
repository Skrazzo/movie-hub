import { IconStarFilled } from '@tabler/icons-react';
import React, { useState } from 'react';

export default function StarRating(props) {
    const [currentRating, setCurrentRating] = useState(props.defaultRating);
    const [hoverRating, setHoverRating] = useState(0);
    const [hovering, setHovering] = useState(false);

    const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



    function onMouseHover(rating){
        setHoverRating(rating);
        setHovering(true);
    }

    

    return (
        <div className='flex cursor-pointer'>
            {ratings.map((x) => {
                return (
                    <div className={(hovering) ? (x <= hoverRating) ? 'pr-1 orange-span' : 'pr-1 text-secondary' : (x <= currentRating) ? 'pr-1 orange-span' : 'pr-1 text-secondary'}
                        onMouseEnter={() => onMouseHover(x)}
                        onMouseLeave={() => setHovering(false)}
                        onClick={() => {setCurrentRating(x); props.setRating(x)}}
                    >
                        <IconStarFilled />
                    </div>
                );
            })}
        </div>
    )
}
