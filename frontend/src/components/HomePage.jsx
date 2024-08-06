import { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const coursesRef = useRef(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5999/coursedetails');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="homepage-container">
      <header className="header-section">
        <img src="https://images.squarespace-cdn.com/content/v1/5ac0f1df5cfd7975ce82f777/b5c54f52-7b9b-4eb3-ae01-acb6ac3fc7d3/casual-life-3d-likes.png?format=750w" alt="Header" className="header-image" />
        <div className="header-content">
          <h1>Online Learning Platform</h1>
          <p>Explore our wide range of courses and start your learning journey today.</p>
          <div className="auth-buttons">
            <Link to="/login">
              <button className="btn login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn signup">Signup</button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <h2 ref={coursesRef}>Our Popular Courses</h2>
        <div className="courses-list">
          {courses.map(course => (
            <div key={course._id} className="course-item">
              <img src={course.courseImage} alt={course.courseTitle} className="course-image" />
              <div className="course-content">
                <h3>{course.courseTitle}</h3>
                <p>{course.courseDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
