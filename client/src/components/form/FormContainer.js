import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'
import FormComponent from './FormComponent';
import {imageUpload} from '../../firebase/firebase.js'

const FormContainer = props => {
    const { createPost, user } = props;

    // const dateString = date.getFullYear() + '-'
    // + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    // + ('0' + date.getDate()).slice(-2);
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
    const [redirect, setRedirect] = useState(false)
    console.log(inputs)
    

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
        img.length === 0 ?
            alert("You must choose a picture") :
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
        setRedirect(true)
    }

    return (
        redirect ? 
        <Redirect to='/current-user'/> :
        <FormComponent 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            onDrop={ onDrop }
            inputs={ inputs }
            buttonText='Submit'
        />
    );
};

export default FormContainer;