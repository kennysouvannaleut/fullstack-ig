import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';
import DefaultAvatar from '../../media/blank-avatar.png'

const PostCard = props => {
    const { 
        _id,
        // img: {
        //     imgUrl,
        //     imgRef
        // }, ^^ deconstructing throws error...
        img, 
        dateAdded,
        votes,
        postedBy,
        userImg,
        upvotePost, 
        downvotePost, 
        userPage
    } = props;
    const { user: { username } } = useContext(userContext);

    return (
        <div className='card'>
            {!userPage &&
                <div className='card-user'>
                    <div className='card-user-icon-box'>
                        <Link to={`/user/${ postedBy }`}>
                            {userImg ?
                                <img className='card-user-icon' src={userImg} alt=''/> :
                                <img className='card-user-icon' src={DefaultAvatar} alt=''/>
                            }
                        </Link>
                    </div>
                    <Link className='card-username-link' to={`/user/${ postedBy }`}>
                        <p className='card-username'>{ postedBy }</p>
                    </Link>
                </div>
            }
            {!userPage && <p className='card-date'>{dateAdded}</p>}
            <Link to={`/detail/${ _id }`}>
                <img className='card-image' alt='' src={img && img.imgUrl}/>
                {/* this also throws error wtf */}
            </Link>
            <div className='card-info'>
                <div className='card-post-section'>
                    <p className='card-votes'> votes: { votes }</p>
                    {username !== postedBy &&
                        <div className='vote-buttons'>
                            <button className='button' onClick={ () => upvotePost(_id) }>Upvote</button>
                            <button className='button' onClick={ () => downvotePost(_id) }>Downvote</button>
                        </div>
                    }
                    {userPage && <p className='user-detail-date'>{dateAdded}</p>}
                </div>
                <br />
            </div>
        </div>
    );
};

export default PostCard;
