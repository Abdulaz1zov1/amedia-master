const {search,filterByYear} = require('../controllers/search')
const express = require('express')
const router = express.Router()

router.get('/search',search)
router.get('/filter',filterByYear)
module.exports = router