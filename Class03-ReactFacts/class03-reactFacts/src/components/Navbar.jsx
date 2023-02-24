import React from "react"

export default function Navbar() {
    const [changeColor, setChangeColor] = React.useState(true)
    
    function setProp(prop, value) {
        document.documentElement.style.setProperty(prop, value)
    }

    function checkColor() {
        setChangeColor(prevChangeColor => !prevChangeColor)
        setColor()
    }

    function setColor(){
        window.console.log(changeColor)

        if (changeColor === true) {
            setProp('--background', "#282D35");
            setProp('--backgroundNav', "#21222A"); 
            setProp('--text', "#ffffff");
        } 
        else if (changeColor === false) {
            setProp('--background', "#fff5ff");
            setProp('--backgroundNav', "#ffffff");
            setProp('--text', "#222222");
        }
    }

    return (
        <nav>
            <img src="./src/images/react-icon-small.png" className="nav--icon" />
            <h3 className="nav--logo_text">ReactFacts</h3>
            <h4>Light</h4>
            <input class="apple--switch" type="checkbox" onClick={checkColor}/>
            <h4>Dark</h4>
        </nav>
    )
}
