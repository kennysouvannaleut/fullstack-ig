import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = props => {
    const {_id, user, description, imgUrl, dateAdded, upvotePost, downvotePost, votes} = props

    return (
        <div className='card'>
            <div className='card-info'>
                <div className='card-title'>
                    <Link to={`${_id}`}>
                        <p>{ user }</p>
                        <img className='image' src={ imgUrl }/>
                    </Link>
                </div>
                <div className='card-post-section'>

                    <p>Description: { description }</p>
                    <p>Date: { dateAdded }</p>
                    <button onClick={() => upvotePost(_id)}>Upvote</button>
                    <button onClick={() => downvotePost(_id)}>Downvote</button>
                    <br />
                    <span>Votes: { votes }</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
