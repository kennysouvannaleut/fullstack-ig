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
                    <p key={ post.id } >
                    <img src={post.img} alt='' />
                    <p>Posted: { post.dateAdded } </p> 
                    <p>Description: { post.description } </p> 
                    <span>Votes: { post.votes } </span> 
                    <p>Comments: </p> { post.comments } </p> 
                )}
        </div>
    );
};

export default CurrentList;
