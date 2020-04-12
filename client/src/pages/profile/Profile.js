import React, { useContext } from 'react';
import UserContext from '../../context/userContext';
import FormContainer from '../../components/FormContainer';

const Profile = () => {
    const userContext = useContext(UserContext);
    const {
        user: {
            username
        },
        createPost,
        uploadPicture
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
        </div>
    );
};

export default Profile;