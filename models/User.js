const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        trim:true,
        max:32,
        unique:true,
        index:true,
        lowercase:true
    },
    name:{
        required:true,
        type:String,
        trim:true,
        max:32,
        
    },
    email:{
        required:true,
        type:String,
        trim:true,
        unique:true,
        lowercase:true
    },
    profile:{
        type:String,
        trim:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt: Number,
    about:{
        type:String,

    },
    role:{
        type:Number,
        trim:true
    },
    photo:{
        data:Buffer,
        type:String
    },
    resetPasswordLink:{
        data:String,
        default:''
    }

},{timestamps:true})

module.exports = mongoose.model('User',userSchema)