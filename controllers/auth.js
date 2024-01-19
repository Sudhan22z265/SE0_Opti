const User = require('../models/User')
const shortid = require('shortid')



exports.signup = async (req,res) => {
    try{
    user = await User.findOne({email:req.body.email});
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