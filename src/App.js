import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Components/Layouts/Layout";
import { AppContext } from "./Components/Context/AppContext";
import { useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"

function App() {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [notes, setNotes] = useState(0)
  const [isOpen, setIsOpen] = useState(false);

  function toggleSideBar() {
    setSideBarVisible(!isSideBarVisible)
  }

  function handleNotes(notesCount){
    setIsOpen(!isOpen);
    setNotes(notesCount+1)
  }

  return (
    <div className="App">
      <AppContext.Provider value={{isSideBarVisible, toggleSideBar, notes, handleNotes, isOpen}}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/notes" element={<Layout />}>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>

    </div>
  );
}

export default App;
