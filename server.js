const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();
const port = process.env.PORT || 5000
app.use(express.json());
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profiles',require('./routes/api/profiles'));

app.get('/',(req,res)=> res.send("hello world"));

app.listen( port ,()=> console.log(`Server is reunnig on http://localhost:${port} `));
