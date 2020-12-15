const mongoose = require('mongoose')

const KinoSchema = new mongoose.Schema({
    name: {
        uz: {type: String , required: true},
        ru: {type: String, required: true}
    },
    description: {
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    category:[{
        type : mongoose.Schema.ObjectId,
        ref: 'category',
        required : true
    }],
    translator: [{
        type : mongoose.Schema.ObjectId,
        ref: 'member',
        required : true
    }],
    tarjimon: [{
        type : mongoose.Schema.ObjectId,
        ref: 'member',
        required : true
    }],
    video: {type: String},
    rejissor: {type: String, required: true},
    length: {type: String},
    studia: {type: String, required: true},
    tayming:[{
        type: mongoose.Schema.ObjectId,
        ref: 'member',
        required: true
    }],
    screens: {
        thumb:[{type: String}],
        original:[{type: String}]
    },
    image: {type: String, required: true},
    price: {type: String, enum:['free','selling']},
    year: {type: String, required: true},
    janr: [{
        type : mongoose.Schema.ObjectId,
        ref: 'janr',
        required : true
    }],
    country: {type: String, required: true},
    rating: {type: Number, default: 0},
    info:{
        views: {type: Number, default: 0},

    },
    slug: {type: String, required: true, unique: true, lowercase: true},
    status: {type: String, required: true},
    date: {type: Date , default: Date.now()}
})

module.exports = mongoose.model('kino',KinoSchema)
