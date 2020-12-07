const express = require('express')
const router = express.Router({mergeParams: true});
const {protect , authorize} = require('../middlewares/auth');

const {addSeason , addSeriya , deleteSeason,
    deleteSeriya,
    updateSeason,
    updateSeriya
} = require('../controllers/season')

const multer = require('multer')
const md5 = require('md5')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads/cinema');
    },
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage: storage});

router.delete('/season/:id',protect,authorize('admin'),deleteSeason)
router.put('/season/:id',protect,authorize('admin'),updateSeason)
router.delete('/seriya/:id',protect,authorize('admin'),deleteSeriya)
router.put('/seriya/:id',protect,authorize('admin'),updateSeriya)
router.post('/add-season', upload.array('images',10),addSeason)
router.post('/add-seriya',addSeriya)

module.exports = router;