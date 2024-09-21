import React, { useContext } from 'react'
import logo from "../Assets/notes.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import "./Styles/Header.css"
import { AppContext } from './Context/AppContext';


const Header = () => {

    const {toggleSideBar} = useContext(AppContext)
    return (
        <div className='header-container'>
            <div className="menu-icon">
                <h1 onClick={toggleSideBar}><GiHamburgerMenu /></h1>
            </div>
            <div className='header-logo'>
                <img src={logo} alt="Notes" width={60} height={60} />
                <h2>Notes</h2>
            </div>
            <div className="search-bar">
                <input type="search" placeholder='Search' />
                <h2><IoSearch /></h2>
            </div>
            <div className='header-toggle'>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="profile">
                <p>Name</p>
                <img src="" alt=""  width={50} height={50}/>
            </div>
        </div>
    )
}

export default Header
