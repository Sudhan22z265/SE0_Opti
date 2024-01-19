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

app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(cookieparser())

//routes middlewares
app.use('/api',blogroutes)

//cors
if(process.env.NODE_ENV == 'development'){
    app.use(cors({'origin':`${process.env.CLIENT_URL}`}))
}


//server
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})