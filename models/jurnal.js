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

jurnalSchema.pre('save',function (){
    if(this.status === false){
        return console.log('this status false')
    } else if(this.status === true) {
        const user = this.model('Users').findById(this.userID)
        user.balance = this.amount
        user.save()
            .then(()=>{
                console.log('success saved')
            }).catch((e)=>{
                console.log(e)
        })
    }
})
module.exports = mongoose.model('jurnal', jurnalSchema)