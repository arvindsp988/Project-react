import React, { useState, useEffect, useRef } from 'react';
import './Notes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faTrash, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(``);
  const [noteIndex, setNoteIndex] = useState(-1);
  const [dataLoaded, setDataLoaded] = useState(false);
  // const [viewNotes, setViewNotes] = useState(false);

  // Add or Edit
  const addNote = () => {
    if (title && description && noteIndex !== -1) {
      const editedNote = [...notes];
      editedNote[noteIndex].title = title;
      editedNote[noteIndex].description = description;
      editedNote[noteIndex].time = getCurrentTime();
      setNotes([...notes]);
      setNoteIndex(-1);
      setTitle('');
      setDescription('');
    }
    else if (title && description) {
      const newNote = {
        title: title,
        description: description,
        time: getCurrentTime(),
      }

      setNotes([...notes, newNote]);
      setTitle('');
      setDescription('');
      setDataLoaded(true);
    }
    else {
      setError("Title & Description required");
      setTimeout(() => {
        setError('');
      }, 20000);
    }

  }

  //reset input
  const resetInputs = () => {
    setTitle('');
    setDescription('');
    setNoteIndex(-1);
  }

  //show notes
  const showNotes = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }

  // Edit
  const editBtn = (index) => {
    const editNote = notes[index];
    setTitle(editNote.title);
    setDescription(editNote.description);
    setNoteIndex(index);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Delete
  const deleteBtn = (index) => {
    const deleteNote = [...notes];
    deleteNote.splice(index, 1);
    setNotes(deleteNote);
    resetInputs();
  }


  // Time      
  const getCurrentTime = () => {
    const date = new Date();
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toLocaleTimeString(undefined, options);
    return `${currentDate} ${currentTime}`;
  }


  //donwload note
  const downloadNote = useRef(null);

  const handleDownload = async () => {
    if (!downloadNote.current) {
      return;
    }

    htmlToImage
      .toBlob(downloadNote.current)
      .then((blob) => {
        saveAs(blob, `Note ${new Date().toLocaleDateString()}.jpg`);
      })
      .catch((error) => {
        console.error("Error generating and saving image:", error);
      });

  };


  // Retrieve Data from Local Storage on Page Reload
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes && !dataLoaded) {
      setNotes(JSON.parse(storedNotes));
      setDataLoaded(true);
    }
  }, [dataLoaded]);



  // Store Data to Local Storage
  useEffect(() => {
    if (notes && dataLoaded) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, dataLoaded]);

  
  return (
    <>
      {/* Add card */}
      <div className='notes-container' style={{ display: 'show' }}>
        <h1>Note App</h1>
        <div className="container">
          {/* Error */}
          {error && <div className='error'>{error}</div>}
          <input type="text" value={title} placeholder='Enter title here' onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} placeholder='Your description goes here' cols="30" rows="10" onChange={(e) => setDescription(e.target.value)}></textarea>
          <div className='buttons'>

            <button onClick={addNote}>Save Note</button>
            {(title.length || description.length) === 0 && notes.length === 0 ?
              null :
              ((title.length || description.length) > 0) ? (
                <button onClick={resetInputs}>Reset</button>
              ) : (
                <button onClick={showNotes}>Show Notes</button>
              )}
          </div>
        </div>
      </div>

      {/* display card with condition*/}
      {notes.length !== 0 ? (
        <div className="display-notes-container" >
          <h1>Your created notes</h1>
          <div className="card-container">
            {notes.map((newNote, index) => (
              <li className="note-card" key={index} ref={downloadNote}>
                <div className="card-details">
                  <p>{newNote.title}</p>
                  <span>{newNote.description}</span>
                </div>
                <div className="card-buttons">
                  <span>{newNote.time}</span>
                  <div className='buttons'>
                    <button className="button-edit" onClick={() => editBtn(index)}>
                      <FontAwesomeIcon icon={faFilePen} beat size="xl" style={{ color: "white", }} />
                    </button>
                    <button className="button-delete" onClick={() => deleteBtn(index)}>
                      <FontAwesomeIcon icon={faTrash} beat size="xl" style={{ color: "white", }} />
                    </button>
                    <button className="button-download" title='download' onClick={handleDownload}>
                      <FontAwesomeIcon icon={faFileArrowDown} size="xl" style={{ color: "#ffffff", }} />
                    </button>
                  </div>
                </div>
              </li>
            )
            )}
          </div>
        </div>
      ) : ('')}


    </>
  )
}

export default Notes
