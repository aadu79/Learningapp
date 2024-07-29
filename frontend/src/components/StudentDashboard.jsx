// StudentDashboard.jsx
import { useState, useEffect } from 'react';
import React from 'react';
import './StudentDashboard.css';
import axios from 'axios';

const StudentDashboard = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4999/api/courses');
        setAvailableCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Fetch enrolled courses
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4999/api/student/courses');
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
    setLoading(false);
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post('http://localhost:4999/api/courses/enroll', { courseId });
      // Refresh the enrolled courses list
      const response = await axios.get('http://localhost:4999/api/student/courses');
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      
      <h2>Available Courses</h2>
      <ul>
        {availableCourses.map((course) => (
          <li key={course._id}>
            {course.title} {/* Use correct field name */}
            <button onClick={() => handleEnroll(course._id)}>Enroll</button>
          </li>
        ))}
      </ul>
      
      <h2>Enrolled Courses</h2>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course._id}>{course.title} {/* Use correct field name */}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
