import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './StudentViewcourse.css';

const StudentViewcourse = () => {
    const [courses, setCourses] = useState([]);
    const [enrollError, setEnrollError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5999/coursedetails');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setEnrollError('Failed to load courses. Please try again later.');
        }
    };

    const getStudentIdFromToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                return decodedToken.id; 
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
        return null;
    };

    const handleEnrollCourse = async (courseId) => {
        const studentId = getStudentIdFromToken();
        if (!studentId) {
            alert('No student ID found. Please log in.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5999/enrollcourse',
                { courseId, userId: studentId } 
            );
            alert(response.data.message || 'Successfully enrolled in the course'); 
            fetchCourses(); 
        } catch (error) {
            console.error('Error enrolling course:', error);
            setEnrollError('Failed to enroll course. Please try again.');
        }
    };

    return (
        <div className="homepage-container">
            <main>
                <h2>Available Courses</h2>
                {enrollError && <p style={{ color: 'red' }}>{enrollError}</p>} 
                <div className="courses-list">
                    {courses.map((course) => (
                        <div key={course._id} className="course-item">
                            <img src={course.courseImage} alt={course.courseTitle} className="course-image" />
                            <div className="course-content">
                                <h3>{course.courseTitle}</h3>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {course.courseDescription}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {course.courseCategory}
                                </Typography>
                                <button 
                                    className="view-button" 
                                    onClick={() => handleEnrollCourse(course._id)}
                                >
                                    Enroll Course
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default StudentViewcourse;
