import React, {useState} from 'react'
import {Link} from 'react-router-dom'
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
            {user === postedBy &&
                <div className='comment-buttons'>
                    <button className='button' onClick={() => toggleEditComment()}>{toggle ? 'Cancel' : 'Edit'}</button>
                    {!toggle && <button className='button' onClick={() => removeComment(commentId)}>X</button>}
                </div>
            }
            <div className='comment'>
                <div className='comment-user'>
                    <Link className='comment-icon-link' to={`/user/${ postedBy }`}>
                        {userImg ?
                            <img className='comment-icon' src={userImg} alt=''/> :
                            <img className='comment-icon' src={DefaultAvatar} alt='' />
                        }
                    </Link>
                    <Link className='comment-username-link' to={`/user/${ postedBy }`}>
                        <p><b>{postedBy}</b></p>
                    </Link>
                </div>
                {toggle ? 
                    <>
                        <CommentForm 
                            addOrEditComment={editComment} 
                            commentBtnText='Save' 
                            btnType='comment-save-button'
                            postOrCommentId={commentId}
                            toggle={toggleEditComment}
                            prevComment={comment}
                            formType='edit-comment-input'
                        />
                    </>
                    :
                    <>
                        <p>{comment}</p>
                    </>
                }
            </div>
        </div>
    )
}

export default Comment
