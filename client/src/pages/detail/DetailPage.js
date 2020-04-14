import React, {useState, useContext, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import userContext from '../../context/userContext'
import {deleteImage} from '../../firebase/firebase.js'

const DetailPage = () => {
    const {postId} = useParams()
    const {
        currentPost, 
        postDetail, 
        editPost, 
        removePost, 
        user, 
        user: { username }
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
    }, [description])
    
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
            <h3>Posted By: <Link to={`/user/${postedBy}`}>{postedBy}</Link></h3>
            {postedBy === username &&
                <>
                    <button onClick={handleDelete}>Delete Post</button>
                </>
            }
            <p>{dateAdded}</p>
            {/* <img className='detail-image' src={imgUrl} alt='' /> */}
                <div 
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
                </div>
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
        </div>
    )
} 

export default DetailPage