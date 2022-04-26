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
function App() {
  return (
    <>
      <Router>
        <NoteState>
          <NavBar />
          <Alert message="this is alert!!" />
          <div className="container">
            <Routes>
              <Route  path="/" element={<Home />}/>
              <Route  path="/about" element={<About />}/>
              <Route  path="/signin" element={<SignIn />}/>
              <Route  path="/signup" element={<SignUp />}/>
            </Routes>
          </div>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
