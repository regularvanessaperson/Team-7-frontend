import React from 'react'

//import getCurrentUser to grab user ID
import { getCurrentUser } from '../services/auth.service.js'
//import service displaying posts from users a user follows
import { viewFollowedPosts } from '../services/post.service.js'

const Following = () => {
    let followedPostData

    const user = getCurrentUser()
    console.log(user.id)

    const followingPosts = viewFollowedPosts(user.id)

    async function getPostData() {
        followedPostData = await followingPosts
        console.log(followedPostData.data.followed)
    }

    getPostData()

    /*
    let followingPosts = viewFollowedPosts(user.id)
    console.log(followingPosts)
    console.log(followingPosts)
    */

    return (
        <>
        <div>
            <h1>Following Feed</h1>
        </div>
        </>
    )
}

export default Following