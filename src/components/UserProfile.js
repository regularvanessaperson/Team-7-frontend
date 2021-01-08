import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from './common/Button'

//Helper
import { getUserProfile } from '../services/user.service'
import { getCurrentUser } from '../services/auth.service'
import Post from './Post'
import { useParams } from "react-router";
import { followUser, unfollowUser } from '../services/user.service.js'
import { uploadImage } from '../services/user.service.js'




const UserProfile = (props) => {
    const currentUser = getCurrentUser("")
    const [profile, setProfile] = useState([])
    const [follows, setFollows] = useState(false)
    const [current, setCurrent] = useState(false)

    const { id } = useParams()

    useEffect(() => {
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
        for (let i = 0; i < curr.length; i++) {
            // console.log(curr[i].followers)
            if (curr[i].followers.includes(currentUser.id)) {
                setFollows(true)
                // console.log("Follows: ", follows)
            }
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files
        let formData = new FormData()
        uploadImage(id, e.target.files[0])
        // formData.append("userPhoto", file)
        console.log("files for pic?", e.target.files[0])

    }


    function userProfile() {
        return getUserProfile(id).then(user => {
            const userInfo = user.data
            // console.log("Ids: ", userInfo._id, currentUser.id)
            if (userInfo._id === currentUser.id) {
                setCurrent(true)
            }
            // console.log(user)
            let base64EncodedImage = ''
            if (user.data.profilePic !== undefined && user.data.profilePic.length > 0) {
                base64EncodedImage = Buffer.from(user.data.profilePic[0].img.data.data).toString('base64')
            }
            const imageSrc = `data:image/jpeg;base64, ${base64EncodedImage}`

            return (
                <div className="container">

                    <div className="card">
                        <div>
                            <h2 className="center-top nav-link">
                                <strong>User Information</strong>
                            </h2>
                            <h3>
                                <strong className="nav-link">{userInfo.username}</strong>
                            </h3>
                        </div>
                        <div>
                            {base64EncodedImage &&
                                (<img id="imagePlaceholder" src={imageSrc} className="user-profile float-left" />)}
                            {base64EncodedImage === '' &&
                                (<img
                                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                    alt="profile-img"
                                    className="nav-link"
                                />)}
                        {current === true && (
                            <input type="file" accept="image/*" onChange={handleImageUpload} multiple={false} />
                        )} 
                        </div>

                        

                        <div>
                            <Link to={"/favorites"} className="nav-link">Favorite Posts</Link>
                        </div>

                        <div>
                            <Link to={"/following"} className="nav-link">Following Feed</Link>
                        </div>

                        <div className="nav-link">
                            {!follows && (
                                <Button label="Follow" handleClick={follow} className="btn btn-primary mt-4" />
                            )}

                            {follows && (
                                <Button label="Unfollow" handleClick={unfollow} className="btn btn-danger mt-4" />
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <h4 className="nav-link">
                            <strong>Currently Following</strong>
                        </h4>

                        {userInfo.followed.map((followed, index) => {
                            if (followed === null) {
                                return <div className="nav-link">You are not following anyone yet.</div>

                            } else {
                                return <ul className="list-unstyled">
                                    <li className="nav-link" key={followed._id}>{followed.username}</li>
                                    {/* return <Post post={post} /> */}
                                </ul>

                            }

                        })}
                    </div>
                    <div className="card">
                        <h4 className="nav-link">
                            <strong>Current Followers</strong>
                        </h4>
                        {userInfo.followers.map((followers, index) => {
                            {/* {console.log(followers)} */ }
                            if (followers.length === 0) {
                                return <div className="nav-link">You have no followers yet.</div>
                            } else {
                                return <div>
                                    <ul className="list-unstyled">
                                        <li className="nav-link" key={followers._id}>{followers.username}</li>
                                        {/* // return <Post post={post} /> */}
                                    </ul>
                                </div>
                            }
                        })}
                    </div>
                    <div className="card">
                        <h4 className="nav-link">
                            <strong>Posts</strong>
                        </h4>

                        {userInfo.posts.map((post, index) => {
                            {/* {console.log(post)} */ }
                            return <Post key={post.id} post={post} />


                        })}
                    </div>
                    {/* Links to followed, follows, favorites */}
                </div>
            )

        }).then(info => {
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

