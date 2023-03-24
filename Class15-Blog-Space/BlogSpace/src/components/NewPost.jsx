import React from 'react'

export default function NewPost(props) {


    function handleSubmit(event) {
        event.preventDefault()

        const postTitle = document.getElementById("post--title").value
        const postBody = document.getElementById("post--body").value
        const data = {
           title: postTitle,
           body: postBody
        }        
        
        props.addNewPost(data)
        document.getElementById("post--title").value = ""
        document.getElementById("post--body").value = ""

    }

    return(
        <form className='input--form' id="new-post" onSubmit={handleSubmit}>
            <div className='input--organizer'>
                <label className='label--title'>Title:</label>
                <input placeholder=" Title" name="Title" id="post--title" className='input--title'></input>
            </div>
            <div className='input--organizer'>
                <label className='label--body'>Body:</label>
                <textarea placeholder=" Body" id="post--body" className='input--body'></textarea>
            </div>
            <button className='form--button'>Post</button>
        </form>
    )

}