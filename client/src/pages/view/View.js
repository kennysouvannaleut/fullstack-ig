import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import PostList from '../../components/PostList';
import Button from '../../components/Button'

const View = () => {
    const { posts } = useContext(UserContext);

    return (
        <div className='view'>
            <h1>Welcome! @ {}</h1>
            <h3>User Posts</h3>
            <PostList 
                posts={ posts }
            />
            <Button />
        </div>
    );
};

export default View;