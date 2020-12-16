const Season = require('../models/season')
const Seriya = require('../models/seriya')
const asyncHandler = require('../middlewares/async')
const fs = require('fs');
const path = require('path');
const sharp = require('sharp')
const JWT = require('jsonwebtoken');
const User =  require('../models/user')


// Seriya Controller
exports.addSeriya = asyncHandler(async (req,res,next) => {
    const seriya = new Seriya({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        },
        length: req.body.length,
        video: req.body.video,
        season: req.body.season,
        slug: (Math.floor(Math.random()*9999999999999)).toString()
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
exports.deleteSeriya = asyncHandler(async (req,res,next)=>{
    await Seriya.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: []
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

// Season Controller
exports.addSeason = asyncHandler(async (req,res,next) =>{
    const files = req.files;
    const urls = [];
    const thumb=[];
    for (const file of files) {
        const { filename } = file;
        urls.push(`/public/uploads/cinema/org/${filename}`)
        thumb.push(`/public/uploads/cinema/thumb/${filename}`)
        await sharp(path.join(path.dirname(__dirname) + `/public/uploads/cinema/org/${filename}`) ).resize(500,500)
            .jpeg({
                quality: 60
            })
            .toFile(path.join(path.dirname(__dirname) + `/public/uploads/cinema/thumb/${filename}`), (err)=>{
                if(err) {
                    throw err
                }
            })
    }
    const season = new Season({
        name: {
            uz: req.body.nameuz,
            ru: req.body.nameru
        },
        screens: {
            thumb: thumb.slice(1, urls.length),
            original: urls.slice(1, urls.length)
        },
        image: urls[0],
        description: {
            uz: req.body.descriptionuz,
            ru: req.body.descriptionru,
        },
        year: req.body.year,
        num: req.body.num,
        // model/kino dan qo'shimcha elementlar qo'shilgan
        category: req.body.category,
        translator: req.body.translator,
        tarjimon: req.body.tarjimon,
        video: req.body.video,
        rejissor: req.body.rejissor,
        length: req.body.length,
        studia: req.body.studia,
        tayming: req.body.tayming,
        price: req.body.price,
        janr: req.body.janr,
        country: req.body.country,
        slug:(Math.floor(Math.random()*9999999999999)).toString(),
        seriya: req.body.seriya
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
exports.getAllSeason = asyncHandler(async (req,res,next)=>{
    let pageNumber
    if(!req.query.page){
        pageNumber = 1
    } else {
        pageNumber = req.query.page
    }
    const season = await Season.find()
        .skip((pageNumber - 1 )* 20)
        .limit(20)
        .sort({date: -1})
        .select({name: 1, category: 1, image: 1, rating: 1})
        .populate({path: 'category', select: 'nameuz'})

    res.status(200).json({
        success: true,
        data: season
    })
})


exports.getByIdSeason = asyncHandler(async (req,res,next) => {
    // Find by id and compare user's id and seasons's id and check status
    const token = req.headers.authorization
    const user =  JWT.decode(token.slice(7,token.length))
    const me = await User.findOne({_id: user.id})
        .select({_id: 1})

    const season = await Season.findById(req.params.id)
        .populate(['category', 'janr','translator','tayming','tarjimon','seriya'])

    if(season.price === 'free'){
        return res.status(200).json({
            success: true,
            data: season
        })
    } else {
        if(me.status !== 'vip' && season.price === 'selling'){
            return res.status(401).json({
                success: false,
                data: "foydalanuvchi statusi vip emas"
            })
        }else if(me.status === 'vip' && season.price === 'selling'){
            return res.status(200).json({
                success: true,
                data: season
            })
        }
    }
})
exports.deleteSeason = asyncHandler(async (req,res,next) =>{
    await Season.findById({_id: req.params.id})
        .exec(async (error,data) => {
            if(error) {
                res.send(error)
            }
            else{
                const thumb = data.screens.thumb;
                const original = data.screens.original
                // original faylni o'chiradi
                for (const file of original){
                    let fileOriginal = path.join(path.dirname(__dirname) + file)
                    fs.unlink(fileOriginal, async (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                }
                // thumb fayni o'chiradi
                for (const file of thumb){
                    let fileThump = path.join(path.dirname(__dirname) + file)
                    fs.unlink(fileThump, async (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                }
                // poster faylni o'chiradi
                let poster = path.join(path.dirname(__dirname) + data.image)
                fs.unlink(poster, async (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
                // :id bo'yicha o'chirib tashlaydi
                await Season.findByIdAndDelete(req.params.id)
                res.status(200).json({
                    success: true,
                    data: []
                })
            }
        })


})
exports.updateSeason = asyncHandler(async (req,res,next) =>{
    const season = await Season.findByIdAndUpdate(req.params.id)
    season.name.uz = req.body.nameuz
    season.name.ru = req.body.nameru
    season.description.uz = req.body.descriptionuz
    season.description.ru = req.body.descriptionru
    season.year = req.body.year
    season.num = req.body.num


    season.screens = req.body.screens
    season.image = req.body.image
    season.seriya = req.body.seriya
    season.country = req.body.country
    season.janr = req.body.janr
    season.type = req.body.type
    season.price = req.body.price
    season.tayming = req.body.tayming
    season.studia = req.body.studia
    season.length = req.body.num
    season.rejissor = req.body.rejissor
    season.video = req.body.video
    season.category = req.body.category

    season.translator = req.body.translator
    season.tarjimon = req.body.tarjimon

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