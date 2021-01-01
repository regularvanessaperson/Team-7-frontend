import React, {useEffect, useState} from 'react'

//import getCurrentUser to grab user ID
import { getCurrentUser } from '../services/auth.service.js'
//import service displaying posts from users a user follows
import { viewFollowedPosts } from '../services/post.service.js'
//import spinner
import ButtonSpinner from './common/ButtonSpinner'

const Following = () => {
    //initialize state for fetching data
    const [data, setData] = useState([])
    // initialize state for loader
    const [loading, setLoading] = useState(true)

    
    //let followedPostData

    const user = getCurrentUser()
    console.log(user.id)
    /*
    const followingPosts = viewFollowedPosts(user.id)

    async function getPostData() {
        followedPostData = await followingPosts
        console.log(followedPostData.data.followed)
    }

    getPostData()
    console.log(followedPostData)
    */

    useEffect(() => {
        let postsArray = []
        viewFollowedPosts(user.id)
        .then(res => {
            console.log(res.data)
            console.log(res.data.followed)
            let followedArray = res.data.followed
            followedArray.map(item => postsArray.push(...item.posts))
            console.log(postsArray)
            setData(postsArray)
        })
        .then(() => setLoading(false))
    }, [])

    const display = () => {
        if(loading) {
            return <ButtonSpinner />
        } else {
            return data.map((post, index) => (
                <div key={post}>
                    <div className="card-content white-text">
                        <p>{post}</p>
                    </div>
                </div>
            ))
        }
    }

    return (
        <>
        <div>
            <h1>Following Feed</h1>
        </div>
        <div>
            Feed goes here
            {display()}
        </div>
        </>
    )
}

export default Following