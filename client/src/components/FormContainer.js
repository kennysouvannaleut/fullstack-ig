import React, { useState } from 'react';
import FormComponent from './FormComponent';
import {storage} from '../firebase/firebase.js'

const FormContainer = (props) => {
    const initialInputs = {
        imgUrl: '',
        user: '',
        description: '',
        // likes: '',
        dateAdded: '',
        // pictures: ''
    };
    
    const [inputs, setInputs] = useState(initialInputs);
    const [pictures, setPictures] = useState({});
    // const [imageAsUrl, setImageAsUrl] = useState('')
    // console.log(222, pictures)
    console.log(inputs)

    const { 
        createPost, 
        // likes,
        // uploadPicture,
        editPost, 
        removePost, 
        likePost, 
        dislikePost 
    } = props;

    const onDrop = picture => {
        setPictures(picture);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log('second')
        // const storageRef = storage.ref()
        const pictureFile = pictures[0]
        const fileName = pictures[0].name
        
        console.log('start of upload')
        if(pictureFile === ''){
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${fileName}`).put(pictureFile)
            // .then((snapshot) => {
            //     console.log(777, snapshot + 'image uploaded')
            // })
        console.log(uploadTask)

        // initiates the firebase side uploading
        // uploadTask.on(storage.TaskEvent.STATE_CHANGED,
        uploadTask.on('state_changed', 
            (snapShot) => {
                // takes a snap shot of the process as it is happening

                // const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                // console.log(`Upload is ${progress}% done`)
                // switch(snapShot.state){
                //     case storage.TaskState.PAUSED:
                //         console.log('Upload is paused')
                //         break
                //     case storage.TaskState.RUNNING:
                //         console.log('Upload is running')
                //         break
                // }
                console.log(snapShot)
            }, (error) => {
                // switch(error.code){
                //     case 'storage/unauthorized':
                //     // User doesn't have permission to access the object
                //     break
                //     case 'storage/canceled':
                //     // User canceled the upload
                //     break
                //     case 'storage/unknown':
                //     // Unknown error occurred, inspect error.serverResponse
                //     break
                // }
                console.log(error)
            }, () => {
            // Upload completed successfully, now we can get the download URL

                // uploadTask.snapShot.ref.getDownloadURL().then((downloadURL) => {
                //     console.log('File available at', downloadURL)
                // })
                storage.ref('images').child(fileName).getDownloadURL()
                    .then(firebaseUrl => {
                        const url = firebaseUrl
                        console.log(firebaseUrl)
                        setInputs(prevInputs => ({
                            ...prevInputs, 
                            imgUrl: url
                        }))
                        
                        finalizeSubmit(inputs)
                    })
            }
        )
    }

    const finalizeSubmit = inputs => {
        console.log(inputs)

        createPost(inputs)
        console.log(inputs)
        setInputs(initialInputs)
    }

    return (
        <FormComponent 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            onDrop={ onDrop }
            inputs={ inputs }
            buttonText='Create new post'
        />
    );
};

export default FormContainer;
