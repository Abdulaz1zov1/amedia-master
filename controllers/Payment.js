const User = require('../models/user')
const Jurnal = require('../models/jurnal')

exports.checkUser = async (req,res)=>{
   try{
       const user = await User.findById(req.params.id)
           .select({name: 1})

       if(!user){
           return res.status(404).json({
               success: false,
               data: 0
           })
       } else {
           return res.status(200).json({
               success: true,
               user: user
           })
       }

   } catch (e){
       res.status(400).json({
           success: false,
           data: e
       })
   }
}

exports.saveData = async (req,res)=>{
    const jurnal = new Jurnal({
        userID: req.body.userID,
        amount: req.body.amount,
        type: req.body.type,
        status: req.body.status,
        date: req.body.date
    })

    await jurnal.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: jurnal
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })
}

exports.getAllUsers = async(req, res)=> {
    const jurnal = await Jurnal.find()
        .sort({ date: -1})
    res.status(200).json({
        success: true,
        data: jurnal
    })
}