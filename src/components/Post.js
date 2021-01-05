import React, { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/auth.service.js'
import { Link } from 'react-router-dom'


//Component imports
import Button from './common/Button'
import EditPost from './EditPost'
//import services
import { deletePost, replyToPost, incrementFavorite, decreaseFavorite, retweetPost, unretweetPost } from '../services/post.service.js'
import { getUserProfile } from '../services/user.service.js'


const Post = (props) => {

    const [follows, setFollows] = useState(null)
    const [exists, setExists] = useState(true)
    const [favorites, setFavorites] = useState(0)
    const [userFave, setUserFave] = useState(false)
    const [edit, setEdit] = useState(false)
    //stores original posters username to display above body
    const [original, setOriginal] = useState(null)
    // checks to see if the post has been retweeted by current user
    const [retweeted, setRetweeted] = useState(false)
    // stores if a post is a repost
    const [repost, setRepost] = useState(false)
    // Number of retweets a post has
    const [numretweet, setNumretweet] = useState(0)

    const currentUser = getCurrentUser()
    let postInfo = props.post
    let favoritesComponent = props.favoritesComponent

    useEffect(() => {
        if (currentUser && postInfo.creator[0].followers && postInfo.creator[0].followers.includes(currentUser.id)) {
            setFollows(true)
        } else {
            setFollows(false)
        }
        if (currentUser && postInfo.favoritedBy.includes(currentUser.id)) {
            setUserFave(true)
        } else {
            setUserFave(false)
        }
        if (currentUser && postInfo.repostedBy.includes(currentUser.id)) {
            setRetweeted(true)
        }
        else {
            setRetweeted(false)
        }
        if (currentUser && postInfo.isRepost) {
            setOriginal(postInfo.originalCreator)
            setRepost(true)
        }
        let retweets = postInfo.repostedBy.length
        setNumretweet(retweets)
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

    const retweet = async () => {
        await retweetPost(currentUser.id, postInfo.body, postInfo.hashtags, postInfo._id, postInfo.creator[0].username)
        setNumretweet(numretweet + 1)
        setRetweeted(true)
        // props.rerenderHome()
    }

    const unretweet = async () => {
        await unretweetPost(currentUser.id, postInfo.parentPost, postInfo._id)
        setNumretweet(numretweet - 1)
        setRepost(false)
        // props.rerenderHome()
        setExists(false)
    }

    const favorite = () => {
        incrementFavorite(postInfo._id, currentUser.id)
        let currentFav = favorites
        setUserFave(true)
        setFavorites(currentFav + 1)
        if (favoritesComponent) {
            setExists(false)
        }
    }

    const unfavorite = () => {
        decreaseFavorite(postInfo._id, currentUser.id)
        let currentFav = favorites
        setUserFave(false)
        setFavorites(currentFav - 1)
        if (favoritesComponent) {
            setExists(false)
        }
    }

    let urlId = '/userProfile/' + postInfo.creator[0]._id






    return (
        <div>

            {edit && (
                <EditPost post={postInfo} />
            )}

            {exists && (
                <div>
                    {original && (
                        <div>Original by: {original}</div>
                    )}

                    <Link to={urlId}>{postInfo.creator[0].username}</Link>
                    <div>Body: {postInfo.body}</div>

                    {(currentUser && postInfo.creator[0]._id === currentUser.id) && (
                        <div>
                            {original && (
                                <Button label="Un-retweet" handleClick={unretweet} />
                            )}
                            {!original && (
                                <div>
                                    <Button label="Delete" handleClick={deletePage} />
                                    <Button label="Edit" handleClick={editPost} />
                                </div>
                            )}
                        </div>
                    )}
                    {(currentUser) &&
                        <div>
                            {!userFave && (
                                <Button label="Favorite" handleClick={favorite} />
                            )}

                            {userFave && (
                                <Button label="Unfavorite" handleClick={unfavorite} />
                            )}

                            {retweeted && (
                                <Button label="Un-retweet" handleClick={unretweet} />
                            )}

                            {!retweeted && (
                                <Button label="Retweet" handleClick={retweet} />
                            )}
                        </div>
                    }
                   
                    <div>
                        favorites: {favorites}
                       {retweeted && (
                        <div>Retweets: {numretweet}</div>
                    )}
                    </div>
                    
                    
                </div>)}
                
                <Link to={{
                        pathname: `/reply/${postInfo._id}`,
                        state: postInfo._id
                    }} className="nav-link">{postInfo.replies.length} Replies</Link>
                    

        </div>
    )
}

export default Post

