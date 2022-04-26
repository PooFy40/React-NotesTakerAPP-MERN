import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useState } from 'react';
function App() {
  const [alert,setalert]=useState(null)

  const showAlert=(message,type)=>
  {
    setalert({
      msg:message,
      type:type
    })

    setTimeout(() => {
      setalert(null)
      
    }, 2000);
  }
  return (
    <>
      <Router>
        <NoteState>
          <NavBar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route  path="/" element={<Home showAlert={showAlert} />}/>
              <Route  path="/about" element={<About />}/>
              <Route  path="/signin" element={<SignIn showAlert={showAlert} />}/>
              <Route  path="/signup" element={<SignUp showAlert={showAlert} />}/>
            </Routes>
          </div>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
