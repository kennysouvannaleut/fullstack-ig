import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import userContext from '../../context/userContext'
import PostList from '../../components/posts/PostList.js'

const UserPosts = () => {
    const {username} = useParams()
    const {selectedUser, profile} = useContext(userContext)

    useEffect(() => {
        selectedUser(username)
    }, [])
    
    return(
        <div>
            <div className='card-username'>
                <img className='user-icon' src={profile.image.imgUrl}/>
                <p>{ username }</p>
            </div>
            <PostList userPage={true}/>
        </div>
    )
}

export default UserPosts