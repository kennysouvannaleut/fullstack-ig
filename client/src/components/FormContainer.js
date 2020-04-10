import React, { useState } from 'react';
import FormComponent from './FormComponent';
import { storage } from '../firebase/firebase.js';

const FormContainer = props => {
    const { createPost, user } = props

    const initialInputs = {
        imgUrl: '',
        user: user,
        description: '',
        likes: '',
        dateAdded: Date.now()
    };
    
    const [inputs, setInputs] = useState(initialInputs);
    const [picture, setPicture] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        })
    )};

    const onDrop = picture => {
        setPicture(picture)
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log('second')
        // const storageRef = storage.ref()
        const pictureFile = picture[0]
        const pictureName = picture[0].name
        
        console.log('start of upload')
        if(pictureFile === ''){
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${pictureName}`).put(pictureFile)
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
                storage.ref('images').child(pictureName).getDownloadURL()
                    .then(firebaseUrl => {
                        const url = firebaseUrl
                        console.log(firebaseUrl)
                        setInputs(prevInputs => ({
                            ...prevInputs, 
                            imgUrl: url
                        }))
                        const imgUrl = {...inputs, imgUrl: url}
                        finalizeSubmit(imgUrl)
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