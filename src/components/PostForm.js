import React, { useState } from 'react'
const axios = require('axios')

const PostForm = () => {

    const [post, setPost] = useState("")

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


        axios.post('http://localhost:8080/api/posts/post', {
        
            // need current users id in the database
            // haven't tested this yet, not exactly sure where we'll store the current user id
            creator: JSON.parse(localStorage.getItem('user')).id,
            body: post,
            hashtags: hashtags
        }).then(res => {
            console.log('Post created')
            //Do we need a redirect here? Or will the feed just rerender
            // res.redirect('/')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={handlePost}>
            <label>
            Write a post:
            <input type="text" value={post} onChange={onChangePost} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default PostForm