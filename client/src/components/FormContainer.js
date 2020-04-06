import React, { useState } from 'react';
import FormComponent from './FormComponent';

const FormContainer = (props) => {
    const initialInputs = {
        user: '',
        description: '',
        likes: '',
        dateAdded: '',
        pictures: ''
    };
    
    const [inputs, setInputs] = useState(initialInputs);
    const [pictures, setPictures] = useState([]);

    const { 
        createPost, 
        editPost, 
        removePost, 
        likePost, 
        dislikePost 
    } = props;

    const handleOnDrop = () => {
        setPictures(pictures);
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
        likePost(inputs)
        setInputs(initialInputs);
    };

    return (
        <FormComponent 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            handleOnDrop={ handleOnDrop }
            inputs={ inputs }
            buttonText='Create new post'
        />
    );
};

export default FormContainer;
