import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'

const UserProfile = (props) => {
    const [user, setUser] = useState({})
    setUser(props.user)
    return (
        <div>
            <div>
                {user.username}
            </div>
            <div>
                {user.posts.map((post, index) => {
                    return <Post post={post}/>
                })}
            </div>
            {/* Links to followed, follows, favorites */}
        </div>
    )
}

export default UserProfile