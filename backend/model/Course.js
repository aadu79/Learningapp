const mongoose = require('mongoose');

// Define the schema
const CourseSchema = mongoose.Schema({
  courseTitle: String,
  courseDescription: String,
  courseCategory: String,
  courseImage: String,
  courseContent: String
});

// Register the model with the collection name 'coursedetail'
const Course = mongoose.model('Course', CourseSchema); // Use 'Course' as the model name

module.exports = Course;

