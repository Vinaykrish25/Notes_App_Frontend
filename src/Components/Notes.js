// Notes.js
import React, { useContext } from 'react';
import "./Styles/Notes.css";
import { AppContext } from './Context/AppContext';

const Notes = () => {
  const { notes, deleteNote, editNote, error } = useContext(AppContext);

  // Handle delete button click with confirmation
  const handleDelete = (noteId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      deleteNote(noteId);
    }
  };

  // Handle edit button click
  const handleEdit = (note) => {
    editNote(note);
  };

  if (error) {
    return (
      <div className='notes-container'>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return null; // No notes to display, Background will handle the empty state
  }

  return (
    <div className='notes-container'>
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <h2>{note.title}</h2>
            <div className="notes-buttons">
              <button className='edit-button' onClick={() => handleEdit(note)}>Edit</button>
              <button className='delete-button' onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          </div>
          <div className="note-content">
            <p>{note.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
