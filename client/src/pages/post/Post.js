import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import { useParams } from 'react-router-dom';
// import PostList from '../../components/PostList';

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
                {/* <PostList /> */}
            { currentPost ? (
                <>
                <div className='post-content'>
                    <p>{ currentPost.imgUrl }</p>
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