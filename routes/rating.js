const express = require('express')
const router = express.Router();
const {createRatingProduct,getRatings} = require('../controllers/rating')

const {protect , authorize} = require('../middlewares/auth');

router.post('/',createRatingProduct)
router.get('/',getRatings)

module.exports = router;