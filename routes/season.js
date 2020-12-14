const express = require('express')
const router = express.Router({mergeParams: true});
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
const {protect , authorize} = require('../middlewares/auth');

const {
    //Season
    addSeason,
    getAllSeason,
    getByIdSeason,
    deleteSeason,
    updateSeason,
    // Seriya
    addSeriya,
    getAllSeriya,
    getByIdSeriya,
    updateSeriya,
    deleteSeriya
} = require('../controllers/season')



const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads/cinema/org');
    },
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage: storage});

// Season Router
router.post('/season',upload.array('images',10),addSeason)
router.get('/season',/*protect,authorize('admin'),*/ getAllSeason )
router.get('/season/:id',/*protect,authorize('admin'),*/ getByIdSeason )
router.delete('/season/:id' /*,protect,authorize('admin')*/ ,deleteSeason)
router.put('/season/:id',protect,authorize('admin'),updateSeason)

// Seriya Router
router.post('/seriya',addSeriya)
router.get('/seriya', /*protect,authorize('admin'),*/ getAllSeriya )
router.get('/seriya/:id', /*protect,authorize('admin'),*/ getByIdSeriya )
router.put('/seriya/:id',protect,authorize('admin'),updateSeriya)
router.delete('/seriya/:id',protect,authorize('admin'),deleteSeriya)

module.exports = router;