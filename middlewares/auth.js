const JWT = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');


// Protect routes

exports.protect = asyncHandler( async (req , res , next) => {
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
        {
            token = req.headers.authorization.split(' ')[1];
        }


    // If deadline has been expired, user must be authorizated
    const decoded = JWT.verify(token , process.env.JWT_KEY);
    if(decoded.exp < Date.now()){
        res.status(400).json({
            success: false,
            data: `The deadline has expired`
        })
    }


    if(!token) {
        return next(new ErrorResponse('No authorize to access this route' , 401));
    }
    try {
        //  verify token
        const decoded = JWT.verify(token , process.env.JWT_KEY);
       // console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    }
    catch (err) {
        return next(new ErrorResponse('No authorize to access this route' , 401))
    }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
   return (req , res , next) => {
       
       if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route` , 403));
        }
        next();
    }
}
