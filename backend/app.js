
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


// Unified Login
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!['student', 'instructor'].includes(role)) {
    return res.status(400).send('Invalid role');
  }

  try {
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(404).send(`${role.charAt(0).toUpperCase() + role.slice(1)} not found`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send('Error logging in user');
  }
});

// Unified Signup
app.post('/signup', async (req, res) => {
  const { name, email, password, phoneNumber, address, role } = req.body;

  if (!['student', 'instructor'].includes(role)) {
    return res.status(400).send('Invalid role');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
    });

    // Save the new user in the database
    await newUser.save();
    res.status(201).send(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send('Error registering user');
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
