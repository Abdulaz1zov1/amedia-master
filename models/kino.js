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
    video: {type: String},
    rejissor: {type: String, required: true},
    length: {type: String},
    studia: {type: String, required: true},
    tarjimon:[{
        type: mongoose.Schema.ObjectId,
        ref: 'member',
        required: true
    }],
    tayming:[{
        type: mongoose.Schema.ObjectId,
        ref: 'member',
        required: true
    }],
    season: [{type: mongoose.Schema.ObjectId , ref: 'season'}],
    screens: [
        {type: String, required: true}
    ],
    image: {type: String, required: true},
    type: {type: String, enum: ['film','serial','treyler']},
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

KinoSchema.pre('remove', async function(next){
    await this.model('season').deleteMany({ kinoId: this._id });
    next();
})

module.exports = mongoose.model('kino',KinoSchema)
