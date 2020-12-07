const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating : {
        type: Number,
        enum: [1,2,3,4,5],
        required: [true , 'Please add a rating between 1 and 5']
    },
    kino : {
        type : mongoose.Schema.ObjectId,
        ref: 'kino',
        required : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref:'Users'
    }
});
// ratingSchema.pre('save',async function (){
//
//     const product = await this.model('kino').findByIdAndUpdate({_id: this.kino})
//     let costByProduct = await this.model('rating')
//         .find({kino:this.kino})
//         .sort({rating: 1})
//
//     let result = 0;
//     for (let i = 0; i < costByProduct.length; i++){
//         result += costByProduct[i].rating
//     }
//     let num = result / costByProduct.length
//     let rate = Number(num.toFixed(1))
//
//     product.rating = rate
//     product.save({ validateBeforeSave: false })
//         .then(() => {
//            console.log(rate)
//         })
// })
module.exports = mongoose.model('rating' , ratingSchema);