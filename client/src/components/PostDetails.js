import React from 'react';
import Button from '../components/Button';

const PostDetails = props => {
    const { 
        imgURL, 
        description, 
        likes
     } = props;

     return (
         <div className='post-details'>
             <img src={ imgURL } alt={ imgURL } width='250px' />
             <p>Description: { description }</p>
                <Button />
             <span>Likes: { likes }</span>
         </div>
     );
};

export default PostDetails;