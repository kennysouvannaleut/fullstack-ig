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

// const handleError = err => console.log(err.response.data.errMsg);

const UserProvider = props => {
    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        posts: [],
        currentPost: {
            imgInfo: {
                imgUrl: '',
                imgRef: ''
            },
            postedBy: '',
            description: '',
            votes: ''
        },
        comments: [],
        loading: true,
        errMsg: ''
    }
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
                console.error(err);
        });
    };

    // login
    const login = credentials => {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                currentUserPosts();
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token,
                    success: true
                }));
            })
            .catch(err => {
                handleAuthErr(err.response.data.errMsg);
                console.error(err);
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({
            user: '',
            token: '',
            posts: [],
            currentPost: null,
            comments: [],
            errMsg: ''
        })
    };

    const handleAuthErr = (errMsg) => {
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
                    posts: res.data,
                    loading: false
                }));
            })
            .catch(err => {
                console.error(err);
        });
    };

    // get (logged in) user's posts
    const currentUserPosts = () => {
        userAxios.get(`/api/post/current-user`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: res.data,
                    loading: false
                }));
            })
            .catch(err => {
                console.error(err);
        });
    };

    // get (other) user's posts
    const selectedUser = (username) => {
        userAxios.get(`/viewposts/user/${username}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: res.data
                }));
            })
            .catch(err => {
                console.error(err);
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
                console.error(err);
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
                console.error(err);
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
                console.error(err);
        });
    };

    // edit post
    const editPost = (postId, update) => {
        userAxios.put(`/api/update/${postId}`, update)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    currentPost: res.data
                }));
            })
            .catch(err => {
               console.error(err);
               alert('Your post has been updated')
        });
    };

    // UP/DOWN VOTING:
    const upvotePost = (postId) => {
        userAxios.put(`/api/vote/upvote/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: prevUserState.posts.map(post => (
                        post._id === postId ? res.data : post))
                }));
            })
            .catch(err => { 
                console.error(err)
                alert('You can only vote once per post')
        })
    };

    const downvotePost = (postId) => {
        userAxios.put(`/api/vote/downvote/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    posts: prevUserState.posts.map(post => (
                        post._id === postId ? res.data : post))
                }));
            })
            .catch(err => { 
                console.error(err)
                alert('You can only vote once per post');
        });
    };

    // COMMENTS:
    const getComments= (postId) => {
        userAxios.get(`/api/comments/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    comments: res.data
                }))
            })
            .catch(err => { 
                console.error(err) 
        })
    }

    const createComment = (postId, newComment) => {
        userAxios.post(`/api/comments/post/${postId}`, newComment)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    comments: [ 
                        ...prevUserState.comments,
                        res.data
                    ]
                }))
            })
            .catch(err => { 
                console.error(err) 
        })
    }

    const removeComment = (commentId) => {
        userAxios.delete(`/api/comments/${commentId}`)
            .then(() => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    comments: prevUserState.comments.filter(comment => comment._id !== commentId)
                }))
            })
            .catch(err => { 
                console.error(err) 
        })
    }

    const editComment = (commentId, updatedComment) => {
        userAxios.put(`/api/comments/${commentId}`, updatedComment)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    comments: prevUserState.comments.map(comment => (
                        comment._id !== commentId ? comment : res.data
                    ))
                }))
            })
            .catch(err => { 
                console.error(err) 
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
            currentUserPosts,
            selectedUser,
            postDetail,
            createPost,
            removePost,
            editPost,
            upvotePost,
            downvotePost,
            getComments,
            createComment,
            removeComment,
            editComment
        }} 
            >
            { props.children }
        </UserContext.Provider>
    );
};

export default UserProvider;
