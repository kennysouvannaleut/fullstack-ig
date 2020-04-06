import React, { useState } from 'react';
import UserContext from './userContext';
import Axios from 'axios';

const userAxios = Axios.create();

const handleError = err => console.log(err.response.data.errMsg);

const UserProvider = props => {
    const initialState = {
        user: localStorage.getItem('user') || {},
        posts: [],
        currentPost: null,
        loading: true,
        errMsg: ''
    };
    
    const [userState, setUserState] = useState(initialState);

    console.log(userState)

    // get all posts
    const getPosts = () => {
        Axios.get('/viewposts')
            .then(res => {
                setUserState({ posts: res.data })
            })
            .catch(handleError);
    };

    // USERS:
    const signup = (credentials) => {
        userAxios.post('/auth/signup', credentials)
            .then(res => {
                const { user } = res.data;
                localStorage.setItem('user')
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user
                }))
            })
            .catch(handleError => handleAuthErr(handleError));
    };

    const login = (credentials) => {
        userAxios.post('/auth/login', credentials)
            .then(res => {
                const { user } = res.data;
                localStorage.setItem('user')
                getUserPost();
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user
                }))
            })
            .catch(handleError => handleAuthErr(handleError));

        // userAxios.post('/auth/login', credentials)
        // .then(res => {
        //     const { username } = res.data;
        //     localStorage.setItem('username', JSON.stringify(username))
        //     getUserPost(res.data._id);
        //     setUserState(prevUserState => ({
        //         ...prevUserState,
        //         username
        //     }))
        // })
        //     .catch(handleError => handleAuthErr(handleError))
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

    const resetAuthErr = () => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }))
    };

    // POSTS:
    const getUserPost = (userId) => {
        Axios.get(`/viewposts/${userId}`)
            .then(res => {
                const { posts } = res.data
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts
                }))
                console.log(res.data)
            })
            .catch(handleError)
    };

    const createPost = (newPost) => {
        Axios.post('/post', newPost)
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
        Axios.delete(`/update/${postId}`)
            .then(() => {
                setUserState(prevUserState => prevUserState.filter(post => post._id !== postId))
            })
            .catch(handleError)
    };

    const editPost = (update, postId) => {
        Axios.put(`/update/${postId}`, update)
            .then(res => {
                setUserState(prevUserState => prevUserState.map(post => post._id !== postId ? post: res.data))
            })
            .catch(handleError)
    };

    // UP/DOWN VOTING:
    const likePost = (postId) => {
        Axios.put(`/like/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: [
                        ...prevUserState.likes, 
                        res.data
                    ]
                }))
            })
            .catch(handleError)
    };

    const dislikePost = (postId) => {
        Axios.put(`/dislike/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: [
                        ...prevUserState.likes, 
                        res.data
                    ]
                }))
            })
            .catch(handleError)
    };

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
            likePost,
            dislikePost
        }} 
            >
            { props.children }
        </UserContext.Provider>
    );
};

export default UserProvider;
