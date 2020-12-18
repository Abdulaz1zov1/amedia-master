const mongoose = require('mongoose')

const KinoSchema = mongoose.Schema({
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
    video: {type: String, required: true},
    rejissor: {type: String, required: true},
    length: {type: String, required: true},
    studia: {type: String, required: true},
    tayming:[{
        type: mongoose.Schema.ObjectId,
        ref: 'member',
        required: true
    }],
    screens: {
        thumb:[{type: String,required: true}],
        original:[{type: String, required: true}]
    },
    image: {type: String, required: true},

    price: {
        type: String,
        enum:['free','selling'],
        required: true
    },
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
    date: {type: Date , default: Date.now()},

    status:{
        type: Boolean, default: true
    }
})

module.exports = mongoose.model('kino',KinoSchema)
