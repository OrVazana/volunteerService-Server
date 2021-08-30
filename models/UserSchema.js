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
        phone: {
            type: String,
            required: false
        },
        role: {
            type: Number,
            default: 0
        },
    },{timestamps:true}
)

module.exports = mongoose.model('user', userSchema)