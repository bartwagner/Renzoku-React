import React from 'react'

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "", 
    bottonText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"})
  const [allMemeImages, setAllMemeImages] = React.useState([])

    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */
    
React.useEffect(() => {
  async function getMemes() {
    const res = await fetch("https://api.imgflip.com/get_memes")
    const data = await res.json()
    setAllMemeImages(data.data.memes)
  }
  getMemes()
}, [])

/*  
React.useEffect(()=> {  
  fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemeImages(data.data.memes))
}, [])
*/

  function getMemeImage(){
    const randomNumber = Math.floor(Math.random() * allMemeImages.length)
    const url = allMemeImages[randomNumber].url

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