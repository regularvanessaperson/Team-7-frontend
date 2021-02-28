import axios from 'axios'
//Helper funciton to get access to token for header
import authHeader from '../utilities/authHeader.utilities'

const API_URL= process.env.REACT_APP_BACKEND_URL

// GET	 |   /api/test/all	 |	retrieve public content
// GET	 |  /api/test/user	 |	access User's content
// GET	 | /api/test/admin	 |	access Admins content

export const getPublicContent = () => {
    return axios.get(API_URL+ '/api/test/all')
}

//access User's content
export const getUserBoard = () => {
    return axios.get(API_URL +'/api/test/user', {header: authHeader()})
}

//access Admins content
export const getAdminBoard = () => {
    return axios.get(API_URL + '/api/test/admin', {header: authHeader()})
}

//get user profile
export const getUserProfile = (
    id
) => {
    return axios.get(API_URL + '/api/user/profile/' + id)
}

//Follow a user
export const followUser = (
    currentUser,
    otherUserId
) => {
    return axios.put(API_URL + '/api/user/follow', {
        currentUser,
        otherUserId
    })
}


//Unfollow a user
export const unfollowUser = (
    currentUser,
    otherUserId
) => {
    return axios.put(API_URL + '/api/user/unfollow', {
        currentUser,
        otherUserId
    })
}

//View all users
export const all = () => {
    return axios
    .get(API_URL+"/api/user/all")
}

//Post new profilePic
export const uploadImage = ( userId, profilePic) => {
    console.log("profilePic possibly in axios", profilePic)
    let formData = new FormData()
    formData.append("profilePic", profilePic, profilePic.name)
    formData.append("userId", userId)
    console.log("formData", formData)
    return axios.post(API_URL + '/api/photo', 
        formData
    )
    
}
