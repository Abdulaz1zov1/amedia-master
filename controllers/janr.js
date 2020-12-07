const Janr = require('../models/janr');
const {Products} = require('../models/product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @description Get all Categories
// @route GET /api/category
// @access Public
exports.getJanrs = asyncHandler( async (req , res , next) => {
    const janr = await Janr.find();
    res.status(200).json({success: true , count : janr.length , data: janr});
});

// @description Create Category
// @route POST /api/category
// @access Private/(Admin or Publisher)
exports.createJanr = asyncHandler( async (req , res , next) => {
    const category = await Janr.create(req.body);
    res.status(201).json({success: true , data: category});
});

// @description Get single Category
// @route GET /api/category/:categoryId
// @access Private/(Admin or Publisher)
exports.getJanr = asyncHandler( async (req , res , next) => {
    const janr = await Janr.findById(req.params.janrId);
    if(!janr)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.janrId}`, 404))
    res.status(200).json({success: true , data: janr});
});

// @description update Category
// @route PUT /api/category/:categoryId
// @access Private/Admin
exports.updateJanr = asyncHandler( async (req , res , next) => {
    const category = await Janr.findByIdAndUpdate(req.params.janrId , req.body , {
        new: true,
        runValidators: true
    });
    if(!category)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.categoryId}`, 404))
    res.status(200).json({success: true , data: category});
});

// @description delete single Category
// @route DELETE /api/category
// @access Private/Admin
exports.deleteJanr = asyncHandler( async (req , res , next) => {
    const category = await Janr.findByIdAndRemove(req.params.janrId);
    if(!category)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.janrId}`, 404))

    res.status(200).json({success: true , data: category});
});

