const crypto = require('crypto');
const JWT = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @description Register
// @route GET /api/auth/register
// @access Public
exports.register = asyncHandler( async (req , res , next) => {
 const { name, email, password } = req.body;

 let user = await User.create({
     name,
     email,
     password
 });
 res.status(201).json({success: true , data: user});
});

// @description Login user
// @route GET /api/auth/login
// @access Public
exports.login = asyncHandler( async (req , res , next) => {
    const { email, password } = req.body;
    
    // Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide email and password' , 400));
    }

    // check for user
    const user = await User.findOne({email: email}).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid credentials ' , 401));
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials ' , 401));
    }

        sendTokenResponse(user, 200 , res);
});

// @description get current logged user
// @route GET /api/auth/me
// @access Private
exports.getMe = asyncHandler( async (req , res , next) => {
    const token = req.headers.authorization
    const my =  JWT.decode(token.slice(7,token.length))
 const user = await User.findById({_id: my.id})
 res.status(201).json({success: true , data: user});
 //sendTokenResponse(user, 200 , res);
});

// @description update current logged user details
// @route PUT /api/auth/updatedetails
// @access Private
exports.UpdateDetails = asyncHandler( async (req , res , next) => {
    const FieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
        tel: "+998"+req.body.tel
    }
    const user = await User.findByIdAndUpdate(req.user.id , FieldsToUpdate , {
        new: true,
        runValidators: true
    });
    res.status(201).json({success: true , data: user});
   });
 
   
// @description update current logged user password
// @route PUT /api/auth/updatepassword
// @access Private
exports.UpdatePassword = asyncHandler( async (req , res , next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if(!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect' , 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user , 200 , res);
   });

// @description forgot password
// @route GET /api/auth/forgotpassword
// @access Public
exports.forgotPassword = asyncHandler( async (req , res , next) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.status(404).json({
            success: false,
            data: 'User not found'
        })
    }

    // GET TOKEN
    const resetToken = user.getResetPasswordToken();
    console.log(`This is ResetToken: ${resetToken}`)

    await user.save({ validateBeforeSave: false})

    // create reset URL
    const resetUrl = `${req.protocol}://amediatv.uz/resetpassword/${resetToken}`;

    const msg = {
        to: req.body.email,
        subject: 'Parolni tiklash manzili',
        html: `Parolini tiklash uchun ushbu tugmani bosing  <a type="button" href="${resetUrl}" style="cursor: pointer;background-color: #eee ">Tugma</a>`

    }
    try{
        await sendEmail(msg)
        res.status(200).json({
            success: true,
            data: 'Email is sent'
        });
    }catch(err){
        console.log(err)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false})

        return next(new ErrorResponse('Email could not be sent', 500));
    }
})


exports.resetPassword = asyncHandler( async (req , res , next) => {

    //Hashing password
    // const salt = await bcrypt.genSaltSync(12);
    // const newHashedPassword = await bcrypt.hashSync(req.body.password, salt);


    const user = await User.findOneAndUpdate({
        resetPasswordToken: req.params.resettoken
    });

    if(!user){
        return next(new ErrorResponse('Invalid Token' , 400));
    }

    // New password is set and it will be hashed after that

         user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
         // console.log(user.password);
          await user.save();

          sendTokenResponse(user, 200 , res);
})
// Get token from model , create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJWT();

    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };
    res.status(statusCode)
        .cookie('token', token, options)
        .json({success: true, token});
}





