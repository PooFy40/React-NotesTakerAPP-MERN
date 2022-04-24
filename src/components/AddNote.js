import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/notecontext'
const AddNote = () => {
  const context =useContext(noteContext)
  const {addnote}=context

  const [note,setNote]=useState({title:"",description:"",tag:"default"})

  const submit=(e)=>{
    e.preventDefault()
    addnote(note.title,note.description,note.tag)
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
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>ADD Note</button>
      </form>
      </div>
      
    </div>
  )
}

export default AddNote
