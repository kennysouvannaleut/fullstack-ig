import React, { useState } from 'react';
import FormComponent from './FormComponent';

const FormContainer = (props) => {
    
    const [inputs, setInputs] = useState('');
    const [pictures, setPictures] = useState([]);

    const { createPost, like, dislike } = props;

    console.log(props)
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
            <button onClick={() => like(_id)}>Like</button>
            <button onClick={() => dislike(_id)}>Dislike</button>
        </>
    );
};

export default FormContainer;
