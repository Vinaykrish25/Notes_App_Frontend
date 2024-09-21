import React from 'react'
import logo from "../Assets/notes.png"
import {Link} from "react-router-dom"
import "./Styles/Home.css"

const Home = () => {
    return (
        <div className='home-container'>
            <div className="home-heading">
                <h1>Notes App</h1>
            </div>
            <div className="image">
                <img src={logo} alt="Notes" width={300} height={300}/>
            </div>
            <div className="two-buttons">
                <Link to="/login"><button className='home-login'>Login</button></Link>
                <Link to="/signup"><button className='home-signup'>Signup</button></Link>
            </div>
        </div>
    )
}

export default Home
