
const Kino = require('../models/kino');
const Rating = require('../models/rating');
const jwt = require('jsonwebtoken')
// @desc      Add rating product
// @route     POST /api/rating
// @access    Public
exports.createRatingProduct = async (req, res) => {
    const user = jwt.decode(req.headers.authorization.slice(7))

    const rating = await new Rating({
       user: user.id,
        kino: req.body.kino,
        rating: req.body.rating
    });
    rating.save()
        .then(
          async () => {

              const product = await Kino.findByIdAndUpdate({_id: req.body.kino})
              let costByProduct = await Rating
                  .find({kino:req.body.kino})
                  .sort({rating: 1})

              let result = 0;
              for (let i = 0; i < costByProduct.length; i++){
                  result += costByProduct[i].rating
              }
              let num = result / costByProduct.length
              let rate = Number(num.toFixed(1))

              product.rating = rate
              product.save({ validateBeforeSave: false })
                  .then(() => {
                      res.send(rate)
                  })
             res.send('rated')
            })
        .catch((e) => res.send(e))

};
exports.getRatings = async (req,res)=>{
    res.send(await Rating.find().sort({rating: -1}))
}