import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import userContext from '../../context/userContext'
import PostList from '../../components/posts/PostList.js'

const UserPosts = () => {
    const {username} = useParams()
    const {selectedUser} = useContext(userContext)

    useEffect(() => {
        selectedUser(username)
    }, [])

    // question about how to use params on this (error when clicking on picture while on this page)
    
    return(
        <div>
            <h2>@{username}</h2>
            <PostList userPage={true}/>
        </div>
    )
}

export default UserPosts