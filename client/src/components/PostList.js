import React from 'react';
import PostDetails from './PostDetails';

const PostList = props => {
    const { 
        isError,
        isLoading, 
        posts 
    } = props;

    return (
        <div className='post-list'>
            { isError && <div>Oh no! Something went wrong...</div> }
            { isLoading && <div>Loading...</div> }
            { posts && 
                posts.length > 0 && 
                posts.map(post => {
                return (
                    <PostDetails
                        { ...post }
                        key={ post._id }
                    />
                    )
                })}
        </div>
    );
};

export default PostList;
