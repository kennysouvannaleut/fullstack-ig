import React, { useState } from 'react';
import FormComponent from './FormComponent';
import imageUpload from '../../firebase/firebase.js'

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
        imageUpload(picture, user, setUrl)
    }

    const setUrl = url => {
        setInputs(prevInputs => ({
            ...prevInputs, 
            imgUrl: url
        }))
        const inputsWithImgUrl = {...inputs, imgUrl: url}
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
            buttonText='Create new post'
        />
    );
};

export default FormContainer;