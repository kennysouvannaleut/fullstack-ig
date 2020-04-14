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
    const {image: {imgUrl}, about} = profile

    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        getProfile()
    }, [])

    const handleToggle = () => {
        setToggle(!toggle)
    }
    
    return (
        <div className='profile'>
            <h1>Welcome { username }</h1>
            {!toggle ? 
                <>
                    {imgUrl ? 
                        <img className='profile-pic' src={imgUrl}/> :
                        <SetProfile user={ username } addProfile={addProfile}/>
                    }
                    {about &&
                        <p>{about}</p>
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