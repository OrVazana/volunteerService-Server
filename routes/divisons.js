const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router()
const Post = require('../models/PostSchema')
const divisionService = require("../utils/divisons")

//create division
router.post('/', verify, async (req, res, next) => {
    if (req.user.userType === 'admin') {
        try {
            divisonRequest=req.body
            divisonService.distributions(divisonRequest)
        } catch (err) {
            next(err)
        }
    }else {
        return next(new ErrorResponse("You are not allowed to create posts!", 403))
    }
})


//find by email
router.get('user/:email', verify, async (req, res) => {
    if (req.user.userType === 'admin') {
        try {
            const volunteer = await divisionService.findClosestVolunteer(email)
        res.json(volunteer)
        } catch (err) {
            next(err)
        }
    }else {
        return next(new ErrorResponse("You are not allowed to create posts!", 403))
    }
})


module.exports=router