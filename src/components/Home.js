
import React, {useState, useEffect} from 'react'
import PostForm from "./PostForm"
import Searchbar from "./Searchbar"
import Post from "./Post"
import {viewAllPosts} from '../services/post.service.js'


const Home = (props) => {
    
    const [posts, setPosts] = useState([])
    const [update, setUpdate] = useState(0)

    

    useEffect(() => {
        viewAllPosts().
        then((response) => {
            setPosts(response.data)
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const rerenderHome = () => {
        setUpdate(update+1)
    }
    console.log("RERENDER HOME", posts)
    
    const postsFeed = posts.reverse().map((post, index) => {
        return <Post key={post.id} post={post} rerenderHome={rerenderHome} />    
    })

    return <div>
        <h1>Home Page</h1>
        <PostForm />
        <Searchbar />
        {postsFeed}
        
        
      
    </div>
    
}

export default Home
