import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:8000"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    //get all notes

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token" :localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setNotes(json);
    }

    //add a note

    const addNote = async(title, description, tag) => {
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token" :localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //delete a note

    const deleteNote = async(id) => {
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token" :localStorage.getItem('token')
            },
        })
        
        setNotes(notes.filter((note) => note._id !== id));
        
    }


    //edit a note
    const editNote = async(id, title, description, tag) => {
        //api call
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token" :localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })
        const json = await response.json();
        console.log(json);
        const newNote = notes.map((note) => {
            if (note._id === id) {
                note.title = title;
                note.description = description;
                note.tag = tag;
            }
            return note;
        });

        setNotes(newNote);
    }

    return (
        <NoteContext.Provider value={{notes, addNote,editNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
