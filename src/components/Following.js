import React, {useEffect, useState} from 'react'
import Post from "./Post"
//import getCurrentUser to grab user ID
import { getCurrentUser } from '../services/auth.service.js'
//import service displaying posts from users a user follows
import { viewFollowedPosts } from '../services/post.service.js'
//import spinner
import ButtonSpinner from './common/ButtonSpinner'

const Following = () => {
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const [following, setFollowing] = useState([])
    const [exists, setExists] = useState(true)
    const currentUser = getCurrentUser()
    const id = currentUser.id
    

    useEffect(() => {
        followingPosts()
        setExists(false)
    }, [])


     const followingPosts = () => {
        viewFollowedPosts(id).then(user => {
            let followArray = user.data.followed
            setFollowing(followArray)
            let totalPosts = 0
            followArray.map((follower, index) => {
                totalPosts += follower.posts.length
            })
            setNumberOfPosts(totalPosts)
            return followArray
            
        })
    }
    const followingFeed = following.reverse().map((follower, index) => {
       return follower.posts.map((post, index) => {
            return <Post post={post} />    
        })
        
    })

      return (
        <>
        <div>
            <h1>Following Feed</h1>
        </div>
        <div>
            Feed goes here
            Number of posts: {numberOfPosts}
            {followingFeed}
        </div>
        </>
    )

}

export default Following