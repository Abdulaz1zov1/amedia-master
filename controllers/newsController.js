const News = require('../models/news')
const asyncHandler = require('../middlewares/async')
const slugify = require('slugify');

exports.addNews = asyncHandler(async (req,res,next)=>{
    const slug = Math.floor(Math.random() * 10000000)
    const news = new News({
        name:{
            uz: req.body.nameuz,
            ru: req.body.nameru
        },
        description:{
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru
        },
        slug: slugify(slug.toString()),
        image:`/public/uploads/cinema/${req.file.filename}`
    })
    news.save()
        .then(() => {
            res.status(201).json({
                success: true
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                error
            })
        })
})
exports.getAll = asyncHandler(async (req,res,next) =>{
    const pageNumber = req.query.page
    const news = await News.find()
        .sort({date: -1})
        .limit(20)
        .skip((pageNumber - 1 )* 20)
        .select(['name','date'])

    res.status(200).json({
        success: true,
        data: news
    })
})
exports.getById = asyncHandler(async (req,res,next)=>{
    const news = await News.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: news
    })
})
exports.deleteNews = asyncHandler(async (req,res,next) => {
    await News.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: []
    })
})