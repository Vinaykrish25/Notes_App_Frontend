import React from 'react'
import loadingGif from "../Assets/loading-1.gif"
import "./Styles/Loading.css"
import logo from "../Assets/notes.png"

const Loading = () => {
  return (
    <div className='load-container'>
      <div className="loading-heading">
        <img src={logo} alt="Notes" width={100} height={100}/>
        <h1>Notes App</h1>
      </div>
      <img src={loadingGif} />
      <h2>Loading...</h2>
    </div>
  )
}

export default Loading