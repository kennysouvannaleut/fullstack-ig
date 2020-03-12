import React, { useState, createContext } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';

export const UserContext = createContext();
const userAxios = axios.create();

const handleError = err => console.log(err.response.data.errMsg);

const UserProvider = (props) => {
    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        posts: [],
        errMsg: ''
    };

    const [userState, setUserState] = useState(initialState);
    // const [query, setQuery] = useState('user');

    const [{ 
        data, 
        isLoading, 
        isError 
    }, apiFetch] = useFetch('/viewposts', { posts: [], } );

    const getPosts = () => { 
        apiFetch()
        const { posts } =  data;
        setUserState({
            isError,
            isLoading,
            posts
        })
    };

    const signup = (credentials) => {
        userAxios.post('auth/signup', credentials)
            .then(res => {
                const { user } = res.data;
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user
                }))
            })
            .catch(handleAuthErr(handleError))
    };

    const login = (credentials) => {
        userAxios.post('auth/login', credentials)
            .then(res => {
                const { user } = res.data;
                localStorage.setItem('user', JSON.stringify(user))
                getPosts()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user
                }))
            })
            .catch(handleAuthErr(handleError))
    };

    const logout = () => {
        localStorage.removeItem('user')
        setUserState({
            user: {},
            posts: []
        })
    };

    const handleAuthErr = (errMsg) => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    };

    const resetAuthErr = (errMsg) => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    };

    const getUserPost = (userId) => {
        axios.get(`/users/${userId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: res.data
                }))
            })
            .catch(handleError)
    }

    const createPost = (newPost) => {
        axios.post('/newpost', newPost)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: [ 
                        ...prevUserState.posts,
                        res.data
                    ]
                }))
            })
            .catch(handleError)
    };

    const removePost = (postId) => {
        axios.delete(`/update/${postId}`)
            .then(() => {
                setUserState(prevUserState => prevUserState.filter(post => post._id !== postId))
            })
            .catch(handleError)
    };

    const editPost = (update, postId) => {
       axios.put(`/update/${postId}`, update)
        .then(res => {
            setUserState(prevUserState => prevUserState.map(post => post._id !== postId ? post: res.data))
        })
        .catch(handleError)
    };

    // const filterPost = (e) => {
    //     if(e.target.value === 'reset') {
    //         apiFetch()
    //     } else {
    //         axios.get(`/viewposts/search?query=${query}`)
    //             .then(res => setQuery(res.data))
    //             .catch(handleError)
    //     }
    // };

    const like = (postId) => {
        axios.put(`/like/${postId}`)
            .then(res => {
                const {posts} = res.data
                setUserState(prevUserState => [...prevUserState, prevUserState.likes, posts])
            })
            .catch(handleError)
    }

    const dislike = (postId) => {
        axios.put(`/dislike/${postId}`)
            .then(res => {
                const {posts} = res.data
                setUserState(prevUserState => [...prevUserState, prevUserState.likes, posts])
            })
            .catch(handleError)
    }

    return (
        <UserContext.Provider 
            value={{ 
                ...userState,
                signup,
                login,
                logout,
                resetAuthErr,
                getPosts,
                getUserPost,
                createPost,
                removePost,
                editPost,
                like,
                dislike
                // filterPost
            }} 
            >
            { props.children }
        </UserContext.Provider>
    );
};

export default UserProvider;
