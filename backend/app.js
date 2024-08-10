const express = require('express');
const cors = require('cors');
const User = require('./model/User');
const Course = require('./model/Course'); // Importing the model as 'Course'
require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(cors());

// Unified Login
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!['student', 'instructor'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(404).json({ error: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Unified Signup
app.post('/signup', async (req, res) => {
  const { name, email, password, phoneNumber, address, role } = req.body;

  if (!['student', 'instructor'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Instructor Create Course
app.post('/addcourse', async (req, res) => {
  try {
    const item = req.body;
    const newCourse = new Course(item); // Using the model name 'Course'
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Error creating course' });
  }
});

// Instructor Course Get
app.get('/coursedetails', async (req, res) => {
  try {
    const courses = await Course.find(); // Using the model name 'Course'
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// Instructor Course Update
app.put('/editcourse/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Using the model name 'Course'
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Error updating course' });
  }
});

// Instructor Course Delete
app.delete('/deletecourse/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id); // Using the model name 'Course'
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Error deleting course' });
  }
});

// Get Enrolled Courses for a specific student
app.get('/enrolledcourses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('enrolledCourses');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ error: 'Error fetching enrolled courses' });
  }
});

// Enroll Course for Student
app.post('/enrollcourse', async (req, res) => {
  const { courseId, userId } = req.body;

  try {
    console.log(`Enrolling course ${courseId} for user ${userId}`); // Debugging log
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ error: 'Course already enrolled' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Course enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling course:', error); // Improved error logging
    res.status(500).json({ error: 'Error enrolling course' });
  }
});

const PORT = 5999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
