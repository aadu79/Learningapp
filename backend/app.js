
const express = require('express');
const cors=require('cors');
const User = require('./model/User');
require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());



// Student Signup
app.post('/student/signup', async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role: 'student',
    });
  
    try {
      await newUser.save();
      res.status(201).send('Student registered successfully');
    } catch (error) {
      res.status(400).send('Error registering student');
    }
  });
  
  // Student Login
  app.post('/student/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, role: 'student' });
  
      if (!user) {
        return res.status(404).send('Student not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials');
      }
  
      res.status(200).send('Student logged in successfully');
    } catch (error) {
      res.status(400).send('Error logging in student');
    }
  });
  
  // Instructor Signup
  app.post('/instructor/signup', async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role: 'instructor',
    });
  
    try {
      await newUser.save();
      res.status(201).send('Instructor registered successfully');
    } catch (error) {
      res.status(400).send('Error registering instructor');
    }
  });
  
  // Instructor Login
  app.post('/instructor/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, role: 'instructor' });
  
      if (!user) {
        return res.status(404).send('Instructor not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials');
      }
  
      res.status(200).send('Instructor logged in successfully');
    } catch (error) {
      res.status(400).send('Error logging in instructor');
    }
  });

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port 5001`));
