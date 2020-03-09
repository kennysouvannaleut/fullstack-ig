import React, { useState, createContext } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';

export const UserContext = createContext();

const handleError = err => console.log(err.response.data.errMsg);

const UserProvider = (props) => {
    const {
        data,
        loading
    } = useFetch(true);

    const initialInputs = {
        postDate: '',
        postTitle: '',
        postDescription: '',
        postCategory: '',
        postURL: ''
    };

    const [inputs, setInputs] = useState(initialInputs);

    const createPost = (newPost) => {
        axios.post('/post', newPost)
            .then(res => {
                setInputs(prev => ({
                    ...prev,
                    loading,
                    data
                }))
            })
            .catch(handleError)
    };

    const removePost = (postID) => {
        axios.delete(`/post/${postID}`)
            .then(res => {
                setInputs(prev => prev.filter(post => post._id !== postID ))
            })
            .catch(handleError)
    };

    const editPost = (edit, postID) => {
       axios.put(`/post/${postID}`, edit)
        .then(res => {
            setInputs(prev => prev.map(post => post._id !== postID ? post : data ))
        })
        .catch(handleError)
    };

    return (
        <UserContext.Provider 
            value={{ 
                ...inputs,
                data,
                loading,
                createPost,
                removePost,
                editPost 
            }} >
            { props.children }
        </UserContext.Provider>
    );
};

export default UserProvider;
