import React from 'react'
import './App.css'
import Body from './Components/Body'
import yahooFinance from 'yahoo-finance2'

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
                                                            regularMarketOpen: '',
                                                            regularMarketPreviousClose: '',
                                                            regularMarketPrice: '',
                                                            logoUrl: '',
                                                            shortName: '',
                                                            symbol: ''
                                                          })
  React.useEffect(()=> {   
    async function resquestApiBackground() {
      backgroundImage()
      weatherBr()
      weatherLocation()
      weatherUs()
      brStocksList()
      usStocksList()
      usStockInformation()
    }
    resquestApiBackground()
  }, [])

  //Image and Author
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
  //If erro, this will be the image and author
  function erroImgAuthor(){
    setDataInforImage({
      id: "jlVEj8IDPQc",
      nameAuthor: "Simon Wilkes",
      url: "https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85"
    }) 
  }

  //Get the time
  function getCurrentTime(){
    const date = new Date()
    setTimeCurrency(date.toLocaleTimeString("en-us", {timeStyle: "short"}))
  }
  setInterval(getCurrentTime, 1000)

  //Get the brazilian weather
  function weatherBr(){
    let brArrayWeather = []
    for(let i = 0; i < brWeather.length; i++){
      brArrayWeather.push(weatherList(brWeather[i].latitude, brWeather[i].longitude))
    }
    setBrWeatherCurrency(brArrayWeather)
  }
  //Get the location weather
  function weatherLocation(){
    navigator.geolocation.getCurrentPosition( 
      async position => {
        let localWeather = ''
        localWeather = weatherList(position.coords.latitude, position.coords.longitude)
        setWeatherCurrency(localWeather)
      }
    )  
  }
  //Get the United States weather
  function weatherUs(){
    let usArrayWeather = []
    for(let i = 0; i < usWeather.length; i++){
      usArrayWeather.push(weatherList(usWeather[i].latitude, usWeather[i].longitude))
    }
    setUsWeatherCurrency(usArrayWeather)
  }
  //Get the weather informations
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

  //Get the br stock list
  async function brStocksList(){
    //Br Stocks
    let brStocks = []
    try{
      const responseBrStocks = await fetch("https://brapi.dev/api/available")
      if(!responseBrStocks.ok){
        throw Error("API has a problem Stocks")
      }
      const dataBrStocks       = await responseBrStocks.json()
      brStocks = dataBrStocks.stocks.sort()
    }
    catch(err){
      brStocks = ["Br Stocks data not available"]
    }
    setDataBrStocks(brStocks)
  }
  //Get the br stock informations
  async function brStockInformation(stock){
    try{
      const respondeStockValue = await fetch (`https://brapi.dev/api/quote/${stock}?range=2y&interval=1mo&fundamental=true&dividends=true`)
      if(!respondeStockValue.ok){
        throw Error("API result br stock has a problem")
      }else{
        const dataStockValue = await respondeStockValue.json()
        setResultBrStock({
          currency: dataStockValue.results[0].currency,
          cashDividends: dataStockValue.results[0].dividendsData.cashDividends,
          highestPriceOneYear: dataStockValue.results[0].fiftyTwoWeekHigh,
          lowestPriceOneYear: dataStockValue.results[0].fiftyTwoWeekLow,
          regularMarketDayHigh: dataStockValue.results[0].regularMarketDayHigh,
          regularMarketDayLow: dataStockValue.results[0].regularMarketDayLow,
          regularMarketOpen: dataStockValue.results[0].regularMarketOpen,
          regularMarketPreviousClose: dataStockValue.results[0].regularMarketPreviousClose,
          regularMarketPrice: dataStockValue.results[0].regularMarketPrice,
          logoUrl: dataStockValue.results[0].logourl,
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
        regularMarketOpen: '',
        regularMarketPreviousClose: '',
        regularMarketPrice: '',
        logoUrl: '',
        shortName: '',
        symbol: ''
      })
    }
  }

  //Get the us stock list
  async function usStocksList(){
    //Us Stocks
    let usStocks = []
      try{
        const responseUsStocks = await fetch("https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=59a6edd12aa027ccd0282c9b51d5855c")
        if(!responseUsStocks.ok){
          throw Error("API has a problem Stocks")
        }
        const dataUsStocks       = await responseUsStocks.json()
        usStocks = dataUsStocks.filter((item) => (!item.includes('.')))
    }
    catch(err){
      usStocks = ["Us Stocks data not available"]
    }
    setDataUsStocks(usStocks)
  }
  async function usStockInformation(){
    const resultUs = await yahooFinance.quoteSummary('AAPL')
    const name = resultUs.price.shortName
    window.console.log(name)
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
        brStockInformation = {brStockInformation}
        resultBrStock={resultBrStock}
      />
    </div>
  )
}

export default App