import React, { useState } from 'react';
import FormComponent from './FormComponent';

const FormContainer = (props) => {
    const initialInputs = {
        user: '',
        description: '',
        // likes: '',
        dateAdded: '',
        pictures: ''
    };
    
    const [inputs, setInputs] = useState(initialInputs);
    const [pictures, setPictures] = useState({});
    console.log(222, pictures)
    const { 
        createPost, 
        // likes,
        uploadPicture,
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
        e.preventDefault();
        createPost(inputs);
        uploadPicture(pictures)
        setInputs(initialInputs);
    };

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
