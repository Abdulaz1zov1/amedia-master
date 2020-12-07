const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    name:{
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    description:{
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    image: {type: String, required: true},
    slug: {type: String, required: true},
    date: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('news',newsSchema)