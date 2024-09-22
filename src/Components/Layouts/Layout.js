import React, { useContext } from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';
import { AppContext } from '../Context/AppContext';
import Backgound from '../Backgound';
import AddNotes from '../AddNotes';
import Notes from '../Notes';

const Layout = () => {
  const { isSideBarVisible, notes, isOpen } = useContext(AppContext);

  return (
    <div>
      <Header />

      <div style={{ display: 'flex' }}>
        {/* Render Sidebar only when visible */}
        {isSideBarVisible && <SideBar />}

        {/* Main Content Area */}
        <div style={{ flexGrow: 1, padding: '20px' }}>

          {/* AddNotes Component */}
          <AddNotes />

          {/* Conditionally render Notes or Background */}
          {notes.length > 0 ? (
            <div style={{ marginTop: '20px' }}>
              <Notes />
            </div>
          ) : (
            notes.length === 0 && <Backgound />
          )}
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
