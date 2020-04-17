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

    const [imgToggle, setImgToggle] = useState(false)
    const [bioToggle, setBioToggle] = useState(false)

    useEffect(() => {
        getProfile(username)
    }, [])

    const handleToggle = selector => {
        selector === 'Img' ? setImgToggle(!imgToggle) : setBioToggle(!bioToggle)
    }
    
    return (
        <div className='profile'>
            <h1>Welcome {username}</h1>
            {
            imgToggle ? 
                <>
                    <SetProfileImg user={username} addProfileImg={addProfileImg}/>
                    <br/>
                    <button onClick={() => handleToggle('Img')}>Cancel</button> 
                </>
            :
                <>
                    {
                    profile && profile.img ? 
                        <>
                            <img className='profile-pic' alt='' src={profile.img.imgUrl}/>
                            <br/>
                            <button onClick={() => handleToggle('Img')}>Change picture</button> 
                        </>
                    :
                        <>
                            <SetProfileImg user={username} addProfileImg={addProfileImg}/>
                        </>
                    }
                </>
            }
            {
                bioToggle ?
                    <>
                        <SetBio addBio={addBio} prevBio={profile.bio} handleToggle={handleToggle}/>
                        <button onClick={() => handleToggle('Bio')}>Cancel</button>
                    </>
                :
                    <>
                        {
                        profile && profile.bio ?
                            <>
                                <p>{profile.bio}</p>
                                <button onClick={() => handleToggle('Bio')}>Edit bio</button>
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