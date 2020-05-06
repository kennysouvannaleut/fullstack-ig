import React from 'react';
import {Link} from 'react-router-dom'

const UserPost = props => {
    const {_id, img: {imgUrl}} = props

    return (
        <div className='user-post'>
            <Link to={`/detail/${ _id }`}>
                <img className='user-post-img' src={ imgUrl } alt='' />
            </Link>
        </div>
    )
};

export default UserPost;
