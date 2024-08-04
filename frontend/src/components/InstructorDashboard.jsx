import { useEffect, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5999/coursedetails');
            setRows(response.data);
        } catch (error) {
            console.log('error:', error);
        }
    };

    const del_Value = async (id) => {
        try {
            await axios.delete(`http://localhost:5999/deletecourse/${id}`);
            alert('Course deleted');
            fetchCourses();  // Refresh the list after deletion
        } catch (error) {
            console.log(error);
        }
    };

    const update_Value = (val) => {
        navigate('/instructor-addcourse', { state: { val } });
    };
    const handleCreateNew = () => {
        navigate('/instructor-addcourse');
      };

    return (
        <div className="homepage-container">
            <main>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Instructor Dashboard</h2>
        <div style={{ marginLeft: 'auto' }}>
          <Button
          className="create-new-button"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            style={{ borderRadius: '20px', padding: '10px 20px' }}
          >
            Create New
          </Button>
        </div>
      </div>
                <div className="courses-list">
                    {rows.map((row, index) => (
                        <div key={index} className="course-item">
                            <img src={row.courseImage} alt={row.courseTitle} className="course-image" />
                            <div className="course-content">
                                <h3>{row.courseTitle}</h3>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {row.courseDescription}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {row.courseCategory}
                                </Typography>
                                <CardActions>
                                    <Button className="update-button" variant='contained' onClick={() => update_Value(row)}>Update</Button>
                                    <Button className="delete-button" variant='contained' onClick={() => del_Value(row._id)}>Delete</Button>
                                </CardActions>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InstructorDashboard;
