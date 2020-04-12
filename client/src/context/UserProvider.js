import React, { useState } from 'react';
import UserContext from './userContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const handleError = err => console.log(err.response.data.errMsg);

const UserProvider = props => {
    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        posts: [],
        currentPost: [],
        loading: true,
        errMsg: ''
    };
    
    const [userState, setUserState] = useState(initialState);

    const { goBack } = useHistory();

    // USER AUTH:
    const signup = credentials => {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token,
                    success: true
                }));
            })
            .catch(err => {
                handleAuthErr(err.response.data.errMsg);
                handleError(err);
        });
    };

    // login
    const login = credentials => {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                getPostById();
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token,
                    success: true
                }));
            })
            .catch(err => {
                handleAuthErr(err.response.data.errMsg);
                handleError(err);
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({
            user: '',
            token: '',
            posts: []
        });
    };

    const handleAuthErr = errMsg => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        })
    )};

    const resetAuthErr = () => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        })
    )};

    // POSTS:
    // get all posts:
    const getPosts = () => {
        userAxios.get('/viewposts')
            .then(res => {
                setUserState(prevUserState => ({ 
                    ...prevUserState,
                    posts: res.data
                }));
            })
            .catch(err => {
                handleError(err);
        });
    };

    // get user posts
    const getPostById = () => {
        userAxios.get('/viewposts/user')
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: res.data
                }));
            })
            .catch(err => {
                handleError(err);
        });
    };

    // get one post
    const postDetail = (postId) => {
        userAxios.get(`/viewposts/post/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    currentPost: res.data
                }));
            })
            .catch(err => {
                handleError(err);
        });
    };

    const createPost = newPost => {
        userAxios.post('/api/post', newPost)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: [ 
                        ...prevUserState.posts,
                        res.data
                    ]
                }));
            })
            .catch(err => {
                handleError(err);
        });
    };

    // delete post
    const removePost = postId => {
        userAxios.delete(`/api/update/${postId}`)
            .then(() => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: prevUserState.posts.filter(post => post._id !== postId)
                }));
                goBack();
            })
            .catch(err => { 
                handleError(err);
        });
    };

    // edit post
    const editPost = (update, postId) => {
        userAxios.put(`/api/update/${postId}`, update)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: prevUserState.posts.map(post => (
                        post._id !== postId ? post : res.data))
                }));
            })
            .catch(err => {
                handleError(err);
        });
    };

    // UP/DOWN VOTING:
    const upvotePost = postId => {
        userAxios.put(`/api/upvote/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: prevUserState.posts.map(post => (
                        post._id === postId ? res.data : post))
                }));
            })
            .catch(err => {
                handleError(err);
                alert('You can only vote once per post');
        });
    };

    const downvotePost = postId => {
        userAxios.put(`/api/downvote/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: prevUserState.posts.map(post => (
                        post._id === postId ? res.data : post))
                }));
            })
            .catch(err => { 
                handleError(err)
                alert('You can only vote once per post');
        });
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
            getPostById,
            postDetail,
            createPost,
            removePost,
            editPost,
            upvotePost,
            downvotePost
        }} 
            >
            { props.children }
        </UserContext.Provider>
    );
};

export default UserProvider;
