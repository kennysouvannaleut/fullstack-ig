import React, { useState } from 'react';
import FormComponent from './FormComponent';
import {imageUpload} from '../../firebase/firebase.js'

const FormContainer = props => {
    const { createPost, user } = props;

    // const dateString = date.getFullYear() + '-'
    // + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    // + ('0' + date.getDate()).slice(-2);

    const initialInputs = {
        img: {
            imgUrl: '',
            imgRef: ''
        },
        user: user,
        description: '',
        likes: '',
        dateAdded: Date.now()
    };
    
    const [inputs, setInputs] = useState(initialInputs);
    const [img, setimg] = useState([]);

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
        imageUpload(img, user, setUrl);
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
    }

    return (
        <FormComponent 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            onDrop={ onDrop }
            inputs={ inputs }
            buttonText='submit'
        />
    );
};

export default FormContainer;