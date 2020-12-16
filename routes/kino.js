const express = require('express')
const router = express.Router({mergeParams: true});
const {protect , authorize} = require('../middlewares/auth');
const {
    addCinema,
    getAll,
    filterByType,
    getById,
    deleteById,
    updateById,
    sortByCat
}
    = require('../controllers/kino')
const multer = require('multer')
const md5 = require('md5')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads/cinema/org');
    },
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage: storage});

router.post('/add',protect, authorize('publisher' , 'admin'),upload.array('images', 12), addCinema)
router.get('/all',getAll)
router.get('/sort',sortByCat)
router.get('/:id', protect, getById)
router.delete('/:id',protect, authorize('publisher' , 'admin'),deleteById)
router.put('/:id',updateById)

module.exports = router
