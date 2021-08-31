const express = require("express");
const router = express.Router()
const Delivery = require('../models/DeliverySchema')
const ErrorResponse = require('../utils/errorResponse');
const verify = require('../middleware/verifyToken');

//POST
//create a Delivery
router.post('/', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
        const { Name, email, phone, address } = req.body
        const post = new Delivery({
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
        return next(new ErrorResponse("You are not allowed to add Delivery!", 403))
    }
});

//GET
//get all Deliveries
router.get('/', verify, async (req, res, err) => {
    if (req.user.isAdmin) {
        try {
            const Deliverys = await Receiver.find();
            res.json(Deliverys)
        } catch (err) {
            next(err)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to see all Deliverys!", 403))
    }
})

//GET
//get specific Delivery
router.get('/find/:DeliveryID', async (req, res) => {
    try {
        const post = await Receiver.findOne(req.params.DeliveryID)
        res.json(receiver)
    } catch (err) {
        next(err)
    }
})

//DELETE
//delete specific Delivery
router.delete('/:DeliveryID', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const removePost = await Receiver.remove({ _id: req.params.postID })
            res.json(removePost)
        } catch (err) {
            next(err)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to delete Deliverys!", 403))
    }
})

//export module
module.exports = router