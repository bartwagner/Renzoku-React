import React from 'react'

function Body(props) {

return(
    <main className='main'>
        <div className="top--website">
            <div className='crypto--Website'>
                <p>Crypto: </p>
                <img className='crypto--simbol' src={} />
                <p className='crypto--value'>  {props.cryptoBitcoin}</p>
            </div>
            <p>weather</p>
        </div>

        <h1 className='time--website'>TIME HERE</h1>

        <p>By: {props.author}</p> 
    </main>
)

}

export default Body