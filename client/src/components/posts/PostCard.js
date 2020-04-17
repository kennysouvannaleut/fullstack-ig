import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';

const PostCard = props => {
    const { 
        _id,
        // img: {
        //     imgUrl,
        //     imgRef
        // }, ^^ deconstructing throws error...
        img, 
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
                <div>
                    <Link className='card-username' to={`/user/${ postedBy }`}>
                        {userImg &&
                            <img className='user-icon' src={userImg}/>
                        }
                        <p>{ postedBy }</p>
                    </Link>
                </div>
            }
            <Link to={`/detail/${ _id }`}>
                {/* <div 
                    className='card-image' 
                    style={{
                        width: '300px',
                        height: '250px',
                        backgroundImage: `url('${ img }')`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        position: 'relative',
                        borderTopLeftRadius: '2px',
                        borderTopRightRadius: '2px'
                }}>
                </div> */}
                <img className='card-image' src={img.imgUrl}/>
                {/* this also throws error wtf */}
            </Link>
            <div className='card-info'>
                <div className='card-post-section'>
                    {username !== postedBy &&
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
