const express = require("express");
//Creating router
const router = express.Router()

//Getting controllers
const {time} = require('../controllers/blog')

router.get('/blogs',time)

module.exports = router