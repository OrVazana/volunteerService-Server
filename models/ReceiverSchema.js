const mongoose = require('mongoose')
const AddressSchema = require('./AddressSchema')
const receiverSchema = mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: AddressSchema,
            required: true
        }
    },{timestamps:true}
)

module.exports = mongoose.model('receiver', receiverSchema)