const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();
const port = process.env.PORT || 5000
app.use(express.json());

// Define route
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profiles',require('./routes/api/profiles'));

// app.get('/',(req,res)=> res.send("hello world"));

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'client','build','index.html'));
    })
}
app.listen( port ,()=> console.log(`Server is running on http://localhost:${port} `));
