const User = require('../models/user')

exports.checkUser = async (req,res)=>{
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
}