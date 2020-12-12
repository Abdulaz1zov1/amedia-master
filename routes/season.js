const express = require('express')
const router = express.Router({mergeParams: true});
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
const {protect , authorize} = require('../middlewares/auth');

const {addSeason ,
    addSeriya ,
    deleteSeason,
    deleteSeriya,
    updateSeason,
    updateSeriya,
    allSeason
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

router.post('/add',upload.array('images',10),addSeason)
router.get('/all',/*protect,authorize('admin'),*/ allSeason )
router.delete('/:id' /*,protect,authorize('admin')*/ ,deleteSeason)
router.put('/:id',protect,authorize('admin'),updateSeason)

router.delete('/seriya/:id',protect,authorize('admin'),deleteSeriya)
router.put('/seriya/:id',protect,authorize('admin'),updateSeriya)
router.post('/seriya/add',addSeriya)

module.exports = router;