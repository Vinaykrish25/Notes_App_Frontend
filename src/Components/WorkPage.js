import React, { useContext } from 'react'
import "./Styles/WorkPage.css"
import { IoMdAdd } from "react-icons/io";
import { AppContext } from './Context/AppContext';

const WorkPage = () => {

  const { handleNotes } = useContext(AppContext);
  return (
    <div className='workpage-container'>
      <div className="notes-input">
        <h1 onClick={handleNotes}><IoMdAdd /></h1>
        <h2 onClick={handleNotes}>Take a Note...</h2>
      </div>
    </div>
  )
}

export default WorkPage
