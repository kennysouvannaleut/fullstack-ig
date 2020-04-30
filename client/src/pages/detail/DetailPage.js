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
        user: { username },
        comments
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
    // console.log(user)
    // console.log(currentPost)
    const [toggle, setToggle] = useState(false)

    // const initEdits = {
    //     img: {
    //         imgUrl: img.imgUrl && img.imgUrl,
    //         imgRef: img.imgRef && img.imgRef
    //     },
    //     user: user,
    //     description: description
    // };
    console.log(description)
    const [descriptionInput, setDescriptionInput] = useState(description && description)
    // also can't figure out how to get description to fill but doesn't make sense (check console logs)
    console.log(descriptionInput)
    // console.log(edits.img)
    // console.log(img)

    // need to figure out why description isn't filling ^^^
    // ASK SAM about how to set the info before useEffect even gets it...
    // had to change it to pull the object from UserProvider...

    useEffect(() => {
        postDetail(postId)
        getProfile(username)
        getComments(postId)
        // setEdits({
        //     img: {
        //         imgUrl: img && img.imgUrl,
        //         imgRef: img.imgRef
        //     },
        //     user: user,
        //     description: description
        //     })
    }, [])

    const toggleEdit = () => {
        setToggle(!toggle)
    }

    const handleChange = e => {
        const {value} = e.target
        // setEdits(prevEdits => ({
        //     ...prevEdits,
        //     description: value
        // }))
        setDescriptionInput(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editPost(_id, descriptionInput)
        setToggle(!toggle)
    }

    const handleDelete = () => {
        deleteImage(img.imgRef)
        removePost(_id)
    }

    return(
        <div className='post-detail-container'>
            <div className='post-detail'>
                <div className='detail-top-box'>
                    <div className='detail-user'>
                        <Link to={`/user/${ postedBy }`}>
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
                <p className='detail-votes'>Votes: {votes}</p>
                {postedBy === username &&
                    <>
                        <button 
                            className='button detail-description-button' 
                            onClick={toggleEdit}
                        >
                            {toggle ? 'Cancel' : description ? 'Edit Description' : 'Add Description'}
                        </button>
                    </>
                }
                {toggle ? 
                    <>
                        <br/>
                        <form className='detail-description-input' onSubmit={handleSubmit}>
                            <textarea 
                                className='input'
                                onChange={handleChange} 
                                value={descriptionInput.text} 
                                cols={50} 
                                rows={3}
                                maxLength={300}
                            />
                            <button className='button detail-save-description'>Save</button>
                        </form>
                    </>
                    :
                    <p className='detail-description'>{description}</p>
                }
                <div className='comments-box'>
                    <h2 className='comments-title'>Comments</h2>
                    <CommentForm 
                        addOrEditComment={createComment} 
                        commentBtnText='Comment' 
                        postOrCommentId={_id}
                    />
                    <CommentList/>
                </div>
            </div>
        </div>
    )
} 

export default DetailPage