import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/notecontext'
import Noteitem from './Noteitem'
import AddNote from "./AddNote"

const Notes = () => {
  const context = useContext(noteContext)
  const { notes, getnotes } = context
  useEffect(() => {
    getnotes()
  })
  const ref = useRef(null)
  const [note,setNote]=useState({etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }

  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})

  }


  return (
    <>
      {/* // < !--Button trigger modal-- > */}
      <button type="button" className="btn btn-primary d-none " ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* // <!--Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>



      <AddNote />
      <div className='row my-3'>
        <h1>Your Notes </h1>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>

    </>
  )
}

export default Notes
