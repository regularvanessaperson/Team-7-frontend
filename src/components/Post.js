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
    const [favorites, setFavorites] = useState(0)

    const currentUser = getCurrentUser()
    let postInfo = props.post
    console.log(postInfo)

    useEffect(() => {
        if (postInfo.creator[0].followers.includes(currentUser.id)){
            setFollows(true)
        } else {
            setFollows(false)
        }
    }, [])

    const deletePage = () => {
        deletePost(postInfo._id)
        setExists(false)
    }

    const favorite = () => {
        incrementFavorite(postInfo._id)
        let currentFav = favorites
        setFavorites(currentFav + 1)
    }

    
    let urlId = '/userProfile/' + postInfo.creator[0]._id

    return(  
        <div>
        {exists && (
            <div>
                <Link to={urlId}>{postInfo.creator[0].username}</Link>
                {/* <div>Username: {postInfo.creator[0].username}</div> */}
                <div>Body: {postInfo.body}</div>
                
                {(postInfo.creator[0]._id === currentUser.id) && (
                    <Button label="Delete" handleClick={deletePage} />
                )}
                <div>
                favorites: {favorites}
                </div>
                <Button label="Favorite" handleClick={favorite} />
                
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

