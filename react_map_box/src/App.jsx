import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
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