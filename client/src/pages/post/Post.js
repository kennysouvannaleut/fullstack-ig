import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';

const Post = () => {
    const userContext = useContext(UserContext);
    const { currentUserPosts, currentPost } = userContext;

    useEffect(() => {
        currentUserPosts();
    }, []);

    console.log(currentPost);
    
    return (
        <div className='post'>
            { currentPost ? (
                <>
                <div className='post-image'
                style={{
                    width: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '250px',
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

