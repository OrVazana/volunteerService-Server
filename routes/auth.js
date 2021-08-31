const express = require("express");
const router = express.Router()

const { register, login, forgotPassword } = require('../controllers/auth')

// @route - /api/auth


router.route('/register').post(register)

router.route('/login').post(login)

router.route('/forgotPassword').post(forgotPassword)

module.exports = router