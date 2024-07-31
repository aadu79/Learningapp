const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  role: { type: String, enum: ['student', 'instructor'], required: true },
  
});

const UserData=mongoose.model('user',UserSchema);
module.exports=UserData