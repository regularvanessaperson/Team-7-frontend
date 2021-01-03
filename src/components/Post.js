import React, { useState } from 'react'
import { Link } from 'react-router-dom'


//Component imports
import Button from './common/Button'
//import services
import { replyToPost, incrementFavorite, retweetPost } from '../services/post.service.js'

const Post = (props) => {
    console.log(props)
    console.log("props.post", props.post)

    let postInfo = props.post


    return(    
        <div>
           <div>Username: {postInfo.creator[0].username}</div> 
            <div>Body: {postInfo.body}</div>
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

