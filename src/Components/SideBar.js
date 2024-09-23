import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaRegLightbulb } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import "./Styles/SideBar.css"
import Api from './Api';

const SideBar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
          const response = await Api.post('/users/logout', {}, { withCredentials: true });
          navigate('/'); 
          console.log(response)
      } catch (err) {
          console.error('Error logging out:', err);
      }
  };

  return (
    <div className='sidebar-container'>
      <Link to="/signup"><div className='sign'>
        <h1><TiUserAdd /></h1>
        <h3>Sign Up</h3>
      </div></Link>
      <div className='logout' onClick={handleLogout}>
        <h1><MdLogout /></h1>
        <h3>Logout</h3>
      </div>
    </div>
  )
}

export default SideBar
