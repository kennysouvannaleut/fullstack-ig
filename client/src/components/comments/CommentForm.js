import React, {useState} from 'react'

function CommentForm(props){
    const {addOrEditComment, postOrCommentId, commentBtnText, toggle, prevComment} = props
    const [comment, setComment] = useState({comment: prevComment || ''})

    function handleChange(e){
        const {value} = e.target
        setComment({comment: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        addOrEditComment(postOrCommentId, comment)
        setComment({comment: ''})
        toggle && toggle()
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type='text' value={comment.comment}/>
                <button className='button'>{commentBtnText}</button>
            </form>
        </div>
    )
}

export default CommentForm
