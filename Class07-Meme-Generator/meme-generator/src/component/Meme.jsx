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

    setMeme(preMeme =>({
        ...preMeme,
        randomImage: url,
    }))   
  }

  function handleChange(event){
    const {name, value} = event.target
    setMeme(preMeme =>({
      ...preMeme,
      [name]: value
  }))   
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
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
          <input 
            type="text" 
            placeholder="Bottom Text"
            className="form--input"
            id="bottonText"
            name="bottonText"
            onChange={handleChange}
            value={meme.bottonText}
          />
          <button className='botton--form'
                    onClick={getMemeImage}
            >Get a new meme image 🖼
          </button>
         </div>
         <div className="meme">
                <img src={meme.randomImage} className="meme--img" />
                <h2 className="meme--text--top">{meme.topText}</h2>
          </div>
          <h2 className="meme--text--bottom">{meme.bottonText}</h2>
    </main>
  )
}