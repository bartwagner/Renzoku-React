import React from 'react'

function NavBar(props) {
  let colorSelect = ''
  let modeSelect = ''

  React.useEffect(()=>{
    init()
  }, [])

  function init(){
    changeColor()
  }

  function changeColor(){
    colorSelect = document.querySelector("#inputcolor") == null ? "#000000" : document.querySelector("#inputcolor").value
    modeSelect = document.querySelector("#selectoption") == null ? "monochrome" : document.querySelector("#selectoption").value
    props.returnColors(colorSelect, modeSelect)
  }

  return (
    <nav className='nav--color'>
        <input type="color" id="inputcolor" className='choose--color'/>
        <select 
            id="selectoption"
            className='select--option'
        >
            <option value="monochrome">Monochrome</option>
            <option value="monochrome-dark">Monochrome-dark</option>
            <option value="monochrome-light">Monochrome-light</option>
            <option value="analogic">Analogic</option>
            <option value="complement">Complement</option>
            <option value="analogic-complement">Analogic-complement</option>
            <option value="triad">Triad</option>
            <option value="quad">Quad</option>            
        </select>
        <button className='get--color' onClick={changeColor}>Get color scheme</button>
    </nav>
  )
}

export default NavBar