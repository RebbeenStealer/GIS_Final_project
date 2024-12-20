import React from 'react';
<<<<<<< HEAD
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KakaoMap from './components/KakaoMap';
>>>>>>> 914e677 (hyerin수정작업)
import './styles/global.css';
import SignupForm from './components/SignupForm'


function App() {
  return (
    <div>
      <KakaoMap/>
      <SignupForm />
    </div>
  )
}

export default App;