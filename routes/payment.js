const express = require('express')
const router = express.Router()
const {checkUser, saveData} = require('../controllers/Payment')

router.post('/check/:id', checkUser)
router.post('/create', saveData)

module.exports = router;