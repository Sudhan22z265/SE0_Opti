const express = require("express");
//Creating router
const router = express.Router()

//Getting controllers
const {signup,signin, signout,requireSignIn} = require('../controllers/auth')


//validators
const {runValidation} = require('../validators/index')
const {userSignUpValidator} = require('../validators/auth')
const {userSignInValidator} = require('../validators/auth');
const { cookie } = require("express-validator");

router.post('/signup',userSignUpValidator,runValidation,signup)
router.post('/signin',userSignInValidator,runValidation,signin)
router.get('/signout',signout)

router.get('/secret',requireSignIn,(req,res)=>{
    
    res.json({user: req.auth})
})

module.exports = router