import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import PostList from '../../components/PostList';
import FormContainer from '../../components/FormContainer';

const Profile = () => {
    const {
        user: {
            username
        },
        createPost,
        posts
    } = useContext(UserContext);

    return (
        <div className='profile'>
            <h1>Welcome @{ username }!</h1>
            <h3>Create a post</h3>
            <FormContainer 
                createPost={ createPost }
            />
            <h3>Recent posts</h3>
            <PostList 
                posts={ posts }
            />
        </div>
    );
};

export default Profile;