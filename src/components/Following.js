import React from 'react'

//import getCurrentUser to grab user ID
import { getCurrentUser } from '../services/auth.service.js'
//import service displaying posts from users a user follows
import { viewFollowedPosts } from '../services/post.service.js'

const Following = () => {

    let user = getCurrentUser()
    console.log(user.id)


    return (
        <>
        <div>
            <h1>Following Feed</h1>
        </div>
        </>
    )
}

export default Following