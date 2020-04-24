import React, {useState, useContext, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import userContext from '../../context/userContext'
import {deleteImage} from '../../firebase/firebase.js'
import CommentList from '../../components/comments/CommentList.js'
import CommentForm from '../../components/comments/CommentForm.js'
import DefaultAvatar from '../../media/blank-avatar.png'

const DetailPage = () => {
    const {postId} = useParams()
    const {
        currentPost, 
        postDetail, 
        getProfile,
        editPost, 
        removePost, 
        getComments,
        createComment,
        user,
        user: { username }
    } = useContext(userContext);
    const {
        // img: {
        //     imgUrl,
        //     imgRef
        // }, ^^ destructuring throws error
        img,
        userImg,
        description, 
        postedBy, 
        dateAdded, 
        votes, 
        _id
    } = currentPost

    const [toggle, setToggle] = useState(false)
    const initEdits = {
        img: {
            imgUrl: img.imgUrl,
            imgRef: img.imgRef
        },
        user: user,
        description: ''
    };
    const [edits, setEdits] = useState(initEdits)

    useEffect(() => {
        postDetail(postId)
        setEdits({description: description})
        getProfile(username)
        getComments(postId)
    }, [])
        const toggleEdit = () => {
        setToggle(!toggle)
    }

    const handleChange = (e) => {
        const {value} = e.target
        setEdits(prevEdits => ({
            ...prevEdits,
            description: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editPost(_id, edits)
        setToggle(!toggle)
    }

    const handleDelete = () => {
        deleteImage(img.imgRef)
        removePost(_id)
    }

    return(
        <div className='post-detail'>
            <div className='detail-info'>
                <div className='detail-user'>
                    <Link className='detail-icon-box' to={`/user/${ postedBy }`}>
                        {userImg ?
                            <img className='detail-icon' alt='' src={userImg}/> :
                            <img className='detail-icon' alt='' src={DefaultAvatar}/>}
                    </Link>
                    <Link className='detail-username' to={`/user/${ postedBy }`}>
                        <p>{ postedBy }</p>
                    </Link>
                </div>
            {postedBy === username &&
                <>
                    <button className='delete-button button' onClick={handleDelete}>Delete Post</button>
                </>
            }
            </div>
            <p className='detail-date'>{dateAdded}</p>
            <img className='detail-image' src={img.imgUrl} alt='' />
            {toggle ? 
                <>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={edits.description}/> 
                        <button className='button'>Save</button>
                    </form>
                </>
                :
                <p>{description}</p>
            }
            {postedBy === username &&
                <>
                    <button className='button' onClick={toggleEdit}>{toggle ? 'Cancel' : 'Edit Description'}</button>
                </>
            }
            <p>Votes: {votes}</p>
            <h2>Comments</h2>
            <CommentForm 
                addOrEditComment={createComment} 
                commentBtnText='Comment' 
                postOrCommentId={_id}
                // toggle={toggleEditComment}
                // prevComment={comment}
            />
            <CommentList />
        </div>
    )
} 

export default DetailPage