import React, { useState } from 'react';
import UserContext from './userContext';
import Axios from 'axios';

const UserAxios = Axios.create();

UserAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`
        return config 
    });

const handleError = err => console.log(err.response.data.errMsg);

const UserProvider = props => {
    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        posts: [],
        currentPost: null,
        loading: true,
        errMsg: ''
    };
    
    const [state, setState] = useState(initialState);

    // get all posts
    const getPosts = () => {
        Axios.get('/viewposts')
            .then(res => {
                console.log('data', res);
                setState({ posts: res.data })
            })
            .catch(handleError);
    };

    // signup
    const signup = (credentials) => {
        Axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setState(prevState => ({
                    ...prevState,
                    user,
                    token,
                    success: true
                }))
            })
            .catch(handleError => handleAuthErr(handleError));
    };

    // login
    const login = (credentials) => {
        Axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getPostById();
                setState(prevState => ({
                    ...prevState,
                    user,
                    token,
                    success: true
                }))
            })
            .catch(handleError => handleAuthErr(handleError));
    };

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setState({
            user: {},
            token: '',
            posts: []
        })
    };

    const handleAuthErr = (errMsg) => {
        setState(prevState => ({
            ...prevState,
            errMsg
        })
    )};

    const resetAuthErr = () => {
        setState(prevState => ({
            ...prevState,
            errMsg: ''
        })
    )};

    // get user posts
    const getPostById = (user) => {
        const id = user._id;
        UserAxios.get(`/viewposts/${id}`)
            console.log('user post')
            .then(res => {
                const { posts } = res.data;
                setState(prevState => ({
                    ...prevState,
                    posts
                }))
            })
            .catch(handleError)
    };

    // create new post
    const createPost = (postNew) => {
        UserAxios.post('/post', postNew)
            console.log('mongodb post')
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

    // delete post
    const removePost = (postId) => {
        UserAxios.delete(`/update/${postId}`)
            console.log('post deleted')
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    posts: prevState.posts.filter(post => (
                        post._id === postId))
                    })
                )
            })
            .catch(handleError)
    };

    // edit post
    const editPost = (update, postId) => {
        UserAxios.put(`/update/${postId}`, update)
            console.log('post update')
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    posts: prevState.posts.map(post => (
                        post._id !== postId ? post : res.data))
                    })
                )
            })
            .catch(handleError)
    };

    // upvote/like post
    const likePost = (postId) => {
        UserAxios.put(`/like/${postId}`)
            console.log('upvote')
            .then(res => {
                setState(prevState => ({
                    ...prevState, 
                    posts: prevState.posts.map(post => (
                        post._id === postId ? res.data : post))
                    })
                )
            })
            .catch(handleError)
    };

    // downvote/dislike post
    const dislikePost = (postId) => {
        UserAxios.put(`/dislike/${postId}`)
        console.log('downvote')
            .then(res => {
                setState(prevState => ({
                    ...prevState, 
                    posts: prevState.posts.map(post => (
                        post._id === postId ? res.data : post))
                    })
                )
            })
            .catch(handleError)
    };

    return (
        <UserContext.Provider 
        value={{ 
            ...state,
            signup,
            login,
            logout,
            resetAuthErr,
            getPosts,
            getPostById,
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
