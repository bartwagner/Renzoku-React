import React from 'react'
import MemesData from '../MemesData'

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "", 
    bottonText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"})
  const [allMemeImages, setAllMemeImages] = React.useState(MemesData)


  function getMemeImage(){
    const memesArray = allMemeImages.data.memes
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const url = memesArray[randomNumber].url
    let top = document.getElementById('topText')
    let bottom = document.getElementById('bottonText')

    setMeme(preMeme =>({
        topText: top.value,
        bottonText: bottom.value,
        randomImage: url,
    }))   
    window.console.log(meme)
  }
  
  return (
    <main className='main--form'>
        <p></p>
        <div className='form'>
          <input 
            type="text" 
            placeholder="top text"
            className="form--input"
            id="topText"
          />
          <input 
            type="text" 
            placeholder="Bottom Text"
            className="form--input"
            id="bottonText"
              />
            <button className='botton--form'
                    onClick={getMemeImage}
            >Get a new meme image 🖼</button>
         </div>
         <img src={meme.randomImage} className="meme--img"/>
    </main>
  )
}