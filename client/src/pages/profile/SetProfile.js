import React, { useState } from 'react'
import UserContext from '../../context/userContext'
import {imageUpload} from '../../firebase/firebase.js'


const SetProfile = props => {
    const {user, addProfile} = props

    const initAboutInputs = {image: [], about: ''}
    const [aboutInputs, setAboutInputs] = useState(initAboutInputs)

    console.log(aboutInputs)
    const handlePicChange = e => {
        const pic = e.target.files
        setAboutInputs(prevAboutInputs => ({
            ...prevAboutInputs,
            image: pic,
        }))
    }

    const handleTextChange = e => {
        const {value} = e.target
        setAboutInputs(prevAboutInputs => ({
            ...prevAboutInputs,
            about: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {image, about} = aboutInputs
        const path = `${user}/profile`
        imageUpload(image, path, setUrl)
    }

    const setUrl = (url, path) => {
        setAboutInputs(prevAboutInputs => ({
            ...prevAboutInputs, 
            image: {
                imgUrl: url,
                imgRef: path
            }
        }))
        const inputsWithImgUrl = {...aboutInputs, image: {imgUrl: url, imgRef: path}}
        finalizeSubmit(inputsWithImgUrl)
    }

    const finalizeSubmit = aboutInputs => {
        addProfile(aboutInputs)
        setAboutInputs(initAboutInputs)
    }

    const {about} = aboutInputs

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='set-profile-pic'>
                    <input 
                        className='profile-pic-input' 
                        name='file' 
                        type='file'
                        id='file'
                        onChange={handlePicChange}
                    />
                    <label 
                        className='profile-pic-label' 
                        htmlFor='file' 
                        name='file'
                    >
                        Choose a profile picture
                    </label>
                </div>
                <div>
                    <textarea value={about} placeholder='About me' onChange={handleTextChange}></textarea>
                </div>
                <button>Set profile!</button>
            </form>
        </>
    )
}

export default SetProfile;