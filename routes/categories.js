const express = require('express');
const { getCategories ,
        getCategory ,
        createCategory,
        deleteCategory,
        updateCategory } = require('../controllers/categories');

// Include other resource routers
const productRouter = require('./products');

const router = express.Router();

// Re-route into other resource routers
router.use('/:categoryId/products' , productRouter);

const {protect , authorize} = require('../middlewares/auth');



router.route('/')
    .get(getCategories)
    .post(  protect , authorize('publisher' , 'admin'), createCategory);

router.route('/:categoryId')
    .get(protect , authorize('publisher' , 'admin') , getCategory)
    .put(protect , authorize('admin') ,updateCategory)
    .delete(protect , authorize('admin') ,deleteCategory);

module.exports = router;