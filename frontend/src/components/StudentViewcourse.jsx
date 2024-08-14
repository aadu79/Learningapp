import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './StudentViewcourse.css';

const StudentViewcourse = () => {
    const [courses, setCourses] = useState([]);
    const email = localStorage.getItem('userEmail');

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

    const handleEnrollCourse = async (courseId) => {
        if (!email) {
            alert('No email found. Please log in.');
            return;
        }

        try {
            await axios.post('http://localhost:5999/enrollcourse', { courseId, email });
            alert('Successfully enrolled in the course');
            fetchCourses();
        } catch (error) {
            console.error('Error enrolling course:', error);
            alert('Failed to enroll course. Please try again.');
        }
    };

    return (
        <div className="student-view-course-container">
            <main>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h4" gutterBottom>
                        Available Courses
                    </Typography>
                </div>
                <div className="courses-list">
                    {courses.map((course) => (
                        <div key={course._id} className="course-item">
                            <img
                                src={course.courseImage || "https://via.placeholder.com/300x140?text=No+Image"}
                                alt={course.courseTitle || "Course"}
                                className="course-image"
                            />
                            <div className="course-content">
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.courseTitle || "Course Title"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {course.courseDescription || "Course description"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {course.courseCategory || "Course category"}
                                </Typography>
                            </div>
                            <Button 
                                className="enroll-button" 
                                variant="contained" 
                                onClick={() => handleEnrollCourse(course._id)}
                            >
                                Enroll Course
                            </Button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default StudentViewcourse;
