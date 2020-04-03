import React from 'react';

const Post = props => {
    const { 
        user,
        description, 
        likes,
        dateAdded,
        like,
        dislike,
        _id
     } = props;

     return (
         <div className='post-details'>
             <p>Posted By: { user }</p>
             <p>Description: { description }</p>
             <span>Likes: { likes }</span>
             <p>Date Posted: { dateAdded }</p>
             <button onClick={ () => like(_id) }>Like</button>
            <button onClick={ () => dislike(_id) }>Dislike</button>
         </div>
     );
};

export default Post;