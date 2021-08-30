const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require("../utils/validation")
const errorHandler = require('../middleware/errorHandler');
const ErrorResponse = require('../utils/errorResponse');

//Register
exports.register = async (req, res, next) => {
    try {
        //Joi validate
        const { error } = registerValidation(req.body);
        if (error)
            return next(new ErrorResponse(error.details[0].message))
        
        //check if email already exists
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist)
            return next(new ErrorResponse('Email already exists'))
        // // //check if name already exists
        // // const nameExist = await User.findOne({ name: req.body.name })
        // // if (nameExist) return res.status(400).send('try different name')
        
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
        
        const { password, ...others } = user._doc;
        
        res.status(201).json({
            success: true,
            token: "bla bla"
        })
    } catch (error) {
        next(error)
    }
}

//Login route
exports.login = async (req, res, next) => {
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
        //// const { password,...others } = user._doc;
        //// res.status(200).json(others)
        //jwt token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        res.status(201).json({
            success: true,
            token: "bla bla"
        })
        res.header('auth-token', token).send(token);
    } catch (err) {
        next(error)
    }
}

exports.forgotPassword = async (req, res, next) => {
    res.send("forgotPassword route")
}

exports.resetPassword = async (req, res, next) => {
    res.send("resetPassword route")
}