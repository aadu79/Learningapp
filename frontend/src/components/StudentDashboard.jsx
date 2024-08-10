import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const userId = localStorage.getItem('studentId'); 

    useEffect(() => {
        if (userId) {
            fetchEnrolledCourses();
        }
    }, [userId]);

    const fetchEnrolledCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:5999/enrolledcourses/${userId}`);
            setEnrolledCourses(response.data);
        } catch (error) {
            console.log('Error fetching enrolled courses:', error);
        }
    };

    return (
        <div className="student-dashboard-container">
            <main>
                <h2>Your Enrolled Courses</h2>
                <div className="courses-list">
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course) => (
                            <Card key={course._id} className="course-item">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={course.courseImage}
                                    alt={course.courseTitle}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {course.courseTitle}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.courseDescription}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.courseCategory}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            You are not enrolled in any courses yet.
                        </Typography>
                    )}
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
