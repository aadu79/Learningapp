import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [expandedCourseId, setExpandedCourseId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5999/enrolledcourses/${email}`);
                setEnrolledCourses(response.data);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
                setError('Failed to load enrolled courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchEnrolledCourses();
        } else {
            setLoading(false);
        }
    }, [email]);

    const toggleExpand = (id) => {
        setExpandedCourseId(expandedCourseId === id ? null : id); 
    };

    if (loading) {
        return (
            <div className="student-dashboard-container">
                <main>
                    <CircularProgress />
                    <Typography variant="body1" color="text.secondary">
                        Loading courses...
                    </Typography>
                </main>
            </div>
        );
    }

    return (
        <div className="student-dashboard-container">
            <main>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h4" gutterBottom>
                        Your Enrolled Courses
                    </Typography>
                </div>
                {error && <Typography color="error">{error}</Typography>}
                <div className="courses-list">
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course) => (
                            <Card key={course._id} sx={{ maxWidth: 345, margin: 2 }} className="course-item">
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={course.courseImage || "https://techiecub.com/wp-content/uploads/2021/02/AI-1.png"}
                                    title={course.courseTitle || "Course"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {course.courseTitle || "Course Title"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.courseDescription || "Course description"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.courseCategory || "Course category"}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => toggleExpand(course._id)}
                                    >
                                        {expandedCourseId === course._id ? 'Hide Details' : 'Show Details'}
                                    </Button>
                                    {expandedCourseId === course._id && (
                                        <Typography sx={{ mt: 1 }} color="text.secondary">
                                            <strong>Content URL:</strong> <a href={course.courseContent} target="_blank" rel="noopener noreferrer">{course.courseContent}</a>
                                        </Typography>
                                    )}
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
