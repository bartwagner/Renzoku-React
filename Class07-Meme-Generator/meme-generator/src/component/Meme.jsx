import React from 'react'

export default function Meme() {
  return (
    <main className='mainForm'>
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
            <button className='bottonForm'>Get a new meme image 🖼</button>
        </form>
    </main>
  )
}