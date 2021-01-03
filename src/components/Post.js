import React, { useState } from 'react'
import { getCurrentUser } from '../services/auth.service.js'
import { Link } from 'react-router-dom'


//Component imports
import Button from './common/Button'
//import services
import { deletePost,replyToPost, incrementFavorite, retweetPost } from '../services/post.service.js'

const Post = (props) => {
    console.log(props)
    
    const currentUser = getCurrentUser()
    console.log(currentUser.id)
    let postInfo = props.post
    console.log("postInfo.creator[0]._id", postInfo.creator[0]._id)
    // const sameUserAsPost = postInfo.creator[0]._id === currentUser.id
  
    return(   

            <div>
                
                {(postInfo.creator[0]._id === currentUser.id) ? (
                    <div>
                    <div>Username: {postInfo.creator[0].username}</div>
                    <div>Body: {postInfo.body}</div>
                    <Button label="Delete" handleClick={() => deletePost(postInfo._id)} />
                    </div>
                ) : (<div>
                    <div>Username: {postInfo.creator[0].username}</div>
                    <div>Body: {postInfo.body}</div>
                    <Button label="Follow" />
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

