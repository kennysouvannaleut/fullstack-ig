import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import FormContainer from '../../components/form/FormContainer';
import SetProfileImg from './SetProfileImg.js'
import SetBio from './SetBio.js'

const Profile = () => {
    const userContext = useContext(UserContext);
    const {
        user: { username },
        profile,
        createPost,
        getProfile,
        addProfileImg,
        addBio,
    } = userContext
    // const {image: {imgUrl}, about} = profile <-- destructuring sends an error

    const [bioToggle, setBioToggle] = useState(false)

    useEffect(() => {
        getProfile(username)
    }, [])

    const handleToggle = () => {
        setBioToggle(!bioToggle)
    }
    
    return (
        <div className='profile'>
            <h1>Welcome {username}</h1>
            <SetProfileImg 
                user={username} 
                addProfileImg={addProfileImg} 
                profile={profile}
            />
            {
                bioToggle ?
                    <>
                        <SetBio addBio={addBio} prevBio={profile.bio} handleToggle={handleToggle}/>
                        <button onClick={() => handleToggle()}>Cancel</button>
                    </>
                :
                    <>
                        {
                        profile && profile.bio ?
                            <>
                                <p>{profile.bio}</p>
                                <button onClick={() => handleToggle()}>Edit bio</button>
                            </>
                        :
                            <SetBio addBio={addBio} prevBio={profile.bio}/>
                    }
                    </>
            }
            <h3>Create a new post</h3>
            <FormContainer 
                createPost={ createPost }
                user={ username }
            />
        </div>
    )
}

export default Profile