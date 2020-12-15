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
router.post('/add',upload.array('images',10),addSeason)
router.get('/all', protect,authorize('admin'), getAllSeason )
router.get('/:id',protect,authorize('admin'), getByIdSeason )
router.delete('/:id' ,protect,authorize('admin') ,deleteSeason)
router.put('/:id',protect,authorize('admin'),updateSeason)

// Seriya Router
router.post('/seriya/add',protect,authorize('admin'),addSeriya)
router.put('/seriya/:id',protect,authorize('admin'),updateSeriya)
router.delete('/seriya/:id',protect,authorize('admin'),deleteSeriya)
module.exports = router;