import React, { useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
import PostCard from './PostCard';

const PostList = () => {
    const userContext = useContext(UserContext)
    const { 
        getPosts, 
        posts,
        loading, 
        upvotePost, 
        downvotePost,
        user:{
            username
        }
    } = userContext
    console.log(userContext)

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className='posts'>
            <div className='container'>
                <h2>Posts</h2>
                {
                loading ? (
                    <div className='posts-grid-container'>
                        {
                        posts.map((post, i) => {
                            const {
                                votes,
                                imgUrl,
                                description,
                                dateAdded,
                                _id
                            } = post
                            return (
                                <PostCard 
                                    key={ i }
                                    { ...post }
                                    username={ username }
                                    votes={ votes }
                                    imgUrl={ imgUrl }
                                    description={ description }
                                    dateAdded={ dateAdded }
                                    upvotePost={ upvotePost } 
                                    downvotePost={ downvotePost }
                                    id={ _id }
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
