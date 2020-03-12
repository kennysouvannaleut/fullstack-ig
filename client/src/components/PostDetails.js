import React from 'react';

const PostDetails = props => {
    const { 
        user,
        description, 
        likes,
        dateAdded
     } = props;

     return (
         <div className='post-details'>
             <p>Posted By: { user }</p>
             <p>Description: { description }</p>
             <span>Likes: { likes }</span>
             <p>Date Posted: { dateAdded }</p>
         </div>
     );
};

export default PostDetails;