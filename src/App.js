import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route path="/" element={<Home  showAlert={showAlert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn showAlert={showAlert} />} />
            <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
          </Routes>
          </div>
        </Router>
    </NoteState>
    </>
  );
}

export default App;
