import React from 'react'

function Body(props) {

  window.console.log(props)

  const style ={
    backgroundColor: props.value
  }

  return (
    <div className='div--split'>
        <div style={style} className='div--color' />
        <div className='div--name'>{props.value}</div>
    </div>
  )
}

export default Body