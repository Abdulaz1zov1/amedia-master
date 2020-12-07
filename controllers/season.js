const Season = require('../models/season')
const Seriya = require('../models/seriya')
const Kino = require('../models/kino')
const asyncHandler = require('../middlewares/async')

exports.addSeason = asyncHandler(async (req,res,next) =>{
    const urls = [];
    const files = req.files;

    for (const file of files) {
        const { path } = file;
        urls.push(path);
    }
    const season = new Season({
        kinoId: req.body.kinoId,
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru,
        },
        screens: urls.slice(1,urls.length),
        image: urls[0],
        description: {
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru,
        },
        year: req.body.year,
        num: req.body.num
    })
    season.save()
        .then(()=> {
            res.status(201).json({
                success: true,
                data: season
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })

})
exports.addSeriya = asyncHandler(async (req,res,next) => {
    const seriya = new Seriya({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru,
        },
        length: req.body.length,
        video: req.body.video,
        season: req.body.season,

        kino: req.body.kinoId
    })
    seriya.save()
        .then(()=>{
            res.status(201).json({
                success: true,
                data: seriya
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })
})
exports.allSeason = asyncHandler(async (req,res,next)=>{
    const season = await Season.find()
    res.send(season)
})
exports.deleteSeason = asyncHandler(async (req,res,next) =>{
    await Season.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: []
    })
})
exports.deleteSeriya = asyncHandler(async (req,res,next)=>{
    await Seriya.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: []
    })
})
exports.updateSeason = asyncHandler(async (req,res,next) =>{
    const season = await Season.findByIdAndUpdate(req.params.id)
    season.kinoId = req.body.kinoId
    season.name.uz = req.body.nameuz
    season.name.ru = req.body.nameru
    season.description.uz = req.body.descriptionuz
    season.description.ru = req.body.descriptionru
    season.year = req.body.year
    season.num = req.body.num

    season
        .save()
        .then(() => {
            res.status(200).json({
                success: true,
                data: season
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })
})
exports.updateSeriya = asyncHandler(async (req,res,next) => {
    const seriya = await Seriya.findByIdAndUpdate(req.params.id)

    seriya.name.uz = req.body.nameuz
    seriya.name.ru = req.body.nameru
    seriya.season = req.body.season
    seriya.kino = req.body.kino
    seriya.length = req.body.length

    seriya
        .save()
        .then(()=>{
            res.status(200).json({
                success: true,
                data: seriya
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })
})