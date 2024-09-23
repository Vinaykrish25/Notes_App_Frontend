import React, { forwardRef } from 'react';
import "./Styles/ConfirmDelete.css";

const ConfirmDelete = forwardRef(({ confirmDelete, cancelDelete }, ref) => {
  return (
    <div className='dialog-container'>
      <dialog ref={ref}>
        <p>
          Are you sure you want to delete this note?
        </p>
        <div className="dialog-buttons">
          <button onClick={confirmDelete} className='confirm'>Delete</button>
          <button onClick={cancelDelete} className='cancel'>Cancel</button>
        </div>
      </dialog>
    </div>
  );
});

export default ConfirmDelete;
