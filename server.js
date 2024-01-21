//importing all packages
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')

//routes getting
const blogroutes = require('./routes/Blog')
const authroutes = require('./routes/auth')
const userroutes = require('./routes/user')
//Creating app
const app = express();

//db

mongoose.connect(process.env.DATABASE_CLOUD)
    .then(() => {
      console.log('MongoDB connected successfully......');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
  

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(cookieparser())

//routes middlewares
app.use('/api',blogroutes)
app.use('/api',authroutes)
app.use('/api',userroutes)
//cors

    



//server
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})