import React, { useState, useEffect } from 'react'


import Post from "./Post"
import PostForm from "./PostForm"
import { getCurrentUser } from '../services/auth.service'
import { viewOnePost } from '../services/post.service'
import { useParams } from "react-router";


const Reply = () => {
    const { idx } = useParams()
    const [mainPostUser, setMainPostUser] = useState("")
    const [mainPost, setMainPost] = useState([])
    const [repliesArray, setRepliesArray] = useState([])
    const currentUser = getCurrentUser("")



    const getParentPost = () => {
        viewOnePost(idx)
            .then((response) => {
                const parentPost = response.data.map(post => {
                    const parentUser = getCurrentUser(post.creator)
                    setMainPostUser(parentUser)
                    return <Post key={post._id} post={post} />
                })

                setMainPost(parentPost)

            })

    }

    const getRepliesArray = () => {
        viewOnePost(idx)
            .then((response) => {
                console.log("reply response", response)
                // setMainPost(response.data[0]._id)
                const userReplies = response.data[0].replies.reverse().map((reply, index) => {
                    console.log("reply", reply)

                    return <Post key={reply._id} post={reply} />
                })
                setRepliesArray(userReplies)
            })
    }

    useEffect(() => {
        getRepliesArray()
        getParentPost()

    }, [])


    return (
        <div>

            <div>
                <h2 className="center-top">Main Post</h2>
                {mainPost}
            </div>
            <PostForm parentPost={idx} />
            <div>
                <h2 className="center-top">Replies</h2>

                {repliesArray}
            </div>


        </div>
    )
}

export default Reply