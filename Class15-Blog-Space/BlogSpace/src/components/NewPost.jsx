import React from 'react'

export default function NewPost(props) {

    document.getElementById("new-post").addEventListener("submit", function(e){
         e.preventDefault()
         const postTitle = document.getElementById("post--title").value
         const postBody = document.getElementById("post--body").value
         props.addNewPost(postTitle, postBody)
    })

    return(
        <form className='input--form' id="new-post">
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