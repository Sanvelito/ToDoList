
import axios from 'axios'
import './App.css'
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';

function App() {

    return (
        <Routes>
            <Route path="/*" element={<MainPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/registration" element={<RegistrationPage/> } />
      </Routes>
  )
}

export default App
