import React, {useState, useContext, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import userContext from '../../context/userContext'
import {deleteImage} from '../../firebase/firebase.js'
import CommentList from '../../components/comments/CommentList.js'
import CommentForm from '../../components/comments/CommentForm.js'

const DetailPage = () => {
    const {postId} = useParams()
    const {
        currentPost, 
        postDetail, 
        getProfile,
        editPost, 
        removePost, 
        comments,
        getComments,
        createComment,
        user,
        user: { username },
        profile
    } = useContext(userContext);
    const {
        imgInfo: {
            imgUrl,
            imgRef
        },
        description, 
        postedBy, 
        dateAdded, 
        votes, 
        _id
    } = currentPost

    const [toggle, setToggle] = useState(false)
    const initEdits = {
        imgInfo: {
            imgUrl,
            imgRef
        },
        user: user,
        description: ''
    };
    const [edits, setEdits] = useState(initEdits)

    useEffect(() => {
        postDetail(postId)
        setEdits({description: description})
        getProfile(user)
        getComments(postId)
    }, [])
    // infinite loop
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
        deleteImage(imgRef)
        removePost(_id)
    }

    return(
        <div className='post-detail'>
            <div className='detail-user'>
                <p>Posted By: </p>
                <Link className='card-username card-title' to={`/user/${ postedBy }`}>
                    {profile.image &&
                        <img className='user-icon' src={profile.image.imgUrl}/>
                    }
                    <p>{ postedBy }</p>
                </Link>
            </div>
            {postedBy === username &&
                <>
                    <button onClick={handleDelete}>Delete Post</button>
                </>
            }
            <p>{dateAdded}</p>
            <img className='detail-image' src={imgUrl} alt='' />
                {/* <div 
                    className='card-image' 
                    style={{
                        width: '50%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        height: '250px',
                        backgroundImage: `url('${ imgUrl }')`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        position: 'center',
                        borderTopLeftRadius: '2px',
                        borderTopRightRadius: '2px'
                }}>
                </div> */}
            {toggle ? 
                <>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={edits.description}/> 
                        <button>Save</button>
                    </form>
                </>
                :
                <p>{description}</p>
            }
            {postedBy === username &&
                <>
                    <button onClick={toggleEdit}>{toggle ? 'Cancel' : 'Edit Description'}</button>
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