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
    //initialize state for users
    const [users, setUsers] = useState([])
    
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
        let usersFollowedArray =[]
        viewFollowedPosts(user.id)
        .then(res => {
            console.log(res.data)
            console.log(res.data.followed)
            let followedArray = res.data.followed
            followedArray.map(item => postsArray.push(...item.posts))
            followedArray.map(item => usersFollowedArray.push(item))
            console.log(postsArray)
            console.log("usersFollowedArray", usersFollowedArray)
            setData(postsArray)
            setUsers(usersFollowedArray)
        })
        // .then(() =>{
        //     console.log(usersFollowedArray)
            
        //     usersFollowedArray.forEach(item => viewFollowedPosts(item._id)
        //     .then(res => {
        //         console.log("res.data", res.data)
        //         setUsers([res.data])
        //     })
            // )

            
             
        // })
        .then(() => setLoading(false))
    }, [])

    const display = () => {
        if(loading) {
            return <ButtonSpinner />
        } else {
            return (/*data.map((post, index) => (
                <div key={post}>
                    <div className="card-content white-text">
                        <p>{post}</p>
                    </div>
                </div>
            ))
            */
            users.map((user, index) => (
                //for length of user.posts array, print a div for each post that includes the body of the post and the username of the post's author
                user.posts.map(post => {
                    console.log("post", post)
                    return (<div id={post._id}>
                        <p>{post.body}</p>
                        <p>{user.username}</p>
                    </div>)

                })
                /*
                <div>
                    <p>{user.username}</p>
                    <p>{user.posts[0].body}</p>
                </div>
                */
            ))
            
            
        )}
    }

    return (
        <>
        <div>
            <h1>Following Feed</h1>
        </div>
        <div>
            Feed goes here
            Number of posts: {data.length}
            {display()}
        </div>
        </>
    )
}

export default Following