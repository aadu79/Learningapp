
const express = require('express');
const cors=require('cors');
const User = require('./model/User');
require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
const courseModel=require('./model/Course');


// Student Signup
app.post('/student/signup', async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the role 'student'
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role: 'student',
    });

    // Save the new user in the database
    await newUser.save();
    res.status(201).send('Student registered successfully');
  } catch (error) {
    console.error('Error registering student:', error);
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

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send('Error logging in student');
  }
});
  
  // Instructor Signup
  app.post('/instructor/signup', async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the role 'instructor'
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role: 'instructor',
      });
  
      // Save the new user in the database
      await newUser.save();
      res.status(201).send('Instructor registered successfully');
    } catch (error) {
      console.error('Error registering instructor:', error);
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

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send('Error logging in instructor');
  }
});

//Instructor Create Course
app.post('/addcourse',async(req,res)=>{
  try{
      var item=req.body; //the attached data sent  in req.body is assigned to item
      const data_add=new courseModel(item);
      const data= await data_add.save();
      res.send('Course created successful');
  }
  catch (error){
    console.log(error);
  }
})

//Instructor Course Get
app.get('/coursedetails', async(req,res)=>{

  try{
      const data = await courseModel.find();
res.send(data);
  }

  catch(error){
      console.log(error);
  }

})

//Instructor Course Update
app.put('/editcourse/:id',async(req,res)=>{
  try {
      const data= await courseModel.findByIdAndUpdate(req.params.id,req.body)
      res.send('Course updated successful')
  } catch (error) {
      console.log(error);
  }
})


//Instructor Course Delete
app.delete('/deletecourse/:id',async(req,res)=>{
  try {
      const data= await courseModel.findByIdAndDelete(req.params.id)
      res.send('Course deleted successful')
  } catch (error) {
      console.log(error);
  }
})

const PORT = 5999;
app.listen(PORT, () => console.log(`Server running on port 5999`));
