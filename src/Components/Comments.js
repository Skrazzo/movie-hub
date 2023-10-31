import React, { useState } from 'react';
import axios from 'axios';
import { get_form_object, object_to_urlsearchparams } from '../functions';

export default function Comments(props) {
    const [requestPending, setRequestPending] = useState(false);

    function postHandler(e){
        e.preventDefault();

        var data = get_form_object('comment_form');
        data.tmdb_id = props.addTmdb;

        if(!requestPending){ // before sending another request, validate that another one is not pending
            setRequestPending(true);
            axios.post('add_comments.php', object_to_urlsearchparams(data)).then((res) => {
                if(res.data.code === 0){
                    alert(res.data.reason);
                }else{
                    // upadet rating in real time
                    setRequestPending(false);
                }
            });

        }
    }

    return (
        <div className='container mx-auto xl:max-w-4xl comments-container'>
            <div className='max-w-4xl flex'>
                <p className='font-medium text-primary'>Comm</p><p className='orange-span font-medium'>ents</p>
            </div>
            <div className=''>
                <form id='comment_form' className="flex gap-2 items-center" onSubmit={(e) => postHandler(e)}>
                    <div className='comment-input w-full'>
                        <input type='text' name='comment' className='text-primary' placeholder='Write comment'></input>
                    </div>
                    <button className='btn-primary uppercase'>post</button> 
                </form>
            </div>
            <div className='comment-box'>
                <div className='single-comment'>
                    <div className='comment-header flex items-center'>
                        <img className='rounded-full h-12 w-12 border-2' src='https://i.pinimg.com/236x/80/87/65/80876535c7869d8df99da95845508b02.jpg'></img>
                        <h1 className='font-medium text-xl'>KkarliskK</h1>
                    </div>
                    <div className='comment-desc'>
                        <p className='italic'>I really liked when he went fishing in new york, he gained a lot of sexual experience recommend it to children and new borns 10/10</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
