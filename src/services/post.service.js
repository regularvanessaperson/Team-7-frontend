import axios from 'axios'

const API_URL="http://localhost:8080/api/posts/"

//create a new post
export const newPost = (
    creator,
    body,
    hashtags,
) => {
    return axios
    .post(API_URL+"post", {
        creator,
        body,
        hashtags
    })
}

//edit an existing post
export const editPost = (
    body
) => {
    return axios
    .put(API_URL+"post", {
        body
    })
}

//delete a post
export const deletePost = (
    _id
) => {
    return axios
    .delete(API_URL+"post", {
        _id
    })
}