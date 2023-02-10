import React from 'react'
import MemesData from '../MemesData'

export default function Meme() {
  
  function getMemeImage(){
    const memesArray = MemesData.data.memes
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    url = memesArray[randomNumber].url
  }
  
  return (
    <main className='mainForm'>
        <p></p>
        <form className='form'>
          <input 
            type="text" 
            placeholder="top text"
            className="formInput"
          />
          <input 
            type="text" 
            placeholder="Bottom Text"
            className="formInput"
              />
            <button className='bottonForm'
                    onClick={getMemeImage}
            >Get a new meme image 🖼</button>
        </form>
    </main>
  )
}