
//Component Imports
import UserResult from './UserResult'
import Post from './Post'
import {viewAllPosts} from '../services/post.service.js'

import React, { useState } from 'react'
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

    const handleSearch = (e) => {
        setText(true)
        e.preventDefault()
        //Need to use the input string to search for tweets and users
        //Search for users first:
        axios.get('http://localhost:8080/api/user/all').
        then(async (response) => {
            
             await response.data.forEach(user => {
                if ((user.username.toUpperCase() === search.toUpperCase()) && !text){
                    console.log("Result found: ", user.username)
                    setUsers([user, ...users])
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
                        console.log("Result found: ", post);
                        setPosts([post, ...posts])
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
        <div>
        <form onSubmit={handleSearch}>
            <label>
            Search:
            <input type="text" value={search} onChange={onChangeSearch} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        <ul>
            Users:
            {posts.map(result => {
                console.log("this is the user", result)
                return <li key={result._id}>{result.creator[0].username}</li>
            })}
        </ul>
        <ul>
            Posts:
            {posts.map(post => {
                return <li>{post.body}</li>
            })}
        </ul>
        
        </div>
    )
}

export default Searchbar