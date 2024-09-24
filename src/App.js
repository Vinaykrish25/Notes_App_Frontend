import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layouts/Layout";
import { AppContext } from "./Components/Context/AppContext";
import { useState, useEffect } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import axios from "axios"; // Ensure Api is correctly imported

function App() {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [notes, setNotes] = useState([]); // Initialize as an empty array
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(""); // To handle fetch errors
  const [currentNote, setCurrentNote] = useState(null); // Note being edited
  const [searchQuery, setSearchQuery] = useState(""); // New search state

  // Function to toggle sidebar visibility
  function toggleSideBar() {
    setSideBarVisible(!isSideBarVisible);
  }

  // Function to fetch notes from API
  async function fetchNotes() {
    try {
      const response = await axios.get("https://notes-app-backend-theta.vercel.app/notes/", {}, { withCredentials: true });
      setNotes(response.data.data); 
      setError("");
    } catch (err) {
      console.error("Error in fetching notes", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to fetch notes. Please try again.");
      }
    }
  }

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to add a new note
  async function addNote(newNoteData) {
    try {
      const createdNote = await axios.post("https://notes-app-backend-theta.vercel.app/notes/", newNoteData, { withCredentials: true });
      setNotes([...notes, createdNote.data.data]); // Adjust based on your axios response structure
      setIsOpen(false); // Close the AddNotes form after adding
      setError("");
    } catch (err) {
      console.error("Error in creating note", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error in creating note. Please try again.");
      }
    }
  }

  // Function to delete a note
  async function deleteNote(noteId) {
    try {
      await axios.delete(`https://notes-app-backend-theta.vercel.app/notes/${noteId}`, { withCredentials: true });
      setNotes(notes.filter(note => note.id !== noteId));
      setError("");
    } catch (err) {
      console.error("Error in deleting note", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error in deleting note. Please try again.");
      }
    }
  }

  // Function to set the current note for editing
  function editNote(note) {
    setCurrentNote(note);
    setIsOpen(true); // Open the AddNotes form in edit mode
  }

  // Function to update an existing note
  async function updateNote(updatedNoteData) {
    try {
      const response = await axios.patch(`https://notes-app-backend-theta.vercel.app/notes/${updatedNoteData.id}`, updatedNoteData, { withCredentials: true });
      setNotes(notes.map(note => (note.id === updatedNoteData.id ? response.data.data : note)));
      setIsOpen(false); // Close the AddNotes form after updating
      setCurrentNote(null);
      setError("");
    } catch (err) {
      console.error("Error in updating note", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error in updating note. Please try again.");
      }
    }
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          isSideBarVisible,
          toggleSideBar,
          notes,
          addNote,
          deleteNote,
          editNote,
          updateNote,
          isOpen,
          setIsOpen,
          currentNote,
          error,
          fetchNotes, // Provide fetchNotes in case other components need to refresh notes
          searchQuery, // Provide searchQuery
          setSearchQuery, // Provide setSearchQuery
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
