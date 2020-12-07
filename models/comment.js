const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    message : {
        type: String,
        required: [true , 'Please add a product message'],
        trim: true
    },
    kinoId : {
        type : mongoose.Schema.ObjectId,
        ref: 'product',
        required : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref: 'Users'
    },
    date :  {
        type: Date,
        default:  Date.now()
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('comment' , commentSchema);