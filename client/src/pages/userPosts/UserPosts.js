import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import userContext from '../../context/userContext'
import PostList from '../../components/posts/PostList.js'
import DefaultAvatar from '../../media/blank-avatar.png'

const UserPosts = () => {
    const {username} = useParams()
    const {selectedUser, getProfile, profile, posts} = useContext(userContext)

    useEffect(() => {
        selectedUser(username)
        getProfile(username)
    }, [])

    return(
        <div className='user-detail'>
            <div className='user-detail-info'>
                {profile.img ?
                    <img className='user-detail-icon' alt='' src={profile.img.imgUrl }/> :
                    <img className='user-detail-icon' alt='' src={DefaultAvatar}/>
                }
                <div className='user-detail-text'>
                    <h2>{ username }</h2>
                    <p className='user-detail-post-num'>
                        <b>{posts.length}</b> post{(posts.length > 1 || posts.length === 0) && 's'}
                    </p>
                    {profile.bio && <p className='user-posts-bio'>{profile.bio}</p>}
                </div>
            </div>
            <PostList userPage={true}/>
        </div>
    )
}

export default UserPosts