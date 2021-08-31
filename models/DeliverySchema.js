const mongoose = require('mongoose')
const AddressSchema = require('./AddressSchema')

const deliverySchema = mongoose.Schema({
    distributorEmail: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: String,
        required: true
    },
    deliveryType: {
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
},{timestamps:true}
)

module.exports = mongoose.model('delivery', deliverySchema)