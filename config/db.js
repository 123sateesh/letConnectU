const mongoose = require('mongoose');
const config   = require('config')
const db  = config.get('mongoURL');

 const connectDB = async ()=>{
 try {
     await mongoose.connect(db,{
       
     });
     console.log("MongoDB has been connected.")
     
 }   catch (error) {
     console.log(error.message);
     //Exit with failure 
     process.exit(1);
 }
} 

 module.exports = connectDB;