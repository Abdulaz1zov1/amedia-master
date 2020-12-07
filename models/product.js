const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    nameuz : {
        type: String,
        required: [true , 'Please add an uzbek product name'],
        minlength: [3 , 'Product name should include minimum 3 characters'],
        maxlength: [255 , 'Product name should include maximum 255 characters '],
        trim: true
    },
    nameru : {
        type: String,
        required: [true , 'Please add a russian product name'],
        minlength: [3 , 'Product name should include minimum 3 characters'],
        maxlength: [255 , 'Product name should include maximum 255 characters '],
        trim: true
    },
    country: {
        type: String,
        required: [true , 'Please add a country'],
        trim: true,
    },
    year: {
        type: String,
        required: [true , 'Please add a year'],
        trim: true,
    },
    describtionuz: {
        type: String,
        required: [true , 'Please add an uzbek describtion'],
        trim: true,
    },
    describtionru: {
        type: String,
        required: [true , 'Please add a russian describtion'],
        trim: true,
    },
    views: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 5
    },
    videoLink : {
        type: String,
        required: [true , 'Please add a videoLink']
    },
    photo: String,
    category : {
        type : mongoose.Schema.ObjectId,
        ref: 'category',
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

exports.Products = mongoose.model('product' , productSchema);