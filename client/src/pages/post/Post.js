import React, {useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';

const Post = () => {
    const userContext = useContext(UserContext);
    const { currentUserPosts, posts, _id } = userContext;

    useEffect(() => {
        currentUserPosts();
    }, []);
    
    return (
        <div className='post'>
            { posts ? (
                <>
                <div className='post-image'
                style={{
                    width: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '250px',
                    backgroundImage: `url('${currentPost.img.imgUrl}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative',
                    borderTopLeftRadius: '2px',
                    borderTopRightRadius: '2px',                        
                }}  >
                </div>
                <div className='post-content'>
                    <p> date: { posts.dateAdded }</p>
                    <p> description: { posts.description }</p>
                    <span> votes: { posts.votes }</span>
                </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Post;  

