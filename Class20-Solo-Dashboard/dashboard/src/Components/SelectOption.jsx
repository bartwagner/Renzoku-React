import React from 'react'

function SelectOption(props) {

    function selectItem(item){
        props.selectBrStockItem(item)
    }    

    return(
        <div className='item' id={props.brStock} onMouseDown={() => selectItem(props.brStock)}>
            {props.brStock}
        </div>
        // <option value={props.brStock}>{props.brStock}</option>
    )
}

export default SelectOption