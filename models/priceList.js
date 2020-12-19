const mongoose = require('mongoose')

const priceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['1', '3', '6', '10']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Price', priceSchema)