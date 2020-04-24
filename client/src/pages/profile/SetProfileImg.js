import React from 'react'
import {imageUpload, deleteImage} from '../../firebase/firebase.js'
import DefaultAvatar from '../../media/blank-avatar.png'

const SetProfileImg = props => {
    const {user, addProfileImg, profile, handleToggle} = props

    const handleImgSubmit = e => {
        const img = e.target.files
        if(checkMimeType(e) && checkFileSize(e)){
            const path = `${user}/profile`
            profile && profile.img && deleteImage(profile.img.imgRef)
            imageUpload(img, path, setUrl)
            handleToggle && console.log('should work')
            handleToggle && handleToggle('Img')
        }
    }

    const checkMimeType = e => {
        let img = e.target.files 
        let err = ''
        const types = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg', 'image/tiff']
        for(var x = 0; x < img.length; x++){
                if (types.every(type => img[x].type !== type)){
                err += img[x].type + ' is not a supported format\n'
            }
        }
        if (err !== ''){
            console.log(err)
            return false
        }
        return true
    }

    const checkFileSize = e => {
        let img = e.target.files
        let size = 5000000
        let err = ""
        if (img[0].size > size){
            err += img[0].type+'is too large, please pick a smaller file\n'
        }
        if (err !== '') {
            console.log(err)
            return false
        }
        return true
    }

    const setUrl = (url, path) => {
        const img = {imgUrl: url, imgRef: path}
        addProfileImg(img)
    }

    return (
        <div 
            className={'set-profile-pic'} 
            style={{'backgroundImage': `url(${profile.img ? profile.img.imgUrl : DefaultAvatar}`}}
        >
            <input 
                className='profile-pic-input' 
                name='image' 
                type='file'
                accept='image/*'
                id='image'
                onChange={handleImgSubmit}
            />
            <label 
                className='profile-pic-label' 
                htmlFor='image' 
                name='image'
            >
                <div className='label-styling'>
                    {profile ? 'Change profile picture' : 'Choose a profile picture'}
                </div>
            </label>
        </div>
    )
}

export default SetProfileImg