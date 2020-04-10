import React, {useContext} from 'react'
import Comment from './Comment.js'
import {UserContext} from '../context/UserProvider.js'

function CommentList(){
    const {comments, removeComment, user: {username}, editComment} = useContext(UserContext)

    return(
        <div>
            {comments.map(comment => 
                <Comment 
                    {...comment} 
                    key={comment._id}
                    commentId={comment._id}
                    removeComment={removeComment}
                    user={username}
                    editComment={editComment}
                />
            )}
        </div>
    )
}

export default CommentList