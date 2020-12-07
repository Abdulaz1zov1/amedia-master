const path = require('path');
const {Products} = require('../models/product');
const Category = require('../models/category');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { Rating } = require('../models/rating');

// @description Get Products
// @route GET /api/products
// @route GET /api/category/:categoryId/products
// @access Public
exports.getProducts = asyncHandler( async (req , res , next) => {
  let query;
  if(req.params.categoryId) {
    query = Products.find({category: req.params.categoryId})
    //.select(`_id name${req.headers.language} country year describtion${req.headers.language} view videoLink photo date`)
      .populate({
      path:'category',
      select: `_id  name${req.headers.language}`})
      .sort({views: -1});
  } else {
    query = Products.find().sort({views: -1})
    //.select(`_id name${req.headers.language} country year describtion${req.headers.language} view videoLink photo date`)
    .populate({
      path:'category',
      select: `_id  name${req.headers.language}`});
  }
  const products = await query;
  res.status(200).json({success: true , count : products.length , data: products});
  });

// @description Get Single product
// @route GET /api/products/:productId
// @access Public
exports.getSingleProduct = asyncHandler( async (req , res , next) => {
  let product = await Products.findById(req.params.productId)
  //.select(`_id name${req.headers.language} country year describtion${req.headers.language} view videoLink photo date`);
  if(!product)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.productId}`, 404))
  product.views +=1;
  await product.save();
      res.status(200).json({success: true , data: product});
  });

// @description create new product
// @route POST /api/:categoryId/products
// @access Private/(Admin or Publisher)
exports.createProduct = asyncHandler( async (req , res , next) => {
  
  req.body.category = req.params.categoryId;
  const category = await Category.findById(req.params.categoryId); 
  
  if(!category){
    return next(
      ErrorResponse(`No category with the id of ${req.params.categoryId}` , 404)
    );
  }

  if(!req.files)
    return next(new ErrorResponse('Please upload a file' , 400));
    
    const file = req.files.file;
    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')){
      return next(new ErrorResponse('Please upload an image file' , 400));
    }
    // Check file-size
    if(file.size > process.env.MAX_FILE_UPLOAD){
      return next(new ErrorResponse(`Please upload an image less than 
      ${process.env.MAX_FILE_UPLOAD}` , 400));
    }
    let product = await Products.create(req.body);
    // create custom filename
    file.name = `photo_${product._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/products/${file.name}` , async err => {
      if(err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload` , 500));
      }
  
  const productId = product._id;
  product = await Products.findByIdAndUpdate(productId , {photo: file.name} , {
    new: true,
    runValidators: true
});
  res.status(200).json({success: true , data: product});
});
});
// @description update product
// @route PUT /api/products/:productId
// @access Private/Admin
exports.updateProduct = asyncHandler( async (req , res , next) => {
    const product = await Products.findByIdAndUpdate(req.params.productId , req.body , {
        new: true,
        runValidators: true
    });
    if(!product)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.productId}`, 404))
  res.status(200).json({success: true , data: product});
});

// @description delete single product
// @route DELETE /api/products/:productId
// @access Public/Admin
exports.deleteProduct = asyncHandler( async (req , res , next) => {
    const product = await Products.findByIdAndRemove(req.params.productId);
    if(!product)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.productId}`, 404))
  res.status(200).json({success: true , data: product});
});

// @description upload Product photo

// @route PUT /api/products/:productId/photo
// @access Private/(Admin or Publisher)
exports.uploadProductPhoto  = asyncHandler( async (req , res , next) => {
  const product = await Products.findById(req.params.productId);
  if(!product)
      return next(new ErrorResponse(`Resourse not found with id of ${req.params.productId}`, 404))
  if(!req.files)
    return next(new ErrorResponse('Please upload a file' , 400));
    
    const file = req.files.file;
    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')){
      return next(new ErrorResponse('Please upload an image file' , 400));
    }
    // Check file-size
    if(file.size > process.env.MAX_FILE_UPLOAD){
      return next(new ErrorResponse(`Please upload an image less than 
      ${process.env.MAX_FILE_UPLOAD}` , 400));
    }

    // create custom filename
    file.name = `photo_${product._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/products/${file.name}` , async err => {
      if(err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload` , 500));
      }
      await Products.findByIdAndUpdate(req.params.productId , {photo: file.name},
        {
          new: true,
          runValidators: true
      });
      res.status(200).json({
        success: true,
        data: file.name
      })
    });
});

// @description Add Rating
// @route POST /api/products/:productId/rating
// @access Private
exports.rateproduct = asyncHandler( async (req , res , next) => {
  let totalrating = 0;
  const productId = req.params.productId;
  const product = await Products.findById(productId);
  if(!product)
      return next(new ErrorResponse(`Resourse not found with id of ${req.params.id}`, 404));

  let rating = new Rating({
      rating: req.body.rating,
      product: productId,
      user: req.user.name
      });
  await rating.save();
  
  rating = await Rating.find({product: productId});
  for (var i=0;i<rating.length;i++){
    totalrating+=rating[i].rating;
  }
  console.log(totalrating);
  product.rating = (totalrating/rating.length + "").slice(0,3);
  await product.save();
  res.status(201).json({success: true , data: product.rating});
});