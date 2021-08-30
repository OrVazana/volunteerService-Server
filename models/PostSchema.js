const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    CreateDate: {
        type: Date,
        default: Date.now
    },
})

module.exports=mongoose.model('posts',postSchema)