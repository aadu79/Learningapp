import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Mock data for courses; replace this with actual data fetching
    const mockCourses = [
      { id: 1, title: 'Introduction to Programming', description: 'Learn the basics of programming.', image: 'https://img.freepik.com/premium-photo/creative-desktop-wallpaper_941097-71392.jpg' },
      { id: 2, title: 'Data Science Fundamentals', description: 'Dive into the world of data science.', image: 'https://media.istockphoto.com/id/1448152453/vector/big-data-technology-and-data-science-illustration-data-flow-concept-querying-analysing.jpg?s=612x612&w=0&k=20&c=To0lhCrVmDYdSkOUOGxGsjlYe0buj_wwGCDqYhF9p2o=' },
      { id: 3, title: 'Web Development Bootcamp', description: 'Become a full-stack web developer.', image: 'https://e0.pxfuel.com/wallpapers/358/714/desktop-wallpaper-stefan-iordache-your-desired-developer-to-make-your-perfect-responsive-website-web-programming.jpg' },
    ];
    setCourses(mockCourses);
  }, []);

  return (
    <div className="homepage-container">
      <header className="header-section">
        <img src="https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg" alt="Header" className="header-image" />
        <div className="header-content">
          <h1>Online Learning Platform</h1>
          <p>Explore our wide range of courses and start your learning journey today.</p>
          <div className="auth-buttons">
            <Link to="/student-login">
              <button className="btn student-login">Student Login</button>
            </Link>
            <Link to="/student-signup">
              <button className="btn student-signup">Student Signup</button>
            </Link>
            <Link to="/instructor-login">
              <button className="btn instructor-login">Instructor Login</button>
            </Link>
            <Link to="/instructor-signup">
              <button className="btn instructor-signup">Instructor Signup</button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <h2>Our Popular Courses</h2>
        <div className="courses-list">
          {courses.map(course => (
            <div key={course.id} className="course-item">
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
