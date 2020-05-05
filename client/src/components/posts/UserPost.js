import React from 'react';
import {Link} from 'react-router-dom'

const UserPost = props => {
    const {_id, img: {imgUrl}, dateAdded, description, votes} = props

    return (
        <div className='user-post'>
            <Link to={`/detail/${ _id }`}>
                <img className='user-post-img' src={ imgUrl } alt='' />
            </Link>
            <div className='user-post-info'> 
                <p>{ dateAdded }</p>
                <p className='user-post-description'>{ description }</p>
                <p> Votes: { votes }</p>
            </div>
        </div>
    )
};

export default UserPost;
