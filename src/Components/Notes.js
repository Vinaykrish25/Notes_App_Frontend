import React, { useContext, useRef, useState } from "react";
import "./Styles/Notes.css";
import { AppContext } from "./Context/AppContext";
import ConfirmDelete from "./ConfirmDelete";

const Notes = () => {
  const { notes, deleteNote, editNote, error, searchQuery } = useContext(AppContext);
  const deleteRef = useRef();
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Open confirmation dialog
  const handleDelete = (noteId) => {
    setNoteToDelete(noteId);
    deleteRef.current.showModal();
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
      setNoteToDelete(null);
      deleteRef.current.close();
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setNoteToDelete(null);
    deleteRef.current.close();
  };

  // Edit handler
  const handleEdit = (note) => {
    editNote(note);
  };

  // Filter by search
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="notes-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <div className="notes-container">
        <h3 className="no-notes-message">No notes found.</h3>
      </div>
    );
  }

  return (
    <div className="notes-container">
      {filteredNotes.map((note) => (
        <div key={note._id} className="note-card">
          <div className="note-header">
            <h2>{note.title}</h2>
            <div className="notes-buttons">
              <button className="edit-button" onClick={() => handleEdit(note)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="note-content">
            <p>{note.content}</p>
          </div>
          <br />
          <hr />
          <br />
          <div className="createdBy">
            <h5 style={{ fontWeight: "lighter" }}>
              Created By:{" "}
              <span style={{ fontWeight: "lighter", color: "red" }}>
                {note.createdBy}
              </span>
            </h5>
            <h5 style={{ fontWeight: "lighter" }}>
              Date:{" "}
              <span style={{ fontWeight: "lighter", color: "green" }}>
                {note.createdDate}
              </span>{" "}
              and Time:{" "}
              <span style={{ fontWeight: "lighter", color: "green" }}>
                {note.createdTime}
              </span>
            </h5>
          </div>
        </div>
      ))}
      <ConfirmDelete
        ref={deleteRef}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
    </div>
  );
};

export default Notes;
