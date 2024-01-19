const User = require('../models/User')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = async (req,res) => {
    try{
    const user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:'User already exists'})
    }
        

        const {name,email,password} = req.body;
        let username= shortid.generate()
        let profile = `${process.env.CLIENT_URL }/profile/${username}`
        let newuser = new User({name,email,password,username,profile});
        newuser.save()
        res.json({message:'SignUp Successful! Please SignIn.'})
}
catch(err){
    console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
}
     
}
exports.signin = async (req,res) => {
    try{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(404).json({error:'User Not Found'})
    }
        //authenticate

        const {email,password} = req.body;
        if(!user.authenticate(password)){
            return res.status(404).json({error:'Email and password didnot match'})
        }
        //Token Gen
        const token  = jwt.sign({id:user._id},process.env.JWT,{expiresIn:'1d'})
        res.cookie('token',token,{expiresIn:'1d'})
        const {_id,username,name,role} = user;

        res.json({token,user:{_id,username,name,email,role}})
}
catch(err){
    console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
}
     
}
