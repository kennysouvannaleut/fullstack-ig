import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = props => {
    const {_id, username, description, imgUrl, dateAdded, upvotePost, downvotePost, votes} = props
    console.log(imgUrl)
    return (
        <div className='card'>
            <div className='card-info'>
                <div className='card-title'>
                    <Link to={`${_id}`}>
                        <p>{ username }</p>
                        <img src={ imgUrl }/>
                    </Link>
                </div>
                <div className='card-post-section'>

                    <p>Description: { description }</p>
                    <p>Date: { dateAdded }</p>
                    <button>Upvote{ upvotePost }</button>
                    <button>Downvote{ downvotePost }</button>
                    <br />
                    <span>Votes: { votes }</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
