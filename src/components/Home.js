
import React, {useState, useEffect} from 'react'
import PostForm from "./PostForm"
import Searchbar from "./Searchbar"
import Post from "./Post"

const axios = require('axios')


const Home = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/posts/feed').
        then((response) => {
            setPosts(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const postsFeed = posts.map((post, index) => {
        // return <li>{post.body}</li>
        return <Post post={post} />
    })

    return <div>
        <h1>Home Page</h1>
        <Searchbar />
        <PostForm />
        {postsFeed}
        
      
    </div>
    
}

export default Home
