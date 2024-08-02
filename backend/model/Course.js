const mongoose=require("mongoose");
const CourseSchema=mongoose.Schema({
    courseTitle:String,
    courseDescription:String,
    courseCategory:String,
    courseImage:String
})
const Course=mongoose.model('coursedetail',CourseSchema);
module.exports=Course