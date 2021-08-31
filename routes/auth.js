const router = require("express").Router();
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require("../utils/validation")
const ErrorResponse = require('../utils/errorResponse');


const { register, login, forgotPassword } = require('../controllers/auth')

// @route - /api/auth

//POST
//register a new user
router.post('/register', async (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.name)
        return next(new ErrorResponse('missing fields', 400))
    try {
        //Joi validate
        const { error } = registerValidation(req.body);
        if (error)
            return next(new ErrorResponse(error.details[0].message), 400)

        //check if email already exists
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist)
            return next(new ErrorResponse('Email already exists'), 400)

        //hash pass
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt)

        //add new User
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPass,
        })
        const user = await newUser.save();
        // const { password, ...others } = user._doc;
        console.log(user);
        res.status(201).json({
            success: true,
            successMessage: "registration success. please Log in"
        })
    } catch (error) {
        next(error)
    }
})
//POST
//login user
router.post('/login',async (req, res, next) => {
    if (!req.body.email || !req.body.password)
        return next(new ErrorResponse('missing fields', 400))
    try {
        //Joi validate
        console.log(req.body);
        const { error } = loginValidation(req.body);
        if (error)
            return next(new ErrorResponse(error.details[0].message), 400)

        //check if email is in database
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return next(new ErrorResponse('Email not found'), 400)

        //check if password correct
        const validate = await bcrypt.compare(req.body.password, user.password)
        if (!validate)
            return next(new ErrorResponse('invalid password!', 400))
        //// res.status(200).json(others)
        //jwt token
        const accessToken = jwt.sign({ _id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET,
            { expiresIn: "1d" }
        )
        const { password,...info } = user._doc;

        res.status(201).json({
            success: true,
            successMessage: "login success.",
            info: { ...info },
            accessToken:accessToken
        })
    } catch (err) {
        next(error)
    }
})

//POST
//forgot password
router.post('/forgotPassword',async (req, res, next) => {
    res.send("forgotPassword route")
})

module.exports = router