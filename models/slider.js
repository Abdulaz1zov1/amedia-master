const mongoose = require('mongoose')

const SliderSchema = mongoose.Schema({
    kino: {
        type: mongoose.Schema.ObjectId,
        ref: 'kino',
        required: true
    },
    date: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('slider',SliderSchema)