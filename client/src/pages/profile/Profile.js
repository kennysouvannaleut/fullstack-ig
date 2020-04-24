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
        currentUserPosts,
        posts
    } = userContext
    // const {image: {imgUrl}, about} = profile <-- destructuring sends an error

    const [bioToggle, setBioToggle] = useState(false)

    useEffect(() => {
        getProfile(username)
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
                    profile={profile}
                />
                <div className='profile-edit-text'>
                    <h1 className='profile-username'>{username}</h1>
                    <p className='profile-postnum'><b>{posts.length}</b> posts</p>
                    {
                        bioToggle ?
                            <div>
                                <SetBio addBio={addBio} prevBio={profile.bio} handleToggle={handleToggle}/>
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
                                profile && profile.bio ?
                                    <div className='profile-bio'>
                                        <p className='bio-p'>{profile.bio}</p>
                                        <button 
                                            className='profile-bio-button button' 
                                            onClick={() => handleToggle()}
                                        >
                                            Edit Bio
                                        </button>
                                    </div>
                                :
                                    <SetBio addBio={addBio} prevBio={profile.bio}/>
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