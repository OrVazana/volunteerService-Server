const express = require("express");
const router = express.Router()
const Distribution = require('../models/DistributionSchema')
const ErrorResponse = require('../utils/errorResponse');
const verify = require('../middleware/verifyToken');

//POST
//create a Distribution
router.post('/', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
        const { Name, email, phone, address } = req.body
        const post = new Distribution({
            Name:Name,
            email: email,
            phone: phone,
            address: address
        })
        try {
            const savedReceiver = await Receiver.save();
            res.json(savedReceiver);
        } catch (err) {
            next(err)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to add Distribution!", 403))
    }
});

//GET
//get all Distributions
router.get('/', verify, async (req, res, err) => {
    if (req.user.isAdmin) {
        try {
            const Distributions = await Receiver.find();
            res.json(Distributions)
        } catch (err) {
            next(err)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to see all Distributions!", 403))
    }
})

//GET
//get specific Distribution
router.get('/find/:DistributionID', async (req, res) => {
    try {
        const post = await Receiver.findOne(req.params.DistributionID)
        res.json(receiver)
    } catch (err) {
        next(err)
    }
})

//DELETE
//delete specific Distribution
router.delete('/:DistributionID', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const removePost = await Receiver.remove({ _id: req.params.postID })
            res.json(removePost)
        } catch (err) {
            next(err)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to delete Distributions!", 403))
    }
})

//export module
module.exports = router