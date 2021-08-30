const mongoose = require('mongoose')
const { resetPassword } = require('../controllers/auth')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 6
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            // select:false
        },
        phone: {
            type: String,
            required: false
        },
        type: {
            type: String,
            default: "user"
        },
        CreateDate: {
            type: Date,
            default:Date.now
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    }
)

module.exports = mongoose.model('user', userSchema)