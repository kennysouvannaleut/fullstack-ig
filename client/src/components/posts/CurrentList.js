import React from 'react';
import useFetch from '../../hooks/useFetch';
import CurrentCard from './CurrentCard';

const CurrentList = () => {
    const { loading, data } = useFetch(`/api/posts/current-user`);

    return (
        <div className='current-user-post'>
            {/* <h2>My recent posts</h2> */}
            { loading && <div className='loader' /> }
            { data && <h3> You have { data.length } posts! </h3> }
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
