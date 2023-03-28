import React from 'react'

function NavBar() {

  const [colorGroup, setColorGroup] = React.useState([])
  let colorSelect = ''

  init()

  function init(){
    changeColor()
  }

  function changeColor(){
    colorSelect = document.querySelector("#inputcolor") == null ? "#000000" : document.querySelector("#inputcolor").value
    returnColors(colorSelect)
  }

   async function returnColors(color){
      window.console.log(color)
//      fetch("https://www.thecolorapi.com/scheme?hex=000000")
//      .then(res = res.json())
//      .then(data => {window.console.log(data)})
   }

  return (
    <nav className='nav--color'>
        <input type="color" id="inputcolor" className='choose--color' onChange={changeColor}/>
        <select className='select--option'></select>
        <button className='get--color'>Get color scheme</button>
    </nav>
  )
}

export default NavBar
