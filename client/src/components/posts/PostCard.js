import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';

const PostCard = props => {
    const { 
        _id,
        user, 
        profile,
        imgInfo: {
            imgUrl,
            imgRef
        }, 
        imgInfo, 
        upvotePost, 
        downvotePost, 
        votes,
        userPage
    } = props;
    const { user: { username } } = useContext(userContext);
    
    return (
        <div className='card'>
            {!userPage &&
                <div>
                    <Link className='card-username' to={`/user/${ user }`}>
                        <img className='user-icon' src={profile.image.imgUrl}/>
                        <p>{ user }</p>
                    </Link>
                </div>
            }
            <Link to={`/detail/${ _id }`}>
                <div 
                    className='card-image' 
                    style={{
                        width: '300px',
                        height: '250px',
                        backgroundImage: `url('${ imgInfo }')`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        position: 'relative',
                        borderTopLeftRadius: '2px',
                        borderTopRightRadius: '2px'
                }}>
                </div>
            </Link>
            <div className='card-info'>
                <div className='card-post-section'>
                    {username !== user &&
                        <>
                            <button onClick={ () => upvotePost(_id) }>Upvote</button>
                            <button onClick={ () => downvotePost(_id) }>Downvote</button>
                        </>
                    }
                        <span> votes: { votes }</span>
                </div>
                <br />
            </div>
        </div>
    );
};

export default PostCard;
