const express = require('express');
const router = express.Router();
const Course = require('../model/Course');
const User = require('../model/User');
const multer = require('multer'); // For file uploads
const path = require('path');
const jwt = require('jsonwebtoken');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be uploaded
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// Route to create a new course
router.post('/create', upload.single('image'), async (req, res) => {
    const { title, description, category } = req.body;
    const image = req.file?.path; // Path to the uploaded image
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const instructor = await User.findById(decoded.userId);
  
      if (!instructor || instructor.role !== 'instructor') {
        return res.status(403).json({ message: 'Access forbidden' });
      }
  
      const newCourse = new Course({
        title,
        description,
        category,
        image,
        instructor: instructor._id
      });
  
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Route to update an existing course
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  const image = req.file?.path; // Path to the uploaded image
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const instructor = await User.findById(decoded.userId);

    if (!instructor || instructor.role !== 'instructor') {
      return res.status(403).json({ message: 'Access forbidden' });
    }

    const course = await Course.findById(id);

    if (!course || course.instructor.toString() !== instructor._id.toString()) {
      return res.status(403).json({ message: 'Access forbidden' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    if (image) course.image = image;

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a course
// Route to delete a course
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const instructor = await User.findById(decoded.userId);
  
      if (!instructor || instructor.role !== 'instructor') {
        return res.status(403).json({ message: 'Access forbidden' });
      }
  
      const course = await Course.findById(id);
  
      if (!course || course.instructor.toString() !== instructor._id.toString()) {
        return res.status(403).json({ message: 'Access forbidden' });
      }
  
      await Course.findByIdAndDelete(id); // Use this instead of course.remove()
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Route to upload course content
router.post('/upload-content/:courseId', upload.array('content'), async (req, res) => {
  const { courseId } = req.params;
  const content = req.files.map(file => file.path); // Paths to uploaded content
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const instructor = await User.findById(decoded.userId);

    if (!instructor || instructor.role !== 'instructor') {
      return res.status(403).json({ message: 'Access forbidden' });
    }

    const course = await Course.findById(courseId);

    if (!course || course.instructor.toString() !== instructor._id.toString()) {
      return res.status(403).json({ message: 'Access forbidden' });
    }

    course.content.push(...content);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Fetch available courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll in a course
router.post('/enroll', async (req, res) => {
  const { courseId } = req.body;
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: 'Course enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
