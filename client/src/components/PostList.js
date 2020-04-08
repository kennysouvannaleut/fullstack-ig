import React, { useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
// import Post from './Post.js';
import PostCard from './PostCard';

const PostList = () => {
    const userContext = useContext(UserContext)
    const { getPosts, posts, loading, likePost, dislikePost } = userContext;

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
                                <PostCard 
                                    key={ i }
                                    { ...post }
                                    // title={ post.title }
                                    // user={ post.user }
                                    // likes={ post.likes }
                                    // description={ post.description }
                                    // dateAdded={ post.dateAdded }
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
