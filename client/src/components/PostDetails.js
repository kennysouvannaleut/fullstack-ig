import React from 'react';

const PostDetails = props => {
    const { 
        postDate, 
        postTitle, 
        postDescription, 
        postURL 
     } = props;

     return (
         <div className='post-details'>
             <h3>Post Date: { postDate }</h3>
             <h2>Title: { postTitle }</h2>
             <p>Description: { postDescription }</p>
             <p>URL: { postURL }</p>
         </div>
     );
};

export default PostDetails;