import React, { useState } from 'react'
import {imageUpload} from '../../firebase/firebase.js'


const SetProfile = props => {
    const {user, addProfileImg, addBio} = props

    const initProfileInputs = {img: {}, bio: ''}
    const [profileInputs, setProfileInputs] = useState(initProfileInputs)

    const handleBioChange = e => {
        const {value} = e.target
        setProfileInputs(prevProfileInputs => ({
            ...prevProfileInputs,
            bio: value
        }))
    }

    const handleBioSubmit = (e) => {
        e.preventDefault()
        const {bio} = profileInputs
        addBio(bio)
    }

    // const handleImgChange = e => {
    //     const img = e.target.files
    //     setProfileInputs(prevProfileInputs => ({
    //         ...prevProfileInputs,
    //         img: img,
    //     }))
    // }

    const handleImgSubmit = (e) => {
        const img = e.target.files
        // setProfileInputs(prevProfileInputs => ({
        //     ...prevProfileInputs,
        //     img: img,
        // }))
        // const {img} = profileInputs
        const path = `${user}/profile`
        imageUpload(img, path, setUrl)
    }

    const setUrl = (url, path) => {
        setProfileInputs(prevProfileInputs => ({
            ...prevProfileInputs, 
            img: {
                imgUrl: url,
                imgRef: path
            }
        }))
        const inputsWithImgUrl = {imgUrl: url, imgRef: path}
        finalizeImgSubmit(inputsWithImgUrl)
    }

    const finalizeImgSubmit = img => {
        addProfileImg(user, img)
        setProfileInputs(initProfileInputs)
    }

    const {bio} = profileInputs

    return (
        <>
            {/* <form onSubmit={handleImgSubmit} className='set-profile-pic'> */}
            <div className={'set-profile-pic'}>
                <input 
                    className='profile-pic-input' 
                    name='file' 
                    type='file'
                    id='file'
                    onChange={handleImgSubmit}
                />
                <label 
                    className='profile-pic-label' 
                    htmlFor='file' 
                    name='file'
                >
                    Choose a profile picture
                </label>
            </div>
            {/* </form> */}
            <form onSubmit={handleBioSubmit}>
                <div>
                    <textarea value={bio} placeholder='About me' onChange={handleBioChange}></textarea>
                </div>
                <button>Set bio!</button>
            </form>
        </>
    )
}

export default SetProfile;