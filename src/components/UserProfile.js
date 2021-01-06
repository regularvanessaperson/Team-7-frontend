import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from './common/Button'

//Helper
import { getUserProfile } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'
import Post from './Post'
import { useParams } from "react-router";
import { followUser, unfollowUser } from '../services/user.service.js'
const axios = require('axios')




const UserProfile = (props) => {
    const currentUser = getCurrentUser("")
    const [profile, setProfile] = useState([])
    const [follows, setFollows] = useState(false)
    const [current, setCurrent] = useState(false)

    const {id} = useParams()
    
    useEffect( () => {
        userProfile()
        checkFollow()
    }, [follows])

    const follow = () => {
        followUser(currentUser.id, id)
        setFollows(true)
    }

    const unfollow = () => {
        unfollowUser(currentUser.id, id)
        setFollows(false)
    }

    const checkFollow = async () => {
        let curr = await (await getUserProfile(id)).data.followers
        // console.log(currentUser.id)
        for (let i = 0; i < curr.length; i++){
            // console.log(curr[i].followers)
            if (curr[i].followers.includes(currentUser.id)){
                setFollows(true)
                // console.log("Follows: ", follows)
            }
        }
    }

    const handleImageUpload = (e) => {
        const [file] = e.target.files
        
        let formData = new FormData()
        
        formData.append("userPhoto", file)
        console.log(formData.userPhoto)
        // axios.post('http://localhost:8080/api/photo', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        
    }
    

    async function userProfile() {
        return await getUserProfile(id).then(user => {
            const userInfo = user.data
            console.log("Ids: ", userInfo._id, currentUser.id)
            if (userInfo._id === currentUser.id){
                setCurrent(true)
            }
            return (
                <div className = "container">
                    
                    <div className = "card">
                        <h2 className = "nav-link">
                            <strong>User Information</strong>
                        </h2>

                        <div>
                            <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="nav-link"
                            />
                            <h3>
                            <strong className = "nav-link">{userInfo.username}</strong>
                            </h3>
                        </div>

                        {current && (
                            <input type="file" accept="image/*" onChange={handleImageUpload} multiple={false}/>
                        )}
                        
                        <div>
                            <Link to={"/favorites"} className = "nav-link">Favorite Posts</Link>
                        </div>

                        <div>
                          <Link to={"/following"} className = "nav-link">Following Feed</Link>
                        </div>
                    
                        <div className = "nav-link">
                            {!follows && (
                                <Button label="Follow" handleClick={follow} className="btn btn-primary mt-4"/>
                            )}

                            {follows && (
                                <Button label="Unfollow" handleClick={unfollow} className="btn btn-danger mt-4"/>
                            )}
                        </div>
                    </div>

                    <div className = "card">
                        <h4 className="nav-link">
                            <strong>Currently Following</strong>
                        </h4>
                    
                    {userInfo.followed.map((followed, index) => {
                        if (followed === null){
                            return <div className="nav-link">You are not following anyone yet.</div>
                   
                        }else {
                            return  <ul className="list-unstyled">
                            <li className="nav-link" key={index}>{followed.username}</li>
                            {/* return <Post post={post} /> */}
                       </ul>
                            
                        }
                            
                        })}
                    </div>
                    <div className = "card">
                        <h4 className="nav-link">
                            <strong>Current Followers</strong>
                        </h4>
                    {userInfo.followers.map((followers, index) => {
                        {/* {console.log(followers)} */}
                        if (followers.length === 0){
                            return <div className="nav-link">You have no followers yet.</div>
                        }else {
                            return  <div>
                            <ul className="list-unstyled">
                            <li className="nav-link" key={index}>{followers.username}</li>
                            {/* // return <Post post={post} /> */}
                       </ul>
                            </div>
                        }
                        })}
                    </div>
                    <div className = "card">
                        <h4 className="nav-link">
                            <strong>Posts</strong>
                        </h4>
                        
                        {userInfo.posts.map((post, index) => {
                            {/* {console.log(post)} */}
                            return <Post post={post} />
                            
                            
                        })}
                    </div>
                    {/* Links to followed, follows, favorites */}
                </div>
            )

        }).then(info=>{
            setProfile(info)
        })
    }

    if (follows === null) {
        return null
    }

    return <div>
        <div>
            {profile}
        </div>



    </div>
}

export default UserProfile

