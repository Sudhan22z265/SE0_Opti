const User = require('../models/User');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt');

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

        const {email,password} = req.body;
        if(!user.authenticate(password)){
            return res.status(404).json({error:'Email and password didnot match'})
        }
        //Token Gen
        const token  = jwt.sign({id:user._id},process.env.JWT,{expiresIn:'1d'})
        res.cookie('token',token,{expiresIn:'1d'})
        const {_id,username,name,role} = user;

        res.json({token,message:'Signin Successfull!',user:{_id,username,name,email,role}})
}
catch(err){
    console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
}
     
}

exports.signout = (req,res)=>{
res.clearCookie('token')
res.json({message:'signout success'})
}

exports.requireSignIn = expressjwt({
    secret:process.env.JWT,
    algorithms: ['HS256'],
    userProperty: 'auth',
})
exports.authMiddleware = async (req, res, next) => {
    try {
        const userId = req.auth.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        req.profile = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.adminAuthMiddleware = async (req, res, next) => {
    try {
        const adminUserId = req.auth.id;
        const user = await User.findById(adminUserId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        if (user.role !== 1) {
            return res.status(400).json({ error: 'Not admin' });
        }
        req.profile = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};