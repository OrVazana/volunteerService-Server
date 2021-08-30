const mongoose = require('mongoose')
const AddressSchema = require('./AddressSchema')

const distributionSchema = mongoose.Schema({
    distributorEmail: {
        type: String,
        required: true
    },
    managerEmail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    address: {
        type: AddressSchema,
        required: true
    }
})

module.exports = mongoose.model('posts', postSchema)