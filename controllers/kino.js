const Kino = require('../models/kino')
const asyncHandler = require('../middlewares/async')
const slugify = require('slugify');
const ErrorResponse = require('../utils/errorResponse');
const Comment = require('../models/comment')
const fs = require('fs');
const sharp = require('sharp')
const path = require('path');
const JWT = require('jsonwebtoken');
const User =  require('../models/user')

exports.addCinema = asyncHandler(async (req,res,next) => {
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


    const category=[];
    const members = [];
    const janrs = []
    const tayming = []
    const member = [];

    for(const cat of req.body.category){
        const catt = cat
        category.push(catt)
    }
    for (const member of req.body.translator){
        const mem = member;
        members.push(mem)
    }
    for (const memberss of req.body.tarjimon){
        const mems = memberss;
        member.push(mems)
    }
    for (const janr of req.body.janr){
        const ja = janr;
        janrs.push(ja)
    }
    for(const tay of req.body.tayming){
        const taym = tay
        tayming.push(taym)
    }


     const kino = new Kino({
         name:{
            uz: req.body.nameuz,
            ru: req.body.nameru
         },
         description:{
             uz: req.body.descriptionuz,
             ru: req.body.descriptionru
         },
         screens: {
             thumb: thumb.slice(1, urls.length),
             original: urls.slice(1, urls.length)
         },
         image: urls[0],
         rejissor: req.body.rejissor,
         studia: req.body.studia,
         length: req.body.length,
         tayming: tayming,
         category: category,
         translator: members,
         tarjimon: member,
         janr: janrs,
         video: req.body.video,
         type: req.body.type,
         price: req.body.price,
         slug: (Math.floor(Math.random()*9999999999999)).toString(),
         status: req.body.status,
         year: req.body.year,
         country: req.body.country
    })
    kino.save()
        .then(()=>{
            res.status(201).json({
                success: true,
                data: kino
            })
        })
        .catch((error) => {
            res.send(error)
        })
})
exports.getAll = asyncHandler(async (req,res,next)=>{
    let pageNumber
    if(!req.query.page){
        pageNumber = 1
    } else {
        pageNumber = req.query.page
    }

    const kino = await Kino.find()
        .skip((pageNumber - 1 )* 20)
        .limit(20)
        .sort({date: -1})
        .select({name: 1, category: 1,type: 1, image: 1, rating: 1})
        .populate({path: 'category', select: 'nameuz'})

    res.status(200).json({
        success: true,
        data: kino
    })
})
exports.getById = asyncHandler(async (req, res, next)=>{
    // Compare user's id and kino's id and check status
    const token = req.headers.authorization
    const user =  JWT.decode(token.slice(7,token.length))
    const me = await User.findOne({_id: user.id})
        .select({_id: 1})

    const comment = await Comment.find({kinoId: req.params.id})
        .sort({date: -1})
        .populate('user')


    // Find by id and compare user's id and kino's id and check status
    const kino = await Kino.findById(req.params.id)
        .populate(['category', 'janr','translator','tayming','tarjimon'])

    if(kino.price === 'free'){
        return res.status(200).json({
            success: true,
            data: kino,
            comment
        })
    } else {
        if(me.status === 'vip' && kino.price === 'selling'){
            return res.status(200).json({
                success: true,
                data: kino,
                comment
            })
        }else if(me.status !== 'vip' && kino.price === 'selling'){
            return res.status(401).json({
                success: false,
                data: "foydalanuvchi statusi vip emas"
            })
        }
    }
})
exports.deleteById = asyncHandler(async (req,res,next)=>{
    await Kino.findById({_id: req.params.id})
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
                await Kino.findByIdAndDelete(req.params.id)
                res.status(200).json({
                    success: true,
                    data: []
                })
            }
        })

})
exports.updateById = asyncHandler(async (req,res,next) => {
    let members = []
    let janrs = []
    // for (const member of req.body.translator){
    //     const mem = member;
    //     members.push(mem)
    // }
    // for (const janr of req.body.janr){
    //     const ja = janr;
    //     janrs.push(ja)
    // }
    const kino = await Kino.findByIdAndUpdate(req.params.id)
    kino.name = {
        uz: req.body.nameuz,
        ru: req.body.nameru
    }
    kino.name.ru = req.body.nameru
    kino.description.uz = req.body.descriptionuz
    kino.description.ru = req.body.descriptionru
    kino.category = req.body.category
    kino.translator = req.body.translator
    kino.tarjimon = req.body.tarjimon
    kino.video = req.body.video,
        kino.rejissor = req.body.rejissor,
        kino.length = req.body.length,
    kino.type = req.body.type
    kino.year = req.body.year
    // kino.info.janr = janrs
    kino.status = req.body.status


    kino
        .save()
        .then(() => {
            res.status(200).json({
                success: true,
                data: kino
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: true,
                data: error
            })
        })
})
exports.sortByCat = asyncHandler(async (req,res,next)=>{
    const pageNumber = req.query.page
    const limit = req.query.limit
    let productLimit
    if(!limit){
        productLimit = 20
    } else {productLimit = limit}


    let reqQuery = { ...req.query };
    // Create query String
    let queryStr = JSON.stringify(reqQuery);
    const kino = await Kino.find(JSON.parse(queryStr))

        .skip((pageNumber - 1 )* productLimit)
        .limit(productLimit)
        .sort({date: -1})
        .select({name: 1, category: 1,type: 1, image: 1, year: 1, janr: 1})
        .populate({path: 'category', select: 'nameuz'})

    res.status(200).json({
        success: true,
        data: kino
    })
})