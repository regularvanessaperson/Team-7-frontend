import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

//Component
import FormGroup from './common/FormGroup'
import ButtonSpinner from './common/ButtonSpinner'

//Helper
import { login } from '../services/auth.service'
import {resMessage} from '../utilities/functions.utilities'


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}


const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    //
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    //grab what is entered as our username
    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    //Store teh password in our password state
    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }
    
    const handleLogin = (e) => {
        e.preventDefault()

        setMessage("")
        setLoading(true)
        //validates all the fields
        form.current.validateAll()
        //validator stores errors and we can check if errors exist
        if(checkBtn.current.context._errors.length === 0){
            login(username, password).then(
                () => {
                    props.history.push("/profile")
                    window.location.reload()
                },
                (error) => {
                    //Setting loading to false and return the error
                    setLoading(false)
                    //checking all the data received from our backend
                    setMessage(resMessage(error))
                }
            )
        }else {
            setLoading(false)
        }

    }

    console.log(username, password)
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleLogin} ref={form}>
                    <FormGroup text="username">
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </ FormGroup>

                    <FormGroup text="password">
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </FormGroup>

                    <ButtonSpinner text="Login" login={loading} />

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    {/*needs to be used for react validation to submit the form */}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default Login