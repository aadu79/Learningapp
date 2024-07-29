const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }, // URL to the image
  content: [{ type: String }], // Array to store content URLs
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;

