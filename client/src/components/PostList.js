import React, { useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
import Post from './Post.js';

const PostList = () => {
    const userContext = useContext(UserContext)
    const { getPosts, posts, loading } = userContext;  

    useEffect(() => {
        getPosts();
    }, []);

    console.log(posts);

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
                                    like={ post.like } 
                                    dislike={ post.dislike }
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
