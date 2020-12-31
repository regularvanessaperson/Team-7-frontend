import axios from 'axios'

const API_URL="http://localhost:8080/api/posts/"

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