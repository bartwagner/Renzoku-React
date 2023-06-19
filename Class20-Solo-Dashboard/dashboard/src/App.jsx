import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  //Image and Author Image 
  const [dataInforImage, setDataInforImage] = React.useState({id: "",
                                                              nameAuthor: "",
                                                              url: ""
                                                            })
  
  //List br and ca/us Stock State
  const [dataBrStocks,   setDataBrStocks]   = React.useState()
  const [dataUsCaStocks, setDataUsCaStocks] = React.useState()
  
  //Time
  const [timeCurrency, setTimeCurrency] = React.useState()

  //Brazilian Weather
  const brWeather = [{city:'São Paulo',    latitude:-23.5489,   longitude:-46.6388},
                     {city:'Porto Alegre', latitude:-30.033056, longitude:-51.230000},
                     {city:'Brasilia',     latitude:-15.7801,   longitude:-47.9292}]
  //Canada and United State Weather
  const usCaWeather = [{city:'Toronto',  latitude:43.70011, longitude:-79.4163},
                       {city:'New York', latitude:40.71427,  longitude:-74.00597},
                       {city:'Quebec',   latitude:46.829853, longitude:-71.254028}]

  const currencyExchange = [{base: 'USD', exchange1: 'CAD', exchange2: 'BRL'}, 
                            {base: 'CAD', exchange1: 'USD', exchange2: 'BRL'},                          
                            {base: 'BRL', exchange1: 'USD', exchange2: 'CAD'}]
  //Weather States
  const [brWeatherCurrency, setBrWeatherCurrency] = React.useState([])
  const [weatherCurrency, setWeatherCurrency] = React.useState()
  const [usCaWeatherCurrency, setUsCaWeatherCurrency] = React.useState([])
  
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
  const [resultUsCaStock, setResultUsCaStock] = React.useState({currency: '',
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

  ////////////////////////////////////////////////////////////////
  //Get the Brazil, Canada, United States your location weathers//
  ////////////////////////////////////////////////////////////////
  function weather(){
    let brArrayWeather = []
    let usCaArrayWeather = []
    
    for(let i = 0; i < brWeather.length; i++){
      brArrayWeather.push(weatherList(brWeather[i].latitude, brWeather[i].longitude))
    }
    for(let i = 0; i < usCaWeather.length; i++){
      usCaArrayWeather.push(weatherList(usCaWeather[i].latitude, usCaWeather[i].longitude))
    }
    navigator.geolocation.getCurrentPosition( 
      async position => {
        let localWeather = ''
        localWeather = weatherList(position.coords.latitude, position.coords.longitude)
        setWeatherCurrency(localWeather)
      }
    )  
    setBrWeatherCurrency(brArrayWeather)
    setUsCaWeatherCurrency(usCaArrayWeather)
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
    let stocksBr = []
    let stocksUsCa = []
    //Br Stocks
    try{
      const responseBrStocks = await fetch("https://brapi.dev/api/available")
      if(!responseBrStocks.ok){
        throw Error("API has a problem Stocks")
      }
      const dataBrStocks       = await responseBrStocks.json()
      stocksBr = dataBrStocks.stocks.sort()
    }
    catch(err){
      stocksBr = ["BR Stocks data not available"]
    }
    //Us Stocks
    try{
      const responseUsCaStocks = await fetch("https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=YouNeedToCreateOwnAccountAndApiKeyInHttps://financialmodelingprep.com")
      if(!responseUsCaStocks.ok){
        throw Error("API has a problem Stocks")
      }
      const dataUsCaStocks       = await responseUsCaStocks.json()
      stocksUsCa = dataUsCaStocks.filter((item) => (!item.includes('.')))
    }
    catch(err){
      stocksUsCa = ["CA/US Stocks data not available"]
    }
    setDataUsCaStocks(stocksUsCa)
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
            cashDividends: dataStockValue.results[0].dividendsData.cashDividends ? dataStockValue.results[0].dividendsData.cashDividends : 0,
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
        const respondeStockValueUsCa = await fetch (`https://financialmodelingprep.com/api/v3/quote/${stock}?apikey=YouNeedToCreateOwnAccountAndApiKeyInHttps://financialmodelingprep.com`)
        const responseStockDividendsUsCa = await fetch (`https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${stock}?apikey=YouNeedToCreateOwnAccountAndApiKeyInHttps://financialmodelingprep.com`)
        const responseStockCurrencyUsCa = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${stock}?limit=120&apikey=YouNeedToCreateOwnAccountAndApiKeyInHttps://financialmodelingprep.com`)
        if(!respondeStockValueUsCa.ok || !responseStockDividendsUsCa.ok || !responseStockCurrencyUsCa.ok){
          throw Error("API result CA/US stock has a problem")
        }else{
          const dataStockValue    = await respondeStockValueUsCa.json()
          const dataDividendValue = await responseStockDividendsUsCa.json()
          const dataCurrencyValue = await responseStockCurrencyUsCa.json()
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
          setResultUsCaStock({
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
        setResultUsCaStock({
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
  /////////////////////////////
  //Organizer Ca/Us Dividends//
  /////////////////////////////
  function dividendOrganizer(dividendsArray){
    let dividendResult = [{
      rate:"",
      paymentDate:""
    }]
    dividendResult.rate = dividendsArray.dividend
    dividendResult.paymentDate = dividendsArray.paymentDate
    return dividendResult
  }

  ////////////////////////////
  /////Currency Quotation/////
  ////////////////////////////
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

  ///////////////////////////
  /////// Grafic Load ///////
  ///////////////////////////
  if (!(dataInforImage && brWeatherCurrency && usCaWeatherCurrency && dataBrStocks && dataUsCaStocks && quotationMoney)){
    return (
      <div className="c--loader"/>
    )
  }

  /////////////////////////////////////////////////////////////////
  /////// Set BackGroundImage and send the app informarions ///////
  /////////////////////////////////////////////////////////////////
  document.body.style.backgroundImage = `url(${dataInforImage.url})`
  return (
    <div>
      <Body
        key={dataInforImage.id}
        author             = {dataInforImage.nameAuthor}
        timeCurrency       = {timeCurrency}
        dataBrStocks       = {dataBrStocks}
        dataUsCaStocks     = {dataUsCaStocks}
        brWeatherCurrency  = {brWeatherCurrency}
        weatherCurrency    = {weatherCurrency}
        usCaWeatherCurrency= {usCaWeatherCurrency}
        stockInformation   = {stockInformation}
        resultBrStock      = {resultBrStock}
        resultUsCaStock    = {resultUsCaStock}
        quotationMoney     = {quotationMoney}
      />
    </div>
  )
}

export default App