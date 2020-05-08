import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import FormComponent from './FormComponent';
import {imageUpload, firebaseOn, firebaseOff} from '../../firebase/firebase.js'

const FormContainer = props => {
    const { createPost, user } = props;

    const createDate = () => {
        const month = new Date().toLocaleString('default', { month: 'long' })
        const dateArr = Date().split(' ')
        return `${month} ${dateArr[2]}, ${dateArr[3]}`
    }

    const initialInputs = {
        img: {
            imgUrl: '',
            imgRef: ''
        },
        user: user,
        description: '',
        likes: '',
        dateAdded: createDate()
    };
    
    const [inputs, setInputs] = useState(initialInputs);
    const [img, setimg] = useState([]);
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [btnDisable, setBtnDisable] = useState(false)
    const [redirect, setRedirect] = useState(false) 
    
    const [firebaseId, setFirebaseId] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0)
    
    useEffect(() => {
        const id = firebaseOn(progress => {
            setUploadProgress(progress)
        })
        setFirebaseId(id)
        return function cleanUp(){
            firebaseOff(firebaseId)
        }
    }, [])

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        })
    )};

    const onDrop = img => {
        setimg(img);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(img.length === 0){
            alert("You must choose a picture") 
        } else {
            imageUpload(img, user, setUrl)
            setShowProgressBar(true)
            setBtnDisable(true)
        }
    };

    const setUrl = (url, path) => {
        setInputs(prevInputs => ({
            ...prevInputs, 
            img: {
                imgUrl: url,
                imgRef: path
            }
        }))
        const inputsWithImgUrl = {...inputs, img: {imgUrl: url, imgRef: path}}
        finalizeSubmit(inputsWithImgUrl)
    }

    const finalizeSubmit = inputs => {
        createPost(inputs)
        setInputs(initialInputs)
        setRedirect(true)
    }

    return (
        <div>
            {
            redirect ? 
                <Redirect to='/current-user'/> 
            :
                <FormComponent 
                    handleChange={ handleChange }
                    handleSubmit={ handleSubmit }
                    onDrop={ onDrop }
                    inputs={ inputs }
                    buttonText='Submit'
                    btnDisable={btnDisable}
                    showProgressBar={showProgressBar}
                    uploadProgress={uploadProgress}
                />
            }
        </div>
    );
};

export default FormContainer;