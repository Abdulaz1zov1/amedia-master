const Slider = require('../models/slider')
const asynHandler = require('../middlewares/async')
const News = require('../models/news')
const Anotatsiya = require('../models/anotatsiya')
const Kino = require('../models/kino');
const Season = require('../models/season')

exports.index = asynHandler(async (req,res,next)=>{
    const sliders = await Slider.find()
        .sort({date: -1})
        .populate(
            {path: 'kino' ,
                select: ['name','image','screens','description','rating']
            }
        )
        .limit(5)
    const news = await News.find()
        .sort({date: -1})
        .limit(3)
        .select(['name','date','slug','image'])
    const anotatsiya = await Anotatsiya.find({status: true})
        .sort({date: -1})
        .limit(1)
    const kino = await Kino.find()
        .limit(20)
        .sort({date: -1})
        .select({name: 1, category: 1, image: 1, rating: 1})
        .populate({path: 'category', select: 'nameuz'})
    const season = await Season.find()
        .limit(20)
        .sort({date: -1})
        .select({name: 1, category: 1, image: 1, rating: 1})
        .populate({path: 'category', select: 'nameuz'})

    res.status(200).json({
        success: true,
        sliders,
        news,
        anotatsiya,
        kino,
        season
    })
})