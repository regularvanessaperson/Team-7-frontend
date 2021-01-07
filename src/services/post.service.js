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
    id,
    body
) => {
    return axios
    .put(API_URL+"post", {
        id,
        body
    })
}

//delete a post
export const deletePost = (
    _id
) => {
    console.log("this should be the id for axios", _id)
    return axios
    .delete(API_URL+"post", {
        data: {
            _id: _id
        }
       
    })
}

//retweet a post
export const retweetPost = (
    creator,
    body,
    hashtags,
    parentPost,
    originalCreator
) => {
    return axios
    .post(API_URL+"retweet", {
        creator,
        body,
        hashtags,
        parentPost,
        originalCreator
    })
}

//unretweet a post
export const unretweetPost = (
    userId,
    parentId,
    repostId
) => {
    console.log('userId:', userId, 'parentId:', parentId, 'repostId:', repostId)
    return axios
    .put(API_URL+"unretweet", {
        userId,
        parentId,
        repostId
    })
}

//reply to a post
export const replyToPost = (
    creator,
    body,
    hashtags,
    parentPost
) => {
    return axios
    .post(API_URL+"reply", {
        creator,
        body,
        hashtags,
        parentPost
    })
}

//view favorited posts
export const viewFavoritePosts = (
    id
) => {
    return axios
    .get(API_URL+"feed/favorites/"+id)
}

//view posts from followed users
export const viewFollowedPosts = (
    id
) => {
    return axios
    .get(API_URL+"feed/"+id)
}

//view all posts
export const viewAllPosts = () => {
    return axios
    .get(API_URL+"feed")
}

//view one post
export const viewOnePost = (
    idx
) => {
    return axios
    .get(API_URL+idx) 
}

//increment favorite count of a post
export const incrementFavorite = (
    id,
    userId
) => {
    return axios
    .put(API_URL+"favorite", {
        id,
        userId
    })
}

//decrease favorites and remove user from post doc
export const decreaseFavorite = (
    id,
    userId
) => {
    return axios
    .put(API_URL+"decreaseFave", {
        id,
        userId
    })
}