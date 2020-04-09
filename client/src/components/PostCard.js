import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = props => {
    console.log('props', props);
    return (
        <div className='card'>
            <div className='card-info'>
                <div className='card-title'>
                    <Link to={`${props._id}`}>
                        <p>{ props.user }</p>
                        <p>{ props.imgUrl }</p>
                    </Link>
                </div>
                <div className='card-post-section'>
                    <p>Description: { props.description }</p>
                    <p>Date: { props.dateAdded }</p>
                    <button>Dislike{ props.dislikePost }</button>
                    <button>Like{ props.likePost }</button>
                    <br />
                    <span>Total:{ props.likes }</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
