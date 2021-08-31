const mongoose = require('mongoose')
const AddressSchema = require('./AddressSchema')
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required:true
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
        isAdmin: {
            type: Boolean,
            default: false
        },
        address: {
            type: AddressSchema,
            required: false
        }
    },{timestamps:true}
)

module.exports = mongoose.model('user', userSchema)