const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    videoLink :  {
        type: String,
        required: [true , 'Please add a link for video']
    },
    views: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: 'undefined'
    },
    product : {
        type : mongoose.Schema.ObjectId,
        ref: 'product',
        required : true,
        trim: true
    },
    episode: Number,
    season : Number,
    date : {
        type : Date,
        default : Date.now
    }
});

exports.Video = mongoose.model('video' , videoSchema);