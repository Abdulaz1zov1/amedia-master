const mongoose = require('mongoose')

const jurnalSchema =  mongoose.Schema({
    userID: {
        type : mongoose.Schema.ObjectId,
        ref: 'Users',
        required : true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean
    }

})

module.exports = mongoose.model('jurnal', jurnalSchema)