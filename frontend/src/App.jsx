
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
// import StudentLogin from './components/StudentLogin';
// import StudentSignup from './components/StudentSignup';
// import InstructorLogin from './components/InstructorLogin';
// import InstructorSignup from './components/InstructorSignup';
import StudentDashboard from './components/StudentDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import Navbar from './components/Navbar';
import InstructorAddcourse from './components/InstructorAddcourse';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      {/* <Route path='/student-login' element={<StudentLogin/>}></Route>
      <Route path='/student-signup' element={<StudentSignup/>}></Route>
      <Route path='/instructor-login' element={<InstructorLogin/>}></Route>
      <Route path='/instructor-signup' element={<InstructorSignup/>}></Route> */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/student-dashboard' element={<StudentDashboard/>}></Route>
      <Route path='/instructor-dashboard' element={<InstructorDashboard/>}></Route>
      <Route path='/instructor-addcourse' element={<InstructorAddcourse/>}></Route>
    </Routes>
    </>
  );
};

export default App
