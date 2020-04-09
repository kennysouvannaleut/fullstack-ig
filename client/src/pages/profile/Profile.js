import React, { useContext } from 'react';
import UserContext from '../../context/userContext';
import PostList from '../../components/PostList';
import FormContainer from '../../components/FormContainer';

const Profile = () => {
    const userContext = useContext(UserContext)
    const {
        user: {
            username
        },
        createPost,
        uploadPicture,
        upvotePost,
        downvotePost,
        posts
    } = userContext;

    return (
        <div className='profile'>
            <h1>Welcome @{ username }</h1>
            <h3>Create a new post</h3>
            <FormContainer 
                createPost={ createPost }
                uploadPicture={ uploadPicture }
                user={ username }
            />
            <h3>My recent posts</h3>
             <PostList 
                posts={ posts }
                upvotePost={ upvotePost }
                downvotePost={ downvotePost }
            />
        </div>
    );
};

export default Profile;