import React, { useState } from 'react'

const navBar = () => {
  const[message, setMessage] = useState({text:'hello',
    id:'edsrgf'
  }) 
  const changeMessage = (e)=>{
    setMessage({...message, 
      text: e.target.value})
  }
  return (
    <div>
      <input type="text" name="" id="" placeholder='input type' value={message.text} onChange={changeMessage()} />
      <button type='submit'>add</button>
      <hr />

    </div>
  )
}

export default navBar