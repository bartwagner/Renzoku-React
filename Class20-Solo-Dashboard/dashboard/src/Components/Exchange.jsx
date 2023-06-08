import React from 'react'

function Exchange(props) {

    return(
        <div className='item' id={props.Stock} onMouseDown={() => selectItem(props.Stock)}>
            {props.Stock}
        </div>
    )
}

export default Exchange