import React, { useContext, useState, useEffect } from 'react';
import "./Styles/AddNotes.css";
import { AppContext } from './Context/AppContext';

const AddNotes = () => {
  const { addNote, updateNote, isOpen, setIsOpen, currentNote, error } = useContext(AppContext);
  const [data, setData] = useState({
    title: "",
    content: ""
  });
  const [err, setErr] = useState("");

  // Populate form fields when editing a note
  useEffect(() => {
    if (currentNote) {
      setData({
        title: currentNote.title,
        content: currentNote.content
      });
    } else {
      setData({
        title: "",
        content: ""
      });
    }
  }, [currentNote]);

  // Handle form submission
  const handleSubmit = async () => {
    if (data.title.trim() === "" || data.content.trim() === "") {
      setErr("Both Title and Content are required.");
      setTimeout(() => {
        setErr("")
      },2000)
      return;
    }

    if (currentNote) {
      // Update existing note
      await updateNote({ ...data, _id: currentNote._id });
    } else {
      // Add new note
      await addNote(data);
    }

    // Reset form after submission
    setData({ title: "", content: "" });
  };

  // Handle form cancellation
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className='addnotes-container'>
      <div className="addnotes">
        <p style={{textAlign: "center", color: " red", fontWeight: "bold"}}>{err}</p>
        <br />
        {isOpen ? (
          <div>
            <h2>{currentNote ? "Edit Note" : "Add Note"}</h2>
            <table>
              <tbody>
                <tr>
                  {/* Merging both inputs into one <td> */}
                  <td>
                    <input
                      type="text"
                      placeholder='Title'
                      className="input-title"
                      onChange={(e) => setData({ ...data, title: e.target.value })}
                      value={data.title}
                    />
                    <textarea
                      placeholder='Content'
                      className="input-content"
                      onChange={(e) => setData({ ...data, content: e.target.value })}
                      value={data.content}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div id='addnotes-buttons'>
              <button id='add' onClick={handleSubmit}>{currentNote ? "Update" : "Add"}</button>
              <button id='close' onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <button id='add-note-button' onClick={() => setIsOpen(true)}>Add Note</button>
        )}
      </div>
    </div>
  );
}

export default AddNotes;
