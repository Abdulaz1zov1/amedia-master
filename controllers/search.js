const Kino = require('../models/kino')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');

exports.search = asyncHandler(async (req,res,next)=>{
    const pageNumber = req.query.page
    const searchedQr = new RegExp(req.query.title);
    const result = await Kino.find()
        .or([{name:{uz: {
                    $regex:  searchedQr , options: 'i'
                }}},
            {name:{ru: {
                        $regex:  searchedQr, options: 'i'
                    }}}])
        .skip((pageNumber - 1 )* 20)
        .limit(20)
        .sort({date: -1})
        .select({name: 1, category: 1})
        .populate('category')

    res.status(200).json({
        success: true,
        data: result
    })
})
exports.filterByYear = asyncHandler(async (req,res,next) => {
    const pageNumber = req.query.page
    const kino = await Kino.find({info:{year: req.query.year}})
        .sort({date: -1})
        .populate({path: 'category', select: 'name'})
        .skip((pageNumber - 1 )* 20)
        .limit(20)
        .sort({date: -1})
        .select({name: 1, category: 1,type: 1, image: 1})

    res.status(200).json({
        success: true,
        data: kino
    })
})