import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import userContext from '../../context/userContext'
import PostList from '../../components/posts/PostList.js'
import DefaultAvatar from '../../media/blank-avatar.png'

const UserPosts = () => {
    const {username} = useParams()
    const {selectedUser, getProfile, profile} = useContext(userContext)

    useEffect(() => {
        selectedUser(username)
        getProfile(username)
    }, [])
    
    return(
        <div className='user-post-detail'>
            <div className='card-username'>
                {profile.img ?
                    <img className='detail-icon' alt='' src={profile.img.imgUrl }/> :
                    <img className='detail-icon' alt='' src={DefaultAvatar}/>
                }
                <h3>{ username }</h3>
                {profile.bio && <p className='user-posts-bio'>{profile.bio}</p>}
            </div>
            <PostList userPage={true}/>
        </div>
    )
}

export default UserPosts