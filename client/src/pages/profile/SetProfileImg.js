import React, {useState} from 'react'
import {imageUpload, deleteImage, progress} from '../../firebase/firebase.js'
import DefaultAvatar from '../../media/blank-avatar.png'
console.log(progress)
const SetProfileImg = props => {
    const {user, addProfileImg, profile} = props

    const [errMsg, setErrMsg] = useState('')

    const handleImgSubmit = e => {
        setErrMsg('')
        const img = e.target.files
        if(img.length > 0 && checkMimeType(img) && checkFileSize(img)){
            const path = `${user}/profile`
            profile && profile.img && deleteImage(profile.img.imgRef)
            imageUpload(img, path, setUrl)
        }
    }

    const checkMimeType = img => {
        let err = ''
        const types = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg', 'image/tiff']
        for(var x = 0; x < img.length; x++){
            if(types.every(type => img[x].type !== type)){
                err += `${img[x].type} is not a supported format`
                setErrMsg(err)
        }
        }
        if(err !== ''){
            console.log(err)
            setErrMsg(err)
            return false
        }
        return true
    }

    const checkFileSize = img => {
        let size = 5000000
        let err = ""
        if (img[0].size > size){
            err += 'Image is too large, please pick a smaller file'
            setErrMsg(err)
        }
        if (err !== '') {
            console.log(err)
            setErrMsg(err)
            return false
        }
        return true
    }

    const setUrl = (url, path) => {
        const img = {imgUrl: url, imgRef: path}
        addProfileImg(img)
    }

    return (
        <div>
            <div 
                className={'set-profile-pic'} 
                style={{'backgroundImage': `url(${profile.img && profile.img.imgUrl ? profile.img.imgUrl : DefaultAvatar})`}}
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
                        <p className='size-limit'>(max file size: 5mb)</p>
                    </div>
                </label>
            </div>
            <p className='profile-upload-error'>{errMsg}</p>
            <p>{progress}</p>
        </div>
    )
}

export default SetProfileImg