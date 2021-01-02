
//Component Imports
import UserResult from './UserResult'
import Post from './Post'

import React, { useState } from 'react'
const axios = require('axios')


const Searchbar = () => {
    const [search, setSearch] = useState("")

    //Update search state as user types
    const onChangeSearch = (e) => {
        const searchQuery = e.target.value
        setSearch(searchQuery)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        //Need to use the input string to search for tweets and users
        //Search for users first:
        axios.get('http://localhost:8080/api/user/all').
        then(async (response) => {
            await response.forEach(user => {
                if (user.username.toUpperCase() === search.toUpperCase()){
                    return <UserResult name={user.username} />
                }
            })
        }).catch(err => {
            console.log(err)
        })

        //Search for tweets by hunting for results in tweet body
        axios.get('http://localhost:8080/api/post/feed').
        then((response) => {
            //simple search, attempt to match full word regardless of case
            response.forEach(post => {
                let postArr = post.body.split(" ")
                for (let i = 0; i < postArr.length; i++){
                    if (search.toUpperCase() === postArr[i].toUpperCase()){
                        //render a Post component if it passes the search
                        return <Post post={post}/>
                    }
                }
            })
        })
    }

    return (
        <form onSubmit={handleSearch}>
            <label>
            Search:
            <input type="text" value={search} onChange={onChangeSearch} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Searchbar