import React from 'react'
import {nanoid} from 'nanoid'
import SelectOption from './SelectOption'

function Option(props) {

    const[searchBrStock, setSearchBrStock] = React.useState(props.dataBrStocks)
    const[searchUsStock, setSearchUsStock] = React.useState() //props.dataUsStocks

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
        if(country == 'BR'){
            document.getElementById('input--stock--br').value = selected
        }else{
            document.getElementById('input--stock--us').value = selected
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
                setSearchBrStock(props.dataBrStocks)
            }else {
                setSearchBrStock(
                    props.dataBrStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
                )
            }
        }else{
            if(typeWrite === ''){
                setSearchUsStock(props.dataUsStocks)
            }else {
                setSearchUsStock(
                    props.dataUsStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
                )
            }
        }
    }

    // start list of stocks (br and us)
    const optionsBrStockList = searchBrStock.map(d =>(
        <SelectOption
            key={nanoid()}
            Stock={d}
            selectStockItem={selectStockItem}
            country={"BR"}
        />
    ))

    return(
        <div className='stock--div'>
            <div className='stock--org'>
                <p className='p--stock'>BR Stocks:</p>
                <div className='container'>
                    <input id='input--stock--br' className='input--stock' type="text" name="stock" onKeyUp={() => orderListStock('input--stock--br')} onFocus={() => dropDown(0, 'drop--down--br')} onBlur={() => dropDown(1, 'drop--down--br')} placeholder='Select one br stock'/>
                    <div id="drop--down--br" className='drop--down'>
                        <div className='list--drop--down'>
                            {optionsBrStockList}    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Option