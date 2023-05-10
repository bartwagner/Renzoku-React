import React from 'react'
import {nanoid} from 'nanoid'
import SelectOption from './SelectOption'

function Body(props) {
    const[searchBrStock, setSearchBrStock] = React.useState(props.dataBrStocks)
    
    function dropDown(p){
        var e = document.getElementsByClassName('drop--down')[0];
        var d = ['block', 'none'];
        e.style.display = d[p];

        var t = ['0px','0px,-5px']
        setTimeout(function (){
            e.style.transform = 'translate('+t[p]+')';
        },0)
    }

    function selectBrStockItem(selected){
        if(selected !=''){
            document.getElementsByClassName('input--stock')[0].value = selected
            props.brStockInformation(selected)
        }
    }

    function orderListBrStock(){
        let typeWrite = document.getElementsByClassName('input--stock')[0].value
    
        if(typeWrite === ''){
            setSearchBrStock(props.dataBrStocks)
        } else {
            setSearchBrStock(
                props.dataBrStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
            )
        }
    }

    const options = searchBrStock.map(d =>(
        <SelectOption
            key={nanoid()}
            brStock={d}
            selectBrStockItem={selectBrStockItem}
        />
    ))

    return(
        <main className='main'>
            <div className="top--website">
                <div className='weather--div'>
                    <div>
                        <p>BR Stocks:</p>
                        <div className='container'>
                            <input className='input--stock' type="text" name="stock" onKeyUp={orderListBrStock} onFocus={() => dropDown(0)} onBlur={() => dropDown(1)} placeholder='Select one br stock'/>
                            <div className='drop--down'>
                                <div className='list--drop--down'>
                                    {options}    
                                </div>
                            </div>
                        </div>
                        {/* <select className='stock--list'>
                            {options}
                        </select> */}
                    </div>
                    <div className='weather--icon--temp'>
                        <img src={props.weatherCurrency.icon} className='weather--icon'/>
                        <p className='weather--temp'>{props.weatherCurrency.temperature}</p>
                    </div>
                    <p className='weather--city'>{props.weatherCurrency.city}</p>
                </div>
            </div>
            <h1 className='time--website'>{props.timeCurrency}</h1>
            <p>By: {props.author}</p> 
        </main>
    )
}

export default Body