import React from 'react';
import { useParams } from 'react-router-dom';


export default function Review() {
    // Use the useParams hook to access route parameters
    const { tmdb_id } = useParams();

    return (
        <div className='text-white'>{tmdb_id}</div>
    )
}
