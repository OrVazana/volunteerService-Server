const mongoose = require('mongoose')

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
        phoneNumber: {
            type: String,
            required: false
        },
        userType: {
            type: String,
            default: "user"
        },
        address: {
            city: String,
            street: String,
            houseNumber: String,
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)