import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layouts/Layout";
import { AppContext } from "./Components/Context/AppContext";
import { useState, useEffect } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import Api from "./Components/Api";

function App() {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSideBar = () => setSideBarVisible(!isSideBarVisible);

  // ✅ Fetch notes from API
  const fetchNotes = async () => {
    try {
      const response = await Api.get("/notes/");
      setNotes(response.data.data);
      setError("");
    } catch (err) {
      console.error("Error in fetching notes", err);
      setError(err?.response?.data?.message || "Failed to fetch notes. Please try again.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Add a new note
  const addNote = async (newNoteData) => {
    try {
      const response = await Api.post("/notes/", newNoteData);
      const createdNote = response.data.data;
      setNotes((prev) => [...prev, createdNote]);
      setIsOpen(false);
      setError("");
    } catch (err) {
      console.error("Error in creating note", err);
      setError(err?.response?.data?.message || "Error in creating note. Please try again.");
    }
  };

  // ✅ Delete a note
  const deleteNote = async (noteId) => {
    try {
      await Api.delete(`/notes/${noteId}`);
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      setError("");
    } catch (err) {
      console.error("Error in deleting note", err);
      setError(err?.response?.data?.message || "Error in deleting note. Please try again.");
    }
  };

  // ✅ Prepare note for editing
  const editNote = (note) => {
    setCurrentNote(note);
    setIsOpen(true);
  };

  // ✅ Update a note
  const updateNote = async (updatedNoteData) => {
    try {
      const response = await Api.patch(`/notes/${updatedNoteData._id}`, updatedNoteData);
      const updated = response.data.data;
      setNotes((prev) =>
        prev.map((note) => (note._id === updated._id ? updated : note))
      );
      setIsOpen(false);
      setCurrentNote(null);
      setError("");
    } catch (err) {
      console.error("Error in updating note", err);
      setError(err?.response?.data?.message || "Error in updating note. Please try again.");
    }
  };

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
          fetchNotes,
          searchQuery,
          setSearchQuery,
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
