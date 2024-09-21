import React, { useState } from 'react';
import "./Styles/AddNotes.css";
import Api from './Api';

const AddNotes = () => {

    const [err, setErr] = useState("");
    const [data, setData] = useState({
        title: "",
        content: ""
    });

    async function createNotes(){
        try{
            const createdData = await Api.post(`/notes/`, data, {withCredentials: true});
            console.log(createdData);
            setErr("");
        }catch(err){
            console.error("Error in creating notes", err);
            setErr("Error in creating notes");
        }
    }

    return (
        <div className='addnotes-container'>
            <div className="addnotes">
                <table>
                    <tr>
                        {/* Merging both inputs into one <td> */}
                        <td>
                            <input type="text" placeholder='Title' className="input-title" onChange={(e) => setData({...data, title:e.target.value})} value={data.title}/>
                            <input type="text" placeholder='Content' className="input-content" onChange={(e) => setData({...data, content:e.target.value})} value={data.content}/>
                        </td>
                    </tr>
                </table>
                <div id='addnotes-buttons'>
                    <button id='add' onClick={createNotes}>Add</button>
                    <button id='close'>Close</button>
                </div>
            </div>
        </div>
    );
}

export default AddNotes;
