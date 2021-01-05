import React, {useState, useEffect} from 'react'


import Post from "./Post"
import PostForm from "./PostForm"
import {getCurrentUser} from '../services/auth.service'
import { replyToPost } from '../services/post.service'
import { viewOnePost } from '../services/post.service'



const Reply = (props) => {
    const currentUser = getCurrentUser()
    const [mainPost, setMainPost] = useState("")
    const parentPost = props.location.state
    console.log("parentPost", parentPost)
//     //props passes paretPost from link in Post.js
    
//     const parentPostObj = viewOnePost(parentPost)
//     const creator = currentUser.id
    
//     console.log("parentPost", parentPost)

// //make that one post render at the top of the page and replies under it
// //add post by current user as reply in the  array of the current posts 
//     // const currentUser = getCurrentUser()
//     const [reply, setReply] = useState([])
//     const [userReplies, setUserReplies]= useState([])

 
//     useEffect(() => {
//         setMainPost(parentPost)
//         replies()
//         // viewOnePost(parentPost).
//         // then((post) => {
//         //     // setMainPost(post.data)
//         //     console.log("Posts: ", post)
//         // }).catch(err => {
//         //     console.log(err)
//         // })
//     }, [])

//     const replies = () => {

//         viewOnePost(parentPost).then(post => {
//             console.log("parentPostPost", post)
//             let rawRepliesArray = post.data[0].replies
//             console.log("this is not an arrray", rawRepliesArray)
//             let repliesArray = []
//             rawRepliesArray.map((reply, index) => {
//                 repliesArray.push(reply)
                  
//             })
            
//             console.log("what is this now", Array.isArray(repliesArray))
//             if(typeof(rawRepliesArray) === 'object'){
//                 rawRepliesArray = [rawRepliesArray]
//             }
//             setUserReplies(rawRepliesArray)
//             console.log(repliesArray)
//             return <Post post={repliesArray} /> 
//             // return repliesArray
//         })
//     }
   

//     // const parent = () => {
//     //    const returnParent = viewOnePost(parentPost)
//     //     return  <Post post={returnParent} /> 
//     // }
    
//     const onUpdateReplies = (e) => {
//         const replyText = e.target.value
//         setReply(replyText)
//     }

//     const handleReply = (e) => {
//         const hashtags = []
//         const body = reply
//         // splits a post by space
//         let postArr = reply.split(" ")
//         // scans the post for hashtags and pushes into an array that we will send in post request
//         postArr.forEach(word => {
//             if (word.charAt(0) === '#'){
//                 hashtags.push(word)
//             }
//         })

//         replyToPost(creator, body, hashtags,parentPost)
//         setMainPost(parentPost)
//     }

    
    return (
        <div>
        <PostForm parentPost={parentPost} />
        {/* {userReplies} */}
       
        </div>
        )
}

export default Reply