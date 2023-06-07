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
  const brWeather = [{city:'São Paulo', latitude:-23.5489, longitude:-46.6388},
                     {city:'Porto Alegre', latitude:-30.033056, longitude:-51.230000},
                     {city:'Brasilia', latitude:-15.7801, longitude:-47.9292}]
  //United State Weather
  const usWeather = [{city:'New York', latitude:40.71427, longitude:-74.00597},
                     {city:'Washington DC', latitude:38.89511, longitude:-77.03637},
                     {city:'California', latitude:38.3004, longitude:-76.50745}]

  const currencyExchange = [{base: 'CAD', exchange: 'USD'}, {base: 'CAD', exchange: 'GBP'}, {base: 'CAD', exchange: 'CHF'},{base: 'CAD', exchange: 'EUR'},{base: 'CAD', exchange: 'AUD'},{base: 'CAD', exchange: 'CNY'},{base: 'CAD', exchange: 'BRL'}, {base: 'CAD', exchange: 'MXN'},  //Canadian Dollar
                            {base: 'USD', exchange: 'CAD'}, {base: 'USD', exchange: 'GBP'}, {base: 'USD', exchange: 'CHF'},{base: 'USD', exchange: 'EUR'},{base: 'USD', exchange: 'AUD'},{base: 'USD', exchange: 'CNY'},{base: 'USD', exchange: 'BRL'}, {base: 'USD', exchange: 'MXN'},  //American Dollar
                            {base: 'GBP', exchange: 'CAD'}, {base: 'GBP', exchange: 'USD'}, {base: 'GBP', exchange: 'CHF'},{base: 'GBP', exchange: 'EUR'},{base: 'GBP', exchange: 'AUD'},{base: 'GBP', exchange: 'CNY'},{base: 'GBP', exchange: 'BRL'}, {base: 'GBP', exchange: 'MXN'},  //Pound
                            {base: 'CHF', exchange: 'CAD'}, {base: 'CHF', exchange: 'USD'}, {base: 'CHF', exchange: 'GBP'},{base: 'CHF', exchange: 'EUR'},{base: 'CHF', exchange: 'AUD'},{base: 'CHF', exchange: 'CNY'},{base: 'CHF', exchange: 'BRL'}, {base: 'CHF', exchange: 'MXN'},  //Swiss Franc
                            {base: 'EUR', exchange: 'CAD'}, {base: 'EUR', exchange: 'USD'}, {base: 'EUR', exchange: 'GBP'},{base: 'EUR', exchange: 'CHF'},{base: 'EUR', exchange: 'AUD'},{base: 'EUR', exchange: 'CNY'},{base: 'EUR', exchange: 'BRL'}, {base: 'EUR', exchange: 'MXN'},  //Euro
                            {base: 'AUD', exchange: 'CAD'}, {base: 'AUD', exchange: 'USD'}, {base: 'AUD', exchange: 'GBP'},{base: 'AUD', exchange: 'CHF'},{base: 'AUD', exchange: 'EUR'},{base: 'AUD', exchange: 'CNY'},{base: 'AUD', exchange: 'BRL'}, {base: 'AUD', exchange: 'MXN'},  //Australian Dollar
                            {base: 'CNY', exchange: 'CAD'}, {base: 'CNY', exchange: 'USD'}, {base: 'CNY', exchange: 'GBP'},{base: 'CNY', exchange: 'CHF'},{base: 'CNY', exchange: 'EUR'},{base: 'CNY', exchange: 'AUD'},{base: 'CNY', exchange: 'BRL'}, {base: 'CNY', exchange: 'MXN'},  //Yuan Chinese our 
                            {base: 'BRL', exchange: 'CAD'}, {base: 'BRL', exchange: 'USD'}, {base: 'BRL', exchange: 'GBP'},{base: 'BRL', exchange: 'CHF'},{base: 'BRL', exchange: 'EUR'},{base: 'BRL', exchange: 'AUD'},{base: 'BRL', exchange: 'CNY'}, {base: 'BRL', exchange: 'MXN'},  //Brazilian Real
                            {base: 'MXN', exchange: 'CAD'}, {base: 'MXN', exchange: 'USD'}, {base: 'MXN', exchange: 'GBP'},{base: 'MXN', exchange: 'CHF'},{base: 'MXN', exchange: 'EUR'},{base: 'MXN', exchange: 'AUD'},{base: 'MXN', exchange: 'CNY'}, {base: 'MXN', exchange: 'BRL'}]  //Mexican Peso
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
    if(country === "BR"){
      try{
        const respondeStockValueBr = await fetch (`https://brapi.dev/api/quote/${stock}?range=2y&interval=1mo&fundamental=true&dividends=true`)
        if(!respondeStockValueBr.ok){
          throw Error("API result br stock has a problem")
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
          currency: 'This Br Stock not available',
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
          throw Error("API result br stock has a problem")
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
          currency: 'This Us Stock not available',
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




  function currencyQuotation(){
    let exchangeCurrency = []
    for(let i = 0; i < currencyExchange.length; i++){
      exchangeCurrency.push(apiQuotation(currencyExchange[i].base, currencyExchange[i].exchange))
    }
    setQuotationMoney(exchangeCurrency)
  }

  async function apiQuotation(base, exchange){
    let exchangeCurrency = [{base: '',
                             currency: '',
                             quotation: ''}]
    try{
      const currencyMoney = await fetch (`https://api.frankfurter.app/latest?amount=1&from=${base}&to=${exchange}`)
      if(!currencyMoney.ok){
        throw Error("Quotation unavailable")
      }else{
        const dataCurrencyValue = await currencyMoney.json()
        exchangeCurrency.base = dataCurrencyValue.base
        exchangeCurrency.currency = dataCurrencyValue.exchange
        exchangeCurrency.quotation = dataCurrencyValue.rates
      }
    }
    catch(er){
      window.console.log("Quotation unavailable")
    }
    return exchangeCurrency
  }


  if (!(dataInforImage && brWeatherCurrency && usWeatherCurrency && dataBrStocks && dataUsStocks)){
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
      />
    </div>
  )
}

export default App