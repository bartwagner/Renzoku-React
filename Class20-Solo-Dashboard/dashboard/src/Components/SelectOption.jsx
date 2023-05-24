import React from 'react'

function SelectOption(props) {

    function selectItem(item){
        props.selectStockItem(item)
    }    

    return(
        <div className='item' id={props.Stock} onMouseDown={() => selectItem(props.Stock)}>
            {props.Stock}
        </div>
    )
}

export default SelectOption