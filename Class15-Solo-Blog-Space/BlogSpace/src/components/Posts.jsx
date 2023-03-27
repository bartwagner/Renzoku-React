import React from 'react'

export default function Posts(props) {
    return(
        <div>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
            <hr />
        </div>
    )

}