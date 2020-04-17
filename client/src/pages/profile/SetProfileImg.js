import React from 'react'
import {imageUpload} from '../../firebase/firebase.js'


const SetProfileImg = props => {
    const {user, addProfileImg} = props

    const handleImgSubmit = (e) => {
        const img = e.target.files
        const path = `${user}/profile`
        imageUpload(img, path, setUrl)
    }

    const setUrl = (url, path) => {
        const img = {imgUrl: url, imgRef: path}
        addProfileImg(user, img)
    }

    return (
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
    )
}

export default SetProfileImg