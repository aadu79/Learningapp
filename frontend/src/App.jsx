import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import InstructorLogin from './components/InstructorLogin';
import InstructorSignup from './components/InstructorSignup';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/student-login' element={<StudentLogin/>}></Route>
      <Route path='/student-signup' element={<StudentSignup/>}></Route>
      <Route path='/instructor-login' element={<InstructorLogin/>}></Route>
      <Route path='/instructor-signup' element={<InstructorSignup/>}></Route>

    </Routes>
  );
};

export default App
