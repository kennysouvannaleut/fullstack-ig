import React, {useState} from 'react'
import CommentForm from './CommentForm.js'

function Comment(props){
    const {comment, commentId, postedBy, deleteComment, user, editComment} = props
    const [toggle, setToggle] = useState(false)

    function toggleEditComment(){
        setToggle(prevToggle => !prevToggle)
    }

    return(
        <div>
            <h3>@{postedBy}</h3>
            {toggle ? 
                <>
                    <CommentForm 
                        addOrEditComment={editComment} 
                        commentBtnText='Save' 
                        postOrCommentId={commentId}
                        toggle={toggleEditComment}
                        prevComment={comment}
                    />
                </>
                :
                <>
                    <p>{comment}</p>
                </>
            }
            {user === postedBy &&
                <>
                    <button onClick={() => deleteComment(commentId)}>X</button>
                    <button onClick={() => toggleEditComment()}>{toggle ? 'Cancel' : 'Edit'}</button>
                </>
            }
        </div>
    )
}

export default Comment