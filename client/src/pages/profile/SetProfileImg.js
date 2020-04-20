import React from 'react'
import {imageUpload} from '../../firebase/firebase.js'

const SetProfileImg = props => {
    const {user, addProfileImg} = props

    const handleImgSubmit = e => {
        const img = e.target.files
        // if(maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)){
        if(checkMimeType(e) && checkFileSize(e)){
            const path = `${user}/profile`
            imageUpload(img, path, setUrl)
        }
        // } else{
        //     console.log('Error uploading file')
        // }
    }

    // const maxSelectFile = e => {
    //     let img = e.target.files
    //         if (img.length > 1) { 
    //             const msg = 'Only 1 image can be uploaded at a time'
    //             // e.target.value = null
    //             console.log(msg)
    //             return false
    //         }
    //     return true
    // }
    // ^^ not working, if selecting multiple images, only accepts last image for some reason

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
        <div className={'set-profile-pic'}>
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
                Choose a profile picture
            </label>
        </div>
    )
}

export default SetProfileImg