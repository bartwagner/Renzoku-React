import React from "react";

export default function Button(){
    return(
        <div className="button">
            <button className="emailButton">
              <img src="./src/images/Email.png" className="linkedinEmail"/>Email
            </button>
            <button  className="linkedinButton" type="submit" onClick={() => openMyLinkedin()}>
              <img src="./src/images/linkedin.png" className="linkedinImg"/>Linkedin
            </button>
        </div>
    )
}