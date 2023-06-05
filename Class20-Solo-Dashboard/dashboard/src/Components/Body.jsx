import React from 'react'
import {nanoid} from 'nanoid'
import SelectOption from './SelectOption'
import Weather from './Weather'
import ChartStock from './ChartStock'
import ResultStock from './ResultStock'

function Body(props) {

    const[searchBrStock, setSearchBrStock] = React.useState(props.dataBrStocks)
    const[searchUsStock, setSearchUsStock] = React.useState(props.dataUsStocks)

    function dropDown(p, dropDown){

        var e = document.getElementById(`${dropDown}`);

        var d = ['block', 'none'];
        e.style.display = d[p];

        var t = ['0px','0px,-5px']
        setTimeout(function (){
            e.style.transform = 'translate('+t[p]+')';
        },0)
    }

    function selectBrStockItem(selected){
        if(selected !=''){
            document.getElementById('input--stock--br').value = selected
            props.stockInformation(selected, "BR")
        }
    }
    function selectUsStockItem(selected){
        if(selected !=''){
            document.getElementById('input--stock--us').value = selected
            props.stockInformation(selected, "US")
        }
    }








    function orderListBrStock(){
        let typeWrite = document.getElementById('input--stock--br').value
        if(typeWrite === ''){
            setSearchBrStock(props.dataBrStocks)
        } else {
            setSearchBrStock(
                props.dataBrStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
            )
        }
    }
    function orderListUsStock(){
        let typeWrite = document.getElementById('input--stock--us').value
        if(typeWrite === ''){
            setSearchUsStock(props.dataUsStocks)
        } else {
            setSearchUsStock(
                props.dataUsStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
            )
        }
    }

    function orderListStock(inputValue){
        let typeWrite = document.getElementById(`${inputValue}`).value
        if(inputValue == 'input--stock--br'){
            if(typeWrite === ''){
                setSearchBrStock(props.dataBrStocks)
            } else {
                setSearchBrStock(
                    props.dataBrStocks.filter(item => (item.toUpperCase().indexOf(typeWrite.toUpperCase()) > -1))
                )
            }
        }else{
            if(typeWrite === ''){
                setSearchUsStock(props.dataUsStocks)
            } else {
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
            selectStockItem={selectBrStockItem}
        />
    ))
    const optionsUsStockList = searchUsStock.map(d =>(
        <SelectOption
            key={nanoid()}
            Stock={d}
            selectStockItem={selectUsStockItem}
        />
    ))
    // end list of stocks (br and us)

    // start weather
    const brWeather = props.brWeatherCurrency.map(bw =>(
        <Weather
            key={nanoid()}
            icon={bw.icon}
            temperature={bw.temperature}
            city={bw.city}
        />
    ))
    const localweather = (
        <Weather
            key={nanoid()}
            icon={props.weatherCurrency.icon}
            temperature={props.weatherCurrency.temperature}
            city={props.weatherCurrency.city}
        />
    )
    const usWeather = props.usWeatherCurrency.map(us =>(
        <Weather
            key={nanoid()}
            icon={us.icon}
            temperature={us.temperature}
            city={us.city}
        />
    ))
    // end weather

    return(
        <main className='main'>
            <div className='div--infor'>
                <div className='group--weather'>
                    {brWeather}
                </div>
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
                <ResultStock
                   resultStock ={props.resultBrStock}
                />
                <div className='group--weather'>
                    {localweather}
                </div>
                <ResultStock
                   resultStock ={props.resultUsStock}
                />
                <div className='stock--div'>
                    <div className='stock--org'>
                        <p className='p--stock'>US Stocks:</p>
                        <div className='container'>
                            <input id='input--stock--us' className='input--stock' type="text" name="stock" onKeyUp={() => orderListStock('input--stock--us')} onFocus={() => dropDown(0, 'drop--down--us')} onBlur={() => dropDown(1, 'drop--down--us')} placeholder='Select one us stock'/>
                            <div id="drop--down--us" className='drop--down'>
                                <div className='list--drop--down'>
                                    {optionsUsStockList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='group--weather'>
                    {usWeather}
                </div>
            </div>
            <h3 className='grafic--data'>Dividens: {props.resultBrStock.symbol}</h3>
            <div className='chart--stock'>
                <ChartStock
                    resultStock = {props.resultBrStock}
                />
            </div>
            <h1 className='time--website'>{props.timeCurrency}</h1>
            <p className='author--img'>By: {props.author}</p> 
        </main>
    )
}

export default Body