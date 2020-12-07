const mongoose = require('mongoose')
const Season = require('./season')
const seriyaSchema = mongoose.Schema({
    name: {
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    video: {type: String, required: true},
    season: {type: mongoose.Schema.ObjectId, ref: 'season', required: true},
    kino: {type: mongoose.Schema.ObjectId, ref: 'kino', required: true},

    length: {type: String, required: true},
    date: {type: Date, default: Date.now()}
})
seriyaSchema.pre('save', async function (next){
    const arrays = await this.model('seriya').find({season: this.season})
    const mapp = arrays.map( function doubleNumber( currentValue ) {
        return currentValue;
    })
    const season = await this.model('season').findByIdAndUpdate({_id: this.season})
    season.seriya = mapp
    season.save()
    next();
})
module.exports = mongoose.model('seriya', seriyaSchema)