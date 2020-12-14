const mongoose = require('mongoose')

const SeasonSchema = mongoose.Schema({
    name: {
        uz: {type: String, required: true},
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
    tayming:[{
        type: mongoose.Schema.ObjectId,
        ref: 'member',
        required: true
    }],
    price: {type: String, enum:['free','selling']},
    janr: [{
        type : mongoose.Schema.ObjectId,
        ref: 'janr',
        required : true
    }],
    country: {type: String, required: true},

    year: {type: String, required: true},
    num: {type: String, required: true},
    seriya: [{type: mongoose.Schema.ObjectId, ref: 'seriya'}],
    slug: {type: String, unique: true, lowercase: true},
    screens: {
        thumb:[{type: String}],
        original:[{type: String}]
    },
    image: {
        type: String,
        required: true
    },
    date: {type: Date, default: Date.now()}
})



//Cascade Delete
SeasonSchema.pre('remove' , async function(next){
    await this.model('seriya').deleteMany({ season: this._id });
    next();
} )
module.exports = mongoose.model('season', SeasonSchema)

