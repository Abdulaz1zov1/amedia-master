const express = require('express')
const router = express.Router()
const {clickuz} = require('../controllers/Payment')

router.post('/click', clickuz)

module.exports = router;