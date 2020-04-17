import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';

const PostCard = props => {
    const { 
        _id,
        user, 
        getProfile,
        profile,
        // imgInfo: {
        //     imgUrl,
        //     imgRef
        // }, ^^ deconstructing throws error...
        imgInfo, 
        userImg,
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
                        {userImg &&
                            <img className='user-icon' src={userImg}/>
                        }
                        <p>{ user }</p>
                    </Link>
                </div>
            }
            <Link to={`/detail/${ _id }`}>
                {/* <div 
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
                </div> */}
                <img className='card-image' src={imgInfo.imgUrl}/>
                {/* this also throws error wtf */}
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
