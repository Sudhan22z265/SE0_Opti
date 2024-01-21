const express = require("express");
const { requireSignIn, authMiddleware, adminAuthMiddleware } = require("../controllers/auth");
const { read } = require("../controllers/user");

//Creating router
const router = express.Router()

router.get('/profile',requireSignIn,adminAuthMiddleware,read)

module.exports = router