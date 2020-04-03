import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import PostList from '../../components/PostList';

const Post = () => {
    const { username, posts, like, dislike } = useContext(UserContext);

    return (
        <div className='post'>
            <h1>Welcome @{ username }!</h1>
            <h3>User Posts</h3>
            <PostList 
                posts={ posts }
                like={ like }
                dislike={ dislike }
            />
        </div>
    );
};

export default Post;