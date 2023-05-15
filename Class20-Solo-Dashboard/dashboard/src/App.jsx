import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInforImage, setDataInforImage] = React.useState({id: "",
                                                              nameAuthor: "",
                                                              url: ""
                                                            })
  const [dataBrStocks, setDataBrStocks] = React.useState()
  const [timeCurrency, setTimeCurrency] = React.useState()
  const [brWeatherCurrency, setBrWeatherCurrency] = React.useState([])
  const [caWeatherCurrency, setCaWeatherCurrency] = React.useState([])
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

  const brWeather = [{city:'São Paulo', latitude:-23.5489, longitude:-46.6388},
                     {city:'Porto Alegre', latitude:-30.033056, longitude:-51.230000},
                     {city:'Brasilia', latitude:-15.7801, longitude:-47.9292}]

  const caWeather = [{city:'Victoria', latitude:48.407326, longitude:-123.329773},
                     {city:'Toronto', latitude:43.70011, longitude:-79.4163},
                     {city:'Quebec', latitude:46.829853, longitude:-71.254028}]

  React.useEffect(()=> {   
    async function resquestApiBackground() {
      backgroundImage()
      brStocksList()
      weatherBr()
      weatherCa()
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

  function getCurrentTime(){
    const date = new Date()
    setTimeCurrency(date.toLocaleTimeString("en-us", {timeStyle: "short"}))
  }
  setInterval(getCurrentTime, 1000)

  function erroImgAuthor(){
    setDataInforImage({
      id: "jlVEj8IDPQc",
      nameAuthor: "Simon Wilkes",
      url: "https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85"
    }) 
  }

  function weatherBr(){
    let brArrayWeather = []
    for(let i = 0; i < brWeather.length; i++){
      brArrayWeather.push(weatherList(brWeather[i].latitude, brWeather[i].longitude))
    }
    setBrWeatherCurrency(brArrayWeather)
  }

  function weatherCa(){
    let caArrayWeather = []
    for(let i = 0; i < caWeather.length; i++){
      caArrayWeather.push(weatherList(caWeather[i].latitude, caWeather[i].longitude))
    }
    setCaWeatherCurrency(caArrayWeather)
  }

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
        resultBrStock={resultBrStock}
      />
    </div>
  )
}

export default App