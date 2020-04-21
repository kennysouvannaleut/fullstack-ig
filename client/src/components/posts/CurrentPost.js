import React from 'react';
import useFetch from '../../hooks/useFetch';

const CurrentList = () => {
    const { loading, data } = useFetch(`/api/posts/current-user/`);

    return (
        <div className='current-user-post'>
            { loading && <div className='loader' /> }
            { data && 
                data.length > 0 && 
                data.map(post => 
                    <p key={ post._id } >
                    <img src={post.img.imgUrl} alt='' />
                    <p>Date: { post.dateAdded } </p> 
                    <p>Description: { post.description } </p> 
                    Votes: { post.votes } </p> 
                )}
        </div>
    );
};

export default CurrentList;
