import React from 'react'

function SelectOption(props) {

    function selectItem(item){
        props.selectBrStockItem(item)
    }    

    return(
        <div className='item' id={props.brStock} onMouseDown={() => selectItem(props.brStock)}>
            {props.brStock}
        </div>
    )
}

export default SelectOption