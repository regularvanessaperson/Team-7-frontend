import React, { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/auth.service.js'
import { Link } from 'react-router-dom'


//Component imports
import Button from './common/Button'
import EditPost from './EditPost'
//import services
import { deletePost,replyToPost, incrementFavorite, decreaseFavorite, retweetPost } from '../services/post.service.js'
import { followUser, unfollowUser } from '../services/user.service.js'


const Post = (props) => {

    const [follows, setFollows] = useState(null)
    const [exists, setExists] = useState(true)
    const [favorites, setFavorites] = useState(0)
    const [userFave, setUserFave] = useState(false)
    const [edit, setEdit] = useState(false)

    const currentUser = getCurrentUser()
    let postInfo = props.post

    useEffect(() => {
        if (currentUser && postInfo.creator[0].followers.includes(currentUser.id)){
            setFollows(true)
        } else {
            setFollows(false)
        }
        if (postInfo.favoritedBy.includes(currentUser.id)){
            setUserFave(true)
        } else {
            setUserFave(false)
        }

        let numFaves = postInfo.favorites
        setFavorites(numFaves)

    }, [])

    const editPost = () => {
        setEdit(true)
        setExists(false)
    }

    const deletePage = () => {
        deletePost(postInfo._id)
        setExists(false)
    }

    const favorite = () => {
        incrementFavorite(postInfo._id, currentUser.id)
        let currentFav = favorites
        setUserFave(true)
        setFavorites(currentFav + 1)
        setExists(false)
    }

    const unfavorite = () => {
        decreaseFavorite(postInfo._id, currentUser.id)
        let currentFav = favorites
        setUserFave(false)
        setFavorites(currentFav - 1)
        setExists(false)
    }
    
    let urlId = '/userProfile/' + postInfo.creator[0]._id




    return(  
        <div>

        {edit && (
            <EditPost post={postInfo} />
        )}

        {exists && (
            <div>
                <Link to={urlId}>{postInfo.creator[0].username}</Link>
                {/* <div>Username: {postInfo.creator[0].username}</div> */}
                <div>Body: {postInfo.body}</div>
                
                {(currentUser && postInfo.creator[0]._id === currentUser.id) && (
                    <div>
                    <Button label="Delete" handleClick={deletePage} />
                    <Button label="Edit" handleClick={editPost} />
                    </div>
                )}
                <div>
                favorites: {favorites}
                </div>

                {!userFave && (
                        <Button label="Favorite" handleClick={favorite}/>
                    )}

                {userFave && (
                    <Button label="Unfavorite" handleClick={unfavorite}/>
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

