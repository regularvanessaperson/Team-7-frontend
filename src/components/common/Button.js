import React from 'react'

const Button = (props) => {
//     const passingProps = props.label 
//     // console.log("what is this", props.label)
//     // Favorite- Retweet - Delete- Edit- Retweet
// const label = (props) => {
//     if (passingProps === edit) {
//         // console.log("what is this", props.label.edit)
//         return <i class="fas fa-edit"></i> 
//     }else {
//         return(
//             {passingProps}
//         ) 
//     }
// }
    
    return (
        <button
        className = {props.className}
        onClick={props.handleClick}>{props.label}</button>
    )
}

export default Button