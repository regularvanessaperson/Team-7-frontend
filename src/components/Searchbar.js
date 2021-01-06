
//Component Imports
import Post from './Post'
import {viewAllPosts} from '../services/post.service.js'
import {all} from '../services/user.service.js'

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios')



const Searchbar = () => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [text, setText] = useState(false)

    //Update search state as user types
    const onChangeSearch = (e) => {
        const searchQuery = e.target.value
        setSearch(searchQuery)
        setUsers([])
        setPosts([])
        setText(false)
    }

    useEffect(() => {
    }, [posts])

    const handleSearch = (e) => {
        setPosts([])
        setText(true)
        e.preventDefault()
        //Need to use the input string to search for tweets and users
        //Search for users first:
        all()
        .then(async (response) => {
            const userResults = response.data
            userResults.forEach((user) => {
                if ((user.username.toUpperCase() === search.toUpperCase()) && !text){
                    setUsers([user, ...users])
                    console.log(users)
                }
            })
            }).catch(err => {
                console.log(err)
            })

        //Search for tweets by hunting for results in tweet body
        viewAllPosts()
            .then((response) => {
                //simple search, attempt to match full word regardless of case
                // response.data.forEach(post => {
                const postResults = response.data;
                postResults.forEach((post) => {
                if (post.body) {
                    let postArr = post.body.split(" ");
                    for (let i = 0; i < postArr.length; i++) {
                    if ((search.toUpperCase() === postArr[i].toUpperCase()) && !text) {
                        //render a Post component if it passes the search
                        let currentPosts = posts
                        currentPosts.push(post)
                        setPosts(currentPosts)
                    }
                    }
                }
                
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
        <div class="d-inline-flex p-2">
            
                    <form onSubmit={handleSearch}>
                        <input type="text" class="form-control" value={search} onChange={onChangeSearch} placeholder="search..."/>
                        <button class="btn btn-primary" type="submit">Search</button>
                        {/* <input type="submit" value="Submit" /> */}
                    </form>    
        </div>
        
        <ul>
            {users.map(result => {
                let urlId = '/userProfile/' + result._id
                return <Link to={urlId}>{result.username}</Link>
            })}
        </ul>
        {
            posts.map((post) => {
                console.log(post)
                return <Post post={post} />
            })
        }
        {/* <Post post={posts[0]}/> */}
        </>
    )
}

export default Searchbar