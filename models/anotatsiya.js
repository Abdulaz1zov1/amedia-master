const mongoose = require('mongoose')

const anotatsiyaSchema = mongoose.Schema({
    name:{
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    description:{
        uz: {type: String, required: true},
        ru: {type: String, required: true}
    },
    video: {type: String, required: true},
    status: {type: Boolean, required: true},
    date: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('anotatsiya',anotatsiyaSchema)