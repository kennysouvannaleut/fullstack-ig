import React from 'react';
import PostDetails from './PostDetails';

const PostList = props => {
    const { data } = props;

    return (
        <div className='post-list'>
            <PostDetails 
                { ...data }
            />
        </div>
    );
};

export default PostList;