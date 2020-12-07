const Category = require('../models/category');
const {Products} = require('../models/product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @description Get all Categories
// @route GET /api/category
// @access Public
exports.getCategories = asyncHandler( async (req , res , next) => {
      const categories = await Category.find();
    res.status(200).json({success: true , count : categories.length , data: categories});
  });

// @description Create Category
// @route POST /api/category
// @access Private/(Admin or Publisher)
exports.createCategory = asyncHandler( async (req , res , next) => {
    const category = await Category.create(req.body);
    res.status(201).json({success: true , data: category});
});

// @description Get single Category
// @route GET /api/category/:categoryId
// @access Private/(Admin or Publisher)
exports.getCategory = asyncHandler( async (req , res , next) => {
    const category = await Category.findById(req.params.categoryId);
    if(!category)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.categoryId}`, 404))
  res.status(200).json({success: true , data: category});
});

// @description update Category
// @route PUT /api/category/:categoryId
// @access Private/Admin
exports.updateCategory = asyncHandler( async (req , res , next) => {
    const category = await Category.findByIdAndUpdate(req.params.categoryId , req.body , {
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
exports.deleteCategory = asyncHandler( async (req , res , next) => {
    const category = await Category.findByIdAndRemove(req.params.categoryId);
    if(!category)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.categoryId}`, 404))
    await Products.deleteMany({category: req.params.categoryId});
  res.status(200).json({success: true , data: category});
});

