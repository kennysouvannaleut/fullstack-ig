import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import FormContainer from '../../components/form/FormContainer';
import SetProfile from './SetProfile.js'

const Profile = () => {
    const userContext = useContext(UserContext);
    const {
        user: { username },
        profile,
        createPost,
        getProfile,
        addProfile
    } = userContext
    // const {image: {imgUrl}, about} = profile <-- destructuring sends an error

    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        getProfile(username)
    }, [])

    const handleToggle = () => {
        setToggle(!toggle)
    }
    
    return (
        <div className='profile'>
            <h1>Welcome { username }</h1>
            {!toggle ? 
                <>
                    {profile && profile.image ? 
                        <img className='profile-pic' src={profile.image.imgUrl}/> :
                        <SetProfile user={ username } addProfile={addProfile}/>
                    }
                    {profile && profile.about &&
                        <p>{profile.about}</p>
                    }
                </>
                :
                <SetProfile user={ username } addProfile={addProfile}/>
            }
            <button onClick={handleToggle}>{toggle ? 'Cancel' : 'Edit Profile'}</button>
            <h3>Create a new post</h3>
            <FormContainer 
                createPost={ createPost }
                user={ username }
            />
        </div>
    );
};

export default Profile;