import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import PostCard from './PostCard';

const PostList = props => {
    const userContext = useContext(UserContext);
    const { 
        getPosts, 
        posts,
        getProfile,
        // profile,
        loading, 
        upvotePost, 
        downvotePost
        } = userContext;
    const { userPage } = props;

    useEffect(() => {
        getPosts();
        getProfile()
    }, [loading]);

    return (
        <div className='posts'>
            <div className='container'>
                {
                !userPage && 
                    <h2>Posts</h2>
                }
                {
                !loading ? (
                    <div className='posts-grid-container'>
                        {
                        posts.map((post, i) => {
                            return (
                                <PostCard 
                                    key={ i }
                                    { ...post }
                                    upvotePost={ upvotePost } 
                                    downvotePost={ downvotePost }
                                    userPage={ userPage }
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
