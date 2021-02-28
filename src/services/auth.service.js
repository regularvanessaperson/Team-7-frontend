import axios from 'axios';

import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'

const API_URL=process.env.REACT_APP_BACKEND_URL
console.log(API_URL)
//function to register User
export const register =(username, email, password) => {
    return axios
    .post(API_URL+"/api/auth/signup", {
        username,
        email,
        password
    })
}

//Login the user
export const login = (username, password) => {
    return axios
    .post(API_URL+"/api/auth/signin", {
        username,
        password
    })
    .then((response)=>{
        //Check if the response of user has accessToken
        if(response.data.accessToken){
            setItem('user', response.data)
        }
        return response.data
    })
}

//logout the user
export const logout = () => {
    removeItem('user')
}

//get current user
export const getCurrentUser = () => {
    return getItem('user')
}

