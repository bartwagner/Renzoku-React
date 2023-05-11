import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInforImage, setDataInforImage] = React.useState()
  const [dataBrStocks, setDataBrStocks] = React.useState()
  const [timeCurrency, setTimeCurrency] = React.useState()
  const [weatherCurrency, setWeatherCurrency] = React.useState()
  const [brWeatherCurrency, setBrWeatherCurrency] = React.useState([])
  const [caWeatherCurrency, setCaWeatherCurrency] = React.useState([])
  const [resultBrStock, setResultBrStock] = React.useState()

  let imgInfor = {
    id: "",
    nameAuthor: "",
    url: ""
  }
  const brWeather = [{city:'São Paulo', latitude:-23.5489, longitude:-46.6388},
                     {city:'Porto Alegre', latitude:-30.033056, longitude:-51.230000},
                     {city:'Brasilia', latitude:-15.7801, longitude:-47.9292}]

  const caWeather = [{city:'Victoria', latitude:48.407326, longitude:-123.329773},
                     {city:'Toronto', latitude:43.70011, longitude:-79.4163},
                     {city:'Quebec', latitude:46.829853, longitude:-71.254028}]

  function getCurrentTime(){
      const date = new Date()
      setTimeCurrency(date.toLocaleTimeString("en-us", {timeStyle: "short"}))
  }
  setInterval(getCurrentTime, 1000)

  React.useEffect(()=> {   
    async function resquestApiBackground() {
      backgroundImage()
      brStocksList()

      let brArrayWeather = []
      for(let i = 0; i < brWeather.length; i++){
        brArrayWeather.push(weatherList(brWeather[i].latitude, brWeather[i].longitude))
      }
      setBrWeatherCurrency(brArrayWeather)

      let caArrayWeather = []
      for(let i = 0; i < caWeather.length; i++){
        caArrayWeather.push(weatherList(caWeather[i].latitude, caWeather[i].longitude))
      }
      setCaWeatherCurrency(caArrayWeather)
    }
    resquestApiBackground()
  }, [])

  async function backgroundImage(){
    // Image and Author
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
          imgInfor.id = dataImage.id,
          imgInfor.nameAuthor = dataImage.user.name,
          imgInfor.url = dataImage.urls.full
        }
      }
      catch(err){
        erroImgAuthor()
      }
      setDataInforImage(imgInfor)
  }

  function erroImgAuthor(){
    imgInfor.id = "jlVEj8IDPQc",
    imgInfor.nameAuthor = "Simon Wilkes",
    imgInfor.url = "https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85"
  }

  async function brStocksList(){
    //Br Stocks
    let brStocks = []
    try{
      const responseBrStocks = await fetch("https://brapi.dev/api/available")
      if(!responseBrStocks.ok){
        throw Error("API has a problem Stocks")
      }
      const dataStocks       = await responseBrStocks.json()
      brStocks = dataStocks.stocks.sort()
    }
    catch(err){
      brStocks = ["Br Stocks data not available"]
    }
    setDataBrStocks(brStocks)
  }

  async function weatherList(latitude, longitude){
    //Weather
    let WeatherCity = {
      city: "",
      icon: "",
      temperature: ""
    }
    try{
      const responseWeather = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`)
      if(!responseWeather.ok){
        throw Error("API has a problem")
      }else{
        const dataWeather = await responseWeather.json()
        let iconUrl = ""
        if(dataWeather.weather[0].icon){
          iconUrl = `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`
        } 
        WeatherCity.city = dataWeather.name
        WeatherCity.icon = iconUrl
        WeatherCity.temperature = Math.round(dataWeather.main.temp)+" º"
      }
    }
    catch(err){
      WeatherCity.city = ""
      WeatherCity.icon = ""
      WeatherCity.temperature = "Weather data not available"
    }
    return WeatherCity
  }

  async function brStockInformation(stock){
    let brStock = {
      currency: '',
      cashDividends: [],
      highestPriceOneYear: '',
      highestChangeOneYear: '',
      highestChangePercentOneYear: '',
      lowestPriceOneYear: '',
      lowestChangeOneYear: '',
      lowestChangePercentOneYear: '',
      regularMarketDayHigh: '',
      regularMarketDayLow: '',
      regularMarketOpen: '',
      regularMarketPreviousClose: '',
      regularMarketPrice: '',
      regularMarketTime: '',
      logoUrl: '',
      longName: '',
      shortName: '',
      symbol: ''
    }
    try{
      const respondeStockValue = await fetch (`https://brapi.dev/api/quote/${stock}?range=2y&interval=1mo&fundamental=true&dividends=true`)
      if(!respondeStockValue.ok){
        throw Error("API result br stock has a problem")
      }else{
        const dataStockValue = await respondeStockValue.json()
        brStock.currency = dataStockValue.results[0].currency
        brStock.cashDividends = dataStockValue.results[0].dividendsData.cashDividends
        brStock.highestPriceOneYear = dataStockValue.results[0].fiftyTwoWeekHigh
        brStock.highestChangeOneYear = dataStockValue.results[0].fiftyTwoWeekHighChange
        brStock.highestChangePercentOneYear = dataStockValue.results[0].fiftyTwoWeekHighChangePercent * 100
        brStock.lowestPriceOneYear = dataStockValue.results[0].fiftyTwoWeekLow
        brStock.lowestChangeOneYear = dataStockValue.results[0].fiftyTwoWeekLowChange
        brStock.lowestChangePercentOneYear = dataStockValue.results[0].fiftyTwoWeekLowChangePercent * 100
        brStock.regularMarketDayHigh = dataStockValue.results[0].regularMarketDayHigh
        brStock.regularMarketDayLow = dataStockValue.results[0].regularMarketDayLow
        brStock.regularMarketOpen = dataStockValue.results[0].regularMarketOpen
        brStock.regularMarketPreviousClose = dataStockValue.results[0].regularMarketPreviousClose
        brStock.regularMarketPrice = dataStockValue.results[0].regularMarketPrice
        brStock.regularMarketTime = dataStockValue.results[0].regularMarketTime
        brStock.logoUrl = dataStockValue.results[0].logourl
        brStock.longName = dataStockValue.results[0].longName
        brStock.shortName = dataStockValue.results[0].shortName
        brStock.symbol = dataStockValue.results[0].symbol
      }
    }
    catch(err){
      brStock.currency = 'This Br Stock not available'
      brStock.cashDividends = ''
      brStock.highestPriceOneYear = ''
      brStock.highestChangeOneYear = ''
      brStock.highestChangePercentOneYear = ''
      brStock.lowestPriceOneYear = ''
      brStock.lowestChangeOneYear = ''
      brStock.lowestChangePercentOneYear = ''
      brStock.regularMarketDayHigh = ''
      brStock.regularMarketDayLow = ''
      brStock.regularMarketOpen = ''
      brStock.regularMarketPreviousClose = ''
      brStock.regularMarketPrice = ''
      brStock.regularMarketTime = ''
      brStock.logoUrl = ''
      brStock.longName = ''
      brStock.shortName = ''
      brStock.symbol = ''
    }
    setResultBrStock(brStock)
    window.console.log(brStock)
  }

  if (!(dataInforImage && brWeatherCurrency && caWeatherCurrency && dataBrStocks)){
    return (
      <div className="c--loader"/>
    )
  }

  document.body.style.backgroundImage = `url(${dataInforImage.url})`
  return (
    <div>
      <Body
        key={dataInforImage.id}
        author          = {dataInforImage.nameAuthor}
        timeCurrency    = {timeCurrency}
        dataBrStocks    = {dataBrStocks}
        brWeatherCurrency = {brWeatherCurrency}
        caWeatherCurrency = {caWeatherCurrency}
        brStockInformation={brStockInformation}
      />
    </div>
  )
}

export default App