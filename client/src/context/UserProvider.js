import React, { useState } from 'react';
import UserContext from './userContext';
import Axios from 'axios';

import firebase from 'firebase'
const dotENV = require('dotenv')
dotENV.config()
const apiKey = process.env.API_KEY

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "image-bucket-4e572.firebaseapp.com",
    databaseURL: "https://image-bucket-4e572.firebaseio.com",
    projectId: "image-bucket-4e572",
    storageBucket: "image-bucket-4e572.appspot.com",
    messagingSenderId: "15521326526",
    appId: "1:15521326526:web:1e2fb596d1b954e7e7c5ef",
    measurementId: "G-QRZNJJGDP6"
  }

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();
const storageRef = storage.ref();
console.log(storageRef)

function uploadPicture(pictures){
    const testRef = storageRef.child(`${pictures[0].name}`)
    const testImagesRef = storageRef.child(`images/${pictures[0].name}`)
    console.log(111, pictures[0])
    const testFile = pictures[0]
    testRef.put(testFile).then((snapshot) => {
        console.log(777, snapshot)
        console.log('image uploaded')
    })
}

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

    const createPost = (newPost, pictures) => {
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
                    posts: prevUserState.posts.map(post => (
                        post._id === postId ? res.data : post))
                }))
            })
            .catch(handleError)
    };

    const dislikePost = (postId) => {
        Axios.put(`/dislike/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: prevUserState.posts.map(post => (
                        post._id === postId ? res.data : post))
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
            uploadPicture,
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
