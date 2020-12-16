const express = require('express')
const router = express.Router()
const {checkUser} = require('../controllers/Payment')

router.post('/check/:id', checkUser)

module.exports = router;