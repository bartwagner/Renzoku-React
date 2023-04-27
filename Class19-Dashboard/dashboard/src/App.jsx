import React from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  
  const [dataInfor, setDataInfor] = React.useState()

  React.useEffect(()=> {
    async function resquestApiBackground() {
      const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
      const data     = await response.json()
      setDataInfor(data)
    }
    resquestApiBackground()
  }, [])

  if (!dataInfor){
    return (
      <div className="c--loader"/>
    )
  }

  if(dataInfor.urls){
    document.body.style.backgroundImage = `url(${dataInfor.urls.full})`
    return (
      <div>
          <Body
            key={dataInfor.id}
            author={dataInfor.user.name}
          />
      </div>
    )
  }else{
    document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1528184039930-bd03972bd974?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODI1NDkzODA&ixlib=rb-4.0.3&q=85)"
    return (
      <div>
          <Body
            key={"jlVEj8IDPQc"}
            author={"Simon Wilkes"}
          />
      </div>
      )

  }
}

export default App