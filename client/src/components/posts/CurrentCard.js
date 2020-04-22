import React from 'react';

const CurrentCard = props => {
    return (
        <div className='card'>
            <img className='user-post-img' src={ props.img.imgUrl } alt='' />
                <div className='user-post'> 
                    <p>{ props.dateAdded }</p>
                    <p>{ props.description }</p>
                    <p> Votes: { props.votes }</p>
                </div>
        </div>
    )
};

export default CurrentCard;
