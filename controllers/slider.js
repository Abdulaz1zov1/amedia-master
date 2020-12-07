const Slider = require('../models/slider');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

exports.addSlider = asyncHandler(async (req,res,next)=>{
    const slider = new Slider({
        kino: req.body.kino
    })
    slider
        .save()
        .then(()=>{
            res.status(201).json({
                success: true
            })
        })
        .catch((error)=>{
            res.status(400).json({
                success: false,
                error
            })
        })
})

exports.getSlidersForAdminPage = asyncHandler(async (req,res,next) => {
    const sliders = await Slider.find()
        .sort({date: -1})
        .populate(
            {path: 'kino' ,
                select: ['name','image']
            }
        )
    res.status(200).json({
        success: true,
        data: sliders
    })
})
exports.deleteSlider = asyncHandler(async (req,res,next) => {
    await Slider.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: []
    })
})