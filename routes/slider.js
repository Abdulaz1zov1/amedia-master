const express = require('express');
const {
    addSlider ,

    getSlidersForAdminPage,
    deleteSlider
} = require('../controllers/slider');

const router = express.Router();
const {protect , authorize} = require('../middlewares/auth');

router.post('/add',protect,authorize('admin','publisher'), addSlider)
router.get('/admin', getSlidersForAdminPage) // For Admin
router.delete('/:id', protect,authorize('admin','publisher'),deleteSlider)

module.exports = router;