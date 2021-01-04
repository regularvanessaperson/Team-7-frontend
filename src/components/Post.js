import React, { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/auth.service.js'
import { Link } from 'react-router-dom'


//Component imports
import Button from './common/Button'
import EditPost from './EditPost'
//import services
import { deletePost,replyToPost, incrementFavorite, decreaseFavorite, retweetPost, unretweetPost } from '../services/post.service.js'
import { getUserProfile } from '../services/user.service.js'


const Post = (props) => {

    const [follows, setFollows] = useState(null)
    const [exists, setExists] = useState(true)
    const [favorites, setFavorites] = useState(0)
    const [userFave, setUserFave] = useState(false)
    const [edit, setEdit] = useState(false)
    const [retweeted, setRetweeted] = useState(false)
    const [reposter, setReposter] = useState("")

    const currentUser = getCurrentUser()
    let postInfo = props.post
    let favoritesComponent = props.favoritesComponent

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
        if (postInfo.repostedBy.includes(currentUser.id)){
            setRetweeted(true)
            getUserProfile(postInfo.repostedBy[0]).then(response => {
                // console.log(user)
                let user = response.data
                setReposter(user.username)
                console.log(user.username, reposter)
            })
        } else {
            setRetweeted(false)
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

    const retweet = () => {
        retweetPost(currentUser.id, postInfo.body, currentUser.id, postInfo.hashtags, postInfo._id)
        setReposter(currentUser.username)
        setRetweeted(true)
    }

    const unretweet = () => {
        unretweetPost(currentUser.id, postInfo.parentPost, postInfo._id)
        setRetweeted(false)
    }

    const favorite = () => {
        incrementFavorite(postInfo._id, currentUser.id)
        let currentFav = favorites
        setUserFave(true)
        setFavorites(currentFav + 1)
        if(favoritesComponent){
            setExists(false)
        }
    }

    const unfavorite = () => {
        decreaseFavorite(postInfo._id, currentUser.id)
        let currentFav = favorites
        setUserFave(false)
        setFavorites(currentFav - 1)
        if(favoritesComponent){
            setExists(false)
        }
    }

    let urlId = '/userProfile/' + postInfo.creator[0]._id
    




    return(  
        <div>

            {edit && (
                <EditPost post={postInfo} />
            )}

            {exists && (
                <div>
                    {retweeted && (
                    <div>Retweeted by: {reposter}</div>
                    )}

                    <Link to={urlId}>{postInfo.creator[0].username}</Link>
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

                    {retweeted && (
                        <Button label="Un-retweet" handleClick={unretweet}/>
                    )}

                    {!retweeted && (
                        <Button label="Retweet" handleClick={retweet} />
                    )}
                </div>)}
        </div>
        )   
}

export default Post

