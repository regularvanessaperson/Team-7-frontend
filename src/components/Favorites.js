import React, { useEffect, useState } from 'react'

//Component imports
import Post from "./Post"
//Helper
import { viewFavoritePosts } from '../services/post.service'
import { getCurrentUser } from '../services/auth.service'


const Favorites = () => {

    const [favorites, setFavorites] = useState([])
    const [exists, setExists] = useState(true)
    const currentUser = getCurrentUser()
    const id = currentUser.id

    useEffect(() => {
        favePosts()
        setExists(false)
    }, [])


     const favePosts = () => {
        viewFavoritePosts(id).then(user => {
            let favesArray = user.data.favoritePosts
            setFavorites(favesArray)
            // console.log(favesArray)
            return favesArray
            
        })
    }
    const postsFeed = favorites.reverse().map((posts, index) => {
        return <Post key={posts.id} post={posts} favoritesComponent={true} />    
    })


    return (
            <div>
                <h1 className="center-top">Favorites</h1>
                
              <div>{postsFeed}</div>  

            </div>
        )

    }

    export default Favorites