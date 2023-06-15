import React from 'react'
import {nanoid} from 'nanoid'
import SelectOption from './SelectOption'

function DropDownObject(props) {

    const[searchStock, setSearchStock] = React.useState(props.dataStocks)

    //dropDrown object
    function dropDown(p, dropDown){
        var e = document.getElementById(`${dropDown}`);
        var d = ['block', 'none'];
        e.style.display = d[p];
        var t = ['0px','0px,-5px']
        setTimeout(function (){
            e.style.transform = 'translate('+t[p]+')';
        },0)
    }

    //after the user selected the stock, it gets the stock information
    function selectStockItem(selected, country){
        if(country == 'br'){
            document.getElementById('input--stock--br').value = selected
        }else{
            document.getElementById('input--stock--ca/us').value = selected
        }            
        if(selected !=''){
            props.stockInformation(selected, country)
        }
    }

    //filter what the stock the user is looking for
    function orderListStock(inputValue){
        let typeWrite = document.getElementById(`${inputValue}`).value
        if(inputValue == 'input--stock--br'){
            if(typeWrite === ''){
                setSearchStock(props.dataStocks)
            }else {
                setSearchStock(
                    props.dataStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
                )
            }
        }else{
            if(typeWrite === ''){
                setSearchStock(props.dataStocks)
            }else {
                setSearchStock(
                    props.dataStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
                )
            }
        }
    }

    // start list of stocks (br and us)
    const optionsStockList = searchStock.map(d =>(
        <SelectOption
            key={nanoid()}
            Stock={d}
            selectStockItem={selectStockItem}
            country={props.country}
        />
    ))

    return(
        <div className='stock--div'>
            <p className='p--stock'>{props.country.toUpperCase()} Stocks:</p>
            <div className='container'>
                <input id={'input--stock--'+props.country} className='input--stock' type="text" name="stock" onKeyUp={() => orderListStock(`input--stock--${props.country}`)} onFocus={() => dropDown(0, `drop--down--${props.country}`)} onBlur={() => dropDown(1, `drop--down--${props.country}`)} placeholder={'Select one stock'}/>
                <div id={'drop--down--'+props.country} className='drop--down'>
                    {optionsStockList}
                </div>
            </div>
        </div>
    )
}

export default DropDownObject