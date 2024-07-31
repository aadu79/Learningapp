
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import InstructorLogin from './components/InstructorLogin';
import InstructorSignup from './components/InstructorSignup';
import StudentDashboard from './components/StudentDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/student-login' element={<StudentLogin/>}></Route>
      <Route path='/student-signup' element={<StudentSignup/>}></Route>
      <Route path='/instructor-login' element={<InstructorLogin/>}></Route>
      <Route path='/instructor-signup' element={<InstructorSignup/>}></Route>
      <Route path='/student-dashboard' element={<StudentDashboard/>}></Route>
      <Route path='/instructor-dashboard' element={<InstructorDashboard/>}></Route>
    </Routes>
    </>
  );
};

export default App
