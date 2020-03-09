import React, { useState } from 'react';
import FormComponent from './FormComponent';

const FormContainer = (props) => {
    const initialInputs = {
        postDate: '',
        postTitle: '',
        postDescription: '',
        postURL: ''
    };
    
    const [inputs, setInputs] = useState(initialInputs);

    const { createPost } = props;

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
                btnText='Create New Post'
            />
        </>
    );
};

export default FormContainer;

