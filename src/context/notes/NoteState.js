import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []

  const [notes, setNote] = useState(notesinitial)

  //get All note
  const getnotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json()
    // console.log(json);
    setNote(json)


  }

  //ADD note
  const addnote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })

    const note = await response.json()
    setNote(notes.concat(note))
  }
  //DELETE note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    })
    response.json()

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNote(newNotes)
  }
  //EDIT note
  const editnote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    response.json()




    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }

    }
  }
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState
