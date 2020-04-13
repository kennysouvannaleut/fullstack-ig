import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import { useParams } from 'react-router-dom';

const Post = () => {
    const userContext = useContext(UserContext);
    const { postDetail, currentPost } = userContext;
    
    let { postId } = useParams();

    useEffect(() => {
        postDetail(postId);
    }, []);

    // const currentPostCB = React.useCallback(() => {}, []);

    console.log(currentPost);
    
    return (
        <div className='post'>
            { currentPost ? (
                <>
                <div className='post-image'
                style={{
                    width: '250%',
                    height: '300px',
                    backgroundImage: `url('${currentPost.imgUrl}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative',
                    borderTopLeftRadius: '2px',
                    borderTopRightRadius: '2px',                        
                }}  >
                </div>
                <div className='post-content'>
                    <p> date: { currentPost.dateAdded }</p>
                    <p> description: { currentPost.description }</p>
                    <p> postedBy: { currentPost.postedBy }</p>
                    <span> votes: { currentPost.votes }</span>
                </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Post;  

