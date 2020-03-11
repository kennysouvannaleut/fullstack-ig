import React, { useState } from 'react';
import FormComponent from './FormComponent';
import ImgUploader from './ImgUploader';

const FormContainer = (props) => {
    const initialInputs = {
        user: '',
        imgURL: '',
        description: '',
        likes: ''
    };
    
    const [inputs, setInputs] = useState(initialInputs);

    const { createPost, onDrop } = props;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(inputs);
        setInputs(initialInputs);
    };

    return (
        <>
            <FormComponent 
                handleChange={ handleChange }
                handleSubmit= { handleSubmit }
                inputs={ inputs }
                btnText='New Post'
            />
            <ImgUploader 
                onDrop={ onDrop }
            />
        </>
    );
};

export default FormContainer;

