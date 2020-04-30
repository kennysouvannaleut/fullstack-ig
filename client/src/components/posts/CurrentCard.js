import React from 'react';
import {Link} from 'react-router-dom'

const CurrentCard = props => {
    return (
        <div className='current-user-card'>
            <Link to={`/detail/${ props._id }`}>
                <img className='user-post-img' src={ props.img.imgUrl } alt='' />
            </Link>
                <div className='user-post-info'> 
                    <p>{ props.dateAdded }</p>
                    <p className='user-post-description'>{ props.description }</p>
                    <p> Votes: { props.votes }</p>
                </div>
        </div>
    )
};

export default CurrentCard;
