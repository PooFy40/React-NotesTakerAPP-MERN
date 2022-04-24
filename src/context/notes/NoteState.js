import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesinitial=[]

      const [notes,setNote]=useState(notesinitial)

       //get All note
       const getnotes=async()=>{

        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2M2VkMWZmYWUyNTFlODdkMTNmM2MwIn0sImlhdCI6MTY1MDcxNTk3N30.Qh6X-aS3RJ6ssBLN96DDcD9nOiuV71HG9Uw5jxC2THk'
          }
      })
      const json= await response.json()
      // console.log(json);
      setNote(json)


      }

      //ADD note
      const addnote=async(title,description,tag)=>{

        const response=await fetch(`${host}/api/notes/addnote`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2M2VkMWZmYWUyNTFlODdkMTNmM2MwIn0sImlhdCI6MTY1MDcxNTk3N30.Qh6X-aS3RJ6ssBLN96DDcD9nOiuV71HG9Uw5jxC2THk'
          },
          body:JSON.stringify({title,description,tag})
      })
      const json= response.json()


      
        const note={
          "_id": "62645fde71b5dwrw33c3d699549c7",
          "user": "6263ed1ffae251e87d13f3c0",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-04-23T20:15:45.740Z",
          "__v": 0
        }

        setNote(notes.concat(note))
      }
      //DELETE note
      const deletenote=async(id)=>{
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2M2VkMWZmYWUyNTFlODdkMTNmM2MwIn0sImlhdCI6MTY1MDcxNTk3N30.Qh6X-aS3RJ6ssBLN96DDcD9nOiuV71HG9Uw5jxC2THk'
          },
          
      })
      const json= response.json()
      
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNote(newNotes)
      }
      //EDIT note
      const editnote=async(id,title,description,tag)=>{

        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2M2VkMWZmYWUyNTFlODdkMTNmM2MwIn0sImlhdCI6MTY1MDcxNTk3N30.Qh6X-aS3RJ6ssBLN96DDcD9nOiuV71HG9Uw5jxC2THk'
          },
          body:JSON.stringify({title,description,tag})
      })
      const json= response.json()
      



        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id)
          {
            element.title=title
            element.description=description
            element.tag=tag
          }
          
        }
      }
return(
    <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getnotes}}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NoteState
