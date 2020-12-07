const asyncHandler = require('../middlewares/async')
const Anotatsiya = require('../models/anotatsiya')

exports.add = asyncHandler(async (req,res,next) => {
    const anotatsiya = new Anotatsiya({
        name:{
            uz: req.body.nameuz,
            ru: req.body.nameru,
        },
        description:{
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru,
        },
        status: req.body.status,
        video: req.body.video
    })
    anotatsiya.save()
        .then(()=>{
            res.status(201).json({
                success: true,
                data: anotatsiya
            })
        })
        .catch((error)=>{
            res.status(400).json({
                success: true,
                data: error
            })
        })
})
exports.getAll = asyncHandler(async (req,res,next) => {
    const anotatsiya = await Anotatsiya.find()
        .sort({date:-1})

    res.status(200).json({
        success: true,
        data: anotatsiya
    })
})
exports.addOne = asyncHandler(async (req,res,next) => {
    const anotatsiya = await Anotatsiya.find()
        .sort({date:-1})
        .limit(1)

    res.status(200).json({
        success: true,
        data: anotatsiya
    })
})
exports.update = asyncHandler(async (req,res,next) => {
    const anotatsiya = await Anotatsiya.findByIdAndUpdate(req.params.id)
    anotatsiya.name.uz = req.body.nameuz
    anotatsiya.name.ru = req.body.nameru
    anotatsiya.description.uz = req.body.descriptionuz
    anotatsiya.description.ru = req.body.descriptionru
    anotatsiya.video = req.body.video
    anotatsiya.status = req.body.status
    anotatsiya.save()
        .then(()=>{
            res.status(201).json({
                success: true,
                data: anotatsiya
            })
        })
        .catch((error)=>{
            res.status(400).json({
                success: true,
                data: error
            })
        })
})
exports.deleteById = asyncHandler(async (req,res,next) => {
await Anotatsiya.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: []
    })
})