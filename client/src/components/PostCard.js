import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = props => {
    return (
        <div className='card'>
            <div className='card-info'>
                <div className='card-title'>
                    <Link to={`${props.id}`}>
                        <p>Title: { props.title }</p>
                    </Link>
                </div>
                <div className='card-post-section'>
                    <p>By: { props.user }</p>
                    <p>Description: { props.description }</p>
                    <p>Date: { props.dateAdded }</p>
                    <span>Likes: { props.likes }</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
