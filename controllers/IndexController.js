const Slider = require('../models/slider')
const asynHandler = require('../middlewares/async')
const News = require('../models/news')
const Anotatsiya = require('../models/anotatsiya')

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
    res.status(200).json({
        success: true,
        sliders,
        news,
        anotatsiya
    })
})