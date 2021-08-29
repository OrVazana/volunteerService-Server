const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: "user"
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)