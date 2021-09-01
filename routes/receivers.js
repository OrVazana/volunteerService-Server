const express = require("express");
const router = express.Router()
const Receiver = require('../models/ReceiverSchema')
const ErrorResponse = require('../utils/errorResponse');
const verify = require('../middleware/verifyToken');

//POST
//create a receiver
router.post('/', verify, async (req, res, next) => {
    if (req.user.userType === "admin") {
        const { Name, email, phone, address } = req.body
        const post = new receiver({
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
        return next(new ErrorResponse("You are not allowed to add receiver!", 403))
    }
});

//GET
//get all receivers
router.get('/', verify, async (req, res, err) => {
    if (req.user.userType === "admin") {
        try {
            const receivers = await Receiver.find();
            res.json(receivers)
        } catch (err) {
            next(err)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to see all receivers!", 403))
    }
})

//GET
//get specific receiver
router.get('/find/:receiverEmail', async (req, res) => {
    try {
        const receiver = await Receiver.findOne(req.params.receiverEmail)
        res.json(receiver)
    } catch (err) {
        next(err)
    }
})

//DELETE
//delete specific receiver
router.delete('/:receiverEmail', verify, async (req, res, next) => {
    if (req.user.userType === "admin") {
        try {
            const removePost = await Receiver.remove({ _id: req.params.postID })
            res.json(removePost)
        } catch (err) {
            next(err)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to delete receivers!", 403))
    }
})

//export module
module.exports = router