import React from 'react'

const Button = (props) => {

    return (
        <button
        class = {props.class}
        onClick={props.handleClick}>{props.label}</button>
    )
}

export default Button