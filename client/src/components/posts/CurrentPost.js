import React from 'react';
import useFetch from '../../hooks/useFetch';

const CurrentPost = () => {
    const { loading, data } = useFetch(`/api/posts/current-user/`);

    return (
        <div className='current-user-post'>
            <h2>My recent posts</h2>
            { loading && <div className='loader' /> }
            { data && <h3> You have { data.length } posts! </h3> }
            { data && data.length > 0 
            && data.map(post => 
                <p key={ post._id } >
                <img src={post.img.imgUrl} alt='' />
                <br /> Date: { post.dateAdded }
                <br /> Description: { post.description }
                <br /> Votes: { post.votes } </p> 
            )}
        </div>
    );
};

export default CurrentPost;
