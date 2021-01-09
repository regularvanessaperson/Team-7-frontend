import React, { useState, useEffect } from 'react'

import { getCurrentUser } from '../services/auth.service.js'

import { editPost } from '../services/post.service.js'


const EditPost = (props) => {

    const currentUser = getCurrentUser()
    const [post, setPost] = useState("")

    useEffect(() => {
        setPost(props.post.body)
    }, [])

    const onChangePost = (e) => {
        console.log(props.post._id, post)
        setPost(e.target.value)
    }

    const handlePost = (e) => {

        editPost(props.post._id, post)
    }

    return (
        <div>
            {(currentUser) && (
                <form onSubmit={handlePost}>
                    <label>
                        Edit:
            <input type="text" value={post} onChange={onChangePost} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            )}
        </div>
    )
}

export default EditPost