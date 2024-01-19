//importing all packages
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

//Creating app

const app = express();

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