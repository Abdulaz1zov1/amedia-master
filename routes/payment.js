const express = require('express')
const router = express.Router()
const {checkUser, saveData, Events} = require('../controllers/Payment')
const {protect , authorize} = require('../middlewares/auth');

router.post('/check/:id', checkUser)
router.post('/create', saveData)
router.get('/all', protect , authorize('admin'), Events)

module.exports = router;