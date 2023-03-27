import React from 'react'

export default function NewPost(props) {

    const titleInput = document.getElementById("post--title")
    const bodyInput = document.getElementById("post--body")

    function handleSubmit(event) {
        event.preventDefault()

        const postTitle = titleInput.value
        const postBody = bodyInput.value
        const data = {
           title: postTitle,
           body: postBody
        }        
        props.addNewPost(data)
        resetForm()
    }
    
    function resetForm(){
        titleInput.value = ""
        bodyInput.value = ""
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