const router = require('express').Router();
const User = require('../models/UserSchema');
const ErrorResponse = require('../utils/errorResponse');
const verify = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');

//PUT
//update a user
router.put("/:id", verify, async (req, res, next) => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error)
        }
    } else {
        return next(new ErrorResponse("You can update only your account!", 403))
    }
});

//DELETE
//delete a user
router.delete("/:id", verify, async (req, res, next) => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted");
        } catch (error) {
            next(error)
        }
    } else {
        return next(new ErrorResponse("You can delete only your account!", 403))
    }
});

//GET
//get user specific by id
router.get("/find/:id",verify, async (req, res,next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.sstatus(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET
//get all users
router.get("/", verify, async (req, res, next) => {
    const query=req.query.new
    if (req.user.isAdmin) {
        try {
            const users=query ? await User.find().limit(10) : await User.find()
            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to see all users!", 403))
    }
});

//GET stats
// router.get("/stats",verify, async (req, res,next) => {
//     try {
//         const today = new Date();
//         const lastyear = today.setFullYear(today.setFullYear() - 1);
//         const user = await User.findById(req.params.id);
//         const { password, ...others } = user._doc;
//         res.status(200).json(others);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
module.exports = router;