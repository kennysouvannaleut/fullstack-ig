import React, { useEffect, useContext } from 'react';
import PostList from '../../components/posts/PostList';
import userContext from '../../context/userContext';


const Home = () => {
    const {getProfile} = useContext(userContext)
    
    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className='home'>
            <PostList />
        </div>
    );
};

export default Home;
