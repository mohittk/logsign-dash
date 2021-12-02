
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';



function App() {
  return (
    <>

<Navbar />
    <Routes>
      <Route exact path="/" element={<Landing/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<Login/>} />
    </Routes>

    </>
   
  )
}

export default App;
