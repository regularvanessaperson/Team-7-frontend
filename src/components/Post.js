import React, { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/auth.service.js'
import { Link } from 'react-router-dom'


//Component imports
import Button from './common/Button'
//import services
import { deletePost,replyToPost, incrementFavorite, retweetPost } from '../services/post.service.js'
import { followUser, unfollowUser } from '../services/user.service.js'


const Post = (props) => {

    const [follows, setFollows] = useState(null)
    const [exists, setExists] = useState(true)

    const currentUser = getCurrentUser()
    let postInfo = props.post

    useEffect(() => {
        console.log(postInfo.creator[0], currentUser)
        if (postInfo.creator[0].followers.includes(currentUser.id)){
            setFollows(true)
            console.log(follows)
        } else {
            setFollows(false)
        }
    }, [])

    const follow = () => {
        followUser(currentUser.id, postInfo.creator[0]._id)
        setFollows(true)
    }

    const unfollow = () => {
        unfollowUser(currentUser.id, postInfo.creator[0]._id)
        setFollows(false)
    }

    const deletePage = () => {
        deletePost(postInfo._id)
        setExists(false)
    }
    
    if (follows === null){
        return null
    }

    return(  
        <div>
        {exists && (
            <div>
                <div>Username: {postInfo.creator[0].username}</div>
                <div>Body: {postInfo.body}</div>
                
                {(postInfo.creator[0]._id === currentUser.id) && (
                    <Button label="Delete" handleClick={deletePage} />
                )}

                {!follows && (
                    <Button label="Follow" handleClick={follow}/>
                )}

                {follows && (
                    <Button label="Unfollow" handleClick={unfollow}/>
                )}
                
            </div>
        )}
        </div> 
    )


    // //helper functions
    // return (
    // <div>
    // {/* determine how to render post based on booleans */}
    // {post.isRepost && (
    //     <span>Repost from {post.parentPost.creator}</span>
    // )}

    // {post.isReply && (
    //     <span>Replied to {post.parentPost.creator}</span>
    // )}

    // {/*Link to view author profile */}
    // {/* <Link to={`/profile/${props.creator.username}`}>{props.creator.username}</Link> */}

    // {/* Post body */}
    // <p>{props.body}</p>

    // {/* button for favorite */}
    //     <Button label='Favorite' handleClick={incrementFavorite}/>

    // {/* reply form */}
    // {/* <form onSubmit={replyToPost}>
    //     <label>
    //       Reply
    //       <input type="text" value={this.state.value} onChange={this.handleReplyChange} />
    //     </label>
    //     <input type="submit" value="Reply" />
    // </form> */}

    // {/* button for repost */}
    //     <Button label='Repost' handleClick={retweetPost}/>

    // </div>
}

export default Post

