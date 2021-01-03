import React, { useEffect, useState } from 'react'

//Helper
import { viewFavoritePosts } from '../services/post.service'
import { getCurrentUser } from '../services/auth.service'

const Favorites = () => {
   
    const [favorites, setFavorites]= useState([])
    const currentUser = getCurrentUser()
    const id = currentUser.id
    console.log(currentUser.id)
    let postArray = []

    const [loading, setLoading] = useState(true)

    useEffect(() => {
       setLoading(false)
       favePosts()
    }, [])


    async function favePosts() {
      return await viewFavoritePosts(id).then(user => {
            setLoading(false)
            console.log("the obj we map",user.data.favoritePosts)
            return user.data.favoritePosts.map(post => (
                <ul>
                    <li key={post._id}>
                       <div> Username: {post.creator[0].username}</div>
                        <div>Body: {post.body}</div>
                    </li>
                </ul>
            ))
        }).then(results=>{
            console.log("result", results)
            setFavorites(results)
        })
    }

//in case we add loading
    // if (loading) {
    //     return <div>
    //         Loading
    //     </div>
    // }


    return <div>
        <h1>Favorites</h1>
        {favorites}

    </div>

}

export default Favorites