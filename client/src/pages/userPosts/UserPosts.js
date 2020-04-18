import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import userContext from '../../context/userContext'
import PostList from '../../components/posts/PostList.js'

const UserPosts = () => {
    const {username} = useParams()
    const {selectedUser, getProfile, profile} = useContext(userContext)

    useEffect(() => {
        selectedUser(username)
        getProfile(username)
    }, [])
    
    return(
        <div>
            <div className='card-username'>
                {profile.img &&
                    <img className='user-icon' alt = '' src={profile.img.imgUrl }/>}
                <h3>{ username }</h3>
                {profile.bio && 
                        <p className='user-posts-bio'>{profile.bio}</p>}
            </div>
            <PostList userPage={true}/>
        </div>
    )
}

export default UserPosts