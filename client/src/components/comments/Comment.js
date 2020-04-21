import React, {useState} from 'react'
import CommentForm from './CommentForm.js'
import DefaultAvatar from '../../media/blank-avatar.png'

function Comment(props){
    const {comment, commentId, postedBy, userImg, removeComment, user, editComment} = props
    const [toggle, setToggle] = useState(false)

    function toggleEditComment(){
        setToggle(prevToggle => !prevToggle)
    }

    return(
        <div>
            <h3>{postedBy}</h3>
            {userImg ?
                <img className='comment-icon' src={userImg} alt=''/> :
                <img className='comment-icon' src={DefaultAvatar}/>
            }
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
                    <button onClick={() => removeComment(commentId)}>X</button>
                    <button onClick={() => toggleEditComment()}>{toggle ? 'Cancel' : 'Edit'}</button>
                </>
            }
        </div>
    )
}

export default Comment
