
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
            await response.data.forEach(user => {
                if (user.username.toUpperCase() === search.toUpperCase()){
                    console.log("Result found: ", user.username)
                    return <UserResult name={user.username} />
                }
            })
        }).catch(err => {
            console.log(err)
        })

        //Search for tweets by hunting for results in tweet body
        axios
            .get("http://localhost:8080/api/posts/feed")
            .then((response) => {
                //simple search, attempt to match full word regardless of case
                console.log(response.data);
                // response.data.forEach(post => {
                const posts = response.data;
                posts.forEach((post) => {
                if (post.body) {
                    let postArr = post.body.split(" ");
                    for (let i = 0; i < postArr.length; i++) {
                    if (search.toUpperCase() === postArr[i].toUpperCase()) {
                        //render a Post component if it passes the search
                        console.log("Result found: ", post);
                        return <li><Post post={post} /></li>;
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