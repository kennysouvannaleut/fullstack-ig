import React from 'react';
// import Button from '../components/Button';

const PostDetails = props => {
    const { 
        // image,
        description, 
        // likes,
        user,
        dateAdded
     } = props;

     return (
         <div className='post-details'>
             <p>Date: { dateAdded }</p>
             <p>Posted By: { user }</p>
             {/* <img src={ imgURL } alt={ imgURL } width='250px' /> */}
             <p>Description: { description }</p>
                {/* <Button /> */}
             {/* <span>Likes: { likes }</span> */}
         </div>
     );
};

export default PostDetails;