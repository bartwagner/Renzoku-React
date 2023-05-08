import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInforImage, setDataInforImage] = React.useState()
  const [dataBrStocks, setDataBrStocks] = React.useState()
  const [timeCurrency, setTimeCurrency] = React.useState()
  const [weatherCurrency, setWeatherCurrency] = React.useState()

  let imgInfor = {
    id: "",
    nameAuthor: "",
    url: ""
  }

  function getCurrentTime(){
      const date = new Date()
      setTimeCurrency(date.toLocaleTimeString("en-us", {timeStyle: "short"}))
  }
  setInterval(getCurrentTime, 1000)

  React.useEffect(()=> {   
    async function resquestApiBackground() {
      backgroundImage()
      brStocksList()
      navigator.geolocation.getCurrentPosition(
        async position => {
          weatherList(position.coords.latitude, position.coords.longitude)
        }
      ) 
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
    setWeatherCurrency(WeatherCity)
  }

  if (!(dataInforImage && weatherCurrency && dataBrStocks)){
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
        weatherCurrency = {weatherCurrency}
      />
    </div>
  )
}

export default App