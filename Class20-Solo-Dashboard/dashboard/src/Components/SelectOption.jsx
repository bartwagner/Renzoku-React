import React from 'react'

function SelectOption(props) {

    ///////////////////////////////////
    // check what stock was selected //
    ///////////////////////////////////
    function selectItem(item){
        props.selectStockItem(item, props.country)
    }    

    /////////////////////
    // Show the stocks //
    /////////////////////
    return(
        <div className='item' id={props.Stock} onMouseDown={() => selectItem(props.Stock)}>
            {props.Stock}
        </div>
    )
}

export default SelectOption