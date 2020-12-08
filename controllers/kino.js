const Kino = require('../models/kino')
const asyncHandler = require('../middlewares/async')
const slugify = require('slugify');
const ErrorResponse = require('../utils/errorResponse');
const Comment = require('../models/comment')

exports.addCinema = asyncHandler(async (req,res,next) => {
    const urls = [];
    const category=[];
    const members = [];
    const janrs = []
    const tarjimon = []
    const tayming = []
    const files = req.files;
    for (const file of files) {
        const { path } = file;
        urls.push(path);
    }
    for (const member of req.body.translator){
        const mem = member;
        members.push(mem)
    }
    for (const janr of req.body.janr){
        const ja = janr;
        janrs.push(ja)
    }
    for(const tar of req.body.tarjimon){
        const ta = tar
        tarjimon.push(ta)
    }
    for(const tay of req.body.tayming){
        const taym = tay
        tayming.push(taym)
    }

    for(const cat of req.body.category){
        const catt = cat
        category.push(catt)
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
         tarjimon: tarjimon,
         rejissor: req.body.rejissor,
         studia: req.body.studia,
         length: req.body.length,
         tayming: tayming,
        category: category,
        video: req.body.video,
        translator: members,
        screens: urls.slice(1,urls.length),
        image: urls[0],
         type: req.body.type,
         price: req.body.price,
       slug: slugify(req.body.nameuz),
         status: req.body.status,
         year: req.body.year,
         janr: janrs,
         country: req.body.country,

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
    const pageNumber = req.query.page
    let type
    if(!req.query.type){
        type = ['film','serial','treyler']
    } else {
        type = req.query.type
    }
    const kino = await Kino.find()
        .or({type: type})
        .skip((pageNumber - 1 )* 20)
        .limit(20)
        .sort({date: -1})
        .select({name: 1, category: 1,type: 1, image: 1, rating: 1, season: 1})
        .populate({path: 'category', select: 'nameuz'})

    res.status(200).json({
        success: true,
        data: kino
    })
})
exports.getById = asyncHandler(async (req,res,next)=>{
    const kino = await Kino.findById(req.params.id)
        .populate(['category', 'janr','translator','tayming','tarjimon'])
        .populate(
            {path: 'season' ,
                select: ['seriya','name','description','year','num','image','screens'] ,
                populate:'seriya'
            }
        )
    if(!kino){
        res.status(404).json({
            success: false,
            data: new ErrorResponse('Kino not found',404)
        })
    }
    const comment = await Comment.find({kinoId: req.params.id})
        .sort({date: -1})
        .populate('user')


    res.status(200).json({
        success: true,
        data: kino,
        comment
    })
})



exports.deleteById = asyncHandler(async (req,res,next)=>{
    await Kino.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true , data: []});
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
    // kino.translator = members
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