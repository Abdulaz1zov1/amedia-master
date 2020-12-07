const express = require('express');
const { register ,
        login ,
        getMe ,
        forgotPassword,
        resetPassword,
        UpdateDetails,
    UpdatePassword} = require('../controllers/auth');
const {protect} = require('../middlewares/auth');

const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.get('/me' , protect , getMe);
router.put('/updatedetails' , protect , UpdateDetails);
router.put('/updatepassword' , protect , UpdatePassword);
router.post('/forgotpassword' , forgotPassword);
router.put('/resetpassword/:resetToken' , resetPassword);
module.exports = router;