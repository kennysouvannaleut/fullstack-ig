import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import PostList from '../../components/PostList';
import FormContainer from '../../components/FormContainer';

const Post = () => {
    const {
        createPost,
        posts
    } = useContext(UserContext);

    return (
        <div className='post'>
            <h1>Welcome!</h1>
            <h3>Create Post</h3>
            <FormContainer 
                createPost={ createPost }
            />
            <h3>Recent Posts</h3>
            <PostList 
                posts={ posts }
            />
        </div>
    );
};

export default Post