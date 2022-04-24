import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/notecontext'
import { useEffect } from 'react'

const About = () => {
  const a=useContext(noteContext)
  useEffect(()=>{
    a.update()
  },[])
  return (
    <div>
      ABOUT {a.state.name}
      
    </div>
  )
}

export default About
