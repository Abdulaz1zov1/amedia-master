const jwt = require('jsonwebtoken')
const Comment = require('../models/comment');
const Product = require('../models/product')
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @description Write Comment
// @route POST /api/products/:productId/comment
// @access Private
exports.writeComment = asyncHandler( async (req , res) => {
    const user = jwt.decode(req.headers.authorization.slice(7))
    const comment = new Comment({
        message: req.body.message,
        kinoId: req.body.kinoId,
        user: user.id
    })
    comment.save()
        .then(()=>{
            res.status(201).json({
                success: true
            })
        })
        .catch((error)=>{
            res.send(error).json({
                success: false,
                error
            })
        })
  });


exports.allComments = asyncHandler(async (req,res)=>{
    const comments = await Comment.find()
        .sort({date: -1})
        .populate('user')
    res.status(200).json({
        success: true,
        data: comments
    })
})
exports.editStatus = asyncHandler(async (req,res)=>{
    const comment = await Comment.findByIdAndUpdate(req.params.id)
    comment.status = req.body.status
    comment.save({ validateBeforeSave: false })
        .then(()=>{
            res.status(200).json({
                success: true
            })
        })
        .catch((error)=>{
            res.send(error)
        })
})

// @description Delete single Comment
// @route DELETE /api/comment/:id
// @access Private/Admin
exports.deleteComment = asyncHandler( async (req , res , next) => {
    let comment = await Comment.findByIdAndRemove(req.params.id);
    if(!comment)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.id}`, 404))

    res.status(201).json({success: true , data: comment});
  });





// exports.getCommentById = asyncHandler(async (req, res, next) => {
//     const comment = await Comment.findById({kinoId: req.params.id})
//         .sort({date: -1})
//         .populate('product')
//
//     return res.status(200).json({
//         success: true,
//         data: comment
//     })
//
// })
