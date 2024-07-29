const express = require('express');
const router = express.Router();

// Import necessary models and other dependencies
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fetch enrolled courses (Protected route)
router.get('/courses', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const user = await User.findById(decoded.userId).populate('enrolledCourses');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.enrolledCourses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;
  