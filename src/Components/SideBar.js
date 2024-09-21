import React from 'react'
import { Link } from "react-router-dom"
import { FaRegLightbulb } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import "./Styles/SideBar.css"

const SideBar = () => {
  return (
    <div className='sidebar-container'>
      <div className="notes">
        <h1><FaRegLightbulb /></h1>
        <h3>Notes</h3>
      </div>
      <div className='deleted'>
        <h1><FaRegTrashAlt /></h1>
        <h3>Bin</h3>
      </div>
      <div className='archived'>
        <h1><TiUserAdd /></h1>
        <h3>Sign Up</h3>
      </div>
      <div className='archived'>
        <h1><MdLogout /></h1>
        <h3>Logout</h3>
      </div>
    </div>
  )
}

export default SideBar
