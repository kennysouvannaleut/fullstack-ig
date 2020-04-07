import React, { useContext } from 'react';
import UserContext from '../../context/userContext';
import PostList from '../../components/PostList';
import FormContainer from '../../components/FormContainer';

const Profile = () => {
    const userContext = useContext(UserContext)
    const {
        createPost,
        likes,
    //     likePost,
    //     dislikePost,
        username,
        posts
    } = userContext;

    return (
        <div className='profile'>
            <h1>Welcome @{ username }</h1>
            <h3>Create a new post</h3>
            <FormContainer createPost={ createPost } />
            <h3>Recent posts</h3> 
            <PostList 
                 posts={ posts }
                // like={ likePost }
                //  dislike={ dislikePost }
            />
        </div>
    );
};

export default Profile;