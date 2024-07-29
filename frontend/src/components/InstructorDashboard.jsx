import { useState, useEffect } from 'react';
import axios from 'axios';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({ title: '', description: '', category: '' });
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4999/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({ ...prevCourse, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('category', course.category);
    if (image) formData.append('image', image);
  
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
  
    try {
      await axios.post('http://localhost:4999/api/courses/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh courses list after creating a new course
      const response = await axios.get('http://localhost:4999/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };
  
  const handleUploadContent = async (courseId) => {
    const formData = new FormData();
    files.forEach(file => formData.append('content', file));
  
    try {
      await axios.post(`http://localhost:4999/api/courses/upload-content/${courseId}`, formData);
    } catch (error) {
      console.error('Error uploading content:', error);
    }
  };
  
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:4999/api/courses/delete/${courseId}`);
      // Refresh courses list after deletion
      const response = await axios.get('http://localhost:4999/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  

  return (
    <div className="instructor-dashboard">
      <h1>Instructor Dashboard</h1>

      <form onSubmit={handleSubmitCourse} className="course-form">
        <h2>Create a New Course</h2>
        <input type="text" name="title" value={course.title} onChange={handleInputChange} placeholder="Course Title" required />
        <textarea name="description" value={course.description} onChange={handleInputChange} placeholder="Course Description" required />
        <input type="text" name="category" value={course.category} onChange={handleInputChange} placeholder="Category" required />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Create Course</button>
      </form>

      <h2>Manage Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={() => handleUploadContent(course._id)}>Upload Content</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorDashboard;
