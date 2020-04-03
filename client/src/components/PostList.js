import React from 'react';
import Post from './Post.js';

const PostList = props => {
    const { 
        isError,
        isLoading, 
        posts,
        like,
        dislike
    } = props;

    return (
        <div className='post-list'>
            { isError && <div>Oh no! Something went wrong...</div> }
            { isLoading && <div>Loading...</div> }
            { posts && 
                posts.length > 0 && 
                posts.map(post => {
                return (
                    <Post
                        { ...post }
                        like={ like }
                        dislike={ dislike }
                        key={ post._id }
                    />
                    )
                })
            }
        </div>
    );
};

export default PostList;
