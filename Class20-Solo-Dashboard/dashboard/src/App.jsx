import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  //Image and Author Image 
  const [dataInforImage, setDataInforImage] = React.useState({id: "",
                                                              nameAuthor: "",
                                                              url: ""
                                                            })
  
  //List br and us Stock State
  const [dataBrStocks, setDataBrStocks] = React.useState()
  const [dataUsStocks, setDataUsStocks] = React.useState()
  
  //Time
  const [timeCurrency, setTimeCurrency] = React.useState()

  //Brazilian Weather
  const brWeather = [{city:'São Paulo',    latitude:-23.5489,   longitude:-46.6388},
                     {city:'Porto Alegre', latitude:-30.033056, longitude:-51.230000},
                     {city:'Brasilia',     latitude:-15.7801,   longitude:-47.9292}]
  //United State Weather
  const usWeather = [{city:'Toronto',  latitude:43.70011, longitude:-79.4163},
                     {city:'New York', latitude:40.71427,  longitude:-74.00597},
                     {city:'Quebec',   latitude:46.829853, longitude:-71.254028}]

  const currencyExchange = [{base: 'USD', exchange1: 'CAD', exchange2: 'BRL'}, 
                            {base: 'CAD', exchange1: 'USD', exchange2: 'BRL'},                          
                            {base: 'BRL', exchange1: 'USD', exchange2: 'CAD'}]
  //Weather States
  const [brWeatherCurrency, setBrWeatherCurrency] = React.useState([])
  const [weatherCurrency, setWeatherCurrency] = React.useState()
  const [usWeatherCurrency, setUsWeatherCurrency] = React.useState([])
  
  //Stock Result Information 
  const [resultBrStock, setResultBrStock] = React.useState({currency: '',
                                                            cashDividends: [],
                                                            highestPriceOneYear: '',
                                                            lowestPriceOneYear: '',
                                                            regularMarketDayHigh: '',
                                                            regularMarketDayLow: '',
                                                            regularMarketPrice: '',
                                                            regularMarketOpen: '',
                                                            regularMarketPreviousClose: '',
                                                            shortName: '',
                                                            symbol: ''
                                                          })
  const [resultUsStock, setResultUsStock] = React.useState({currency: '',
                                                          cashDividends: [],
                                                          highestPriceOneYear: '',
                                                          lowestPriceOneYear: '',
                                                          regularMarketDayHigh: '',
                                                          regularMarketDayLow: '',
                                                          regularMarketPrice: '',
                                                          regularMarketOpen: '',
                                                          regularMarketPreviousClose: '',
                                                          shortName: '',
                                                          symbol: ''
                                                        })

  const [quotationMoney, setQuotationMoney] = React.useState([])

  React.useEffect(()=> {   
    async function resquestApiBackground() {
      backgroundImage()
      weather()
      stocksList()
      currencyQuotation()
    }
    resquestApiBackground()
  }, [])

  ////////////////////
  //Image and Author//
  ////////////////////
  async function backgroundImage(){
    try{
      const responseImage = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
      if(!responseImage.ok){
        throw Error("API has a problem Image and Author")
      }
      const dataImage     = await responseImage.json()
      if(dataImage.errors)
      {
        erroImgAuthor()
      }else{
        setDataInforImage({
          id: dataImage.id,
          nameAuthor: dataImage.user.name,
          url: dataImage.urls.full
        }) 
      }
    }
    catch(err){
      erroImgAuthor()
    }
  }
  //////////////////////////////////////////////
  //If erro, this will be the image and author//
  //////////////////////////////////////////////
  function erroImgAuthor(){
    setDataInforImage({
      id: "jlVEj8IDPQc",
      nameAuthor: "Simon Wilkes",
      url: "https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85"
    }) 
  }

  ////////////////////////////////////
  //Get the time and setTimeCurrency//
  ////////////////////////////////////
  function getCurrentTime(){
    const date = new Date()
    setTimeCurrency(date.toLocaleTimeString("en-us", {timeStyle: "short"}))
  }
  setInterval(getCurrentTime, 1000)

  ////////////////////////////////////////////////////////////
  //Get the Brazil, United States and your location weathers//
  ////////////////////////////////////////////////////////////
  function weather(){
    let brArrayWeather = []
    let usArrayWeather = []
    
    for(let i = 0; i < brWeather.length; i++){
      brArrayWeather.push(weatherList(brWeather[i].latitude, brWeather[i].longitude))
    }
    for(let i = 0; i < usWeather.length; i++){
      usArrayWeather.push(weatherList(usWeather[i].latitude, usWeather[i].longitude))
    }
    navigator.geolocation.getCurrentPosition( 
      async position => {
        let localWeather = ''
        localWeather = weatherList(position.coords.latitude, position.coords.longitude)
        setWeatherCurrency(localWeather)
      }
    )  
    setBrWeatherCurrency(brArrayWeather)
    setUsWeatherCurrency(usArrayWeather)
  }
  ////////////////////////////////
  //Get the weather informations//
  ////////////////////////////////
  function weatherList(latitude, longitude){
    //Weather
    let WeatherCity = {
      city: "",
      icon: "",
      temperature: ""
    }
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`)
      .then(responseWeather => responseWeather.json())
      .then(dataWeatherRetorn => {
        WeatherCity.icon = `http://openweathermap.org/img/wn/${dataWeatherRetorn.weather[0].icon}@2x.png`
        WeatherCity.city = dataWeatherRetorn.name
        WeatherCity.temperature = Math.round(dataWeatherRetorn.main.temp)+" º"
      })
      .catch(
        WeatherCity.city = "",
        WeatherCity.icon = "",
        WeatherCity.temperature = "Weather data not available"
      )
    return WeatherCity
  }

  //////////////////////
  //Get the stock list//
  //////////////////////
  async function stocksList(){
    //Br Stocks
    let stocksBr = []
    let stocksUs = []
    try{
      const responseBrStocks = await fetch("https://brapi.dev/api/available")
      if(!responseBrStocks.ok){
        throw Error("API has a problem Stocks")
      }
      const dataBrStocks       = await responseBrStocks.json()
      stocksBr = dataBrStocks.stocks.sort()
    }
    catch(err){
      stocksBr = ["Br Stocks data not available"]
    }
    //Us Stocks
    try{
      const responseUsStocks = await fetch("https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=59a6edd12aa027ccd0282c9b51d5855c")
      if(!responseUsStocks.ok){
        throw Error("API has a problem Stocks")
      }
      const dataUsStocks       = await responseUsStocks.json()
      stocksUs = dataUsStocks.filter((item) => (!item.includes('.')))
    }
    catch(err){
      stocksUs = ["Us Stocks data not available"]
    }
    setDataUsStocks(stocksUs)
    setDataBrStocks(stocksBr)
  }

  //////////////////////////////
  //Get the stock informations//
  //////////////////////////////
  async function stockInformation(stock, country){
    if(country === "br"){
      try{
        const respondeStockValueBr = await fetch (`https://brapi.dev/api/quote/${stock}?range=2y&interval=1mo&fundamental=true&dividends=true`)
        if(!respondeStockValueBr.ok){
          throw Error("API result BR stock has a problem")
        }else{
          const dataStockValue = await respondeStockValueBr.json()
          setResultBrStock({
            currency: dataStockValue.results[0].currency,
            cashDividends: dataStockValue.results[0].dividendsData.cashDividends,
            highestPriceOneYear: dataStockValue.results[0].fiftyTwoWeekHigh,
            lowestPriceOneYear: dataStockValue.results[0].fiftyTwoWeekLow,
            regularMarketDayHigh: dataStockValue.results[0].regularMarketDayHigh,
            regularMarketDayLow: dataStockValue.results[0].regularMarketDayLow,
            regularMarketPrice: dataStockValue.results[0].regularMarketPrice,
            regularMarketOpen: dataStockValue.results[0].regularMarketOpen,
            regularMarketPreviousClose: dataStockValue.results[0].regularMarketPreviousClose,
            shortName: dataStockValue.results[0].shortName,
            symbol: dataStockValue.results[0].symbol
          })
        }
      }
      catch(err){
        setResultBrStock({
          currency: 'This BR Stock not available',
          cashDividends: '',
          highestPriceOneYear: '',
          lowestPriceOneYear: '',
          regularMarketDayHigh: '',
          regularMarketDayLow: '',
          regularMarketPrice: '',
          shortName: '',
          symbol: ''
        })
      }
    }else{
      try{
        const respondeStockValueUs = await fetch (`https://financialmodelingprep.com/api/v3/quote/${stock}?apikey=59a6edd12aa027ccd0282c9b51d5855c`)
        const responseStockDividendsUs = await fetch (`https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${stock}?apikey=59a6edd12aa027ccd0282c9b51d5855c`)
        const responseStockCurrencyUs = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${stock}?limit=120&apikey=59a6edd12aa027ccd0282c9b51d5855c`)
        if(!respondeStockValueUs.ok || !responseStockDividendsUs.ok || !responseStockCurrencyUs.ok){
          throw Error("API result CA/US stock has a problem")
        }else{
          const dataStockValue    = await respondeStockValueUs.json()
          const dataDividendValue = await responseStockDividendsUs.json()
          const dataCurrencyValue = await responseStockCurrencyUs.json()
          let arrayDividends =[]
          let countDividends = 0
          if(dataDividendValue.historical){
            if(dataDividendValue.historical.length < 12){
              countDividends = dataDividendValue.historical.length
            }else{
              countDividends = 12
            }
            for(let i = 0; i < countDividends; i++){
              arrayDividends.push(dividendOrganizer(dataDividendValue.historical[i]))
            }
          }
          setResultUsStock({
            currency: dataCurrencyValue[0].reportedCurrency,
            cashDividends: arrayDividends,
            highestPriceOneYear: dataStockValue[0].yearHigh,
            lowestPriceOneYear: dataStockValue[0].yearLow,
            regularMarketDayHigh: dataStockValue[0].dayHigh,
            regularMarketDayLow: dataStockValue[0].dayLow,
            regularMarketPrice: dataStockValue[0].price,
            regularMarketOpen: dataStockValue[0].open,
            regularMarketPreviousClose: dataStockValue[0].previousClose,
            shortName: dataStockValue[0].name,
            symbol: dataStockValue[0].symbol
          })
        }
      }
      catch(err){
        setResultUsStock({
          currency: 'This CA/US Stock not available',
          cashDividends: '',
          highestPriceOneYear: '',
          lowestPriceOneYear: '',
          regularMarketDayHigh: '',
          regularMarketDayLow: '',
          regularMarketPrice: '',
          shortName: '',
          symbol: ''
        })
      }
    }
  }
  //////////////////////////
  //Organizer Us Dividends//
  //////////////////////////
  function dividendOrganizer(dividendsArray){
    let dividendResult = [{
      rate:"",
      paymentDate:""
    }]
    dividendResult.rate = dividendsArray.dividend
    dividendResult.paymentDate = dividendsArray.paymentDate
    return dividendResult
  }

  async function currencyQuotation(){
    let exchangeCurrency = []

    for(let i = 0; i < currencyExchange.length; i++){
      try{
        const currencyMoney = await fetch (`https://api.frankfurter.app/latest?amount=1&from=${currencyExchange[i].base}&to=${currencyExchange[i].exchange1},${currencyExchange[i].exchange2}`)
        const dataCurrencyValue = await currencyMoney.json()
        exchangeCurrency.push(dataCurrencyValue)
      }
      catch(er){
        exchangeCurrency.push("N/A")
      }
    }
    setQuotationMoney(exchangeCurrency)
  }

  if (!(dataInforImage && brWeatherCurrency && usWeatherCurrency && dataBrStocks && dataUsStocks && quotationMoney)){
    return (
      <div className="c--loader"/>
    )
  }

  document.body.style.backgroundImage = `url(${dataInforImage.url})`
  return (
    <div>
      <Body
        key={dataInforImage.id}
        author             = {dataInforImage.nameAuthor}
        timeCurrency       = {timeCurrency}
        dataBrStocks       = {dataBrStocks}
        dataUsStocks       = {dataUsStocks}
        brWeatherCurrency  = {brWeatherCurrency}
        weatherCurrency    = {weatherCurrency}
        usWeatherCurrency  = {usWeatherCurrency}
        stockInformation   = {stockInformation}
        resultBrStock      = {resultBrStock}
        resultUsStock      = {resultUsStock}
        quotationMoney     = {quotationMoney}
      />
    </div>
  )
}

export default App