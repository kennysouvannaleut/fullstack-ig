import React, { useState } from 'react';
import FormComponent from './FormComponent';

const FormContainer = (props) => {
    // const initialInputs = {
        
    // }
    
    const [inputs, setInputs] = useState();
    const [pictures, setPictures] = useState([]);

    const { createPost, like, dislike } = props;

    const handleOnDrop = () => {
        setPictures(pictures)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
        setInputs(inputs);
    };

    return (
        <>
            <FormComponent 
                handleChange={ handleChange }
                handleSubmit={ handleSubmit }
                handleOnDrop={ handleOnDrop }
                // inputs={ inputs }
                buttonText='New Post'
            />
            <button onClick={ () => like }>Like</button>
            <button onClick={ () => dislike }>Dislike</button>
            <span>The count is { like }</span>
        </>
    );
};

export default FormContainer;
