const {Products} = require('../models/product');
const {Video} = require('../models/video');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');


// @description Add Video
// @route POST /api/products/:productId/video
// @access Private
exports.addVideo = asyncHandler( async (req , res , next) => {
    req.body.product = req.params.productId;
    const product = await Products.findById(req.params.productId);
    if(!product)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.productId}`, 404)); 
      let video = await Video.create(req.body);
    res.status(201).json({success: true ,count: video.length , data: video});
  });
  
// @description Get all videos belong to any product
// @route GET /api/products/:productId/video
// @access Public
exports.getVideos = asyncHandler( async (req , res , next) => {
  const product = await Products.findById(req.params.productId);
  if(!product)
      return next(new ErrorResponse(`Resourse not found with id of ${req.params.productId}`, 404)); 
    let video = await Video.find();
  res.status(201).json({success: true ,count: video.length , data: video});
});

// @description Get single video
// @route POST /api/video/:videoId
// @access Public
exports.getVideo = asyncHandler( async (req , res , next) => {
  let video = await Video.findById(req.params.videoId).populate({
    path:'product',
    select: '_id  name'}
  );
  if(!video)
          return next(new ErrorResponse(`Resourse not found with id of ${req.params.videoId}`, 404));
  video.views +=1;
  
  await video.save();
  res.status(201).json({success: true , data: video});
});

// @description Update single video
// @route PUT /api/video/:videoId
// @access Private
exports.updateVideo = asyncHandler( async (req , res , next) => {
  let video = await Video.findByIdAndUpdate(req.params.videoId , req.body , {
    new: true,
    runValidators: true
  });
  if(!video)
          return next(new ErrorResponse(`Resourse not found with id of ${req.params.videoId}`, 404));
  res.status(201).json({success: true , data: video});
});

// @description Delete single video
// @route DELETE /api/video/:videoId
// @access Private
exports.deleteVideo = asyncHandler( async (req , res , next) => {
  let video = await Video.findByIdAndRemove(req.params.videoId);
  if(!video)
          return next(new ErrorResponse(`Resourse not found with id of ${req.params.videoId}`, 404));
  res.status(201).json({success: true , data: video});
});