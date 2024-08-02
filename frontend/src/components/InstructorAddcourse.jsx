import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './InstructorAddcourse.css';

const InstructorAddcourse = () => {
  const [form, setForm] = useState({
    courseTitle: "",
    courseDescription: "",
    courseCategory: "",
    courseImage: ""
  });

  const location = useLocation();

  function fieldValue(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function valueAdd() {
    if (location.state != null) {
      axios.put('http://localhost:5999/editcourse/' + location.state.val._id, form).then(() => {
        alert('Course updated');
      }).catch((error) => {
        console.log(error);
      });
    } 
    else {
      axios.post('http://localhost:5999/addcourse', form).then(() => {
        alert('New Course Added');
      }).catch((error) => {
        console.log(error);
      });
    }
  }

 useEffect(() => {
    if (location.state != null) {
      setForm({
        ...form,
        courseTitle: location.state.val.courseTitle,
        courseDescription: location.state.val.courseDescription,
        courseCategory: location.state.val.courseCategory,
        courseImage: location.state.val.courseImage
      });
    } else {
      setForm({
        ...form,
        courseTitle: "",
        courseDescription: "",
        courseCategory: "",
        courseImage: ""
      });
    }
  }, []);

  return (
    <div className="instructor-addcourse-container">
      <div className="instructor-addcourse-content">
        <h2>{location.state != null ? 'Update Course' : 'Add Course'}</h2>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <div className="form-group">
            <label htmlFor="courseTitle">Course Title</label>
            <TextField
              required
              id="courseTitle"
              name='courseTitle'
              onChange={fieldValue}
              value={form.courseTitle}
              variant="outlined"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseDescription">Course Description</label>
            <TextField
              required
              id="courseDescription"
              name='courseDescription'
              onChange={fieldValue}
              value={form.courseDescription}
              variant="outlined"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseCategory">Course Category</label>
            <TextField
              required
              id="courseCategory"
              name='courseCategory'
              onChange={fieldValue}
              value={form.courseCategory}
              variant="outlined"
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseImage">Course Image URL</label>
            <TextField
              required
              id="courseImage"
              name='courseImage'
              onChange={fieldValue}
              value={form.courseImage}
              variant="outlined"
            />
          </div>
          <Button
            variant='contained'
            onClick={valueAdd}
            className="btn addcourse-btn"
          >
            {location.state != null ? 'Update Course' : 'Add Course'}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default InstructorAddcourse;
