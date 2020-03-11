import React, { useState, createContext } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';

export const UserContext = createContext();

const handleError = err => console.log(err.response.data.errMsg);

const UserProvider = (props) => {
    const [{ 
        data, 
        isLoading, 
        isError 
    }, apiFetch] = useFetch('/view', { posts: [] } );

    const [state, setState] = useState(data);
    const [query, setQuery] = useState('user');

    const getPosts = () => { 
        apiFetch()
        const { posts } = data;
        setState({
            isError,
            isLoading,
            posts
        })
    };

    const getUserPost = (userId) => {
        axios.get(`/post/${userId}`)
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    posts: res.data
                }))
            })
            .catch(handleError)
    }

    const createPost = (newPost) => {
        axios.post('/post', newPost)
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    posts: [ 
                        ...prevState.posts,
                        res.data
                    ]
                }))
            })
            .catch(handleError)
    };

    const removePost = (postId) => {
        axios.delete(`/post/${postId}`)
            .then(() => {
                setState(prevState => prevState.filter(post => post._id !== postId))
            })
            .catch(handleError)
    };

    const editPost = (edit, postId) => {
       axios.put(`/post/${postId}`, edit)
        .then(res => {
            setState(prevState => prevState.map(post => post._id !== postId ? post: res.data))
        })
        .catch(handleError)
    };

    const filterPost = (e) => {
        if(e.target.value === 'reset') {
            apiFetch()
        } else {
            axios.get(`/view/search?query=${query}`)
                .then(res => setQuery(res.data))
                .catch(handleError)
        }
    };

    return (
        <UserContext.Provider 
            value={{ 
                ...state,
                getPosts,
                getUserPost,
                createPost,
                removePost,
                editPost,
                filterPost
            }} 
            >
            { props.children }
        </UserContext.Provider>
    );
};

export default UserProvider;
