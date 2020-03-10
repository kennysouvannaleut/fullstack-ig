import React from 'react';

const PostDetails = props => {
    const { 
        imgURL, 
        description, 
        likes
     } = props;

     return (
         <div className='post-details'>
             <a href='true'>Image URL: { imgURL }</a>
             <p>Description: { description }</p>
             <p>Likes { likes }</p>
         </div>
     );
};

export default PostDetails;