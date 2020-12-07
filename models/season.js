const mongoose = require('mongoose')

const SeasonSchema = mongoose.Schema({
    kinoId : {
        type: mongoose.Schema.ObjectId,
        ref: 'kino',
        required: true
    },
    name: {
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    description: {
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    year: {type: String, required: true},
    num: {type: String, required: true},
    screens: [{type: String, required: true}],
    image: {type: String, required: true},
    seriya: [{type: mongoose.Schema.ObjectId, ref: 'seriya'}],
    date: {type: Date, default: Date.now()}
})
//
SeasonSchema.pre('save', async function(next){
    const arrays = await this.model('season')
        .find({kinoId: this.kinoId})
        .select({_id: 1})

    const mapp = arrays.map( function doubleNumber( currentValue ) {
        return currentValue;
    })
    const season = await this.model('kino').findByIdAndUpdate({_id: this.kinoId})
    season.season = mapp
    season.save()
    next();

})
//Cascade Delete
SeasonSchema.pre('remove' , async function(next){
    await this.model('seriya').deleteMany({ season: this._id });
    next();
} )
module.exports = mongoose.model('season', SeasonSchema)

