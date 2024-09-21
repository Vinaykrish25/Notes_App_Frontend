import React, { useContext } from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';
import WorkPage from '../WorkPage';
import { AppContext } from '../Context/AppContext';
import Backgound from '../Backgound';
import AddNotes from '../AddNotes';

const Layout = () => {
  const { isSideBarVisible, notes, isOpen } = useContext(AppContext);  // Only track sidebar visibility

  return (
    <div>
      <Header />
      
      <div style={{ display: 'flex' }}>
        {/* Render Sidebar only when visible */}
        {isSideBarVisible && <SideBar />} 

        {/* Render WorkPage regardless of Sidebar visibility */}
        <div style={{ flexGrow: 1 }}>
          <WorkPage />
          { isOpen === true && <AddNotes />}
          { (notes === 0 || isOpen === false) && <Backgound/>}
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
