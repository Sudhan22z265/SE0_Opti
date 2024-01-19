const express = require("express");
//Creating router
const router = express.Router()

//Getting controllers
const {signup} = require('../controllers/auth')


//validators
const {runValidation} = require('../validators/index')
const {userSignUpValidator} = require('../validators/auth')

router.post('/signup',userSignUpValidator,runValidation,signup)

module.exports = router