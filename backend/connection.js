const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://aadu_79:Adillida7@cluster0.zxqsdtw.mongodb.net/learningappDB?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('DB is connected');
})
.catch((error)=>{
    console.log('Error in Connection');
})