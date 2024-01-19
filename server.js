//importing all packages
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')

//Creating app

const app = express();

//db

mongoose.connect(process.env.DATABASE)
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

//cors
if(process.env.NODE_ENV == 'development'){
    app.use(cors({'origin':`${process.env.CLIENT_URL}`}))
}

//routes
app.get('/api',(req,res)=>{
    res.json({time:Date().toString()})
})


//server
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})