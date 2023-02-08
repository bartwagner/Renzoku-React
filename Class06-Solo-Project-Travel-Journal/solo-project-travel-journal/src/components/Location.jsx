import React from "react"

export default function Location(props) {
    return (
    <div className='locationContainer'>
        <img src={`${props.imageUrl}`} className="locationImg"/>
        <div className="locationInf">
            <div className="locationMap">
                <img src="./src/images/Path.png" className="locationPath"/>
                <h3 className="locationCoutry">{props.location.toUpperCase()}</h3>
                <a href={`${props.googleMapsUrl}`} className="locationView">View on Google Maps</a>
            </div>
            <h1 className="locationTitle">{props.title}</h1>
            <h4 className="locationDate">{props.startDate} - {props.endDate}</h4>
            <p className="locationDescription">{props.description}</p>
        </div>
    </div>
    )
}