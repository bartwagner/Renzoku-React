import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInforImage, setDataInforImage] = React.useState()

  const [dataCurrencyCad, setDataCurrencyCad] = React.useState()

  React.useEffect(()=> {
    async function resquestApiBackground() {
      // Image and Author

      const imgInfor = {
        id: "",
        nameAuthor: "",
        imgCrypto:"",
        url: ""
      }

      try{
        const responseImage = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        if(!responseImage.ok){
          throw Error("API has a problem")
        }
        const dataImage     = await responseImage.json()

        window.console.log(dataImage)
        if(dataImage.errors)
        {
          imgInfor.id = "jlVEj8IDPQc",
          imgInfor.nameAuthor = "Simon Wilkes",
          imgInfor.url = "https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85"
        }else{
          imgInfor.id = dataImage.id,
          imgInfor.nameAuthor = dataImage.user.name,
          imgInfor.url = dataImage.urls.full
        }
      }
      catch(err){
        imgInfor.id = "jlVEj8IDPQc",
        imgInfor.nameAuthor = "Simon Wilkes",
        imgInfor.url = "https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85"
      }

      setDataInforImage(imgInfor)

      // Crypto Currency
      const responseCurrency = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false")
      if(!responseCurrency.ok){
        setDataCurrencyCad("Unavailable this moment")
      }else{
        const dataCurrency     = await responseCurrency.json()
        let num = dataCurrency.market_data.current_price.cad
        var formatNum = " $" + num.toLocaleString('en-US') + " CAD"
        setDataCurrencyCad(formatNum)
      }
    }
    resquestApiBackground()
  }, [])

  if (!dataInforImage){
    return (
      <div className="c--loader"/>
    )
  }

  document.body.style.backgroundImage = `url(${dataInforImage.url})`
  return (
    <div>
      <Body
        key={dataInforImage.id}
        author={dataInforImage.nameAuthor}
        cryptoBitcoin={dataCurrencyCad}
          />
    </div>
  )
}

export default App