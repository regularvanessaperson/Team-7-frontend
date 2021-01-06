import React, { useState } from 'react'
import { getCurrentUser } from '../services/auth.service.js'
import {newPost} from '../services/post.service.js'
import { replyToPost } from '../services/post.service'

const PostForm = (props) => {

    const currentUser = getCurrentUser()
    const [post, setPost] = useState("")
    let parentPost = props.parentPost

    const onChangePost = (e) => {
        const postText = e.target.value
        setPost(postText)
    }

    const handlePost = (e) => {
        const hashtags = []
        // splits a post by space
        let postArr = post.split(" ")
        // scans the post for hashtags and pushes into an array that we will send in post request
        postArr.forEach(word => {
            if (word.charAt(0) === '#'){
                hashtags.push(word)
            }
        })
        if(parentPost) {
            replyToPost(currentUser.id, post, hashtags, parentPost)
        }else {
            newPost(currentUser.id, post, hashtags)
        }
    }

    return (
        <div>
        {currentUser && (
            <form onSubmit={handlePost}>
            <label>
            Write a post:
            <input type="text" value={post} onChange={onChangePost} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        
        )}
        </div>
        )
}

export default PostForm