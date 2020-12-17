const mongoose = require('mongoose')

const jurnalSchema =  mongoose.Schema({
    userID: {
        type : mongoose.Schema.ObjectId,
        ref: 'Users',
        required : true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean
    }

})

jurnalSchema.pre('save',async (next)=>{
    if(this.status === false){
        return console.log('this status false')
        // next();
    } else if(this.status === true) {
        const user = await this.model('Users').findByIdAndUpdate({_id: this.userID})
        if(user.balance === 0){
            user.balance = this.amount
            user.save()
            next();
        } else if(user.balance > 0){
            user.balance += this.amount
            user.save()
            next();
        }

    }
})
module.exports = mongoose.model('jurnal', jurnalSchema)