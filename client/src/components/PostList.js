import React, { useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
import Post from './Post.js';

const PostList = () => {
    const { getPosts, posts, loading, likePost, dislikePost } = useContext(UserContext)

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className='posts'>
            <div className='container'>
                <h2>Posts</h2>
                {
                !loading ? (
                    <div className='posts-grid-container'>
                        {
                        posts.map((post, i) => {
                            return (
                                <Post 
                                    key={ i }
                                    { ...post }
                                    likePost={ likePost } 
                                    dislikePost={ dislikePost }
                                    id={ post._id }
                                />
                            )
                        })
                    }
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default PostList;
