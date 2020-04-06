import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import { useParams } from 'react-router-dom';

const Post = () => {
    const userContext = useContext(UserContext)
    const { user, getPostById, currentPost } = userContext;

    let { userId } = useParams;

    useEffect(() => {
        getPostById(userId);
    }, []);

    return (
        <div className='post'>
            <h1>Welcome @{ user }!</h1>
            { currentPost ? (
                <>
                <div className='post-content'>
                    <h2>{ currentPost.title }</h2>
                    <p>{ currentPost.description }</p>
                    <p>{ currentPost.likes }</p>
                    <p>{ currentPost.dateAdded }</p>
                </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Post;