import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInforImage, setDataInforImage] = React.useState()
  const [dataCurrencyCad, setDataCurrencyCad] = React.useState()
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
      
      // Image and Author
      try{
        const responseImage = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        if(!responseImage.ok){
          throw Error("API has a problem")
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

      // Crypto Currency
      const responseCurrency = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false")
      const CurrencyInfor = {
        price: "",
        highPrice: "",
        lowPrice: "",
        nameCurrency: "",
        imgCurrency: ""
      }
      
      if(!responseCurrency.ok){
        CurrencyInfor.price = "Unavailable this moment"
        CurrencyInfor.imgCurrency = 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579'
        setDataCurrencyCad(CurrencyInfor)
      }else{
        const dataCurrency     = await responseCurrency.json()

        let num = dataCurrency.market_data.current_price.cad
        var formatNum = " $" + num.toLocaleString('en-US') + " CAD"
        let numHigh = dataCurrency.market_data.high_24h.cad
        var formatNumHigh = " $" + numHigh.toLocaleString('en-US') + " CAD"
        let numLow = dataCurrency.market_data.low_24h.cad
        var formatNumLow = " $" + numLow.toLocaleString('en-US') + " CAD"

        CurrencyInfor.price = formatNum
        CurrencyInfor.highPrice = formatNumHigh
        CurrencyInfor.lowPrice = formatNumLow
        CurrencyInfor.imgCurrency = dataCurrency.image.thumb
        CurrencyInfor.nameCurrency = dataCurrency.name
        setDataCurrencyCad(CurrencyInfor)
      }
      
      //Weather
      navigator.geolocation.getCurrentPosition(
        async position => {
          let WeatherCity = {
            city: "",
            icon: "",
            temperature: ""
          }
          try{
            const responseWeather = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
              if(!responseWeather.ok){
                throw Error("API has a problem")
              }else{
                const dataWeather = await responseWeather.json()
                window.console.log(dataWeather)
                const iconUrl = `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`
                
                WeatherCity.city = dataWeather.name
                WeatherCity.icon = iconUrl
                WeatherCity.temperature = dataWeather.main.temp
              }
          }
          catch(err){
            WeatherCity.city = ""
            WeatherCity.icon = ""
            WeatherCity.temperature = "Weather data not available"
          }

          window.console.log(WeatherCity)
          setWeatherCurrency(WeatherCity)
        }
      )    
    }
    resquestApiBackground()
  }, [])

  function erroImgAuthor(){
    imgInfor.id = "jlVEj8IDPQc",
    imgInfor.nameAuthor = "Simon Wilkes",
    imgInfor.url = "https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85"
  }

  if (!(dataCurrencyCad && dataInforImage)){
    return (
      <div className="c--loader"/>
    )
  }

  document.body.style.backgroundImage = `url(${dataInforImage.url})`
  return (
    <div>
      <Body
        key={dataInforImage.id}
        author       = {dataInforImage.nameAuthor}
        cryptoPrice  = {dataCurrencyCad.price}
        cryptoHigh   = {dataCurrencyCad.highPrice}
        cryptoLow    = {dataCurrencyCad.lowPrice}
        cryptoImg    = {dataCurrencyCad.imgCurrency}
        nameCurrency = {dataCurrencyCad.nameCurrency}
        timeCurrency = {timeCurrency}
        weatherCurrency = {weatherCurrency}
      />
    </div>
  )
}

export default App