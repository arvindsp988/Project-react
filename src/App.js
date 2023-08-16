import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import GithubProfiles from './Components/Github-Profiles/GithubProfiles';
import Notes from './Components/Notes/Notes';
import Login from './Components/Signup-Login/Login';
import Signup from './Components/Signup-Login/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/GithubProfiles' element={<GithubProfiles />} />
          <Route path='/Notes' element={<Notes />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
