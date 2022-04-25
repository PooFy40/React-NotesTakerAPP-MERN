import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/notecontext'
const AddNote = () => {
  const context =useContext(noteContext)
  const {addnote}=context

  const [note,setNote]=useState({title:"",description:"",tag:""})

  const submit=(e)=>{
    e.preventDefault()
    addnote(note.title,note.description,note.tag)
    setNote({title:"",description:"",tag:""})
  }


  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})

  }

  return (
    <div>
        <div className="container my-3">
      <h1>ADD A NOTE</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title} minLength={5} required aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} minLength={5} required onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} minLength={5} required onChange={onChange}/>
        </div>
        <button type="submit" disabled={note.title.length<=5||note.description.length<=5}  className="btn btn-primary" onClick={submit}>ADD Note</button>
      </form>
      </div>
      
    </div>
  )
}

export default AddNote
