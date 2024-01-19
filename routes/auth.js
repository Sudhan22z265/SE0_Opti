const express = require("express");
//Creating router
const router = express.Router()

//Getting controllers
const {signup} = require('../controllers/auth')

router.post('/signup',signup)

module.exports = router