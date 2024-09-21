import React from 'react'
import background from "../Assets/bulb.png"

const Backgound = () => {
  return (
    <div className='background-container' style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding:"10%"}}>
      <img src={background} width={100} height={100}/>
      <h1 style={{color: "gray"}}>Your Notes Appear Here</h1>
    </div>
  )
}

export default Backgound
