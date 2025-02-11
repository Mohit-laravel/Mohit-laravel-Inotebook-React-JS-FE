import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        if (!note.title || !note.description) {
            alert("Title and Description are required!");
            return;
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" }); // Reset form after submission
        props.showAlert("Note Added Successfully", "success")
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); 
    };

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        minLength={5}
                        value={note.title}
                        onChange={onChange}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        minLength={5}
                        value={note.description}
                        onChange={onChange}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="tag" 
                        name="tag" 
                        value={note.tag}
                        onChange={onChange} 
                    />
                </div>
                <button 
                    disabled={note.title.length < 5 || note.description.length < 5}
                    type="submit" 
                    className="btn btn-primary" 
                    onClick={handleClick}>
                    Add Note
                </button>
            </form>
        </div>
    );
}

export default AddNote;
