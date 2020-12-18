const express = require('express')
const router = express.Router()
const {checkUser, saveData, getAllUsers} = require('../controllers/Payment')

router.post('/check/:id', checkUser)
router.post('/create', saveData)
router.get('/all', getAllUsers)

module.exports = router;