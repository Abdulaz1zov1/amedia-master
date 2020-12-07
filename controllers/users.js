const path = require('path');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');


// @description Get all users
// @route GET /api/users
// @access Private/Admin
exports.getUsers = asyncHandler( async (req , res , next) => {
      const users = await User.find();
    res.status(200).json({success: true , count : users.length , data: users});
  });

// @description Get single user
// @route GET /api/users/:id
// @access Private/Admin
exports.getUser = asyncHandler( async (req , res , next) => {
    const user = await User.findById(req.params.id);
    if(!user) 
      return next(new ErrorResponse(`Resourse not found with id of ${req.params.id}`, 404))
    res.status(200).json({success: true , data: user});
  });

// @description Create user
// @route POST /api/users
// @access Private/Admin
exports.createUser = asyncHandler( async (req , res , next) => {
  const user = await User.create(req.body);
  res.status(200).json({success: true , data: user});
});


// @description Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
exports.deleteUser = asyncHandler( async (req , res , next) => {
        const user = await User.findByIdAndRemove(req.params.id);
        if(!user) 
            return  next(new ErrorResponse(`Resourse not found with id of ${req.params.id}`,404))
        res.status(200).json({success: true , data: user});
   });

exports.editUser = asyncHandler(async (req,res)=>{

    const user = await User.findByIdAndUpdate(req.params.id)
    if(user){
        user.name = req.body.name
        user.email = req.body.email
        user.password = req.body.password
        user.tel = req.body.tel
        user.role = req.body.role
        user.status = req.body.status

        user.save({ validateBeforeSave: false })
            .then(()=>{
                res.status(200).json({success: true})
            })
            .catch((e)=>{
                res.status(400).json({success: false , e})
            })
    } else {
        res.status(404).json({
            success: false,            data: "User not found"
        })
    }
})