import React from 'react'

export default function Header() {
  return (
    <header className='headerMeme'>
        <div className='headerTroll'>
            <img src="./src/images/troll-face.png" className="trollImg"/>
            <h2 className='memeLetter'>Meme Generator</h2>
        </div>
        <h4 className='reactCourse'>React Course - Project3</h4>
    </header>
  )
}