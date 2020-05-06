import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import FormContainer from '../../components/form/FormContainer';
import SetProfileImg from './SetProfileImg.js'
import SetBio from './SetBio.js'
// import {progress} from '../../firebase/firebase.js'

const Profile = () => {
    const userContext = useContext(UserContext);
    const {
        user: { username },
        currentProfile,
        createPost,
        currentUserPosts,
        getCurrentProfile,
        addProfileImg,
        addBio,
        posts
    } = userContext
    
    const [bioToggle, setBioToggle] = useState(false)

    useEffect(() => {
        getCurrentProfile()
        currentUserPosts()
    }, [])

    const handleToggle = () => {
        setBioToggle(!bioToggle)
    }

    return (
        <div className='profile'>
            <div className='profile-edit'>
                <SetProfileImg 
                    user={username} 
                    addProfileImg={addProfileImg} 
                    profile={currentProfile}
                />
                <div className='profile-edit-text'>
                    <h1 className='profile-username'>{username}</h1>
                    <p className='profile-postnum'>
                        <b>{posts.length}</b> post{(posts.length > 1 || posts.length === 0) && 's'}
                    </p>
                    {
                        bioToggle ?
                            <div>
                                <SetBio addBio={addBio} prevBio={currentProfile.bio} handleToggle={handleToggle}/>
                                <button 
                                    className='profile-bio-button button' 
                                    onClick={() => handleToggle()}
                                >
                                    Cancel
                                </button>
                            </div>
                        :
                            <>
                                {
                                currentProfile && currentProfile.bio ?
                                    <div className='profile-bio'>
                                        <p className='bio-p'>{currentProfile.bio}</p>
                                        <button 
                                            className='profile-bio-button button' 
                                            onClick={() => handleToggle()}
                                        >
                                            Edit Bio
                                        </button>
                                    </div>
                                :
                                    <SetBio addBio={addBio} prevBio={currentProfile.bio}/>
                            }
                            </>
                    }
                </div>
            </div>
            <div className='profile-post'>
                <h3>Create a new post</h3>
                <FormContainer 
                    createPost={ createPost }
                    user={ username }
                />
            </div>
        </div>
    )
}

export default Profile