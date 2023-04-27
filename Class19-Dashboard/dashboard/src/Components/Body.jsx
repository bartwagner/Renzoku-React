import React from 'react'

function Body(props) {

return(
    <main className='main'>
        <div className="top--website">
            <p>Crypto</p>
            <p>weather</p>
        </div>

        <h1 className='time--website'>TIME HERE</h1>

        <p>By: {props.author}</p> 
    </main>
)

}

export default Body