import React from "react"

export default function Button(){
    return(
        <div className="button">
            <button className="emailButton">
            <img src="./src/images/Email.png"/>
            Email
            </button>
            <button  className="linkedinButton">
                <img src="./src/images/linkedin.png"/>
                Linkedin
                </button>
        </div>
    )
}