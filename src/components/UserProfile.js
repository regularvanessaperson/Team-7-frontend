import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//Helper
import { getUserProfile } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'
import Post from './Post'

const UserProfile = () => {
    const currentUser = getCurrentUser("")
    const [profile, setProfile] = useState([])
    const id = currentUser.id
    console.log("current user status", currentUser.id)
    console.log("getuserprofile", getUserProfile(id))

    useEffect(() => {
        userProfile()
    }, [])

    async function  userProfile() {
        return await getUserProfile(id).then(user => {
            console.log("the object", user.data)
            const userInfo = user.data
            // setProfile(userInfo)
            return (
                <div>
                    <div>
                        {userInfo.username}
                      <div><Link to={"/favorites"} className="nav-link">Favorites</Link></div>  
                      <div><Link to={"/following"} className="nav-link">Following</Link></div>
                    </div>
                    <div>
                    This user follows:
                    {userInfo.followed.map((followed, index) => {
                        if (followed.length === 0){
                            return <div>You are not following anyone yet.</div>
                   
                        }else {
                            return  <ul>
                            <li key={index}>{followed.username}</li>
                            {/* // return <Post post={post} /> */}
                       </ul>
                            
                        }
                            
                        })}
                    </div>
                    <div>
                    This user is being followed by:
                    {userInfo.followers.map((followers, index) => {
                        if (followers.length === 0){
                            return <div>You have no followers yet.</div>
                        }else {
                            return  <div>
                            <ul>
                            <li key={index}>{followers.username}</li>
                            {/* // return <Post post={post} /> */}
                       </ul>
                            </div>
                        }
                        })}
                    </div>
                    <div>
                        User Posts:
                        {userInfo.posts.map((post, index) => {
                            return  <ul>
                                     <li key={index}>{post.body}</li>
                                </ul>
                            // return <Post post={post} />
                        })}
                    </div>
                    {/* Links to followed, follows, favorites */}
                </div>
            )

        }).then(info=>{
            setProfile(info)
        })
    }

    return <div>
        <div>
            {profile}
        </div>



    </div>
}

export default UserProfile

