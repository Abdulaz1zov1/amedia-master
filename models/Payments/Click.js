const mongoose = require('mongoose')

const ClickSchema = mongoose.Schema({
    transactionId: {type: String, required: true},
    amount: {type: String, required: true},
    transactionDate: {type: Date, required: true},
    uid: {type: String, required: true},
    error: {type: Number, enum: [0,1], required: true}
})