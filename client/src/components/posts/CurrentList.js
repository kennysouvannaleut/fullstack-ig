import React, { useEffect, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import CurrentCard from './CurrentCard';
import userContext from '../../context/userContext';

const CurrentList = () => {
    const { loading, data } = useFetch(`/api/posts/current-user`);
    
    const {posts} = useContext(userContext)
    // ask sam about this too ^^ this use effect happens before post is added to database. need context so that this page updates on state change?
    useEffect(() => {

    }, [posts, data])

    return (
        <div className='current-user-posts-page'>
            {/* <h2>My recent posts</h2> */}
            { loading && <div className='loader' /> }
            { data && <h3 className='current-user-title'> You have { data.length } post{data.length > 1 && 's'}! </h3> }
                <div className='user-post-list'>
                    { data && data.length > 0 
                    && data.map((post, i) => {
                        return (
                        <CurrentCard 
                            { ...post } 
                            key={ i } 
                        /> )}
                    )}
                </div>
        </div>
    );
};

export default CurrentList;