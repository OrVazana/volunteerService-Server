const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    message: {
        type: Date,
        default: Date.now
    },
})

module.exports=mongoose.model('posts',ChatSchema)