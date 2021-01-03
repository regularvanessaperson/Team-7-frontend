import axios from 'axios'
//Helper funciton to get access to token for header
import authHeader from '../utilities/authHeader.utilities'

const API_URL= "http://localhost:8080/api/"

// GET	 |   /api/test/all	 |	retrieve public content
// GET	 |  /api/test/user	 |	access User's content
// GET	 | /api/test/admin	 |	access Admins content

export const getPublicContent = () => {
    return axios.get(API_URL+ 'test/all')
}

//access User's content
export const getUserBoard = () => {
    return axios.get(API_URL +'test/user', {header: authHeader()})
}

//access Admins content
export const getAdminBoard = () => {
    return axios.get(API_URL + 'test/admin', {header: authHeader()})
}

//get user profile
export const getUserProfile = (
    id
) => {
    return axios.get(API_URL + 'user/profile/' + id)
}

//Follow a user
export const followUser = (
    currentUser,
    otherUserId
) => {
    return axios.put(API_URL + 'user/follow', {
        currentUser,
        otherUserId
    })
}


//Unfollow a user
export const unfollowUser = (
    currentUser,
    otherUserId
) => {
    return axios.put(API_URL + 'user/unfollow', {
        currentUser,
        otherUserId
    })
}

//View all users
export const all = () => {
    return axios
    .get(API_URL+"all")
}