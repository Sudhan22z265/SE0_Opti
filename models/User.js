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

userSchema.virtual('password')
    .set(function(password){
        //temporary variable for password
        this._password = password;
        //Gen salt
        this.salt = this.makeSalt();
        //store in hashed password
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._password

    })

userSchema.methods = {
    authenticate : function(plainText){
        return this.encryptPassword(plainText) == this.hashed_password

    },
    encryptPassword : function(password){
        if(!password)
        return ''
    try{
        return crypto.createHmac('sha1',this.salt)
        .update(password)
        .digest('hex')
    }
    catch(err){
        return ''
    }
    },
    makeSalt : function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

module.exports = mongoose.model('User',userSchema)