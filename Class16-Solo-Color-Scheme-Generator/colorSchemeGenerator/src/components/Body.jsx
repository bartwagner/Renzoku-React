import React from 'react'

function Body(props) {

  const style ={
    backgroundColor: props.value
  }

  function CopyColor(value){
    let range = document.createRange();
        
    range.selectNode(document.getElementById(value));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
  }
  
  return (
    <div className='div--split'>
        <div style={style} className='div--color' />
        <div className='div--name' id={'colorname'+props.value} onClick={() => CopyColor('colorname'+props.value)}>{props.value}</div>
    </div>
  )
}

export default Body